import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealth } from '../../context/HealthContext';
import './SidebarMenu.css';

const SidebarMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { actions } = useHealth();

  const handleDashboardAccess = (type) => {
    navigate(`/dashboard/${type}`);
    onClose(); // Close the sidebar after navigation
  };

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const scrollToSection = (sectionId) => {
    if (window.location.pathname !== '/') {
      // If not on home page, navigate to home first
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          // Account for navbar height
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`sidebar-backdrop ${isOpen ? 'show' : ''}`} 
        onClick={onClose}
      ></div>
      
      {/* Sidebar Menu */}
      <div className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h5>Menu</h5>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="sidebar-content">
          {/* Main Navigation */}
          <div className="menu-section">
            <h6 className="section-title">Navigation</h6>
            <button className="menu-item home-btn" onClick={() => handleNavigation('/')}>
              <i className="fas fa-home"></i>
              <span>Home</span>
              <small>Back to main website</small>
            </button>
            <button className="menu-item" onClick={() => scrollToSection('about')}>
              <i className="fas fa-info-circle"></i>
              <span>About Us</span>
            </button>
            <button className="menu-item" onClick={() => scrollToSection('services')}>
              <i className="fas fa-concierge-bell"></i>
              <span>Services</span>
            </button>
            <button className="menu-item" onClick={() => scrollToSection('contact')}>
              <i className="fas fa-envelope"></i>
              <span>Contact</span>
            </button>
          </div>

          {/* Dashboard Access */}
          <div className="menu-section">
            <h6 className="section-title">Dashboard Access</h6>
            <button 
              className="menu-item dashboard-item worker" 
              onClick={() => handleDashboardAccess('worker')}
            >
              <i className="fas fa-user"></i>
              <span>Worker Dashboard</span>
              <small>Health records & appointments</small>
            </button>
            <button 
              className="menu-item dashboard-item doctor" 
              onClick={() => handleDashboardAccess('doctor')}
            >
              <i className="fas fa-user-md"></i>
              <span>Doctor Dashboard</span>
              <small>Patient management & consultations</small>
            </button>
            <button 
              className="menu-item dashboard-item govt" 
              onClick={() => handleDashboardAccess('govt')}
            >
              <i className="fas fa-shield-alt"></i>
              <span>Govt/NGO Dashboard</span>
              <small>Administrative panel</small>
            </button>
          </div>

          {/* Auth Section */}
          <div className="menu-section">
            <h6 className="section-title">Account</h6>
            <button className="menu-item" onClick={() => handleNavigation('/login')}>
              <i className="fas fa-sign-in-alt"></i>
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;