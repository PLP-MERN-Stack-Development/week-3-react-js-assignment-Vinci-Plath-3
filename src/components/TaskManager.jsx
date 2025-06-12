import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { useLocalStorageTasks, PRIORITY } from '../hooks/useLocalStorageTasks';
import EmptyState from './EmptyState';
import PriorityBadge from './PriorityBadge';

const TaskManager = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useLocalStorageTasks();
  const [newTaskText, setNewTaskText] = useState('');
  const [priority, setPriority] = useState(PRIORITY.MEDIUM);
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      addTask(newTaskText, priority);
      setNewTaskText('');
      setPriority(PRIORITY.MEDIUM);
    }
  };

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl shadow-lg rounded-2xl p-6 ring-1 ring-black ring-opacity-5">
      <h2 className="text-2xl font-bold mb-6 text-center">Task Manager</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70 dark:bg-gray-700/70 border-gray-300 dark:border-gray-600"
          >
            <option value={PRIORITY.LOW}>Low Priority</option>
            <option value={PRIORITY.MEDIUM}>Medium Priority</option>
            <option value={PRIORITY.HIGH}>High Priority</option>
          </select>
          <Button type="submit" variant="primary" className="whitespace-nowrap">
            Add Task
          </Button>
        </div>
      </form>

      {tasks.length === 0 ? (
        <EmptyState filter={filter} />
      ) : (
        <>
          <motion.div 
            className="flex justify-center gap-2 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant={filter === 'all' ? 'primary' : 'secondary'}
              onClick={() => setFilter('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </Button>
            <Button
              variant={filter === 'active' ? 'primary' : 'secondary'}
              onClick={() => setFilter('active')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Active
            </Button>
            <Button
              variant={filter === 'completed' ? 'primary' : 'secondary'}
              onClick={() => setFilter('completed')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Completed
            </Button>
          </motion.div>

          <ul className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredTasks.length === 0 ? (
                <motion.li 
                  key="empty-state"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <EmptyState filter={filter} />
                </motion.li>
              ) : (
                filteredTasks.map((task, index) => (
                  <motion.li 
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-white/20 dark:bg-gray-900/20 rounded-lg"
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: 1,
                      transition: { 
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                        delay: index * 0.05
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: 100,
                      transition: { duration: 0.2 }
                    }}
                    whileHover={{ 
                      scale: 1.01,
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                      delay: index * 0.05
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div 
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center"
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => {
                            setTimeout(() => toggleTask(task.id), 150);
                          }}
                          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:border-gray-600 bg-transparent cursor-pointer"
                        />
                      </motion.div>
                      <div className="flex flex-col">
                        <motion.span 
                          className={`${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}
                          initial={{ x: 0 }}
                          animate={{
                            x: task.completed ? [0, 5, -5, 0] : 0,
                          }}
                          transition={{
                            duration: 0.3,
                            times: [0, 0.2, 0.8, 1],
                          }}
                        >
                          {task.text}
                        </motion.span>
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <PriorityBadge priority={task.priority} className="mt-1" />
                        </motion.div>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => {
                          setTimeout(() => deleteTask(task.id), 200);
                        }} 
                        aria-label="Delete task"
                      >
                        Delete
                      </Button>
                    </motion.div>
                  </motion.li>
                ))
              )}
            </AnimatePresence>
          </ul>

          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
            <p>{tasks.filter((task) => !task.completed).length} tasks remaining</p>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskManager;