import React from 'react';
import TaskManager from '../components/TaskManager';

const TasksPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Light background with subtle abstract waves */}
      <div className="absolute inset-0 z-0 bg-[#F5F7FA]">
        <div className="absolute inset-0 wave-pattern"></div>
        {/* Subtle gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(92, 107, 192, 0.05) 0%, rgba(38, 166, 154, 0.05) 100%)',
          }}
        ></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800">
          Task Manager
        </h1>
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-xl">
          <TaskManager />
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
