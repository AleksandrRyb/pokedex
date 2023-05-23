import './globals.css';

import { Inter } from 'next/font/google';

import { ReduxProvider } from '../redux/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Pokedex App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
