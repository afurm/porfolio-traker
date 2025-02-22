import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ThemeToggle } from '@/components/ThemeToggle';
import { fadeIn } from '@/animations/framer';

export function NavBar() {
    return (
        <motion.header
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                        <Icon name="BarChart2" className="h-6 w-6 text-primary" />
                        CryptoTracker
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/portfolio"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Portfolio
                        </Link>
                        <Link
                            href="/transactions"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Transactions
                        </Link>
                        <Link
                            href="/analytics"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Analytics
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                        aria-label="Notifications"
                    >
                        <Icon name="Bell" className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                            2
                        </span>
                    </Button>
                    <ThemeToggle />
                    <Button asChild>
                        <Link href="/portfolio">
                            <Icon name="Plus" className="mr-2 h-4 w-4" />
                            Add Asset
                        </Link>
                    </Button>
                </div>
            </div>
        </motion.header>
    );
} 