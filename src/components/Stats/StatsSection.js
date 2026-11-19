import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { number: 150000, label: 'Migrant Workers Registered' },
    { number: 5000, label: 'Healthcare Providers' },
    { number: 2500000, label: 'Medical Records Secured' },
    { number: 99, label: '% Data Security Rate' }
  ];

  return (
    <section className="stats-section" ref={ref}>
      <Container>
        <div className="stats-content">
          <Row className="text-center mb-5">
            <Col xs={12}>
              <motion.h2 
                style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: 'white' }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                Real Impact, Real Numbers
              </motion.h2>
              <motion.p 
                style={{ fontSize: '1.2rem', opacity: 0.9, color: 'white' }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Transforming healthcare delivery across India
              </motion.p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col lg={3} md={6} key={index}>
                <motion.div 
                  className="stat-card"
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <span className="stat-number">
                    {inView && (
                      <CountUp
                        end={stat.number}
                        duration={2}
                        separator=","
                      />
                    )}
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;