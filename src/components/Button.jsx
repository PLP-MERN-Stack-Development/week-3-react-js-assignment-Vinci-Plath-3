import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Button component with different variants
 * @param {Object} props - Component props
 * @param {string} [variant='primary'] - Button variant (primary, secondary, danger, success, warning)
 * @param {string} [size='md'] - Button size (sm, md, lg)
 * @param {boolean} [disabled=false] - Whether the button is disabled
 * @param {function} [onClick=() => {}] - Click handler function
 * @param {React.ReactNode} children - Button content
 * @param {string} [className=''] - Additional CSS classes
 * @returns {JSX.Element} - Button component
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick = () => {},
  children,
  className = '',
  ...rest
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };
  
  // Combine all classes
  const buttonClasses = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
    disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]',
    className
  ].filter(Boolean).join(' ');

  // Handle click with disabled state
  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      type="button"
      className={buttonClasses}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      whileHover={!disabled ? { y: -1 } : {}}
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;