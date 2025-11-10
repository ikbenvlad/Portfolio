import React, { useEffect } from 'react';
import gsap from 'gsap';
// Temporarily remove image imports until assets are added
// import projectImg1 from '../assets/project1.jpg';
// import projectImg2 from '../assets/project2.jpg';
// import projectImg3 from '../assets/project3.jpg';
import ProjectCard from '../components/ProjectCard';

function Projects() {
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
        <ProjectCard
          title="Project One"
          desc="A brief description of project one. It highlights the main features and technologies used."
        />
        <ProjectCard
          title="Project Two"
          desc="A brief description of project two. It showcases skills in modern web development."
        />
        <ProjectCard
          title="Project Three"
          desc="A brief description of project three. This project includes interactive and animated elements."
        />
      </div>
    </section>
  );
}

export default Projects;
