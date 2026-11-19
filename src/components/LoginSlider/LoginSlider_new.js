import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
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

  const [errors, setErrors] = useState({});
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Welcome to Health Sathi Provider Network',
        confirmButtonColor: '#20B2AA'
      });
      
      actions.login({ ...providerData, type: 'provider' });
      navigate('/');
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Swal.fire({
        icon: 'success',
        title: 'Health ID Created!',
        text: 'Your digital health identity is ready',
        confirmButtonColor: '#20B2AA'
      });
      
      actions.login({ ...workerData, type: 'worker' });
      setShowWorkerModal(false);
      navigate('/');
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

  return (
    <div className="login-page">
      <div className="registration-container">
        
        {/* Healthcare Worker Panel */}
        <div className="registration-panel worker-panel">
          <div className="panel-content">
            <h1>Healthcare Worker?</h1>
            <p>Get your digital health identity in seconds</p>
            <button 
              className="registration-btn worker-btn" 
              onClick={() => setShowWorkerModal(true)}
            >
              WORKER REGISTRATION
            </button>
          </div>
        </div>

        {/* Healthcare Provider Panel */}
        <div className="registration-panel provider-panel">
          <div className="panel-content">
            <h2>Healthcare Provider</h2>
            <p>Join India's largest digital health network</p>
            
            <Form onSubmit={handleProviderSubmit} className="provider-form">
              <div className="form-group">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={providerData.name}
                  onChange={handleProviderChange}
                  required
                />
              </div>

              <div className="form-group">
                <Form.Control
                  type="text"
                  name="specialization"
                  placeholder="Specialization"
                  value={providerData.specialization}
                  onChange={handleProviderChange}
                />
              </div>

              <div className="form-group">
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Mobile Number"
                  value={providerData.phone}
                  onChange={handleProviderChange}
                  required
                />
              </div>

              <div className="form-group">
                <Form.Control
                  type="text"
                  name="registration"
                  placeholder="Medical Council Registration"
                  value={providerData.registration}
                  onChange={handleProviderChange}
                />
              </div>

              <div className="form-group">
                <Form.Control
                  type="text"
                  name="institution"
                  placeholder="Institution Name"
                  value={providerData.institution}
                  onChange={handleProviderChange}
                />
              </div>

              <button type="submit" className="join-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Joining...' : 'JOIN NETWORK'}
              </button>
            </Form>
          </div>
        </div>
      </div>

      {/* Worker Registration Modal */}
      {showWorkerModal && (
        <div className="modal-overlay" onClick={() => setShowWorkerModal(false)}>
          <div className="worker-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-panels">
              {/* Worker Registration Form */}
              <div className="modal-panel worker-form-panel">
                <h2>Worker Registration</h2>
                <p>Your health data is secured with blockchain encryption</p>
                
                <Form onSubmit={handleWorkerSubmit} className="worker-form">
                  <div className="form-group">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={workerData.name}
                      onChange={handleWorkerChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <Form.Control
                      type="number"
                      name="age"
                      placeholder="Age"
                      value={workerData.age}
                      onChange={handleWorkerChange}
                      required
                    />
                  </div>

                  <div className="form-group">
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
                  </div>

                  <div className="form-group">
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
                  </div>

                  <div className="form-group">
                    <Form.Control
                      as="textarea"
                      name="conditions"
                      placeholder="Pre-existing Conditions (Optional)"
                      value={workerData.conditions}
                      onChange={handleWorkerChange}
                      rows={2}
                    />
                  </div>

                  <button type="submit" className="create-id-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'CREATE HEALTH ID'}
                  </button>
                </Form>
              </div>

              {/* Medical Professional Panel */}
              <div className="modal-panel medical-panel">
                <h2>Medical Professional?</h2>
                <p>Access patient records instantly and securely</p>
                <button 
                  className="provider-registration-btn" 
                  onClick={() => setShowWorkerModal(false)}
                >
                  PROVIDER REGISTRATION
                </button>
              </div>
            </div>
            
            <button className="close-modal" onClick={() => setShowWorkerModal(false)}>
              <i className='bx bx-x'></i>
            </button>
          </div>
        </div>
      )}

      {/* Back to Home Button */}
      <button className="back-home" onClick={handleBackHome}>
        <i className='bx bx-arrow-back'></i> Back to Home
      </button>
    </div>
  );
};

export default LoginSlider;