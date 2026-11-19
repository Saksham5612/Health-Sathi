import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useHealth } from '../../context/HealthContext';
import Swal from 'sweetalert2';

const WorkerForm = () => {
  const { registerUser } = useHealth();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    vaccinationStatus: '',
    diseases: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const vaccinationOptions = [
    { value: 'fully-vaccinated', label: 'Fully Vaccinated' },
    { value: 'partially-vaccinated', label: 'Partially Vaccinated' },
    { value: 'not-vaccinated', label: 'Not Vaccinated' }
  ];

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

    if (!formData.age || formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age';
    }

    if (!formData.bloodGroup) {
      newErrors.bloodGroup = 'Blood group is required';
    }

    if (!formData.vaccinationStatus) {
      newErrors.vaccinationStatus = 'Vaccination status is required';
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
      // Register user and generate QR
      const result = registerUser(formData, 'worker');
      
      // Show success message
      await Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: `Welcome, ${formData.name}! Your Health ID: ${result.healthId}`,
        confirmButtonColor: '#00BCD4',
        confirmButtonText: 'View QR Code'
      });

      // Reset form
      setFormData({
        name: '',
        age: '',
        bloodGroup: '',
        vaccinationStatus: '',
        diseases: ''
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
        <h1>Worker Registration</h1>
        <span>Your health data is secured with blockchain encryption</span>

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
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            isInvalid={!!errors.age}
            min="1"
            max="120"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            isInvalid={!!errors.bloodGroup}
            required
          >
            <option value="" disabled>Select Blood Group</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.bloodGroup}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Select
            name="vaccinationStatus"
            value={formData.vaccinationStatus}
            onChange={handleChange}
            isInvalid={!!errors.vaccinationStatus}
            required
          >
            <option value="" disabled>Vaccination Status</option>
            {vaccinationOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.vaccinationStatus}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            type="text"
            name="diseases"
            placeholder="Pre-existing Conditions (Optional)"
            value={formData.diseases}
            onChange={handleChange}
          />
        </Form.Group>

        <Button 
          type="submit" 
          className="register-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Creating Health ID...
            </>
          ) : (
            'Create Health ID'
          )}
        </Button>
      </Form>
    </motion.div>
  );
};

export default WorkerForm;