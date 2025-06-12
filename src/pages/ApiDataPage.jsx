import React from 'react';
import ApiData from '../components/ApiData';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ApiDataPage = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dark gradient background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Subtle particle effect */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: 'transparent',
              },
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: 'connect',
                },
                resize: true,
              },
              modes: {
                connect: {
                  distance: 100,
                  links: {
                    opacity: 0.3,
                  },
                },
              },
            },
            particles: {
              color: {
                value: '#26A69A',
              },
              links: {
                color: '#26A69A',
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
              },
              move: {
                direction: 'none',
                enable: true,
                outModes: {
                  default: 'bounce',
                },
                random: true,
                speed: 0.5,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 40,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: 'circle',
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 sm:py-20">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          API Data Explorer
        </h1>
        <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
          <ApiData />
        </div>
      </div>
    </div>
  );
};

export default ApiDataPage;
