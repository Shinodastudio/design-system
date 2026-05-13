import type { Metadata } from 'next';
import './globals.css';
import { ClientShell } from '@/providers/ClientShell';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Nav } from '@/components/nav/Nav';

export const metadata: Metadata = {
  title: 'Shinoda Design System',
  description: 'React component library and catalogue for the Shinoda brand system.',
};

function ThemeScript(): React.ReactElement {
  const script = `
    (function(){
      var s = localStorage.getItem('shinoda-theme');
      if(s==='dark'||s==='light') document.documentElement.setAttribute('data-theme',s);
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
    <html lang="en">
      <head>
        <ThemeScript />
      </head>
      <body>
        <ClientShell>
          <Nav />
          <PageWrapper>
            {children}
          </PageWrapper>
        </ClientShell>
      </body>
    </html>
  );
}
