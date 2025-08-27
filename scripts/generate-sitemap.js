const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');
const config = require('../src/config/website.json');

const BASE_URL = config.general.event.website;

async function getStaticPages() {
    // Updated list based on your build output
    return [
        '/',
        '/agenda',
        '/content-hub',
        '/speakers',
        '/sponsors',
        '/team',
        '/code-of-conduct', // Assuming you have this page
    ];
}

async function getDynamicPages(directory, prefix = '') {
    try {
        const fullPath = path.join(process.cwd(), 'src', 'config', directory);
        const files = await fs.readdir(fullPath);
        return files
            .filter(file => file.endsWith('.md') || file.endsWith('.json'))
            .map(file => `${prefix}/${file.replace(/\.md|\.json/, '')}`);
    } catch (error) {
        console.warn(`Warning: Could not read directory ${directory}. Skipping.`);
        return [];
    }
}

async function getTalkPages() {
    const talksByYearDir = path.join(process.cwd(), 'src', 'config', 'talks');
    const allTalks = [];
    try {
        const years = await fs.readdir(talksByYearDir);
        for (const year of years) {
            const talksDir = path.join(talksByYearDir, year);
            const talkFiles = await fs.readdir(talksDir);
            for (const talkFile of talkFiles.filter(f => f.endsWith('.md'))) {
                const talkContent = await fs.readFile(path.join(talksDir, talkFile), 'utf8');
                const { data } = matter(talkContent);
                if (data.id) {
                    allTalks.push(`/talk/${data.id}`);
                }
            }
        }
    } catch (error) {
        console.warn(`Warning: Could not read talks directory. Skipping.`);
    }
    return allTalks;
}

async function generateSitemap() {
    console.log("Generating sitemap...");

    const staticPages = await getStaticPages();
    const editionPages = await getDynamicPages('editions');
    // Corrected the prefix from '/profiles' to '/profile'
    const profilePages = await getDynamicPages('profiles', '/profile');
    const talkPages = await getTalkPages();

    const allUrls = [
        ...staticPages,
        ...editionPages,
        ...profilePages,
        ...talkPages
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls.map(url => `
    <url>
        <loc>${BASE_URL}${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${url === '/' ? '1.0' : '0.8'}</priority>
    </url>`).join('')}
</urlset>`;

    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    await fs.writeFile(sitemapPath, sitemap, 'utf8');

    console.log(`✅ Sitemap generated successfully at ${sitemapPath}`);
}

generateSitemap();
