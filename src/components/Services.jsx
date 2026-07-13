import { useRef } from 'react';
import { Cpu, MessageSquare, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const Card = ({ service, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="card-icon">
        {service.icon}
      </div>
      <h3 className="card-title">{service.title}</h3>
      <p className="card-desc">{service.description}</p>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Cpu size={28} />,
      title: "AI Automation",
      description: "Automate complex workflows and operations with intelligent agents that reduce overhead and scale your capabilities effortlessly."
    },
    {
      icon: <MessageSquare size={28} />,
      title: "Custom Chatbots",
      description: "Intelligent, on-brand conversational AI tailored for customer support and sales, driving engagement and capturing leads 24/7."
    },
    {
      icon: <Database size={28} />,
      title: "MLOps Consulting",
      description: "Deploy, scale, and maintain machine learning systems reliably. We build robust infrastructure so your models stay performant."
    }
  ];

  return (
    <section className="section" id="services" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="content-right">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">What We <span className="text-gradient">Do</span></h2>
            <p className="section-subtitle">
              End-to-end intelligent systems that integrate seamlessly into your workflow.
            </p>
          </motion.div>
          
          <div className="grid" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {services.map((service, index) => (
              <Card key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
