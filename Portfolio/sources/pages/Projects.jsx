import React, { useEffect } from 'react';
import gsap from 'gsap';
import ProjectCard from '../components/ProjectCard';

function Projects() {
  const projects = [
    {
      title: 'Caesar Cipher Shifts',
      desc: 'A small Python cipher shift which has a=b and a=z encoding.',
      link: 'https://github.com/ikbenvlad/Caesar-Cipher-Shifts'
    },
    {
      title: 'Text based Adventure',
      desc: 'A short terminal adventure game made in C#.',
      link: 'https://github.com/ikbenvlad/ROC-cSharp-TextBaseAdventure'
    },
    {
      title: 'Catch the Balls',
      desc: 'A Processing project in which you catch balls falling from the sky.',
      link: 'https://github.com/ikbenvlad/Eindopdracht-ROC-inleiding-programmeren'
    },
    {
      title: 'Diorama Horizon',
      desc: 'A minimap and world map engine written in Rust, with waypoints, a radar and cave views.',
      link: 'https://github.com/ikbenvlad/diorama-horizon'
    },
    {
      title: 'QuantumVault',
      desc: 'A team-made 3D puzzle game made in Unity. I worked on the player model, animations and narrator logic as well as documentation.',
      link: 'https://github.com/TREYX77/QuantumVault'
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
    </section>
  );
}

export default Projects;
