import { motion } from 'framer-motion';

const StoryGlobe = () => {
  return (
    <section className="section" id="globe-finale" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container content-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2 className="section-title" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
            Bring Order to <span className="text-gradient">Chaos</span>
          </h2>
          <p className="section-subtitle" style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>
            We organize data and build intelligent systems that drive your business forward.
          </p>
          <motion.a 
            href="#contact" 
            className="btn btn-primary btn-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Strategy Call
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default StoryGlobe;
