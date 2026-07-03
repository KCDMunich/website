import fs from "fs";
import path from "path";

import matter from "gray-matter";

const STATIC_PAGES_DIR = path.join(process.cwd(), "content/static-pages");

export type StaticPageFrontmatter = {
  title: string;
  slug: string;
};

export type StaticPage = StaticPageFrontmatter & {
  content: string;
};

export function getStaticPageSlugs(): string[] {
  if (!fs.existsSync(STATIC_PAGES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(STATIC_PAGES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(STATIC_PAGES_DIR, file), "utf8");
      const { data } = matter(raw);
      return data.slug as string;
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
    const { data, content } = matter(raw);

    if (data.slug === slug) {
      return {
        title: data.title as string,
        slug: data.slug as string,
        content,
      };
    }
  }

  return null;
}