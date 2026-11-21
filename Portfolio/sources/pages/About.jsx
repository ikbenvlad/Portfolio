import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import portrait from '../images/portrait.jpg';

function About() {
  useEffect(() => {
    gsap.from(".about-container", { opacity: 0, x: -50, duration: 1 });
  }, []);

  return (
    <section className="container">
      <h2 className="section-title">About Me</h2>
      <div className="glass about-container">
        <div className="about-inner">
          <img src={portrait} alt="Portrait" className="profile-portrait" />

          <div className="section-content">
            <p>Hi — I'm a teenage developer originally from Romania and now based in the Netherlands. I learn quickly, communicate clearly, and enjoy collaborating to solve problems.</p>

            <p>I have basic experience in a variety of coding languages and always want to improve my skills. I am very knowledge-hungry and am eager to learn from people's experiences.</p>

            <p>I'm actively seeking opportunities to expand my skills through school and internships. I'm excited to expand in the Game/Software development field and increase my knowledge.</p>

            <h3>Skills</h3>
            <p>Below are the languages and tools I've used in my projects and the ones I'm currently learning. I have a lot of knowledge in QA testing, more of which you can find on the <Link to="/testing" style={{ textDecoration: 'underline' }}>Testing experience</Link> page.</p>

            <h4>Used in projects</h4>
            <ul className="skills-list">
              <li>C# — Text based Adventure, QuantumVault</li>
              <li>Unity — QuantumVault</li>
              <li>Rust — Diorama Horizon</li>
              <li>Processing / Java — Catch the Balls</li>
              <li>Python — Caesar Cipher Shifts</li>
            </ul>

            <h4>Learning</h4>
            <ul className="skills-list">
              <li>PHP</li>
              <li>MySQL</li>
              <li>C++</li>
              <li>HTML / CSS</li>
              <li>Laravel</li>
            </ul>
            <p><strong>Open to internships, mentorships, and junior roles — reach out via the Contact page.</strong></p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
