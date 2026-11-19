import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';
import { useHealth } from '../../context/HealthContext';
import './QRContainer.css';

const QRContainer = () => {
  const { state, actions } = useHealth();
  const { qrModal } = state;
  const qrCanvasRef = useRef(null);

  useEffect(() => {
    if (qrModal.isOpen && qrModal.qrData && qrCanvasRef.current) {
      generateQRCode();
    }
  }, [qrModal.isOpen, qrModal.qrData]);

  const generateQRCode = async () => {
    try {
      const canvas = qrCanvasRef.current;
      await QRCode.toCanvas(canvas, qrModal.qrData, {
        width: 256,
        height: 256,
        color: {
          dark: '#0D47A1',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H'
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleBackToHome = () => {
    actions.hideQRModal();
    // Scroll to hero section
    const heroElement = document.getElementById('home');
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();

      // Add Logo (if available)
      const logoImg = new Image();
      logoImg.onload = () => {
        const logoWidth = 70;
        const logoHeight = 20;
        pdf.addImage(logoImg, 'PNG', (pageWidth - logoWidth) / 2, 10, logoWidth, logoHeight);
        
        // Add title
        pdf.setFontSize(12);
        pdf.text("Empowering Migrant Workers with Digital Health Identity", pageWidth / 2, 35, { align: 'center' });
        
        // Add QR code
        const canvas = qrCanvasRef.current;
        if (canvas) {
          const qrImageData = canvas.toDataURL('image/png');
          const qrWidth = 80;
          const qrHeight = 80;
          const xPos = (pageWidth - qrWidth) / 2;
          const yPos = 50;
          pdf.addImage(qrImageData, 'PNG', xPos, yPos, qrWidth, qrHeight);
          
          // Add Health ID
          pdf.setFontSize(16);
          pdf.text(qrModal.healthId, pageWidth / 2, yPos + qrHeight + 15, { align: 'center' });
          
          // Save PDF
          pdf.save("HealthSaathi_ID.pdf");
        }
      };
      logoImg.src = 'logo.png';
      
      // Fallback if logo doesn't load
      setTimeout(() => {
        if (!logoImg.complete) {
          pdf.setFontSize(12);
          pdf.text("HealthSaathi Digital Health ID", pageWidth / 2, 25, { align: 'center' });
          
          const canvas = qrCanvasRef.current;
          if (canvas) {
            const qrImageData = canvas.toDataURL('image/png');
            const qrWidth = 80;
            const qrHeight = 80;
            const xPos = (pageWidth - qrWidth) / 2;
            const yPos = 40;
            pdf.addImage(qrImageData, 'PNG', xPos, yPos, qrWidth, qrHeight);
            
            pdf.setFontSize(16);
            pdf.text(qrModal.healthId, pageWidth / 2, yPos + qrHeight + 15, { align: 'center' });
            
            pdf.save("HealthSaathi_ID.pdf");
          }
        }
      }, 1000);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <AnimatePresence>
      {qrModal.isOpen && (
        <motion.div 
          className="qr-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top Buttons */}
          <div className="qr-buttons-top">
            <Button 
              variant="light" 
              className="qr-btn"
              onClick={handleBackToHome}
            >
              <i className="fas fa-arrow-left"></i> Back
            </Button>
            <Button 
              variant="light" 
              className="qr-btn"
              onClick={handleDownloadPDF}
            >
              <i className="fas fa-download"></i> Download PDF
            </Button>
          </div>

          {/* QR Code Card */}
          <motion.div 
            className="qr-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="qr-code-container">
              <canvas 
                ref={qrCanvasRef}
                style={{ display: 'block', margin: '0 auto' }}
              />
            </div>
            <p className="qr-id-text mt-3">{qrModal.healthId}</p>
            <p className="qr-description">
              This is your secure digital health identity. Share this QR code with healthcare providers for instant access to your medical records.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QRContainer;