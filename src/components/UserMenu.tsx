import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export default function UserMenu() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };

    if (status === 'loading') {
        return (
            <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <Link href="/signin">
                <Button variant="outline" size="sm">
                    Sign In
                </Button>
            </Link>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={toggleMenu}
                className="flex items-center space-x-2 focus:outline-none"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {session?.user?.image ? (
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                        <Image
                            src={session.user.image}
                            alt={session.user.name || 'User'}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <FaUser className="h-4 w-4" />
                    </div>
                )}
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={closeMenu}
                        aria-hidden="true"
                    ></div>
                    <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1 px-2">
                            <div className="border-b border-border px-4 py-3">
                                <p className="text-sm font-medium">{session?.user?.name}</p>
                                <p className="truncate text-xs text-muted-foreground">
                                    {session?.user?.email}
                                </p>
                            </div>
                            <div className="py-1">
                                <Link
                                    href="/settings"
                                    className="flex w-full items-center px-4 py-2 text-sm hover:bg-muted rounded-md"
                                    onClick={closeMenu}
                                >
                                    <FaCog className="mr-2 h-4 w-4" />
                                    Settings
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-muted rounded-md"
                                >
                                    <FaSignOutAlt className="mr-2 h-4 w-4" />
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
} 