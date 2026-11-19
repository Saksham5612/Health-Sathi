import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CTASection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleGetStarted = () => {
    window.location.href = '/login';
  };

  return (
    <section className="cta-section" ref={ref}>
      <Container>
        <div className="cta-content">
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <motion.h2 
                className="cta-title"
                style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', color: 'white' }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                Join the Healthcare Revolution
              </motion.h2>
              
              <motion.p 
                className="cta-subtitle"
                style={{ fontSize: '1.3rem', marginBottom: '2.5rem', opacity: 0.95, color: 'white' }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Be part of India's largest digital health initiative. Together, we're building a healthier tomorrow for every citizen.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <button 
                  className="btn-hero-primary me-3"
                  style={{ background: 'white', color: 'var(--primary-blue)', padding: '1.2rem 3rem' }}
                  onClick={handleGetStarted}
                >
                  <i className="fas fa-rocket"></i> Get Started Today
                </button>
                
                <a 
                  href="#about" 
                  className="btn-hero-secondary" 
                  style={{ padding: '1.2rem 3rem' }}
                >
                  <i className="fas fa-play"></i> Learn More
                </a>
              </motion.div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;