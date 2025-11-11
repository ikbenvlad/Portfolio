import React, { useEffect } from 'react';
import gsap from 'gsap';
// Temporarily remove image import until asset is added
// import profilePic from '../assets/profile.jpg';

function About() {
  useEffect(() => {
    gsap.from(".about-container", { opacity: 0, x: -50, duration: 1 });
  }, []);

  return (
    <section className="container">
      <h2 className="section-title">About Me</h2>
      <div className="glass about-container">
        {/* Temporarily remove image until asset is added */}
        <div className="section-content">
          <p>Hello.</p>
          <p> alot of info here about me</p>
        </div>
      </div>
    </section>
  );
}

export default About;
