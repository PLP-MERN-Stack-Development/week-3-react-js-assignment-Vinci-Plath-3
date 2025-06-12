import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, CheckCircle, Zap, Plus } from 'lucide-react';

const EmptyState = ({ filter }) => {
  let message = 'No tasks yet. Add one above!';
  let icon = <ClipboardList className="w-12 h-12 mb-4 text-blue-400" />;
  
  if (filter === 'active') {
    message = 'No active tasks. Enjoy your free time! 🎉';
    icon = <CheckCircle className="w-12 h-12 mb-4 text-green-400" />;
  } else if (filter === 'completed') {
    message = 'No completed tasks yet. Keep going! 💪';
    icon = <Zap className="w-12 h-12 mb-4 text-yellow-400" />;
  }

  // Split message into title and description
  const [title, ...description] = message.split('. ');

  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
        {title}
      </h3>
      {description.length > 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          {description.join('. ')}
        </p>
      )}
      <motion.div 
        className="mt-6 w-full max-w-xs h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </motion.div>
  );
};

export default EmptyState;
