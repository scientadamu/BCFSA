import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Login from './Login';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const navigateToDashboard = () => {
    setShowUserMenu(false);
    switch (user?.role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'trainer':
        navigate('/trainer');
        break;
      case 'trainee':
        navigate('/student');
        break;
      case 'corp_member':
        navigate('/corp');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="logo">
          <Link to="/" onClick={handleLinkClick}>
            <img src={require('../assets/images/general/BcscLogo.png')} alt="BCFSA Logo" className="logo-image" />
            <div className="logo-content">
              <span className="logo-text">BCFSA</span>
              <span className="logo-subtitle">Skills Center</span>
            </div>
          </Link>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul>
            <li>
              <Link
                to="/"
                onClick={handleLinkClick}
                className={isActive('/') ? 'active' : ''}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={handleLinkClick}
                className={isActive('/about') ? 'active' : ''}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/programs"
                onClick={handleLinkClick}
                className={isActive('/programs') ? 'active' : ''}
              >
                Programs
              </Link>
            </li>
            <li>
              <Link
                to="/registration"
                onClick={handleLinkClick}
                className={isActive('/registration') ? 'active' : ''}
              >
                Registration
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={handleLinkClick}
                className={isActive('/contact') ? 'active' : ''}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-auth">
          {user ? (
            <div className="user-menu">
              <button
                className="user-avatar"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <img src={user.avatar || '/api/placeholder/40/40'} alt={user.name} />
                <span className="user-name">{user.name}</span>
                <span className="user-role">{user.role}</span>
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <button onClick={navigateToDashboard} className="dropdown-item">
                    <span className="dropdown-icon">🏠</span>
                    Dashboard
                  </button>
                  <button onClick={() => navigate('/profile')} className="dropdown-item">
                    <span className="dropdown-icon">👤</span>
                    Profile
                  </button>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <span className="dropdown-icon">🚪</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="login-btn"
              onClick={() => setShowLogin(true)}
            >
              <span className="login-icon">🔐</span>
              Login
            </button>
          )}
        </div>

        <div className="hamburger-menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {showLogin && (
        <Login onClose={() => setShowLogin(false)} />
      )}
    </header>
  );
};

export default Header;
