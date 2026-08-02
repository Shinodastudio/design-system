import type { NextConfig } from 'next';

/**
 * Applied to every response — pages, images, fonts, and the RSC payload alike.
 *
 * `<meta name="robots">` only reaches crawlers that parse HTML; the header
 * reaches anything that issues an HTTP request, including asset scrapers.
 */
const NO_INDEX_DIRECTIVES = 'noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: NO_INDEX_DIRECTIVES },
          { key: 'Referrer-Policy', value: 'no-referrer' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ];
  },
};

export default nextConfig;
