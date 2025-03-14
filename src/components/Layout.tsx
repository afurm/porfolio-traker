import React from 'react';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { Toaster } from '@/components/ui/toaster';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-background font-sans antialiased">
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto py-6 px-4">{children}</div>
        </main>
        <Footer />
        <Toaster />
      </div>
    </div>
  );
}
