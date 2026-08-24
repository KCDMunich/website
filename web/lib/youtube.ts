const YOUTUBE_PRIVACY_EMBED_ORIGIN = 'https://www.youtube-nocookie.com';

export function buildYouTubeEmbedUrl(videoId: string) {
  const url = new URL(`/embed/${videoId}`, YOUTUBE_PRIVACY_EMBED_ORIGIN);

  url.searchParams.set('rel', '0');
  url.searchParams.set('color', 'white');

  return url.toString();
}
