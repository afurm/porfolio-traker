import React from 'react';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const landingPageType = process.env.NEXT_PUBLIC_LANDING_PAGE || 'main';

  // Check if we're on the index page and the landing page type is "coming-soon"
  const isComingSoonPage = router.pathname === '/' && landingPageType === 'coming-soon';

  // Don't show header and footer on the coming soon page
  if (isComingSoonPage) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen bg-background font-sans antialiased">
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto py-6 px-4">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
