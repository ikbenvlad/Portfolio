import React, { useEffect } from 'react';
import gsap from 'gsap';
import ProjectCard from '../components/ProjectCard';

function Projects() {
  const projects = [
    {
      title: 'Caesar Cipher Shifts',
      desc: 'A sall cipher shift which has a=b and a=z encoding.',
      img: 'https://via.placeholder.com/300x200?text=Project+1',
      link: 'https://github.com/ikbenvlad/Caesar-Cipher-Shifts'
    },
    {
      title: 'Project 2',
      desc: 'A short terminal adventure game made in Visual Studio with C#.',
      img: 'https://via.placeholder.com/300x200?text=Project+2',
      link: 'https://github.com/ikbenvlad/ROC-cSharp-TextBaseAdventure'
    },
    {
      title: 'Project 3',
      desc: 'A Processing project in which you catch balls falling from the sky.',
      img: 'https://via.placeholder.com/300x200?text=Project+3',
      link: 'https://github.com/ikbenvlad/Eindopdracht-ROC-inleiding-programmeren'
    }
  ];

  useEffect(() => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 90%' },
        opacity: 0,
        y: 30,
        delay: i * 0.2,
        duration: 1
      });
    });
  }, []);

  return (
    <section className="container">
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <ProjectCard
            key={i}
            title={p.title}
            desc={p.desc}
            img={p.img}
            link={p.link}
          />
        ))}
      </div>
      <div className="projects-cta">
        <a href="https://www.github.com/ikbenvlad" target="_blank" rel="noopener noreferrer" className="github-button">
          View My GitHub profile
        </a>
      </div>
    </section>
  );
}

export default Projects;
