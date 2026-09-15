import { describe, expect, it } from 'vitest';

import { getSponsorsForEdition, sponsorsByEdition } from './sponsors-data';

describe('sponsors by edition', () => {
  it('preserves the 2026 archive without presenting it as confirmed 2027 partners', () => {
    const archive = getSponsorsForEdition(2026);

    expect(archive).toHaveLength(19);
    expect(archive).toContainEqual(expect.objectContaining({ name: 'Broadcom', tier: 'platinum' }));
    expect(getSponsorsForEdition(2027)).toEqual([]);
  });

  it('sorts each edition by name without mutating its configuration', () => {
    const original = [...sponsorsByEdition[2026]!];
    const sorted = getSponsorsForEdition(2026);

    expect(sorted).toEqual([...original].sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    ));
    expect(sponsorsByEdition[2026]).toEqual(original);
    expect(sorted).not.toBe(sponsorsByEdition[2026]);
  });

  it('rejects missing editions rather than reusing the archive', () => {
    expect(() => getSponsorsForEdition(2028)).toThrow(
      'Missing sponsor configuration for edition 2028.'
    );
  });
});
