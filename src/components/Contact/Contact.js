import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Contact form submitted:', formData);
    // You can integrate with your backend or email service here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="contact" className="contact-section py-5">
      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-5">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle text-muted">
              Have questions about HealthSaathi? We're here to help!
            </p>
          </motion.div>

          <Row className="g-4">
            <Col lg={8} md={12}>
              <motion.div variants={itemVariants}>
                <Card className="contact-form-card shadow-sm border-0">
                  <Card.Body className="p-4">
                    <h4 className="mb-4">Send us a Message</h4>
                    <Form onSubmit={handleSubmit}>
                      <Row className="g-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                              required
                              className="contact-input"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Enter your email"
                              required
                              className="contact-input"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Form.Group>
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                              type="text"
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              placeholder="Enter message subject"
                              required
                              className="contact-input"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Form.Group>
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={5}
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="Enter your message"
                              required
                              className="contact-input"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              type="submit"
                              className="btn-primary-custom px-4 py-2"
                              size="lg"
                            >
                              <i className="fas fa-paper-plane me-2"></i>
                              Send Message
                            </Button>
                          </motion.div>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col lg={4} md={12}>
              <motion.div variants={itemVariants}>
                <Card className="contact-info-card shadow-sm border-0 h-100">
                  <Card.Body className="p-4">
                    <h4 className="mb-4">Contact Information</h4>
                    
                    <div className="contact-info-item mb-4">
                      <div className="contact-icon">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div className="contact-details">
                        <h6>Address</h6>
                        <p className="text-muted mb-0">
                          123 Healthcare Street<br />
                          Digital India Complex<br />
                          New Delhi, India 110001
                        </p>
                      </div>
                    </div>

                    <div className="contact-info-item mb-4">
                      <div className="contact-icon">
                        <i className="fas fa-phone"></i>
                      </div>
                      <div className="contact-details">
                        <h6>Phone</h6>
                        <p className="text-muted mb-0">+91 1800-123-4567</p>
                      </div>
                    </div>

                    <div className="contact-info-item mb-4">
                      <div className="contact-icon">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div className="contact-details">
                        <h6>Email</h6>
                        <p className="text-muted mb-0">support@healthsaathi.gov.in</p>
                      </div>
                    </div>

                    <div className="contact-info-item">
                      <div className="contact-icon">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div className="contact-details">
                        <h6>Working Hours</h6>
                        <p className="text-muted mb-0">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday: 9:00 AM - 2:00 PM
                        </p>
                      </div>
                    </div>

                    <div className="social-links mt-4 pt-3 border-top">
                      <h6 className="mb-3">Follow Us</h6>
                      <div className="d-flex gap-3">
                        <motion.a
                          href="#"
                          className="social-link"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <i className="fab fa-facebook-f"></i>
                        </motion.a>
                        <motion.a
                          href="#"
                          className="social-link"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <i className="fab fa-twitter"></i>
                        </motion.a>
                        <motion.a
                          href="#"
                          className="social-link"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </motion.a>
                        <motion.a
                          href="#"
                          className="social-link"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <i className="fab fa-instagram"></i>
                        </motion.a>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default Contact;