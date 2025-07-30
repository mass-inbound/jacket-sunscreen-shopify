import {forwardRef} from 'react';
import {Link} from 'react-router';

export interface ButtonProps {
  as?: 'button' | 'a' | 'Link';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  to?: string;
  variant?: 'primary' | 'secondary' | 'inline';
  size?: 'sm' | 'md' | 'lg';
  [key: string]: any;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({as = 'button', children, className = '', variant = 'primary', size = 'md', ...props}, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variants = {
      primary: 'bg-[#FBAC18] text-white hover:bg-[#e69b15] focus:ring-[#FBAC18]',
      secondary: 'bg-white text-[#FBAC18] border border-[#FBAC18] hover:bg-[#FBAC18] hover:text-white focus:ring-[#FBAC18]',
      inline: 'bg-transparent text-[#FBAC18] hover:underline focus:ring-[#FBAC18]',
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };
    
    const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
    
    if (as === 'Link' && props.to) {
      return (
        <Link {...props} className={styles} ref={ref}>
          {children}
        </Link>
      );
    }
    
    if (as === 'a') {
      return (
        <a {...props} className={styles} ref={ref}>
          {children}
        </a>
      );
    }
    
    return (
      <button {...props} className={styles} ref={ref}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button'; 