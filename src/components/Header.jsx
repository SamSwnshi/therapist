import Link from 'next/link'
import React from 'react'
import { AudioLines } from 'lucide-react';
import Themetoggle from './Theme-toggle';
const Header = () => {

    const navItems = [
        { href: "/features", label: "Features" },
        { href: "/about", label: "About Aura" }
    ]
    return (
        <div className="w-full fixed top-0 z-50 bg-gray-100 shadow-md  backdrop-blur-md">
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
                            <ThemeToogle/>
                            <SignInButton/>
                        </div>
                    </div>
                </div>
            </header>

        </div>
    );
};

export default Header;
