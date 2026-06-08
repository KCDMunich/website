const allowedWritePaths = new Set(['/favorite', '/api/schedule/favorite']);
const allowedAdminPaths = new Set(['/stats', '/api/admin/schedule-favorites']);
const allowedActions = new Set(['add', 'remove']);
const databaseBindingName = 'cns-fav';
const maxRequestBodyBytes = 1024;
const defaultSessionizeGridUrl = 'https://sessionize.com/api/v2/1yvxke5i/view/GridSmart';
const sessionTitleCacheTtlMs = 5 * 60 * 1000;

let sessionTitleCache = {
  expiresAt: 0,
  titlesById: null,
};

const getDatabase = (env) => env[databaseBindingName];

const parseAllowedOrigins = (env) =>
  (env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const parseAllowedEventIds = (env) =>
  (env.ALLOWED_EVENT_IDS || '')
    .split(',')
    .map((eventId) => eventId.trim())
    .filter(Boolean);

const collectSessionTitles = (scheduleDays) => {
  const titlesById = new Map();

  scheduleDays.forEach((day) => {
    day.rooms?.forEach((room) => {
      room.sessions?.forEach((session) => {
        const eventId = String(session?.id || '').trim();
        const eventTitle = String(session?.title || '')
          .trim()
          .slice(0, 300);

        if (eventId && eventTitle) {
          titlesById.set(eventId, eventTitle);
        }
      });
    });
  });

  return titlesById;
};

const getSessionTitles = async (env) => {
  const now = Date.now();

  if (sessionTitleCache.titlesById && sessionTitleCache.expiresAt > now) {
    return sessionTitleCache.titlesById;
  }

  const response = await fetch(env.SESSIONIZE_GRID_URL || defaultSessionizeGridUrl, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Sessionize schedule request failed with status ${response.status}`);
  }

  const scheduleDays = await response.json();
  const titlesById = collectSessionTitles(Array.isArray(scheduleDays) ? scheduleDays : []);

  sessionTitleCache = {
    expiresAt: now + sessionTitleCacheTtlMs,
    titlesById,
  };

  return titlesById;
};

const getCorsHeaders = (request, env) => {
  const origin = request.headers.get('Origin');
  const allowedOrigins = parseAllowedOrigins(env);

  if (!origin || !allowedOrigins.includes(origin)) {
    return {};
  }

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
};

const createJsonResponse = (request, env, body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...getCorsHeaders(request, env),
    },
  });

const isAllowedBrowserOrigin = (request, env) => {
  const origin = request.headers.get('Origin');
  return Boolean(origin && parseAllowedOrigins(env).includes(origin));
};

const parseRequestBody = async (request) => {
  const contentType = request.headers.get('Content-Type') || '';
  const contentLength = Number(request.headers.get('Content-Length') || 0);

  if (!contentType.toLowerCase().includes('application/json')) {
    return null;
  }

  if (contentLength > maxRequestBodyBytes) {
    return null;
  }

  try {
    return await request.json();
  } catch {
    return null;
  }
};

const normalizeFavoriteEvent = (body, env) => {
  const eventId = String(body?.eventId || '').trim();
  const action = String(body?.action || '')
    .trim()
    .toLowerCase();
  const allowedEventIds = parseAllowedEventIds(env);

  if (
    !/^[a-zA-Z0-9_-]{1,80}$/.test(eventId) ||
    !allowedActions.has(action) ||
    (allowedEventIds.length > 0 && !allowedEventIds.includes(eventId))
  ) {
    return null;
  }

  return { eventId, action };
};

const updateFavoriteCount = async (env, eventId, eventTitle, action) => {
  const updatedAt = new Date().toISOString();
  const database = getDatabase(env);

  if (action === 'add') {
    await database
      .prepare(
        `
        INSERT INTO schedule_favorite_counts (
          event_id,
          event_title,
          add_count,
          remove_count,
          current_count,
          updated_at
        )
        VALUES (?, ?, 1, 0, 1, ?)
        ON CONFLICT(event_id) DO UPDATE SET
          event_title = CASE
            WHEN excluded.event_title != '' THEN excluded.event_title
            ELSE event_title
          END,
          add_count = add_count + 1,
          current_count = current_count + 1,
          updated_at = excluded.updated_at
      `
      )
      .bind(eventId, eventTitle, updatedAt)
      .run();
  } else {
    await database
      .prepare(
        `
        INSERT INTO schedule_favorite_counts (
          event_id,
          event_title,
          add_count,
          remove_count,
          current_count,
          updated_at
        )
        VALUES (?, ?, 0, 1, 0, ?)
        ON CONFLICT(event_id) DO UPDATE SET
          event_title = CASE
            WHEN excluded.event_title != '' THEN excluded.event_title
            ELSE event_title
          END,
          remove_count = remove_count + 1,
          current_count = CASE
            WHEN current_count > 0 THEN current_count - 1
            ELSE 0
          END,
          updated_at = excluded.updated_at
      `
      )
      .bind(eventId, eventTitle, updatedAt)
      .run();
  }
};

const handleFavoriteWrite = async (request, env) => {
  if (!isAllowedBrowserOrigin(request, env)) {
    return createJsonResponse(request, env, { error: 'origin_not_allowed' }, 403);
  }

  const body = await parseRequestBody(request);
  const favoriteEvent = normalizeFavoriteEvent(body, env);

  if (!favoriteEvent) {
    return createJsonResponse(request, env, { error: 'invalid_request' }, 400);
  }

  const sessionTitles = await getSessionTitles(env);
  const eventTitle = sessionTitles.get(favoriteEvent.eventId);

  if (!eventTitle) {
    return createJsonResponse(request, env, { error: 'unknown_event' }, 400);
  }

  await updateFavoriteCount(env, favoriteEvent.eventId, eventTitle, favoriteEvent.action);

  return createJsonResponse(request, env, { ok: true }, 202);
};

const handleStatsRead = async (request, env) => {
  const expectedToken = env.ADMIN_TOKEN;
  const authorization = request.headers.get('Authorization') || '';

  if (!expectedToken || authorization !== `Bearer ${expectedToken}`) {
    return createJsonResponse(request, env, { error: 'unauthorized' }, 401);
  }

  const { results } = await getDatabase(env)
    .prepare(
      `
      SELECT
        event_id,
        event_title,
        add_count,
        remove_count,
        current_count,
        updated_at
      FROM schedule_favorite_counts
      ORDER BY current_count DESC, add_count DESC, event_id ASC
      LIMIT 500
    `
    )
    .all();

  return createJsonResponse(request, env, { results });
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      if (!isAllowedBrowserOrigin(request, env)) {
        return new Response(null, { status: 403 });
      }

      return new Response(null, {
        status: 204,
        headers: getCorsHeaders(request, env),
      });
    }

    if (request.method === 'POST' && allowedWritePaths.has(url.pathname)) {
      return handleFavoriteWrite(request, env);
    }

    if (request.method === 'GET' && allowedAdminPaths.has(url.pathname)) {
      return handleStatsRead(request, env);
    }

    if (request.method === 'GET' && url.pathname === '/health') {
      return createJsonResponse(request, env, { ok: true });
    }

    return createJsonResponse(request, env, { error: 'not_found' }, 404);
  },
};
