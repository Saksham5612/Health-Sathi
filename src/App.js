import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HealthContextProvider } from './context/HealthContext';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/Hero/HeroSection';
import AboutSection from './components/About/AboutSection';
import ServicesSection from './components/Services/ServicesSection';
import FAQSection from './components/FAQ/FAQSection';
import StatsSection from './components/Stats/StatsSection';
import CTASection from './components/CTA/CTASection';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import QRContainer from './components/QR/QRContainer';
import UserProfile from './components/Profile/UserProfile';
import LoginSlider from './components/LoginSlider/LoginSlider';
import Dashboard from './components/Dashboard/Dashboard';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

// Home Page Component (without navbar)
const HomePage = () => (
  <>
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FAQSection />
      <StatsSection />
      <CTASection />
      <Contact />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <HealthContextProvider>
        <div className="App">
          {/* Global Navbar - appears on all pages */}
          <Navbar />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginSlider />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:type" element={<Dashboard />} />
          </Routes>
          
          {/* Global Modals and Overlays */}
          <QRContainer />
          <UserProfile />
        </div>
      </HealthContextProvider>
    </Router>
  );
}

export default App;