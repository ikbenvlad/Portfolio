import React, { useEffect } from 'react';
import gsap from 'gsap';
import BlogPost from '../components/BlogPost';

function Devlog() {
  useEffect(() => {
    const posts = document.querySelectorAll('.blog-post');
    posts.forEach((post, i) => {
      gsap.from(post, {
        scrollTrigger: { trigger: post, start: 'top 90%' },
        opacity: 0,
        y: 50,
        delay: i * 0.2,
        duration: 1
      });
    });
  }, []);

  return (
    <section className="container">
      <h2 className="section-title">Devlog</h2>
      <BlogPost
        title="My First Blog Post"
        date="Jan 1, 2025"
        summary="This is a brief summary of my first blog post. It talks about my experiences learning React and building my first portfolio website."
      />
      <BlogPost
        title="Another Devlog Entry"
        date="Feb 15, 2025"
        summary="A summary of another entry. In this post, I discuss advanced CSS techniques and animations with GSAP."
      />
    </section>
  );
}

export default Devlog;
