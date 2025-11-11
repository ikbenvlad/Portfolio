import React from 'react';

function BlogPost({ title, date, summary }) {
  return (
    <div className="glass blog-post">
      <h3>{title}</h3>
      <small>{date}</small>
      <p>{summary}</p>
      <a href="#">Read More</a>
    </div>
  );
}

export default BlogPost;
