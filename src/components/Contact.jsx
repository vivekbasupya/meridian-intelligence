const Contact = () => {
  return (
    <section className="section" id="contact" style={{ background: 'transparent' }}>
      <div className="container">
        <div className="contact-container" style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>Ready to Transform Your Business?</h2>
          <p className="card-desc" style={{ marginBottom: '2.5rem', fontSize: '1.1rem' }}>
            Book a discovery call to discuss how custom AI infrastructure can accelerate your growth and streamline your operations.
          </p>
          <a 
            href="https://calendly.com/placeholder" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary btn-lg"
            style={{ padding: '1.25rem 3rem', fontSize: '1.125rem', boxShadow: '0 0 30px rgba(37, 99, 235, 0.4)' }}
          >
            Book a Call
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
