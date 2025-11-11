import React from 'react';

function ProjectCard({ title, desc, img }) {
  return (
    <div className="glass project-card">
      <img src={img} alt={title} className="project-img" />
      <h3>{title}</h3>
      <p>{desc}</p>
      <button>View Project</button>
    </div>
  );
}

export default ProjectCard;
