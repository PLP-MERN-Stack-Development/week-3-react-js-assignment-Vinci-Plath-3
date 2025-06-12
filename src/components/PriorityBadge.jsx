import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { PRIORITY } from '../hooks/useLocalStorageTasks';

const priorityStyles = {
  [PRIORITY.LOW]: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-200',
    border: 'border-green-200 dark:border-green-800',
    icon: '⬇️',
  },
  [PRIORITY.MEDIUM]: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-800 dark:text-yellow-200',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: '➡️',
  },
  [PRIORITY.HIGH]: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-800 dark:text-red-200',
    border: 'border-red-200 dark:border-red-800',
    icon: '⬆️',
  },
};

const PriorityBadge = ({ priority, className = '' }) => {
  // Ensure priority is a valid value, default to MEDIUM if not
  const safePriority = priority && Object.values(PRIORITY).includes(priority) 
    ? priority 
    : PRIORITY.MEDIUM;
    
  const style = priorityStyles[safePriority] || priorityStyles[PRIORITY.MEDIUM];
  
  // Safely get the display text for the priority
  const getDisplayText = (p) => {
    if (!p) return 'Medium';
    return typeof p === 'string' 
      ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()
      : 'Medium';
  };
  
  return (
    <motion.span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text} ${style.border} border ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <span className="mr-1">{style.icon}</span>
      {getDisplayText(safePriority)}
    </motion.span>
  );
};

PriorityBadge.propTypes = {
  priority: PropTypes.oneOf(Object.values(PRIORITY)).isRequired,
  className: PropTypes.string,
};

export default PriorityBadge;
