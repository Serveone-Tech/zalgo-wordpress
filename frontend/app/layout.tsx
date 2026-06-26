import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zalgo Infotech - WordPress & Web Development',
  description: 'Expert WordPress developers and custom web solutions for your business. Build stunning websites with Zalgo Infotech.',
  keywords: 'WordPress, Web Development, Web Design, E-commerce, Custom Development',
  authors: [{ name: 'Zalgo Infotech' }],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Zalgo Infotech - WordPress & Web Development',
    description: 'Expert WordPress developers and custom web solutions for your business.',
    type: 'website',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-950 text-white antialiased">
        <Navigation />
        <main className="min-h-[calc(100vh-64px-400px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
