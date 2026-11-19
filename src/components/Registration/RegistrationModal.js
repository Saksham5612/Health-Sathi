import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useHealth } from '../../context/HealthContext';
import WorkerForm from './WorkerForm';
import DoctorForm from './DoctorForm';
import './RegistrationModal.css';

const RegistrationModal = () => {
  const { state, actions } = useHealth();
  const { registrationModal } = state;

  const handleClose = () => {
    actions.toggleRegistrationModal(false);
  };

  const handleToggleForm = (formType) => {
    actions.setRegistrationForm(formType);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && registrationModal.isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [registrationModal.isOpen]);

  return (
    <Modal
      show={registrationModal.isOpen}
      onHide={handleClose}
      size="lg"
      centered
      backdrop="static"
      className="registration-modal"
    >
      <Modal.Body className="p-0">
        <div className={`register-container ${registrationModal.activeForm === 'doctor' ? 'active' : ''}`}>
          {/* Back to Home Button */}
          <button 
            className="modal-back-home"
            onClick={handleClose}
            type="button"
          >
            <i className="fas fa-arrow-left"></i> Home
          </button>

          {/* Worker Form */}
          <AnimatePresence mode="wait">
            {registrationModal.activeForm === 'worker' && (
              <motion.div
                key="worker-form"
                className="form-container sign-in"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <WorkerForm />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Doctor Form */}
          <AnimatePresence mode="wait">
            {registrationModal.activeForm === 'doctor' && (
              <motion.div
                key="doctor-form"
                className="form-container sign-up"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <DoctorForm />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Section */}
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Healthcare Worker?</h1>
                <p>Get your digital health identity in seconds</p>
                <button 
                  className="hidden" 
                  onClick={() => handleToggleForm('worker')}
                >
                  Worker Registration
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Medical Professional?</h1>
                <p>Access patient records instantly and securely</p>
                <button 
                  className="hidden" 
                  onClick={() => handleToggleForm('doctor')}
                >
                  Provider Registration
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegistrationModal;