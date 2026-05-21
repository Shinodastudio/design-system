import type { Metadata } from 'next';
import './globals.css';
import { ClientShell } from '@/providers/ClientShell';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Footer } from '@/components/layout/Footer';
import { Nav } from '@/components/nav/Nav';

export const metadata: Metadata = {
  title: 'Shinoda Design System',
  description: 'React component library and catalogue for the Shinoda brand system.',
};

function ThemeScript(): React.ReactElement {
  const script = `
    (function(){
      var s = localStorage.getItem('shinoda-theme');
      var t = (s==='dark'||s==='light') ? s : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', t);
    })();
  `.trim();
  // eslint-disable-next-line react/no-danger
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
          <Nav />
          <PageWrapper>
            {children}
          </PageWrapper>
          <Footer />
        </ClientShell>
      </body>
    </html>
  );
}
