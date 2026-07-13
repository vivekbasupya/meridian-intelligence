const Footer = () => {
  return (
    <footer className="footer" style={{ background: 'transparent', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo">
              Meridian<span>Intelligence</span>
            </a>
            <p>
              Designing and deploying robust, scalable AI systems that redefine operational excellence.
            </p>
          </div>
          
          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">AI Automation</a></li>
              <li><a href="#services">Custom Chatbots</a></li>
              <li><a href="#services">MLOps Consulting</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><a href="#why-us">Why Us</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Connect</h4>
            <ul>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">hello@meridianintel.com</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Meridian Intelligence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
