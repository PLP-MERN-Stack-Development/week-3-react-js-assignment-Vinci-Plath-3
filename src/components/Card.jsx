import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Card = ({ 
  children, 
  className = '', 
  hoverable = false, 
  glow = false,
  variant = 'default', // 'default', 'gradient', 'bordered'
  ...props 
}) => {
  const { isDark } = useTheme();
  
  // Variant styles
  const variants = {
    default: {
      background: isDark 
        ? 'rgba(17, 24, 39, 0.7)' 
        : 'rgba(255, 255, 255, 0.7)',
      border: isDark 
        ? '1px solid rgba(255, 255, 255, 0.08)' 
        : '1px solid rgba(0, 0, 0, 0.05)',
    },
    gradient: {
      background: isDark
        ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(243, 244, 246, 0.9))',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    bordered: {
      background: isDark 
        ? 'rgba(17, 24, 39, 0.5)' 
        : 'rgba(255, 255, 255, 0.6)',
      border: isDark 
        ? '1px solid rgba(99, 102, 241, 0.3)' 
        : '1px solid rgba(99, 102, 241, 0.2)',
    },
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      whileHover={hoverable ? { 
        y: -4,
        boxShadow: glow 
          ? isDark 
            ? '0 10px 30px -10px rgba(99, 102, 241, 0.2)' 
            : '0 10px 30px -10px rgba(99, 102, 241, 0.3)'
          : '0 4px 20px rgba(0, 0, 0, 0.05)',
        transition: { duration: 0.3 }
      } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 25,
        mass: 0.5
      }}
      {...props}
    >
      {/* Glass background */}
      <motion.div 
        className="absolute inset-0 backdrop-blur-xl"
        style={{
          backgroundColor: currentVariant.background,
          border: currentVariant.border,
        }}
      />
      
      {/* Subtle gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        isDark 
          ? 'from-indigo-900/20 via-transparent to-cyan-900/20' 
          : 'from-indigo-50/30 via-transparent to-cyan-50/30'
      }`} />
      
      {/* Animated highlight on hover */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.6 }}
      >
        <div className={`absolute -inset-1 bg-gradient-to-r ${
          isDark 
            ? 'from-indigo-500/30 via-cyan-500/30 to-purple-500/30' 
            : 'from-indigo-200/50 via-cyan-200/50 to-purple-200/50'
        } blur-xl rounded-xl`} />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Subtle glow effect */}
      {glow && (
        <div className={`absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isDark 
            ? 'bg-gradient-to-r from-indigo-500/30 to-cyan-500/30' 
            : 'bg-gradient-to-r from-indigo-100/50 to-cyan-100/50'
        } blur-lg`} />
      )}
    </motion.div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hoverable: PropTypes.bool,
  glow: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'gradient', 'bordered']),
};

Card.defaultProps = {
  className: '',
  hoverable: true,
  glow: false,
  variant: 'default',
};

export default Card;
