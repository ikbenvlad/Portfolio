import React, { useEffect } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

export default function Welcome() {
  useEffect(() => {
    gsap.from(".welcome-text", { opacity: 0, y: -50, duration: 1 });
    gsap.from(".welcome-subtext", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
  }, []);

  return (
    <section className="container welcome-section">
      <div className="glass welcome-content">
        <p className="welcome-greeting">Hi, I'm</p>
        <h1 className="welcome-text">Vlad</h1>
        <h2 className="welcome-subtitle">I build things for the web.</h2>
        <p className="welcome-subtext">
          Im a software developer specializing in creating Games and Web Applications on multiple platforms. 
        </p>
        <div className="welcome-cta">
            <Link to="/projects" className="cta-button">Check out my work!</Link>
        </div>
      </div>
    </section>
  );
}
