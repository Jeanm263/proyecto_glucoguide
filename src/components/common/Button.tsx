import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import '../../index.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'error';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary';
  
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
    secondary: 'bg-secondary hover:bg-secondary-dark text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'bg-transparent text-primary hover:bg-blue-50',
    success: 'bg-success hover:bg-green-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
    error: 'bg-error hover:bg-red-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const disabledClass = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`;
  
  return (
    <button 
      className={classes} 
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="loading-spinner mr-2"></div>
          <span>Procesando...</span>
        </div>
      ) : children}
    </button>
  );
};

export default Button;