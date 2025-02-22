import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const menuItems = [
    { href: '/portfolio', label: 'Portfolio', icon: 'BarChart2' },
    { href: '/transactions', label: 'Transactions', icon: 'RefreshCcw' },
    { href: '/analytics', label: 'Analytics', icon: 'PieChart' },
    { href: '/settings', label: 'Settings', icon: 'Settings' },
];

export function MobileNav() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label="Open menu"
                >
                    <Icon name="Menu" className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <div className="flex flex-col h-full">
                    <div className="border-b p-4">
                        <Link
                            href="/portfolio"
                            className="flex items-center gap-2 text-lg font-bold"
                            onClick={() => setIsOpen(false)}
                        >
                            <Icon name="BarChart2" className="h-6 w-6 text-primary" />
                            CryptoTracker
                        </Link>
                    </div>
                    <nav className="flex-1 p-4">
                        <AnimatePresence>
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Icon name={item.icon} className="h-5 w-5" />
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </nav>
                </div>
            </SheetContent>
        </Sheet>
    );
} 