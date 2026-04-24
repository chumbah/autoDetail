import React from 'react';

const About = () => {
  return (
    <div className="about-page" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>About AutoDetail Pro</h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-color)', marginBottom: '2rem' }}>
        Welcome to AutoDetail Pro! We are a passionate team of automotive professionals dedicated to providing
        top-tier car detailing services. With years of experience and a keen eye for perfection, we
        ensure your vehicle gets the premium care it deserves.
      </p>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-color)', marginBottom: '2rem' }}>
        Founded in 2010, AutoDetail Pro started with a simple vision: to elevate the standard of automotive care. Over the past decade, we have grown from a small local operation into a premier car detailing service recognized for our uncompromising quality and customer dedication. Our team of certified professionals undergoes rigorous training to stay up-to-date with the latest detailing techniques and protective coatings. We treat every vehicle as if it were our own, ensuring a meticulous finish that speaks for itself.
      </p>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-color)', marginBottom: '2rem' }}>
        From comprehensive exterior washes to deep interior cleaning and full-service packages, we
        use only the highest quality products and state-of-the-art techniques. Our mission is to restore 
        your car's pristine shine and keep it looking brand new!
      </p>
      <div style={{ marginTop: '3rem', background: 'var(--card-bg, #f9f9f9)', padding: '2rem', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Why Choose Us?</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem', color: 'var(--text-color)' }}>
          <li>✨ Expert Attention to Detail</li>
          <li>✨ Premium Tier Cleaning Products</li>
          <li>✨ Unmatched Customer Satisfaction</li>
          <li>✨ Fast, Friendly & Reliable Service</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
