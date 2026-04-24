import { SERVICES } from '../data/services';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ServicesMenu.css';

const ServicesMenu = () => {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Our Premium Packages</h2>
          <p className="section-subtitle">Choose the level of care your vehicle needs.</p>
        </div>
        
        <div className="services-grid">
          {SERVICES.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-img-wrapper">
                <img src={service.image} alt={service.name} className="service-img" />
                <div className="service-price">${service.price}</div>
              </div>
              <div className="service-content">
                <h3>{service.name}</h3>
                <p className="service-duration">⏱ {service.duration}</p>
                <p className="service-desc">{service.description}</p>
                
                <ul className="service-features" style={{ marginBottom: '24px' }}>
                  {service.features.map((feature, idx) => (
                    <li key={idx}><Check size={16} className="feature-icon" /> {feature}</li>
                  ))}
                </ul>
                <div style={{ marginTop: 'auto' }}>
                  <Link to="/booking" className="btn btn-outline" style={{ width: '100%' }}>Book Package</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesMenu;
