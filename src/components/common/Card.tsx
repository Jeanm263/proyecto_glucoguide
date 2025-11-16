import React from 'react';
import type { HTMLAttributes } from 'react';
import '../../index.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary';
  hoverable?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  hoverable = false,
  shadow = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded-xl transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-surface',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
  };
  
  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  };
  
  const hoverClass = hoverable ? 'hover:shadow-lg transform hover:-translate-y-1' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${shadowClasses[shadow]} ${hoverClass} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;