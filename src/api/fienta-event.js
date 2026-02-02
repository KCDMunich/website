const buildAuthHeaders = (apiKey, mode) => {
  if (!apiKey) return {};

  if (mode === 'token') return { Authorization: `Token ${apiKey}` };
  if (mode === 'x-api-key') return { 'X-API-KEY': apiKey };

  return { Authorization: `Bearer ${apiKey}` };
};

const fetchJson = async (url, headersList) => {
  let lastStatus = null;

  for (const headers of headersList) {
    const response = await fetch(url, { headers });
    lastStatus = response.status;
    if (response.ok) {
      return response.json();
    }
    if (![401, 403].includes(response.status)) {
      break;
    }
  }

  return { error: true, status: lastStatus };
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const baseUrl = process.env.GATSBY_FIENTA_BASE_URL || 'https://fienta.com/api/v1';
  const eventId = process.env.GATSBY_FIENTA_EVENT_ID;
  const organizerId = process.env.GATSBY_FIENTA_ORGANIZER_ID;
  const seriesId = process.env.GATSBY_FIENTA_SERIES_ID;
  const locale = process.env.GATSBY_FIENTA_LOCALE || 'de';
  const apiKey = process.env.FIENTA_API_KEY;

  const searchParams = new URLSearchParams();
  if (locale) searchParams.set('locale', locale);
  if (organizerId) searchParams.set('organizer', organizerId);
  if (seriesId) searchParams.set('series_id', seriesId);

  const queryString = searchParams.toString();
  const publicEventsUrl = `${baseUrl}/public/events`;
  const publicListUrl = `${publicEventsUrl}${queryString ? `?${queryString}` : ''}`;
  const publicDetailUrl = eventId
    ? `${publicEventsUrl}/${eventId}${queryString ? `?${queryString}` : ''}`
    : '';

  const privateEventsUrl = `${baseUrl}/events`;
  const privateListUrl = `${privateEventsUrl}${queryString ? `?${queryString}` : ''}`;
  const privateDetailUrl = eventId
    ? `${privateEventsUrl}/${eventId}${queryString ? `?${queryString}` : ''}`
    : '';

  const headersList = apiKey
    ? [
        buildAuthHeaders(apiKey, 'bearer'),
        buildAuthHeaders(apiKey, 'token'),
        buildAuthHeaders(apiKey, 'x-api-key'),
      ]
    : [{}];

  const candidates = [];
  if (apiKey && privateDetailUrl) candidates.push({ url: privateDetailUrl, headersList });
  if (apiKey && privateListUrl) candidates.push({ url: privateListUrl, headersList });
  if (publicDetailUrl) candidates.push({ url: publicDetailUrl, headersList: [{}] });
  candidates.push({ url: publicListUrl, headersList: [{}] });

  for (const candidate of candidates) {
    const payload = await fetchJson(candidate.url, candidate.headersList);
    if (payload && !payload.error) {
      res.status(200).json(payload);
      return;
    }
  }

  res.status(502).json({ error: 'Fienta request failed' });
}
