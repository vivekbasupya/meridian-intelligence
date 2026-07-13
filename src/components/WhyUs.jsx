import { useRef } from 'react';
import { Zap, ShieldCheck, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ReasonCard = ({ reason, index }) => {
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
      style={{ padding: '2rem' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
        <div style={{ color: 'var(--text-primary)' }}>{reason.icon}</div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{reason.title}</h3>
      </div>
      <p className="card-desc">{reason.description}</p>
    </motion.div>
  );
};

const WhyUs = () => {
  const reasons = [
    {
      icon: <TrendingUp size={24} />,
      title: "Real ROI, Not Hype",
      description: "We focus on solutions that move the needle. If it doesn't improve efficiency or revenue, we don't build it."
    },
    {
      icon: <Zap size={24} />,
      title: "Deployed Fast",
      description: "Our lean approach means rapid prototyping and faster deployment. Start seeing value in weeks, not years."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Built for Scale",
      description: "Our architectures are enterprise-ready from day one, ensuring your systems handle growth seamlessly."
    }
  ];

  return (
    <section className="section" id="why-us" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="content-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title" style={{ textAlign: 'left' }}>Why Meridian <span className="text-gradient">Intelligence</span></h2>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: '0 0 3rem 0' }}>
              AI treated as a strategic asset, not just a buzzword.
            </p>
          </motion.div>
          
          <div className="grid" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {reasons.map((reason, index) => (
              <ReasonCard key={index} reason={reason} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
