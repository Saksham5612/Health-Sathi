import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useHealth } from '../../context/HealthContext';
import Swal from 'sweetalert2';

const DoctorForm = () => {
  const { registerUser } = useHealth();
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    mobile: '',
    regNumber: '',
    clinic: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.specialization.trim()) {
      newErrors.specialization = 'Specialization is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.regNumber.trim()) {
      newErrors.regNumber = 'Medical council registration is required';
    }

    if (!formData.clinic.trim()) {
      newErrors.clinic = 'Institution name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Register doctor and generate QR
      const result = registerUser(formData, 'doctor');
      
      // Show success message
      await Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: `Welcome to HealthSaathi network, Dr. ${formData.name}! Your Provider ID: ${result.healthId}`,
        confirmButtonColor: '#00BCD4',
        confirmButtonText: 'View QR Code'
      });

      // Reset form
      setFormData({
        name: '',
        specialization: '',
        mobile: '',
        regNumber: '',
        clinic: ''
      });

    } catch (error) {
      console.error('Registration error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Please try again later.',
        confirmButtonColor: '#dc3545'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form onSubmit={handleSubmit} className="registration-form">
        <h1>Healthcare Provider</h1>
        <span>Join India's largest digital health network</span>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={handleChange}
            isInvalid={!!errors.specialization}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.specialization}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            isInvalid={!!errors.mobile}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.mobile}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="regNumber"
            placeholder="Medical Council Registration"
            value={formData.regNumber}
            onChange={handleChange}
            isInvalid={!!errors.regNumber}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.regNumber}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            type="text"
            name="clinic"
            placeholder="Institution Name"
            value={formData.clinic}
            onChange={handleChange}
            isInvalid={!!errors.clinic}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.clinic}
          </Form.Control.Feedback>
        </Form.Group>

        <Button 
          type="submit" 
          className="register-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Joining Network...
            </>
          ) : (
            'Join Network'
          )}
        </Button>
      </Form>
    </motion.div>
  );
};

export default DoctorForm;