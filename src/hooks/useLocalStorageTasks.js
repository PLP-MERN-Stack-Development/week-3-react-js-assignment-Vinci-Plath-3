import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

const defaultTasks = [
  {
    id: 1,
    text: 'Complete the React project',
    completed: true,
    priority: PRIORITY.HIGH,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    text: 'Update the portfolio',
    completed: false,
    priority: PRIORITY.MEDIUM,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    text: 'Walk the dog',
    completed: false,
    priority: PRIORITY.LOW,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    text: 'Read a chapter of a book',
    completed: true,
    priority: PRIORITY.LOW,
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    text: 'Prepare dinner',
    completed: false,
    priority: PRIORITY.MEDIUM,
    createdAt: new Date().toISOString(),
  },
];

export const useLocalStorageTasks = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
    } catch (error) {
      console.error('Failed to parse tasks from localStorage', error);
      return defaultTasks;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage', error);
    }
  }, [tasks]);

  const addTask = (text, priority = PRIORITY.MEDIUM) => {
    if (text.trim()) {
      const newTask = {
        id: Date.now(),
        text,
        completed: false,
        priority,
        createdAt: new Date().toISOString(),
      };
      setTasks([newTask, ...tasks]);
      toast.success('Task added!');
      return newTask;
    }
    return null;
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    toast.success(`Task marked as ${updatedTasks.find(t => t.id === id).completed ? 'complete' : 'active'}!`);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    toast.success('Task deleted!');
  };

  return { tasks, addTask, toggleTask, deleteTask };
};
