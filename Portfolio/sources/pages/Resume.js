import React, { useEffect } from 'react';
import gsap from 'gsap';

function Resume() {
  useEffect(() => {
    gsap.from(".resume-content", {
      scrollTrigger: { trigger: ".resume-content", start: "top 80%" },
      opacity: 0,
      duration: 1
    });
  }, []);

  return (
    <section className="container">
      <h2 className="section-title">Resume</h2>
      <div className="glass resume-content">
        <h3>Experience</h3>
        <ul>
          <li>
            <strong>Frontend Developer</strong> - Tech Company (2023 - Present)
            <p>Develop and maintain responsive web applications using React, Redux, and CSS frameworks.</p>
          </li>
          <li>
            <strong>Web Developer Intern</strong> - Web Agency (2021 - 2022)
            <p>Assisted in building client websites, implemented UI components and performed testing.</p>
          </li>
        </ul>
        <h3>Education</h3>
        <ul>
          <li>
            <strong>B.Sc. in Computer Science</strong> - University XYZ (2019 - 2023)
            <p>Graduated with honors, focusing on software development and user interface design.</p>
          </li>
        </ul>
        <h3>Skills</h3>
        <ul className="skills-list">
          <li>React</li>
          <li>JavaScript</li>
          <li>CSS &amp; Sass</li>
          <li>GSAP</li>
          <li>Git</li>
          <li>Node.js</li>
        </ul>
      </div>
    </section>
  );
}

export default Resume;
