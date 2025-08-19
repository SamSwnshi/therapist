'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { AudioLines, LogOut, Menu, MessageCircle, X } from 'lucide-react';
import ThemeToggle from '@/components/Themetoggle';
import SignInButton from './auth/sign-in';
import { Button } from './ui/button';
import { useSession } from "@/lib/contexts/session-context";


const Header = () => {
    const { isAuthenticated, logout, user } = useSession();
    console.log("Header: Auth state:", { isAuthenticated, user });
    const navItems = [
        { href: "/features", label: "Features" },
        { href: "/about", label: "About Aura" }
    ]
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <div className="w-full fixed top-0 z-50 bg-gray-100 dark:bg-[#0000] border-b border-gray-300 dark:border-gray-600 shadow-lg dark:shadow-gray-700/60 backdrop-blur-md">
            <header className="relative max-w-7xl mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
                        <AudioLines className="h-7 w-7 animate-pulse" />
                        <div className="font-semibold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                            <span className="font-semibold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Aura3.0</span>
                        </div>
                    </Link>
                    <div className="flex items-center gap-4">
                        <nav className='hidden md:flex items-center space-x-1'>
                            {navItems.map((items) => {
                                return (
                                    <Link key={items.href} href={items.href} className='px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group'>
                                        {items.label}
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                                    </Link>
                                )
                            })}
                        </nav>
                        <div className='flex items-center gap-3'>
                            <ThemeToggle />
                            {isAuthenticated ? (
                                <>
                                    <Button
                                        asChild
                                        className="hidden md:flex gap-2 bg-primary/90 hover:bg-primary"
                                    >
                                        <Link href="/dashboard">
                                            <MessageCircle className="w-4 h-4 mr-1" />
                                            Start Chat
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={logout}
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Sign out
                                    </Button>
                                </>
                            ) : (
                                <SignInButton />
                            )}

                            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? (<X className='h-5 w-5' />) : (<Menu className='h-5 w-5' />)}</Button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden border-t border-primary/10">
                        <nav className="flex flex-col space-y-1 py-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-md transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            {isAuthenticated && (
                                <Button
                                    asChild
                                    className="mt-2 mx-4 gap-2 bg-primary/90 hover:bg-primary"
                                >
                                    <Link href="/dashboard">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>Start Chat</span>
                                    </Link>
                                </Button>
                            )}
                        </nav>
                    </div>
                )}
            </header>

        </div>
    );
};

export default Header;
