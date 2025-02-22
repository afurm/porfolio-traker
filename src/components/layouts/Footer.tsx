import React from 'react';
import Link from 'next/link';
import { Icon, type IconName } from '@/components/ui/icon';

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://twitter.com', icon: 'Twitter' as IconName, label: 'Twitter' },
  { href: 'https://discord.com', icon: 'MessageCircle' as IconName, label: 'Discord' },
  { href: 'https://github.com', icon: 'Github' as IconName, label: 'GitHub' },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col gap-4 py-6 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-1 items-center justify-center gap-4 md:justify-start">
          <Link
            href="/"
            className="flex items-center space-x-2 text-sm font-medium hover:text-foreground/80"
          >
            <Icon name="Wallet" className="h-6 w-6" />
            <span>Crypto Portfolio</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <nav className="flex items-center justify-center gap-4 md:justify-end">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name={link.icon} className="h-4 w-4" />
                <span className="sr-only">{link.label}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
}
