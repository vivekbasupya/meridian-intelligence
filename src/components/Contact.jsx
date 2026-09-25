import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', requirements: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', requirements: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="section" id="contact" style={{ background: 'transparent' }}>
      <div className="container">
        <div className="contact-container" style={{ 
          background: 'rgba(255, 255, 255, 0.03)', 
          border: '1px solid rgba(255, 255, 255, 0.05)', 
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '4rem',
          maxWidth: '800px',
          margin: '0 auto',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)'
        }}>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>Ready to Transform Your Business?</h2>
          <p className="card-desc" style={{ marginBottom: '3rem', fontSize: '1.1rem', color: '#94a3b8' }}>
            Send us your requirements to discuss how custom AI infrastructure can accelerate your growth.
          </p>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleChange}
                required 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleChange}
                required 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <textarea 
                name="requirements" 
                placeholder="Tell us about your requirements..." 
                value={formData.requirements}
                onChange={handleChange}
                required 
                className="form-input form-textarea"
                rows="5"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className={`btn btn-primary btn-lg submit-btn ${status === 'loading' ? 'loading' : ''}`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
            </button>
            
            {status === 'error' && (
              <p className="form-error" style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
