import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../lib/utils';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                    ? "bg-brand-dark/80 backdrop-blur-md border-white/10 py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-cyan to-blue-600 flex items-center justify-center text-black font-bold font-display group-hover:animate-pulse">
                        V
                    </div>
                    <span className="font-display font-bold text-white tracking-wider">
                        ViraLogic <span className="text-brand-cyan">AI</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm text-gray-400 hover:text-brand-cyan transition-colors">Features</a>
                    <a href="#demo" className="text-sm text-gray-400 hover:text-brand-cyan transition-colors">Demo</a>
                    <a href="#pricing" className="text-sm text-gray-400 hover:text-brand-cyan transition-colors">Pricing</a>
                </div>

                {/* CTA */}
                <div className="hidden md:block">
                    <Button variant="cyber" size="sm" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                        <Rocket className="w-4 h-4" />
                        Start Viral
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-brand-dark border-b border-white/10 p-4 md:hidden flex flex-col gap-4">
                    <a href="#features" className="text-gray-400 hover:text-brand-cyan" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
                    <a href="#demo" className="text-gray-400 hover:text-brand-cyan" onClick={() => setIsMobileMenuOpen(false)}>Demo</a>
                    <a href="#pricing" className="text-gray-400 hover:text-brand-cyan" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
                    <Button variant="cyber" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                        Get Access
                    </Button>
                </div>
            )}
        </nav>
    );
};
