import { useState } from 'react';
import { SERVICES } from '../data/services';
import { format, addDays, startOfToday } from 'date-fns';
import { ChevronRight, ArrowLeft, CheckCircle } from 'lucide-react';
import './BookingFlow.css';

const STEPS = ['Service', 'Date & Time', 'Details', 'Done'];

const TIME_SLOTS = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

const BookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    serviceId: null,
    date: startOfToday(),
    time: null,
    name: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
  });

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const updateData = (key, value) => {
    setBookingData(prev => ({ ...prev, [key]: value }));
  };

  const handleServiceSelect = (id) => {
    updateData('serviceId', id);
    handleNext();
  };

  const handleTimeSelect = (timeStr) => {
    updateData('time', timeStr);
    handleNext();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      handleNext();
    }, 1000);
  };

  const selectedService = SERVICES.find(s => s.id === bookingData.serviceId);

  // Generate next 7 days for selection
  const availableDates = Array.from({ length: 7 }).map((_, i) => addDays(startOfToday(), i));

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h2>Book Your Appointment</h2>
        <p>Follow the steps below to secure your spot.</p>
      </div>

      <div className="booking-stepper">
        {STEPS.map((step, idx) => (
          <div key={idx} className={`step ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}>
            <div className="step-number">{idx < currentStep ? <CheckCircle size={16} /> : idx + 1}</div>
            <div className="step-label">{step}</div>
            {idx < STEPS.length - 1 && <div className="step-line"></div>}
          </div>
        ))}
      </div>

      <div className="booking-content animate-fade-in">
        {currentStep === 0 && (
          <div className="step-service">
            <h3>Select a Service</h3>
            <div className="service-options">
              {SERVICES.map(service => (
                <div 
                  key={service.id} 
                  className={`service-option ${bookingData.serviceId === service.id ? 'selected' : ''}`}
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <div className="option-info">
                    <h4>{service.name}</h4>
                    <p>{service.duration}</p>
                  </div>
                  <div className="option-price">${service.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="step-datetime">
            <button className="btn-back" onClick={handleBack}><ArrowLeft size={16} /> Back</button>
            <h3>Select Date & Time</h3>
            
            <div className="date-selector">
              <h4>Date</h4>
              <div className="date-scroll">
                {availableDates.map((date, idx) => {
                  const isSelected = format(date, 'yyyy-MM-dd') === format(bookingData.date, 'yyyy-MM-dd');
                  return (
                    <div 
                      key={idx} 
                      className={`date-chip ${isSelected ? 'selected' : ''}`}
                      onClick={() => updateData('date', date)}
                    >
                      <span className="date-day">{format(date, 'EEE')}</span>
                      <span className="date-num">{format(date, 'd')}</span>
                      <span className="date-month">{format(date, 'MMM')}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="time-selector">
              <h4>Available Times for {format(bookingData.date, 'MMMM d, yyyy')}</h4>
              <div className="time-grid">
                {TIME_SLOTS.map((time, idx) => (
                  <div 
                    key={idx} 
                    className={`time-slot ${bookingData.time === time ? 'selected' : ''}`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="step-details">
            <button className="btn-back" onClick={handleBack}><ArrowLeft size={16} /> Back</button>
            <h3>Your Details</h3>
            
            <div className="summary-box">
              <h4>Booking Summary</h4>
              <p><strong>Service:</strong> {selectedService?.name} (${selectedService?.price})</p>
              <p><strong>When:</strong> {format(bookingData.date, 'MMMM d, yyyy')} at {bookingData.time}</p>
            </div>

            <form onSubmit={handleSubmit} className="details-form">
              <div className="form-group">
                <label>Full Name</label>
                <input required type="text" value={bookingData.name} onChange={e => updateData('name', e.target.value)} placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input required type="email" value={bookingData.email} onChange={e => updateData('email', e.target.value)} placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input required type="tel" value={bookingData.phone} onChange={e => updateData('phone', e.target.value)} placeholder="(555) 123-4567" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Vehicle Make</label>
                  <input required type="text" value={bookingData.vehicleMake} onChange={e => updateData('vehicleMake', e.target.value)} placeholder="e.g. Toyota" />
                </div>
                <div className="form-group">
                  <label>Vehicle Model</label>
                  <input required type="text" value={bookingData.vehicleModel} onChange={e => updateData('vehicleModel', e.target.value)} placeholder="e.g. Camry" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                Confirm Booking <ChevronRight size={18} />
              </button>
            </form>
          </div>
        )}

        {currentStep === 3 && (
          <div className="step-done text-center">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h3>Booking Confirmed!</h3>
            <p>Thank you, {bookingData.name}. Your appointment for a <strong>{selectedService?.name}</strong> on <strong>{format(bookingData.date, 'MMMM d')} at {bookingData.time}</strong> is set.</p>
            <p className="note">We've sent a confirmation email to {bookingData.email}.</p>
            <button className="btn btn-primary" onClick={() => window.location.href = '/'}>
              Return Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingFlow;
