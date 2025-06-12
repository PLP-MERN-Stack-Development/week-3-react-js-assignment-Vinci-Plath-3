import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  startIcon: StartIcon,
  endIcon: EndIcon,
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 disabled:opacity-60 disabled:pointer-events-none overflow-hidden';
  
  // Size variants
  const sizeClasses = {
    sm: 'text-xs px-3 h-8',
    md: 'text-sm px-4 h-10',
    lg: 'text-base px-6 h-12',
  };

  // Color variants
  const variantClasses = {
    // Primary
    primary: 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 focus:ring-indigo-500/50',
    // Secondary
    secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-400/50',
    // Danger
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/50',
    // Outline
    outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:ring-gray-400/50',
    // Ghost
    ghost: 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 focus:ring-gray-400/50',
    // Link
    link: 'text-indigo-500 dark:text-cyan-400 hover:underline p-0 h-auto',
  };

  // Full width
  const fullWidthClass = fullWidth ? 'w-full' : '';

  // Loading state
  const loadingClass = loading ? 'pointer-events-none' : '';

  return (
    <motion.button
      type="button"
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidthClass} ${loadingClass} ${className}`}
      disabled={disabled || loading}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {/* Loading overlay */}
      {loading && (
        <motion.span 
          className="absolute inset-0 flex items-center justify-center bg-inherit rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Loader2 className="w-5 h-5 animate-spin" />
        </motion.span>
      )}
      
      {/* Button content */}
      <span className={`flex items-center justify-center gap-2 transition-opacity ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {StartIcon && <StartIcon className="w-4 h-4" />}
        {children}
        {EndIcon && <EndIcon className="w-4 h-4" />}
      </span>
      
      {/* Ripple effect */}
      <span className="absolute inset-0 overflow-hidden">
        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </span>
    </motion.button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'outline', 'ghost', 'link']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  startIcon: PropTypes.elementType,
  endIcon: PropTypes.elementType,
  className: PropTypes.string,
};

export default Button;
