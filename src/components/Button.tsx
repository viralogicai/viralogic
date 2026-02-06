import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'cyber';
  isPurchase?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      className = '',
      variant = 'primary',
      isPurchase = false,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // 🔥 BẮN ADD TO CART CHỈ KHI LÀ NÚT MUA
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
        className={className}
        data-variant={variant}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
