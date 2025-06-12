import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, Home, CheckSquare, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = ({ to, children, icon: Icon, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to) && 
                  (to === '/' ? location.pathname === '/' : true);
  
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative flex items-center px-4 py-3 text-sm font-medium transition-all duration-300 rounded-xl group ${
        isActive 
          ? 'text-white bg-gradient-to-r from-indigo-500/20 to-indigo-600/20' 
          : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
      }`}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      <span className="relative z-10">{children}</span>
      {isActive && (
        <motion.span 
          layoutId="nav-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 to-cyan-400"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when route changes
  const closeMobileMenu = () => setIsOpen(false);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg' 
          : 'bg-white/50 dark:bg-gray-900/50 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                CheckMate
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1 bg-gray-800/30 backdrop-blur-sm rounded-xl p-1">
              <NavLink to="/" icon={Home}>Home</NavLink>
              <NavLink to="/tasks" icon={CheckSquare}>Tasks</NavLink>
              <NavLink to="/api-data" icon={Database}>API Data</NavLink>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="hidden md:flex items-center ml-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-gray-800/95 backdrop-blur-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink to="/" icon={Home} onClick={() => setIsOpen(false)}>Home</NavLink>
              <NavLink to="/tasks" icon={CheckSquare} onClick={() => setIsOpen(false)}>Tasks</NavLink>
              <NavLink to="/api-data" icon={Database} onClick={() => setIsOpen(false)}>API Data</NavLink>
              <div className="pt-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 rounded-xl transition-all duration-300"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="h-5 w-5 mr-3" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5 mr-3" />
                      Dark Mode
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
