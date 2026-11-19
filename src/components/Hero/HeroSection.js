import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';

const HeroSection = () => {
  const [particles, setParticles] = useState([]);
  const [heroContentIndex, setHeroContentIndex] = useState(0);

  const heroContent = [
    {
      title: "Digital Health Record<br/>For Migrant Workers",
      subtitle: "Advanced analytics and predictive insights ensuring proactive healthcare management for all citizens."
    },
    {
      title: "Health Sathi<br/>Your Health<br/>Your Identity",
      subtitle: "Empowering healthcare accessibility with secure, portable digital identity for migrant workers nationwide."
    },
    {
      title: "Empowering Health<br/>One Record<br/>At a Time",
      subtitle: "Access patient history instantly, anywhere, and provide better care."
    }
  ];

  useEffect(() => {
    // Create initial particles
    createParticles();
    
    // Set up particle regeneration
    const particleInterval = setInterval(() => {
      createParticles();
    }, 10000);

    // Set up hero content rotation
    const contentInterval = setInterval(() => {
      setHeroContentIndex(prev => (prev + 1) % heroContent.length);
    }, 6000);

    return () => {
      clearInterval(particleInterval);
      clearInterval(contentInterval);
    };
  }, [heroContent.length]);

  const createParticles = () => {
    const newParticles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: Date.now() + i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 6,
        animationDuration: Math.random() * 3 + 3
      });
    }
    
    setParticles(newParticles);
    
    // Remove particles after animation
    setTimeout(() => {
      setParticles([]);
    }, 7000);
  };

  const handleWorkerLogin = () => {
    window.location.href = '/login';
  };

  const handleDoctorLogin = () => {
    window.location.href = '/login';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="hero-section" id="home">
      {/* Floating Particles */}
      <div className="hero-particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`
            }}
          />
        ))}
      </div>

      {/* Bootstrap Carousel */}
      <div id="heroImageCarousel" className="carousel slide hero-carousel" data-bs-ride="carousel" data-bs-interval="5000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/make1.png" className="d-block w-100" alt="HealthSaathi Digital Records" />
          </div>
          <div className="carousel-item">
            <img src="/make2.png" className="d-block w-100" alt="Healthcare for All" />
          </div>
          <div className="carousel-item">
            <img src="/make3.png" className="d-block w-100" alt="Secure Health Data" />
          </div>
        </div>
        
        <button className="carousel-control-prev" type="button" data-bs-target="#heroImageCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroImageCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
        
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroImageCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#heroImageCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#heroImageCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
      </div>

      {/* Enhanced Text Overlay */}
      <div className="hero-text-overlay">
        <motion.div 
          className="hero-text-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={textVariants}
            className="hero-slide-animate"
            key={heroContentIndex}
            dangerouslySetInnerHTML={{ __html: heroContent[heroContentIndex].title }}
          />
          <motion.p 
            variants={textVariants}
            className="hero-slide-animate"
            key={`subtitle-${heroContentIndex}`}
          >
            {heroContent[heroContentIndex].subtitle}
          </motion.p>
          <motion.div 
            className="hero-buttons"
            variants={textVariants}
          >
            <motion.button
              className="btn-hero-primary"
              onClick={handleWorkerLogin}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-sign-in-alt"></i> Worker Login
            </motion.button>
            <motion.button
              className="btn-hero-secondary"
              onClick={handleDoctorLogin}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-user-md"></i> Doctor Login
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;