import React from 'react';
import type { InputHTMLAttributes } from 'react';
import '../../index.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'filled';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  fullWidth = false,
  variant = 'default',
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-0';
  
  const variantClasses = {
    default: 'bg-white border-border',
    filled: 'bg-gray-50 border-transparent',
  };
  
  const errorClass = error ? 'border-error focus:border-error' : 'focus:border-primary';
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${errorClass} ${widthClass} ${className}`;
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={classes}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;