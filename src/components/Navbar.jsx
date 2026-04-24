import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Droplet, Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(localStorage.getItem('user'));

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch('http://localhost:3000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            const name = data.user.name || data.user.username;
            localStorage.setItem('user', name);
            setUser(name);
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          }
        } catch (error) {
          console.error('Failed to fetch user session', error);
        }
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, [location.pathname]);

  const firstName = user ? user.split(' ')[0] : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <Droplet size={28} className="logo-icon" />
          <span className="logo-text">AutoDetail Pro</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-auth-buttons" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {firstName ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                  <User size={20} />
                  <span>{firstName}</span>
                </div>
                <button onClick={handleLogout} className="nav-link" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}>
                  Log Out
                </button>
              </div>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="mobile-menu animate-fade-in">
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {firstName ? (
              <>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 1rem', fontWeight: '500' }}>
                  <User size={20} />
                  <span>{firstName}</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="mobile-nav-link" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', width: '100%', textAlign: 'left' }}>
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Login</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
