import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="container hero-container">
        <div className="hero-content animate-fade-in">
          <div className="tagline">Premium Auto Spa Experience</div>
          <h1 className="hero-title">
            Restore the <span>Showroom</span> <br/>Shine.
          </h1>
          <p className="hero-subtitle">
            Professional car detailing coming to you or safely at our specialized spa. We handle every detail, so you don't have to.
          </p>
          
          <div className="hero-features">
            <div className="feature">
              <CheckCircle2 className="check-icon" size={20} /> Only Premium Products
            </div>
            <div className="feature">
              <CheckCircle2 className="check-icon" size={20} /> Vetted Professionals
            </div>
          </div>
          
          <div className="hero-cta">
            <Link to="/booking" className="btn btn-primary btn-lg">
              Book a Service <ArrowRight size={20} style={{ marginLeft: '8px' }} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
