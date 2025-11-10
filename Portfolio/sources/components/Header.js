import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Header({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav className="container">
        <div className="logo">My Portfolio</div>
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <span className="menu-icon"></span>
        </button>
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              About Me
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/devlog" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Devlog
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/resume" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Resume
            </NavLink>
          </li>
          <li>
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
