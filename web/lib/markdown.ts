import fs from "fs";
import path from "path";

const STATIC_PAGES_DIR = path.join(process.cwd(), "content/static-pages");

export type StaticPageFrontmatter = {
  title: string;
  slug: string;
};

export type StaticPage = StaticPageFrontmatter & {
  content: string;
};

function parseStaticPage(raw: string): StaticPage {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    throw new Error('Static page is missing a frontmatter block.');
  }

  const frontmatter = Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .map((line) => {
        const separatorIndex = line.indexOf(':');
        if (separatorIndex === -1) return null;

        const key = line.slice(0, separatorIndex).trim();
        const value = line
          .slice(separatorIndex + 1)
          .trim()
          .replace(/^(?:"([\s\S]*)"|'([\s\S]*)')$/, '$1$2');
        return key ? [key, value] : null;
      })
      .filter((entry): entry is [string, string] => entry !== null)
  );

  if (!frontmatter.title || !frontmatter.slug) {
    throw new Error('Static page frontmatter requires title and slug.');
  }

  return {
    title: frontmatter.title,
    slug: frontmatter.slug,
    content: raw.slice(match[0].length),
  };
}

export function getStaticPageSlugs(): string[] {
  if (!fs.existsSync(STATIC_PAGES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(STATIC_PAGES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(STATIC_PAGES_DIR, file), "utf8");
      return parseStaticPage(raw).slug;
    });
}

export function getStaticPageBySlug(slug: string): StaticPage | null {
  if (!fs.existsSync(STATIC_PAGES_DIR)) {
    return null;
  }

  const files = fs
    .readdirSync(STATIC_PAGES_DIR)
    .filter((file) => file.endsWith(".md"));

  for (const file of files) {
    const filePath = path.join(STATIC_PAGES_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const page = parseStaticPage(raw);

    if (page.slug === slug) {
      return page;
    }
  }

  return null;
}
