import { describe, expect, it } from 'vitest';

import { buildYouTubeEmbedUrl } from './youtube';

describe('buildYouTubeEmbedUrl', () => {
  it('uses the privacy-enhanced origin allowed by the site CSP', () => {
    const url = new URL(buildYouTubeEmbedUrl('X9OH76DK6H8'));

    expect(url.origin).toBe('https://www.youtube-nocookie.com');
    expect(url.pathname).toBe('/embed/X9OH76DK6H8');
    expect(url.searchParams.get('rel')).toBe('0');
    expect(url.searchParams.get('color')).toBe('white');
  });
});
