import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './AboutSection.css';

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: 'fas fa-shield-alt',
      title: 'Bank-Level Security',
      description: 'Military-grade encryption and blockchain technology ensure your health data remains private and tamper-proof, accessible only by authorized personnel.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Universal Accessibility',
      description: 'Access your complete medical history from any device, anywhere in India. No more lost records or communication barriers in healthcare.'
    },
    {
      icon: 'fas fa-network-wired',
      title: 'AI-Powered Insights',
      description: 'Advanced analytics provide predictive health insights and personalized recommendations, enabling preventive care for better outcomes.'
    }
  ];

  const stats = [
    { value: '87%', label: 'Faster Diagnosis' },
    { value: '65%', label: 'Cost Reduction' }
  ];

  return (
    <section className="about-section" id="about" ref={ref}>
      <Container>
        {/* Hero Section */}
        <div className="about-hero">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="gradient-text">About HealthSaathi</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Revolutionizing healthcare for migrant workers and doctors with secure, portable digital records that transform lives.
          </motion.p>
        </div>

        {/* Feature Cards */}
        <Row className="g-4 mt-5">
          {features.map((feature, index) => (
            <Col lg={4} md={6} key={index}>
              <motion.div 
                className="feature-card"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Impact Stats and Image */}
        <Row className="mt-5 align-items-center">
          <Col lg={6}>
            <motion.div 
              className="impact-stats"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="mb-4 impact-title">Impact on Healthcare Ecosystem</h3>
              <Row className="g-3">
                {stats.map((stat, index) => (
                  <Col xs={6} key={index}>
                    <div className="stat-mini text-center p-3 rounded">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          </Col>
          <Col lg={6}>
            <motion.img 
              src="make4.png"
              alt="Healthcare Technology"
              className="img-fluid rounded-4 shadow-lg about-image"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;