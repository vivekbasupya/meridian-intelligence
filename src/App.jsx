import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleNetwork from './components/ParticleNetwork';
import StoryGlobe from './components/StoryGlobe';

function App() {
  return (
    <>
      <ParticleNetwork />
      <Navbar />
      <main>
        <Hero />
        <div className="section-spacer" />
        <WhyUs />
        <div className="section-spacer" />
        <Services />
        <div className="section-spacer" />
        <Process />
        <div className="section-spacer" />
        <StoryGlobe />
        <div className="section-spacer" style={{ height: '30vh' }} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
