export const prerender = true;

const pages = ["/"];

export async function GET() {
  const siteUrl = "https://github-agent-system-test.pages.dev";

  const urlEntries = pages
    .map(
      (page) => `  <url>
    <loc>${siteUrl}${page}</loc>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
