import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import './Auth.css';
import React from 'react';




const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
    
    if(!response.ok) {
      alert(data.message || 'Registration failed !!')
      return;
    }

    navigate('/Login')
    }
    catch(err){
      console.error(err);
      alert('An error occurred during registration. Please try again later.');
    }
  };


  

  return (
    <div className="auth-page">
      <div className="auth-container animate-fade-in">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join AutoDetail Pro to manage your bookings.</p>
        </div>
        
        <form className="auth-form details-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input required type="text" id='name_id' name='name' placeholder="John Doe" onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input required type="email" id='email_id' name='email' placeholder="you@example.com" onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Username</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input required type="text" id='username_id' name='username' placeholder="Johnie" onChange={handleChange} />
            </div>
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input required type="password" id='password_id' name='password' placeholder="Create a strong password" onChange={handleChange} />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary btn-full">
            Create Account <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
