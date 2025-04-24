import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soko Yetu AI',
  description: 'Connecting Kenyan farmers and buyers with AI-powered insights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className="font-leonetta">{children}</body>
    </html>
  );
}