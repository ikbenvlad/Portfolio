import React, { useEffect } from 'react';
import gsap from 'gsap';
import BlogPost from '../components/BlogPost';
import { parsePost, comparePosts } from '../lib/posts';

// Posts are Markdown files committed by /devlog/admin and bundled at build time.
const devlogPosts = Object.entries(import.meta.glob('../posts/*.md', { eager: true, query: '?raw', import: 'default' }))
  .map(([path, text]) => {
    const post = parsePost(text);
    // Skip hand-edited files with broken frontmatter, so one bad post can't crash the app.
    return post && { ...post, slug: path.slice(path.lastIndexOf('/') + 1, -'.md'.length) };
  })
  .filter(Boolean)
  .sort(comparePosts);

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
        <BlogPost key={p.slug} title={p.title} date={p.date} pinned={p.pinned} body={p.body} />
      ))}
    </section>
  );
}

export default Devlog;
