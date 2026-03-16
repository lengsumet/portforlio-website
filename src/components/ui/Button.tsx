import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: Variant;
  size?: Size;
}

const styles: Record<Variant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--accent)',
    color: 'oklch(12% 0.012 250)',
    border: 'none',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: 'var(--text-2)',
    border: '1px solid var(--border-mid)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--text-3)',
    border: '1px solid transparent',
  },
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', style, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-opacity duration-150 ${sizes[size]} ${className}`}
        style={{
          fontFamily: 'var(--font-body)',
          ...styles[variant],
          ...style,
        }}
        whileHover={{ opacity: 0.85 }}
        whileTap={{ scale: 0.97 }}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
