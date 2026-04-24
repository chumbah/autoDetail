import BookingFlow from '../components/BookingFlow';

const Booking = () => {
  return (
    <div className="booking-page" style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        <BookingFlow />
      </div>
    </div>
  );
};

export default Booking;
