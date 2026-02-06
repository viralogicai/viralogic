import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'cyber';
  size?: 'sm' | 'md' | 'lg';
  isPurchase?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      className,
      variant = 'primary',
      size = 'md',
      isPurchase = false,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // 🔥 AddToCart – chỉ khi là nút mua
      if (
        isPurchase &&
        typeof window !== 'undefined' &&
        (window as any).ttq
      ) {
        try {
          (window as any).ttq.track('AddToCart', {
            content_id: 'starter',
            content_type: 'product',
            value: 199000,
            currency: 'VND',
          });
          console.log('AddToCart fired');
        } catch (err) {
          console.error('AddToCart error:', err);
        }
      }

      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          'relative inline-flex items-center justify-center font-display font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none',
          {
            // Size
            'text-xs px-3 py-1.5': size === 'sm',
            'text-sm px-6 py-3': size === 'md',
            'text-base px-8 py-4': size === 'lg',

            // Variant
            'bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-pink text-white hover:opacity-90':
              variant === 'primary',
            'border border-white/20 text-white hover:border-brand-purple/50 hover:bg-white/5':
              variant === 'outline',
            'text-gray-400 hover:text-white': variant === 'ghost',
            'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/50 hover:bg-brand-cyan hover:text-black':
              variant === 'cyber',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
