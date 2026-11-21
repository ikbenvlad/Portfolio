import React from 'react';

function BlogPost({ title, date, body }) {
  return (
    <div className="glass blog-post">
      <h3>{title}</h3>
      <small>{date}</small>
      {body.split(/\n\s*\n/).map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
}

export default BlogPost;
