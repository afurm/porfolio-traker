import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/animations/framer';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="relative min-h-screen bg-background">
      <motion.main variants={fadeIn} initial="initial" animate="animate" className="container py-8">
        {children}
      </motion.main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex h-14 items-center justify-between">
          <p className="text-sm text-muted-foreground">Built with ❤️ by CryptoTracker Team</p>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="/terms" className="hover:underline underline-offset-4">
              Terms
            </a>
            <a href="/privacy" className="hover:underline underline-offset-4">
              Privacy
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
