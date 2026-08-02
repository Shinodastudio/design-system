import type { Metadata } from 'next';
import './globals.css';
import { ClientShell } from '@/providers/ClientShell';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Footer } from '@/components/layout/Footer';
import { ContentPeel } from '@/components/layout/ContentPeel';
import { Nav } from '@/components/nav/Nav';
import { SkipLink } from '@/components/nav/SkipLink';

export const metadata: Metadata = {
  title: 'Shinoda Design System',
  description: 'React component library and catalogue for the Shinoda brand system.',
  // Private studio reference — kept out of every index, cache, and preview.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  referrer: 'no-referrer',
};

function ThemeScript(): React.ReactElement {
  const script = `
    (function(){
      var s = localStorage.getItem('shinoda-theme');
      var t = (s==='dark'||s==='light') ? s : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', t);
    })();
  `.trim();
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <ClientShell>
          <SkipLink />
          <Nav />
          <ContentPeel />
          <PageWrapper>
            {children}
          </PageWrapper>
          <Footer />
        </ClientShell>
      </body>
    </html>
  );
}
