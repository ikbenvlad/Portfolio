import React, { useEffect } from 'react';
import gsap from 'gsap';
import BlogPost from '../components/BlogPost';

// Posts are JSON files committed by /devlog/admin and bundled at build time.
const devlogPosts = Object.values(import.meta.glob('../posts/*.json', { eager: true, import: 'default' }))
  .sort((a, b) => b.date.localeCompare(a.date));

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
      {devlogPosts.length === 0 && <p>No posts yet. Check back soon.</p>}
      {devlogPosts.map((p) => (
        <BlogPost key={p.date + p.title} title={p.title} date={p.date} body={p.body} />
      ))}
    </section>
  );
}

export default Devlog;
