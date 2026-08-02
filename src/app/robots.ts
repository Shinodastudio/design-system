import type { MetadataRoute } from 'next';

/**
 * robots.txt — the catalogue is a private studio reference, not a public site.
 *
 * Blanket disallow for every well-behaved crawler (search engines and the
 * declared AI/LLM scrapers alike). Crawlers that ignore robots.txt are also
 * met with `X-Robots-Tag: noindex` on every response (see next.config.ts)
 * and a `<meta name="robots">` noindex in the document head.
 *
 * No sitemap is published, by design.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
  };
}
