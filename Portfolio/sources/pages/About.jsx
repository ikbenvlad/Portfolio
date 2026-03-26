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
            <p>I have basic experiece in coding languages such as C#, C++, PHP, MySQL, and others. I have a lot of knowledge with QA testing, more of which you can find on the <Link to="/testing" style={{ textDecoration: 'underline' }}>Testing experience</Link> page.</p>

            <h3>Language Abilities</h3>
            <div className="language-abilities">
              <div className="skill-row">
                <div className="skill-label">Python</div>
                <div className="skill-track" role="img" aria-label="Python skill 20 percent">
                  <div className="skill-fill" style={{ width: '20%' }}>
                    <span className="skill-percent">20%</span>
                  </div>
                </div>
              </div>

              <div className="skill-row">
                <div className="skill-label">Unity</div>
                <div className="skill-track" role="img" aria-label="Unity skill 65 percent">
                  <div className="skill-fill" style={{ width: '65%' }}>
                    <span className="skill-percent">65%</span>
                  </div>
                </div>
              </div>

              <div className="skill-row">
                <div className="skill-label">C#</div>
                <div className="skill-track" role="img" aria-label="C Sharp skill 65 percent">
                  <div className="skill-fill" style={{ width: '65%' }}>
                    <span className="skill-percent">65%</span>
                  </div>
                </div>
              </div>

              <div className="skill-row">
                <div className="skill-label">JavaScript</div>
                <div className="skill-track" role="img" aria-label="JavaScript skill 33 percent">
                  <div className="skill-fill" style={{ width: '33%' }}>
                    <span className="skill-percent">33%</span>
                  </div>
                </div>
              </div>

              <div className="skill-row">
                <div className="skill-label">HTML / CSS</div>
                <div className="skill-track" role="img" aria-label="HTML and CSS skill 75 percent">
                  <div className="skill-fill" style={{ width: '75%' }}>
                    <span className="skill-percent">75%</span>
                  </div>
                </div>
              </div>
            </div>

            <p><strong>Open to internships, mentorships, and junior roles — reach out via the Contact page.</strong></p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
