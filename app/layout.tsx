import type { Metadata } from 'next';
import { Oswald, Roboto } from 'next/font/google';
import './globals.scss';

const oswald = Oswald({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
});

const roboto = Roboto({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nesine Case',
  description: 'Nesine case project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${oswald.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
