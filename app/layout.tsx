import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Brew Haven | Coffee & Good Company', description: 'An all-day neighbourhood café.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
