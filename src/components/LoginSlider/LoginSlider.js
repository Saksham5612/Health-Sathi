import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useHealth } from '../../context/HealthContext';
import Swal from 'sweetalert2';
import './LoginSlider.css';

const LoginSlider = () => {
  const [showWorkerModal, setShowWorkerModal] = useState(false);
  const { actions } = useHealth();
  const navigate = useNavigate();

  // Provider Form State
  const [providerData, setProviderData] = useState({
    name: '',
    specialization: '',
    phone: '',
    registration: '',
    institution: ''
  });

  // Worker Form State
  const [workerData, setWorkerData] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    vaccination: '',
    conditions: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleProviderChange = (e) => {
    const { name, value } = e.target;
    setProviderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWorkerChange = (e) => {
    const { name, value } = e.target;
    setWorkerData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProviderSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Welcome to Health Sathi Provider Network',
        confirmButtonColor: '#20B2AA'
      });
      
      actions.login({ ...providerData, type: 'provider' });
      navigate('/dashboard/doctor');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Please try again later',
        confirmButtonColor: '#20B2AA'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWorkerSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Swal.fire({
        icon: 'success',
        title: 'Health ID Created!',
        text: 'Your digital health identity is ready',
        confirmButtonColor: '#20B2AA'
      });
      
      actions.login({ ...workerData, type: 'worker' });
      setShowWorkerModal(false);
      navigate('/dashboard/worker');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Please try again later',
        confirmButtonColor: '#20B2AA'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackHome = () => {
    navigate('/');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        staggerChildren: 0.3,
        ease: "easeOut"
      }
    }
  };

  const panelVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 8px 25px rgba(32, 178, 170, 0.4)",
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 100
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 100,
      transition: { 
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div 
      className="login-page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="registration-container"
        variants={containerVariants}
      >
        
        {/* Healthcare Worker Panel */}
        <motion.div 
          className="registration-panel worker-panel"
          variants={panelVariants}
        >
          <div className="panel-content">
            <motion.h1
              variants={panelVariants}
              whileHover={{ scale: 1.02 }}
            >
              Healthcare Worker?
            </motion.h1>
            <motion.p
              variants={panelVariants}
            >
              Get your digital health identity in seconds
            </motion.p>
            <motion.button 
              className="registration-btn worker-btn" 
              onClick={() => setShowWorkerModal(true)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              WORKER REGISTRATION
            </motion.button>
          </div>
        </motion.div>

        {/* Healthcare Provider Panel */}
        <motion.div 
          className="registration-panel provider-panel"
          variants={panelVariants}
        >
          <div className="panel-content">
            <motion.h2
              variants={panelVariants}
              whileHover={{ scale: 1.02 }}
            >
              Healthcare Provider
            </motion.h2>
            <motion.p
              variants={panelVariants}
            >
              Join India's largest digital health network
            </motion.p>
            
            <motion.div
              variants={panelVariants}
            >
              <Form onSubmit={handleProviderSubmit} className="provider-form">
                <motion.div 
                  className="form-group"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={providerData.name}
                    onChange={handleProviderChange}
                    required
                  />
                </motion.div>

                <motion.div 
                  className="form-group"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Form.Control
                    type="text"
                    name="specialization"
                    placeholder="Specialization"
                    value={providerData.specialization}
                    onChange={handleProviderChange}
                  />
                </motion.div>

                <motion.div 
                  className="form-group"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="Mobile Number"
                    value={providerData.phone}
                    onChange={handleProviderChange}
                    required
                  />
                </motion.div>

                <motion.div 
                  className="form-group"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Form.Control
                    type="text"
                    name="registration"
                    placeholder="Medical Council Registration"
                    value={providerData.registration}
                    onChange={handleProviderChange}
                  />
                </motion.div>

                <motion.div 
                  className="form-group"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Form.Control
                    type="text"
                    name="institution"
                    placeholder="Institution Name"
                    value={providerData.institution}
                    onChange={handleProviderChange}
                  />
                </motion.div>

                <motion.button 
                  type="submit" 
                  className="join-btn" 
                  disabled={isSubmitting}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {isSubmitting ? 'Joining...' : 'JOIN NETWORK'}
                </motion.button>
              </Form>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Worker Registration Modal */}
      <AnimatePresence>
        {showWorkerModal && (
          <motion.div 
            className="modal-overlay" 
            onClick={() => setShowWorkerModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="worker-modal" 
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div 
                className="modal-panels"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Worker Registration Form */}
                <motion.div 
                  className="modal-panel worker-form-panel"
                  variants={panelVariants}
                >
                  <motion.h2 variants={panelVariants}>Worker Registration</motion.h2>
                  <motion.p variants={panelVariants}>Your health data is secured with blockchain encryption</motion.p>
                  
                  <motion.div variants={panelVariants}>
                    <Form onSubmit={handleWorkerSubmit} className="worker-form">
                      <motion.div 
                        className="form-group"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={workerData.name}
                          onChange={handleWorkerChange}
                          required
                        />
                      </motion.div>

                      <motion.div 
                        className="form-group"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Form.Control
                          type="number"
                          name="age"
                          placeholder="Age"
                          value={workerData.age}
                          onChange={handleWorkerChange}
                          required
                        />
                      </motion.div>

                      <motion.div 
                        className="form-group"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Form.Select
                          name="bloodGroup"
                          value={workerData.bloodGroup}
                          onChange={handleWorkerChange}
                          required
                        >
                          <option value="">Select Blood Group</option>
                          {bloodGroups.map(group => (
                            <option key={group} value={group}>{group}</option>
                          ))}
                        </Form.Select>
                      </motion.div>

                      <motion.div 
                        className="form-group"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Form.Select
                          name="vaccination"
                          value={workerData.vaccination}
                          onChange={handleWorkerChange}
                        >
                          <option value="">Vaccination Status</option>
                          <option value="fully-vaccinated">Fully Vaccinated</option>
                          <option value="partially-vaccinated">Partially Vaccinated</option>
                          <option value="not-vaccinated">Not Vaccinated</option>
                        </Form.Select>
                      </motion.div>

                      <motion.div 
                        className="form-group"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Form.Control
                          as="textarea"
                          name="conditions"
                          placeholder="Pre-existing Conditions (Optional)"
                          value={workerData.conditions}
                          onChange={handleWorkerChange}
                          rows={2}
                        />
                      </motion.div>

                      <motion.button 
                        type="submit" 
                        className="create-id-btn" 
                        disabled={isSubmitting}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        {isSubmitting ? 'Creating...' : 'CREATE HEALTH ID'}
                      </motion.button>
                    </Form>
                  </motion.div>
                </motion.div>

                {/* Medical Professional Panel */}
                <motion.div 
                  className="modal-panel medical-panel"
                  variants={panelVariants}
                >
                  <motion.h2 variants={panelVariants}>Medical Professional?</motion.h2>
                  <motion.p variants={panelVariants}>Access patient records instantly and securely</motion.p>
                  <motion.button 
                    className="provider-registration-btn" 
                    onClick={() => setShowWorkerModal(false)}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    PROVIDER REGISTRATION
                  </motion.button>
                </motion.div>
              </motion.div>
              
              <motion.button 
                className="close-modal" 
                onClick={() => setShowWorkerModal(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <i className='bx bx-x'></i>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Home Button */}
      <motion.button 
        className="back-home" 
        onClick={handleBackHome}
        whileHover={{ 
          scale: 1.05,
          y: -2
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <i className='bx bx-arrow-back'></i> Back to Home
      </motion.button>
    </motion.div>
  );
};

export default LoginSlider;