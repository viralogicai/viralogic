import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Rocket } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../lib/utils';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/0",
                isScrolled
                    ? "bg-brand-dark/80 backdrop-blur-md border-white/10 py-4 shadow-lg shadow-brand-purple/5"
                    : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-10 h-10 group-hover:scale-105 transition-transform duration-300 rounded-lg overflow-hidden">
                        <Image
                            src="/logo.png"
                            alt="ViraLogic AI Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <span className="font-display font-bold text-white tracking-wider">
                        ViraLogic <span className="text-gradient-brand">AI</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm text-gray-400 hover:text-brand-cyan transition-colors">Features</a>
                    <a href="#demo" className="text-sm text-gray-400 hover:text-brand-cyan transition-colors">Demo</a>
                    <a href="#pricing" className="text-sm text-gray-400 hover:text-brand-cyan transition-colors">Pricing</a>
                </div>

                {/* CTA */}
                <div className="flex items-center">
                    <div className="hidden md:block">
                        <Button variant="primary" size="sm" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                            <Rocket className="w-4 h-4" />
                            Start Viral
                        </Button>
                    </div>

                    <div className="md:hidden">
                        <Button variant="primary" size="sm" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                            <Rocket className="w-4 h-4" />
                            Start Viral
                        </Button>
                    </div>
                </div>
            </div>


        </nav>
    );
};
