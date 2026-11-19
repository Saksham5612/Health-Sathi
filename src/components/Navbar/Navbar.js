import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useHealth } from '../../context/HealthContext';
import UserMenu from './UserMenu';
import SidebarMenu from './SidebarMenu';
import './Navbar.css';

const CustomNavbar = () => {
  const { state, actions } = useHealth();
  const [scrolled, setScrolled] = useState(false);
  const [navSidebarOpen, setNavSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
      actions.setNavbarScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [actions]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const toggleMenu = () => {
    setNavSidebarOpen(!navSidebarOpen);
    // Also toggle dashboard sidebar when on dashboard page
    if (location.pathname.includes('/dashboard')) {
      actions.toggleSidebar();
    }
  };

  const closeSidebarMenu = () => {
    setNavSidebarOpen(false);
  };

  // Get sidebar state for icon display (dashboard sidebar)
  const dashboardSidebarOpen = state.sidebar.isOpen;
  const isDashboard = location.pathname.includes('/dashboard');

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
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
  };

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <Container fluid>
        <div className="d-flex align-items-center">
          {/* Hamburger Menu */}
          <button 
            className="hamburger-btn me-3" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <i className={`fas ${navSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
          
          {/* Logo */}
          <Navbar.Brand href="#home" onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}>
            <img src="logo.png" alt="HealthSaathi Logo" className="navbar-logo" />
          </Navbar.Brand>
        </div>
        
        <Navbar.Toggle aria-controls="navbarNav" className="d-lg-none" />
        
        <Navbar.Collapse id="navbarNav">
          <Nav className="mx-auto">
            <Nav.Link 
              href="#home" 
              className="nav-link-custom active"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              href="#about" 
              className="nav-link-custom"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
            >
              About Us
            </Nav.Link>
            <Nav.Link 
              href="#services" 
              className="nav-link-custom"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('services');
              }}
            >
              Services
            </Nav.Link>
            <Nav.Link 
              href="#contact" 
              className="nav-link-custom"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
            >
              Contact
            </Nav.Link>
          </Nav>
          
          {/* User Actions */}
          <div className="d-flex align-items-center gap-3 me-4">
            {state.isRegistered && state.user ? (
              <UserMenu />
            ) : (
              <>
                <Button 
                  variant="outline-primary"
                  className="btn-login" 
                  onClick={handleLoginClick}
                >
                  <i className="fas fa-sign-in-alt"></i> Login
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
      
      {/* Sidebar Menu */}
      <SidebarMenu isOpen={navSidebarOpen} onClose={closeSidebarMenu} />
    </Navbar>
  );
};

export default CustomNavbar;