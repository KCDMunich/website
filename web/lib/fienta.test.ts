import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { GET } from '@/app/api/fienta-event/route';

import { buildSnapshot, normalizeTickets } from './fienta';

const NOW = '2027-01-15T12:00:00Z';
const publicTicket = {
  id: 1,
  title: 'Regular ticket',
  description: 'Public admission',
  price: '119.00',
  currency: 'EUR',
  ticket_limit: 100,
  tickets_sold: 20,
  visible_start: '2027-01-01T00:00:00Z',
  visible_end: '2027-02-01T00:00:00Z',
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(NOW));
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('public Fienta ticket visibility', () => {
  it('keeps the public ticket fields without changing prices or availability', () => {
    expect(normalizeTickets([publicTicket], 'EUR')).toEqual([
      {
        id: '1',
        title: 'Regular ticket',
        description: 'Public admission',
        price: 119,
        currency: 'EUR',
        isSoldOut: false,
        isOnSale: true,
        amountLeft: 80,
        salesEnd: publicTicket.visible_end,
      },
    ]);
  });

  it.each(['test-access-code', ' '])('excludes a code-protected ticket', (code) => {
    const protectedTicket = { ...publicTicket, visible_code: code, is_on_sale: true };
    expect(normalizeTickets([protectedTicket], 'EUR')).toEqual([]);
  });

  it.each([undefined, null, ''])('allows a ticket without a visibility code', (code) => {
    const ticket = { ...publicTicket, visible_code: code };
    expect(normalizeTickets([ticket], 'EUR')).toHaveLength(1);
  });

  it.each([
    { visible_start: '2027-01-16T00:00:00Z' },
    { visible_end: '2027-01-14T00:00:00Z' },
    { visible_start: 'not-a-date' },
    { visible_end: 'not-a-date' },
  ])('excludes tickets outside a valid visibility window even when marked on sale', (window) => {
    const ticket = { ...publicTicket, ...window, is_on_sale: true };
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(normalizeTickets([ticket], 'EUR')).toEqual([]);
  });

  it('keeps tickets without date restrictions and at inclusive window boundaries', () => {
    expect(normalizeTickets([
      { ...publicTicket, visible_start: undefined, visible_end: undefined },
      { ...publicTicket, id: 2, visible_start: NOW },
      { ...publicTicket, id: 3, visible_end: NOW },
    ], 'EUR').map((ticket) => ticket.id)).toEqual(['1', '2', '3']);
  });

  it.each([
    { sales_start_date: '2027-01-16T00:00:00Z' },
    { salesStart: '2027-01-16T00:00:00Z' },
    { start_date: '2027-01-16T00:00:00Z' },
    { sales_end_date: '2027-01-14T00:00:00Z' },
    { salesEnd: '2027-01-14T00:00:00Z' },
    { end_date: '2027-01-14T00:00:00Z' },
  ])('applies the same restrictions to supported date aliases', (window) => {
    const ticket = {
      ...publicTicket,
      visible_start: undefined,
      visible_end: undefined,
      ...window,
    };
    expect(normalizeTickets([ticket], 'EUR')).toEqual([]);
  });

  it('filters embedded ticket lists before building a public snapshot', () => {
    const event = {
      title: 'Public event',
      ticket_types: [
        publicTicket,
        { ...publicTicket, id: 2, title: 'Private admission', visible_code: 'test-access-code' },
      ],
    };
    expect(buildSnapshot(event, 'en', 'https://fienta.com/example').tickets)
      .toEqual(normalizeTickets([publicTicket], 'EUR', 'en'));
  });
});

describe('public Fienta API response', () => {
  it('does not serialize protected ticket data or cache authenticated snapshots', async () => {
    vi.stubEnv('FIENTA_EVENT_ID', '201687');
    vi.stubEnv('FIENTA_API_KEY', 'test-only-api-token');
    vi.stubEnv('FIENTA_BASE_URL', 'https://fienta.com/api/v1');
    vi.stubEnv('FIENTA_LOCALE', 'en');

    const fetchMock = vi.fn()
      .mockResolvedValueOnce(Response.json({
        data: { id: 201687, title: 'Public event', url: 'https://fienta.com/example' },
      }))
      .mockResolvedValueOnce(Response.json({
        data: [
          publicTicket,
          {
            ...publicTicket,
            id: 2,
            title: 'Private admission',
            description: 'Internal offer',
            visible_code: 'test-access-code',
          },
          { ...publicTicket, id: 3, title: 'Future admission', visible_start: '2027-02-01T00:00:00Z' },
          { ...publicTicket, id: 4, title: 'Expired admission', visible_end: '2026-12-01T00:00:00Z' },
        ],
      }));
    vi.stubGlobal('fetch', fetchMock);

    const response = await GET();
    const payload = await response.json();
    const serialized = JSON.stringify(payload);

    expect(response.status).toBe(200);
    expect(payload.tickets).toEqual(normalizeTickets([publicTicket], 'EUR', 'en'));
    for (const privateValue of [
      'test-only-api-token', 'test-access-code', 'Private admission', 'Internal offer',
      'Future admission', 'Expired admission', 'visible_code', 'ticket_limit', 'tickets_sold',
    ]) {
      expect(serialized).not.toContain(privateValue);
    }
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(fetchMock).toHaveBeenCalledTimes(2);
    for (const [, options] of fetchMock.mock.calls) {
      expect(options).toMatchObject({ cache: 'no-store' });
      expect(options).not.toHaveProperty('next');
    }
  });
});
