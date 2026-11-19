import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useHealth } from '../../context/HealthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { state, actions } = useHealth();
  const { userProfile, user } = state;
  const fileInputRef = useRef(null);

  const handleClose = () => {
    actions.toggleUserProfile(false);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        actions.setProfilePhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerPhotoUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <AnimatePresence>
      {userProfile.isOpen && (
        <motion.section 
          className="user-profile"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
        >
          <motion.div 
            className="profile-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button 
              variant="light" 
              className="close-profile-btn"
              onClick={handleClose}
            >
              <i className="fas fa-times"></i>
            </Button>

            <h2>Your Profile</h2>

            <div className="profile-card">
              <div className="profile-photo">
                <img 
                  src={userProfile.photoUrl || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt="User Photo" 
                  className="profile-image"
                />
                <label className="camera-icon" onClick={triggerPhotoUpload}>
                  <i className="fas fa-camera"></i>
                </label>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*" 
                  style={{ display: 'none' }}
                  onChange={handlePhotoUpload}
                />
              </div>

              <div className="profile-details">
                <p><strong>Full Name:</strong> <span>{user?.name || '-'}</span></p>
                <p><strong>Blood Group:</strong> <span>{user?.bloodGroup || '-'}</span></p>
                <p><strong>Vaccination Status:</strong> <span>{user?.vaccinationStatus || '-'}</span></p>
                {user?.healthId && (
                  <p><strong>Health ID:</strong> <span>{user.healthId}</span></p>
                )}
              </div>

              <p className="profile-description">
                HealthSaathi keeps your health data secure and helps you stay connected to medical professionals anytime, powered by blockchain encryption and AI insights.
              </p>

              <Button className="btn-document">
                Your Document
              </Button>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default UserProfile;