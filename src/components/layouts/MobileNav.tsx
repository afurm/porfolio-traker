import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, type IconName } from '@/components/ui/icon';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: 'LayoutDashboard' as IconName },
  { href: '/portfolio', label: 'Portfolio', icon: 'PieChart' as IconName },
  { href: '/transactions', label: 'Transactions', icon: 'ArrowLeftRight' as IconName },
  { href: '/market', label: 'Market', icon: 'LineChart' as IconName },
  { href: '/analytics', label: 'Analytics', icon: 'BarChart2' as IconName },
  { href: '/alerts', label: 'Alerts', icon: 'Bell' as IconName },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 z-50 h-full w-3/4 border-l border-border/40 bg-background p-6 shadow-xl"
          >
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2" onClick={onClose}>
                  <Icon name="Wallet" className="h-6 w-6 text-primary" />
                  <span className="font-bold">Crypto Portfolio</span>
                </Link>
                <button onClick={onClose} className="text-foreground/60 hover:text-foreground">
                  <Icon name="X" className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center space-x-2 text-sm font-medium transition-colors hover:text-foreground/80',
                      router.pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                    )}
                  >
                    <Icon name={item.icon} className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}

                {/* Settings link */}
                <Link
                  href="/settings"
                  onClick={onClose}
                  className={cn(
                    'flex items-center space-x-2 text-sm font-medium transition-colors hover:text-foreground/80',
                    router.pathname === '/settings' ? 'text-foreground' : 'text-foreground/60'
                  )}
                >
                  <Icon name="Settings" className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </nav>

              {/* Theme toggle in mobile menu */}
              <div className="mt-auto pt-4 border-t border-border/40">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground/60">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
