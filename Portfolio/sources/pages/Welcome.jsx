import React, { useEffect } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import portraitImg from '../images/portrait.jpg';

export default function Welcome() {
  useEffect(() => {
    // Use a timeline and transform-only animation for the portrait to avoid layout jumps
    const tl = gsap.timeline({ defaults: { clearProps: 'all' } });

    // Portrait - from offscreen to zero using transform (x) and autoAlpha for smooth fade
    tl.fromTo(
      '.welcome-portrait',
      { x: -120, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', overwrite: true },
    );

    // Staggered text animations
    tl.from('.welcome-greeting', { y: 20, autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4');
    tl.from('.welcome-text', { y: -40, autoAlpha: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3');
    tl.from('.welcome-subtitle', { y: 20, autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, '-=0.35');
    tl.from('.welcome-subtext', { y: 20, autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, '-=0.35');
    tl.from('.welcome-cta', { y: 30, autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, '-=0.25');

    return () => tl.kill();
  }, []);

  return (
    <section className="container welcome-section">
      <div className="welcome-container">
        <div className="welcome-portrait-wrapper">
          <img src={portraitImg} alt="Vlad" className="welcome-portrait" />
        </div>
        <div className="glass welcome-content">
          <p className="welcome-greeting">Hi, I'm</p>
          <h1 className="welcome-text">Vlad</h1>
          <h2 className="welcome-subtitle">I build things for the web.</h2>
          <p className="welcome-subtext">
            I'm a software developer specializing in creating Games and Web Applications on multiple platforms. 
          </p>
          <div className="welcome-cta">
              <Link to="/projects" className="cta-button">Check out my work!</Link>
          </div>
        </div>
      </div>
    </section>
  );
}