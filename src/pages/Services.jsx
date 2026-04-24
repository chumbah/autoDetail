import React from 'react';
import ServicesMenu from '../components/ServicesMenu';

const Services = () => {
  return (
    <div className="services-page" style={{ paddingTop: '80px', paddingBottom: '80px', backgroundColor: 'var(--bg-primary)' }}>
      <ServicesMenu />
    </div>
  );
};

export default Services;
