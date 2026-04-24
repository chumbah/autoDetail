import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import './Auth.css';
import React from 'react';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    username: '',
    password: ''
  })


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{

    const response = await fetch('http://localhost:3000/api/auth/login',{
      method:  'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    const data = await response.json();

    if(!response.ok){
      alert(data.message || 'Wrong username or password!!')
      return;
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    localStorage.setItem('user', data.user?.name || data.name || form.username);
    navigate('/');

  }
  catch(err){
    console.error(err);
    alert('An error occurred during login. Please try again later.');
  }};

  return (
    <div className="auth-page">
      <div className="auth-container animate-fade-in">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to your AutoDetail Pro account.</p>
        </div>
        
        <form className="auth-form details-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input required type="text" name='username' id='username_id' placeholder="Enter your username" onChange={handleChange} />
            </div>
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input required type="password" name='password' id='password_id' placeholder="••••••••" onChange={handleChange} />
            </div>
          </div>
          
          <div className="auth-actions">
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          
          <button type="submit" className="btn btn-primary btn-full">
            Login <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
