const GALLERY_SHARE_ID = "7314e896be5b4c22b8365cfa07e42487";
const GALLERY_ALBUM_ID = "a8cfb749ffbe4f1690defdf63dae0a32";
const API_KEY = "LightroomMobileWeb1";

export const GALLERY_2026_URL = `https://lightroom.adobe.com/shares/${GALLERY_SHARE_ID}`;

const GALLERY_API = `https://lightroom.adobe.com/v2/spaces/${GALLERY_SHARE_ID}/albums/${GALLERY_ALBUM_ID}/assets?embed=asset&subtype=image&limit=100`;

export type GalleryImage = {
  src: string;
  alt: string;
};

/** Curated fallback if the Lightroom API is unavailable at build time. */
const FALLBACK_IMAGES: GalleryImage[] = [
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/5398b1664f4844c1bc7b436738beafc0/revisions/b5d02cfae53546b7a2ffee3a5f9b04de/renditions/dffe31d0272c0a57534e4202051a10b1?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 conference moment",
  },
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/41be6991facd4bde9f985989a07e3ead/revisions/dbfecdc8eafb4b9b9b291c74bf1b0544/renditions/962320c7b57172afa65cf0de66d1d355?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 audience",
  },
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/f87db546251c44549227eba6cbeb396d/revisions/77e82dad0cf4403c8cc5112b1c1d8945/renditions/775d1b9a65d371b420265ffcf1302fdb?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 speaker on stage",
  },
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/0f8ffd4c3d544dde8f3efc365177f434/revisions/4e55c9d4465548008ddcf43c14e779ef/renditions/59727dfec1b46114f117c4ce99c97057?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 networking",
  },
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/73fdc8021776449db8e2364477640aec/revisions/a949fbe9c64042e797ec2d73c70f96a5/renditions/fd6e0c919e00b7b36ba7d9020e179fda?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 venue atmosphere",
  },
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/dcb7434536fe4637bcbf8aa5951d3ad0/revisions/c8fb724d62994dbaaebda4cc21142e0c/renditions/d4afbb9f2c292b83b9d983ccaa95771f?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 community",
  },
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/77bf66d76034471a9099a838f54e7d68/revisions/27dacc4f6eb84dea8809fa3ab25a7836/renditions/301dfc9470abf4f552cbee2b56487e56?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 session",
  },
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/6ee55dc8d6324881a16266d75a36c831/revisions/7108a45aa2c64078ac96c209f3b0160b/renditions/45703ae7a77845acc062c87477af8319?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 attendees",
  },
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/1e28f5abf00642858257917d687510ce/revisions/cfaa4b27f76e4f6196a31649303ec9d6/renditions/e334899cb2a49a1b646ad533a6f53d6e?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 event highlight",
  },
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/5f2649211d194c658dc2f7ba14edd4e2/revisions/70d5d305588f4158a18788ed01a05ac5/renditions/9122b19098f3d7fbab5053a00807b592?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 summit moment",
  },
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/a78de46023e84c9cbadb3294e0bad42d/revisions/66d7168bbb5647bab59f217c2c68c5cb/renditions/3f09d55b38399c39c645b348c798f484?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 event photo",
  },
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/c86d273b470842ba9566a9c3440b34d0/revisions/edb013bd5cfa4d07bf5f47b4f1f06662/renditions/631972049db56105500dc269aa8e3749?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 conference photo",
  },
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/078bec8ec05045799ab4d98a1a27db14/revisions/68fa117b1f4f4a618d39c81baa074b74/renditions/496bee991f10aafa471e355f3a0e04db?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 workshop",
  },
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/316c532b96354098a93841fe032ee4dc/revisions/3be11522084d4d4f9154a6665b2c5229/renditions/bc88c15ed2e7cf5685f314400dcce2f0?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 hallway track",
  },
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/3eec17d7b48943fdb28c2121d9f7d4df/revisions/7e92bfd3fe844d3a9f7d6035eb81c6d9/renditions/a733b83317fc224b3fb4c5e6c4f4c42e?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 crowd",
  },
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/6c765a04852e455f8f7fe082599b892e/revisions/dba8b8538afa4743ab989db09a3311ba/renditions/0d45ec22b106b1fdef4a6c1b66aec54d?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 stage moment",
  },
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/a04d4e22b33a4839965abb0861704359/revisions/2afbf41972304542932619c5b8a89548/renditions/a446a85144d2c4ff75a369ae95f00c57?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 networking moment",
  },
  {
    src: "https://photos.adobe.io/v2/spaces/7314e896be5b4c22b8365cfa07e42487/assets/b0c7ba18563d487e83cb99ce17a9b1e6/revisions/59a9ed16c93544d0affdcd1ed890897c/renditions/ca1a64c2a088241e3331d5c951cc12ee?api_key=LightroomMobileWeb1",
    alt: "CNS Munich 2026 community photo",
  },
];

type LightroomAssetResponse = {
  base?: string;
  resources?: Array<{
    asset?: {
      links?: Record<string, { href?: string }>;
      payload?: {
        importSource?: {
          fileName?: string;
        };
      };
    };
  }>;
};

function parseLightroomJson(raw: string): LightroomAssetResponse {
  const cleaned = raw.replace(/^while \(1\) \{\}\s*/, "");
  return JSON.parse(cleaned) as LightroomAssetResponse;
}

/** Collage tiles are ~160–420px wide — 640px covers 2× retina without over-fetching. */
const COLLAGE_RENDITION_KEYS = [
  "/rels/rendition_type/640",
  "/rels/rendition_type/1280",
] as const;

function shuffleGalleryImages<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/** Random subset for the collage — intended for client-side use after hydration. */
export function pickRandomGalleryImages(
  images: GalleryImage[],
  count: number
): GalleryImage[] {
  return shuffleGalleryImages(images).slice(0, Math.min(count, images.length));
}

export async function fetchGallery2026Pool(): Promise<GalleryImage[]> {
  try {
    const response = await fetch(GALLERY_API, {
      headers: { Accept: "application/json" },
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return FALLBACK_IMAGES;
    }

    const data = parseLightroomJson(await response.text());
    const base = data.base ?? "";
    const images: GalleryImage[] = [];

    for (const resource of data.resources ?? []) {
      const asset = resource.asset;
      const href = COLLAGE_RENDITION_KEYS.map(
        (key) => asset?.links?.[key]?.href
      ).find(Boolean);

      if (!href) continue;

      const fileName = asset?.payload?.importSource?.fileName ?? "CNS Munich 2026";
      images.push({
        src: `${base}${href}?api_key=${API_KEY}`,
        alt: `${fileName.replace(/\.[^.]+$/, "").replace(/[_-]/g, " ")} at CNS Munich 2026`,
      });
    }

    return images.length > 0 ? images : FALLBACK_IMAGES;
  } catch {
    return FALLBACK_IMAGES;
  }
}

export type CollagePlacement = {
  top: string;
  left: string;
  width: string;
  aspect: string;
  rotate: number;
  zIndex: number;
};

/** Organic mood-board layout — percentages relative to the aspect-ratio collage box */
export const COLLAGE_PLACEMENTS: CollagePlacement[] = [
  // Top row
  { top: "4%", left: "4%", width: "15%", aspect: "4/5", rotate: -7, zIndex: 2 },
  { top: "0%", left: "18%", width: "16%", aspect: "3/4", rotate: 5, zIndex: 4 },
  { top: "0%", left: "38%", width: "20%", aspect: "3/4", rotate: 2, zIndex: 6 },
  { top: "6%", left: "63%", width: "16%", aspect: "4/5", rotate: -5, zIndex: 3 },
  { top: "2%", left: "78%", width: "15%", aspect: "3/4", rotate: 6, zIndex: 3 },
  // Bottom row
  { top: "44%", left: "4%", width: "16%", aspect: "3/4", rotate: 4, zIndex: 5 },
  { top: "48%", left: "19%", width: "15%", aspect: "5/4", rotate: -6, zIndex: 4 },
  { top: "42%", left: "38%", width: "16%", aspect: "3/4", rotate: 3, zIndex: 4 },
  { top: "48%", left: "63%", width: "15%", aspect: "5/4", rotate: 6, zIndex: 4 },
  { top: "44%", left: "77%", width: "16%", aspect: "3/4", rotate: -4, zIndex: 5 },
];