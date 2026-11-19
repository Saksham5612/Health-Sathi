import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <footer className="footer-section">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, threshold: 0.1 }}
        >
          <Row className="g-4">
            <Col lg={4} md={6}>
              <motion.div variants={itemVariants} className="footer-brand">
                <div className="d-flex align-items-center mb-3">
                  <img 
                    src="/logo.png" 
                    alt="HealthSaathi Logo" 
                    className="footer-logo me-3"
                  />
                  <h4 className="footer-brand-name mb-0">HealthSaathi</h4>
                </div>
                <p className="footer-description">
                  Empowering migrant workers across India with accessible, digital healthcare 
                  solutions. Your health companion for a better tomorrow.
                </p>
                <div className="footer-social-links">
                  <motion.a
                    href="#"
                    className="social-link-footer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fab fa-facebook-f"></i>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="social-link-footer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fab fa-twitter"></i>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="social-link-footer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="social-link-footer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fab fa-instagram"></i>
                  </motion.a>
                </div>
              </motion.div>
            </Col>

            <Col lg={2} md={6}>
              <motion.div variants={itemVariants}>
                <h5 className="footer-title">Quick Links</h5>
                <ul className="footer-links">
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </motion.div>
            </Col>

            <Col lg={2} md={6}>
              <motion.div variants={itemVariants}>
                <h5 className="footer-title">Services</h5>
                <ul className="footer-links">
                  <li><a href="#services">Health Records</a></li>
                  <li><a href="#services">Medical History</a></li>
                  <li><a href="#services">QR Access</a></li>
                  <li><a href="#services">Emergency Info</a></li>
                </ul>
              </motion.div>
            </Col>

            <Col lg={2} md={6}>
              <motion.div variants={itemVariants}>
                <h5 className="footer-title">Support</h5>
                <ul className="footer-links">
                  <li><a href="#faq">FAQ</a></li>
                  <li><a href="#contact">Help Center</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Service</a></li>
                </ul>
              </motion.div>
            </Col>

            <Col lg={2} md={6}>
              <motion.div variants={itemVariants}>
                <h5 className="footer-title">Contact Info</h5>
                <div className="footer-contact">
                  <div className="contact-item mb-2">
                    <i className="fas fa-phone me-2"></i>
                    <span>+91 1800-123-4567</span>
                  </div>
                  <div className="contact-item mb-2">
                    <i className="fas fa-envelope me-2"></i>
                    <span>support@healthsaathi.gov.in</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    <span>New Delhi, India</span>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>

          <hr className="footer-divider" />

          <Row className="align-items-center">
            <Col md={6}>
              <motion.div variants={itemVariants}>
                <p className="footer-copyright mb-0">
                  © {currentYear} HealthSaathi. All rights reserved. 
                  <span className="ms-2">Made with ❤️ for Digital India</span>
                </p>
              </motion.div>
            </Col>
            <Col md={6} className="text-md-end">
              <motion.div variants={itemVariants}>
                <motion.button
                  className="back-to-top-btn"
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Back to top"
                >
                  <i className="fas fa-arrow-up"></i>
                </motion.button>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;