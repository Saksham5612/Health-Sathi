import React, { useEffect, useState } from 'react';

const ParticleEffect = () => {
  const [particles, setParticles] = useState([]);

  const createParticle = () => ({
    id: Math.random(),
    left: Math.random() * 100,
    animationDelay: Math.random() * 6,
    animationDuration: Math.random() * 3 + 3,
  });

  useEffect(() => {
    // Create initial particles
    const initialParticles = Array.from({ length: 50 }, createParticle);
    setParticles(initialParticles);

    // Add new particles periodically
    const interval = setInterval(() => {
      setParticles(prev => {
        const newParticles = Array.from({ length: 5 }, createParticle);
        return [...prev.slice(-45), ...newParticles]; // Keep max 50 particles
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-particles" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleEffect;