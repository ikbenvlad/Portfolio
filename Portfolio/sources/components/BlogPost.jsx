import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const plugins = [remarkGfm];
// react-markdown escapes raw HTML and drops unsafe URLs by default; never add rehype-raw here.
const components = {
  a: ({ href, title, children }) => (
    <a href={href} title={title} target="_blank" rel="noopener noreferrer">{children}</a>
  )
};

function BlogPost({ title, date, pinned, body }) {
  return (
    <div className="glass blog-post">
      <h3>{title}</h3>
      <small>{pinned && <strong>Pinned · </strong>}{date}</small>
      <div className="post-body">
        <Markdown remarkPlugins={plugins} components={components}>{body}</Markdown>
      </div>
    </div>
  );
}

export default BlogPost;
