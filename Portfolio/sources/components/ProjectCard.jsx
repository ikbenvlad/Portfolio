import React from 'react';

function ProjectCard({ title, desc, img, link }) {
  const projectLink = link || 'https://github.com/ikbenvlad';

  return (
    <div className="glass project-card">
      <img src={img} alt={title} className="project-img" />
      <h3>{title}</h3>
      <p>{desc}</p>
      <a href={projectLink} target="_blank" rel="noopener noreferrer">
        <button>View Project</button>
      </a>
    </div>
  );
}

export default ProjectCard;
