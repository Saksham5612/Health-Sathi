import React from 'react';
import { Container, Accordion } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FAQSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqs = [
    {
      question: "What is HealthSaathi?",
      answer: "HealthSaathi is a digital health record platform that provides a secure and portable health identity for every citizen, enabling better healthcare access nationwide."
    },
    {
      question: "How is my health data secured?",
      answer: "Your data is protected with bank-level encryption and blockchain technology, ensuring privacy, security, and tamper-proof storage."
    },
    {
      question: "Can doctors access my records?",
      answer: "Only authorized healthcare professionals can access your records, and you remain in full control of granting or revoking access."
    },
    {
      question: "Is HealthSaathi free to use?",
      answer: "Yes, HealthSaathi is free for migrant workers and citizens. Healthcare providers may have premium features available."
    }
  ];

  return (
    <section className="faq-section" id="faq" ref={ref}>
      <Container>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Frequently Asked Questions
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Quick answers to common questions about HealthSaathi
        </motion.p>

        <Accordion>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Accordion.Item eventKey={index.toString()}>
                <Accordion.Header>{faq.question}</Accordion.Header>
                <Accordion.Body>{faq.answer}</Accordion.Body>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion>
      </Container>
    </section>
  );
};

export default FAQSection;