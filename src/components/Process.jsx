import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Process = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      num: "01",
      title: "Discover",
      desc: "We analyze your workflows to identify high-impact AI opportunities."
    },
    {
      num: "02",
      title: "Design",
      desc: "We architect a custom solution tailored to your specific goals."
    },
    {
      num: "03",
      title: "Build",
      desc: "Our engineers develop and test the models and infrastructure."
    },
    {
      num: "04",
      title: "Deploy & Scale",
      desc: "We launch the system and provide ongoing MLOps support."
    }
  ];

  return (
    <section className="section" id="process" ref={containerRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="content-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">How We <span className="text-gradient">Work</span></h2>
            <p className="section-subtitle">
              A transparent, iterative process designed to deliver rapid value and scalable results.
            </p>
          </motion.div>

          <div className="process-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative' }}>

            {steps.map((step, index) => (
              <motion.div 
                className="process-step" 
                key={index}
                style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', position: 'relative', zIndex: 3 }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div>
                  <h3 className="step-title" style={{ marginTop: '10px' }}>{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
