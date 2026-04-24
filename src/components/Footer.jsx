import { Shield, Star, Clock } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="logo-text">AutoDetail Pro</div>
          <p className="footer-desc">
            Premium mobile and in-shop car detailing services. We bring the shine back to your ride.
          </p>
          <div className="footer-badges">
            <div className="badge"><Shield size={16} /> Fully Insured</div>
            <div className="badge"><Star size={16} /> 5-Star Rated</div>
            <div className="badge"><Clock size={16} /> Available 7 Days</div>
          </div>
        </div>
        
        <div className="footer-links">
          <h4>Services</h4>
          <ul>
            <li><a href="#">Full Detail</a></li>
            <li><a href="#">Exterior Wash</a></li>
            <li><a href="#">Interior Deep Clean</a></li>
            <li><a href="#">Ceramic Coating</a></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>00100 Central Business District</p>
          <p>Nairobi, Kenya 00100</p>
          <p>aleckipchumba@gmail.com</p>
          <p>+254741427584</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AutoDetail Pro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
