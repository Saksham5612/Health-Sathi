import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ServicesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: 'fas fa-id-card-alt',
      title: 'Digital Health ID',
      description: 'A secure and portable health identity that allows workers and patients to access their medical history anytime, anywhere.'
    },
    {
      icon: 'fas fa-user-md',
      title: 'Doctor Network',
      description: 'Connect with thousands of certified doctors and healthcare providers across India for seamless treatment and consultations.'
    },
    {
      icon: 'fas fa-lock',
      title: 'Secure Data',
      description: 'Blockchain-backed, encrypted storage ensures your health records remain confidential and tamper-proof.'
    },
    {
      icon: 'fas fa-mobile',
      title: 'Mobile Access',
      description: 'Access your medical history and prescriptions from any device with an easy-to-use Health Saathi app interface.'
    },
    {
      icon: 'fas fa-heartbeat',
      title: 'Health Insights',
      description: 'AI-powered analytics provide personalized preventive care recommendations and lifestyle suggestions.'
    },
    {
      icon: 'fas fa-hospital',
      title: 'Hospital Integration',
      description: 'Seamlessly integrated with hospitals and clinics for instant access to patient data and improved care delivery.'
    }
  ];

  return (
    <section className="services-section" id="services" ref={ref}>
      <Container>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Our Services
        </motion.h2>
        
        <div className="text-center my-5">
          <motion.h2 
            className="punch-line"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            "Bridging Patients and Providers with Smarter Healthcare Services."
          </motion.h2>
        </div>

        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Comprehensive digital healthcare solutions for workers and providers
        </motion.p>

        <Row className="g-4">
          {services.map((service, index) => (
            <Col lg={4} md={6} key={index}>
              <motion.div 
                className="service-card"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* AI Insights Panel */}
        <Row className="justify-content-center mt-5">
          <Col lg={10}>
            <motion.div 
              className="ai-panel"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="ai-icon">
                <i className="fas fa-robot"></i>
              </div>
              <div className="ai-content">
                <h3>AI Health Insights</h3>
                <p>
                  Our AI-powered engine analyzes your medical records to provide 
                  <strong> early risk detection</strong>, personalized lifestyle recommendations, 
                  and predictive health analytics for better preventive care.
                </p>
                <a href="#registerModal" className="ai-btn">
                  <i className="fas fa-magic"></i> Try AI Insights
                </a>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServicesSection;