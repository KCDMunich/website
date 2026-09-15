import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';

import * as sponsorData from '@/lib/sponsors-data';
import { Sponsors } from './sponsors';

vi.mock('@/components/layout/motion-reveal', () => ({
  MotionReveal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

afterEach(() => vi.restoreAllMocks());

describe('sponsor edition display', () => {
  it.each(['recruiting', 'closed'] as const)(
    'keeps the empty 2027 list hidden and the archive visible in %s mode',
    (phase) => {
      const html = renderToStaticMarkup(<Sponsors phase={phase} />);

      expect(html).toContain('id="sponsors"');
      expect(html).toContain('id="sponsors-2026-title"');
      expect(html).toContain('2026 partners');
      expect(html).toContain('aria-label="Broadcom"');
      expect(html).not.toContain('sponsors-2027-title');
      expect(html).not.toContain('2027 partners');
      expect(html).not.toContain('>Bronze<');
      expect(html).not.toContain('>Evening Event<');
      expect(html.includes('Help shape the next CNS Munich')).toBe(phase === 'recruiting');
      if (phase === 'recruiting') {
        expect(html.indexOf('Sponsor prospectus')).toBeLessThan(
          html.indexOf('id="sponsors-2026-title"')
        );
      }
    }
  );

  it.each(['recruiting', 'closed'] as const)(
    'shows confirmed upcoming partners separately from the archive in %s mode',
    (phase) => {
      const getSponsors = sponsorData.getSponsorsForEdition;
      vi.spyOn(sponsorData, 'getSponsorsForEdition').mockImplementation((edition) =>
        edition === 2027
          ? [
              {
                name: 'Confirmed partner',
                icon: '/icons-src/example.svg',
                url: 'https://example.com',
                tier: 'gold',
              },
            ]
          : getSponsors(edition)
      );

      const html = renderToStaticMarkup(<Sponsors phase={phase} />);
      const [, upcoming, archive] = html.split('<div role="group"');

      expect(upcoming).toContain('2027 partners');
      expect(upcoming).toContain('aria-label="Confirmed partner"');
      expect(upcoming).not.toContain('aria-label="Broadcom"');
      expect(archive).toContain('2026 partners');
      expect(archive).toContain('aria-label="Broadcom"');
      expect(archive).not.toContain('aria-label="Confirmed partner"');
      expect(html.includes('Help shape the next CNS Munich')).toBe(phase === 'recruiting');
      if (phase === 'recruiting') {
        expect(html.indexOf('Sponsor prospectus')).toBeLessThan(
          html.indexOf('id="sponsors-2027-title"')
        );
      }
    }
  );
});
