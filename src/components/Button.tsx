import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost' | 'cyber';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "relative inline-flex items-center justify-center font-display font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none group overflow-hidden",
                    {
                        // Size variants
                        "text-xs px-3 py-1.5": size === 'sm',
                        "text-sm px-6 py-3": size === 'md',
                        "text-base px-8 py-4": size === 'lg',

                        // Style variants
                        "bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink text-white hover:opacity-90 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] border-none": variant === 'primary',
                        "border border-white/20 text-white hover:border-brand-purple/50 hover:bg-white/5": variant === 'outline',
                        "text-gray-400 hover:text-white": variant === 'ghost',

                        // Cyber variant (Special)
                        "bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/50 hover:bg-brand-cyan hover:text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]": variant === 'cyber',
                    },
                    className
                )}
                {...props}
            >
                <span className="relative z-10 flex items-center gap-2">{children}</span>
                {variant === 'cyber' && (
                    <div className="absolute inset-0 bg-brand-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';
