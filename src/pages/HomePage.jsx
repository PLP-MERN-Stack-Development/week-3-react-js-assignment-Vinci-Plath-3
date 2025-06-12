import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const quotes = [
  "Every small step counts. Start with just one task today.",
  "Productivity is never an accident. It's always the result of a commitment to excellence.",
  "The secret of getting ahead is getting started.",
  "You don't have to be great to start, but you have to start to be great.",
  "The way to get started is to quit talking and begin doing.",
  "Your time is limited, don't waste it living someone else's life.",
  "The future depends on what you do today.",
];

const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Change quote every 10 seconds
    const quoteTimer = setInterval(() => {
      const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setCurrentQuote(newQuote);
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(quoteTimer);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const changeQuote = () => {
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(newQuote);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Static mesh gradient background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #5C6BC0 0%, #26A69A 50%, #F5F7FA 100%)',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Abstract floating shapes */}
        <div className="absolute w-64 h-64 rounded-full bg-white/5 -top-32 -left-32"></div>
        <div className="absolute w-96 h-96 rounded-full bg-white/5 -bottom-48 -right-48"></div>
        <div className="absolute w-80 h-80 rounded-full bg-white/5 top-1/4 right-1/4"></div>
        <div className="absolute w-40 h-40 rounded-full bg-white/5 bottom-1/3 left-1/4"></div>
        
        {/* Hexagon shapes */}
        <div className="absolute top-1/3 left-1/4 w-32 h-28 bg-white/5 clip-hexagon"></div>
        <div className="absolute bottom-1/4 right-1/3 w-40 h-36 bg-white/5 clip-hexagon"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome to CheckMate</h1>
          <p className="text-xl text-white/90">
           Your mate in checking out that to do list! Organize your tasks efficiently with our intuitive task management system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Time Card */}
          <Card className="bg-white/30 backdrop-blur-md border border-white/50">
            <div className="flex flex-col items-center justify-center p-6">
              <div className="text-5xl font-bold text-gray-800 mb-2">
                {formatTime(currentTime)}
              </div>
              <div className="text-gray-700">{formatDate(currentTime)}</div>
            </div>
          </Card>

          {/* Quick Actions Card */}
          <Card className="bg-white/30 backdrop-blur-md border border-white/50">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/tasks"
                  className="block w-full bg-white/80 hover:bg-white text-indigo-700 py-3 px-4 rounded-lg text-center font-medium transition-colors shadow-sm hover:shadow"
                >
                  View All Tasks
                </Link>
                <Link
                  to="/tasks/new"
                  className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg text-center font-medium transition-colors shadow-sm hover:shadow"
                >
                  + New Task
                </Link>
              </div>
            </div>
          </Card>

          {/* Quote Card */}
          <Card className="bg-white/30 backdrop-blur-md border border-white/50">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quote of the Day</h2>
              <p className="text-gray-700 italic mb-4">"{currentQuote}"</p>
              <button 
                onClick={changeQuote}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                New Quote
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
