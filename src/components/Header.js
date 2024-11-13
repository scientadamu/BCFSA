import React from 'react';

const Header = ({ isNavOpen, toggleMenu }) => {
  return (
    <header>
      <div className="logo"><img src="images/logo.png" alt="Logo" /> Bago CFSA</div>
      <nav className={isNavOpen ? 'active' : ''}>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#skills">Programms</a></li>
          <li><a href="#committees">Committees</a></li>
          <li><a href="#sponsors">Sponsors</a></li>
          <li><a href="#media">Media</a></li>
        </ul>

        <div className="hamburger-menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
