import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Icon, type IconName } from '@/components/ui/icon';
import { MobileNav } from '@/components/layouts/MobileNav';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: 'LayoutDashboard' as IconName },
  { href: '/portfolio', label: 'Portfolio', icon: 'PieChart' as IconName },
  { href: '/transactions', label: 'Transactions', icon: 'ArrowLeftRight' as IconName },
  { href: '/market', label: 'Market', icon: 'LineChart' as IconName },
  { href: '/analytics', label: 'Analytics', icon: 'BarChart2' as IconName },
  { href: '/alerts', label: 'Alerts', icon: 'Bell' as IconName },
];

export function Header() {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Icon name="Wallet" className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">Crypto Portfolio</span>
          </Link>

          <div className="flex items-center space-x-4">
            <nav className="hidden items-center space-x-6 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center text-sm font-medium transition-colors hover:text-foreground/80',
                    router.pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                  )}
                >
                  <Icon name={item.icon} className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              <Link
                href="/settings"
                className={cn(
                  'hidden md:flex items-center text-sm font-medium transition-colors hover:text-foreground/80',
                  router.pathname === '/settings' ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                <Icon name="Settings" className="h-4 w-4" />
              </Link>
              <button
                className="flex items-center space-x-2 md:hidden"
                onClick={() => setShowMobileMenu(true)}
              >
                <Icon name="Menu" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileNav isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </>
  );
}
