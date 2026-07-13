import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="hero-section" id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <motion.div 
          className="content-left"
          style={{ y, opacity }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div style={{ overflow: 'hidden' }}>
            <motion.h1 
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="hero-title"
            >
              We Deploy Smart AI Systems That <span className="text-gradient">Transform</span> Operations.
            </motion.h1>
          </div>

          <motion.p variants={itemVariants} className="hero-subtitle">
            Intelligent automation and custom architectures built for scale.
          </motion.p>
          <motion.div variants={itemVariants} className="hero-actions" style={{ justifyContent: 'flex-start' }}>
            <motion.a 
              href="#contact" 
              className="btn btn-primary btn-lg"
            >
              Start a Project
            </motion.a>
            <motion.a 
              href="#services" 
              className="btn btn-outline btn-lg"
            >
              See What We Build
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
