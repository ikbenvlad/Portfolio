import React, { useState } from 'react';

// A static site cannot keep a secret, so each post is committed with the author's own
// GitHub token. The deploy workflow rebuilds the site when the commit lands on main.
const POSTS_API = 'https://api.github.com/repos/ikbenvlad/Portfolio/contents/Portfolio/sources/posts/';

const ERRORS = {
  401: 'GitHub rejected the token. It may be mistyped or expired.',
  403: 'The token is not allowed to write to ikbenvlad/Portfolio. It needs Contents: read and write.',
  404: 'Repository not found for this token. Limit the token to ikbenvlad/Portfolio.',
  422: 'A post with this date and title already exists. Change the title.'
};

// btoa only accepts Latin-1, so encode the text as UTF-8 bytes first.
function toBase64(text) {
  let binary = '';
  new TextEncoder().encode(text).forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function slugify(date, title) {
  const words = title.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
  // Titles with no Latin letters slug to nothing; a time suffix keeps same-day posts apart.
  return `${date}-${words || Date.now().toString(36)}`;
}

function DevlogAdmin() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(() => new Date().toLocaleDateString('en-CA')); // local YYYY-MM-DD
  const [body, setBody] = useState('');
  // Kept in memory only: every ikbenvlad.github.io/* site shares this origin, so no web storage.
  const [token, setToken] = useState('');
  const [status, setStatus] = useState(null); // { state: 'sending' | 'success' | 'error', message }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim() || !date || !token.trim()) {
      setStatus({ state: 'error', message: 'Title, date, body and token are all required.' });
      return;
    }
    setStatus({ state: 'sending' });
    const post = { title: title.trim(), date, body: body.trim() };
    try {
      const res = await fetch(`${POSTS_API}${slugify(date, post.title)}.json`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        },
        body: JSON.stringify({
          message: `Add devlog post: ${post.title}`,
          content: toBase64(JSON.stringify(post, null, 2) + '\n'),
          branch: 'main'
        })
      });
      if (res.ok) {
        setStatus({ state: 'success' });
        setTitle('');
        setBody('');
        return;
      }
      const data = await res.json().catch(() => null);
      const detail = data && data.message ? ` (${res.status}: ${data.message})` : ` (${res.status})`;
      setStatus({ state: 'error', message: (ERRORS[res.status] || 'GitHub returned an error.') + detail });
    } catch (err) {
      setStatus({ state: 'error', message: `Network error: ${err.message}` });
    }
  };

  return (
    <section className="container">
      <h2 className="section-title">New devlog post</h2>
      <div className="glass">
        <p>
          Needs a fine-grained personal access token limited to <strong>ikbenvlad/Portfolio</strong> with
          {' '}<strong>Contents: read and write</strong>. The token stays in this tab and is only sent to api.github.com.
        </p>
        <form onSubmit={handleSubmit} aria-label="New devlog post">
          <label htmlFor="post-title">Title</label>
          <input id="post-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="post-date">Date</label>
          <input id="post-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <label htmlFor="post-body">Body (leave a blank line between paragraphs)</label>
          <textarea id="post-body" rows={12} value={body} onChange={(e) => setBody(e.target.value)} />
          <label htmlFor="post-token">GitHub token</label>
          <input id="post-token" type="password" autoComplete="off" value={token} onChange={(e) => setToken(e.target.value)} />
          <button type="submit" disabled={status?.state === 'sending'}>
            {status?.state === 'sending' ? 'Publishing...' : 'Publish'}
          </button>
        </form>
        {status?.state === 'success' && (
          <p className="form-success" role="status">Post committed to main. The site rebuilds in about 1-2 minutes.</p>
        )}
        {status?.state === 'error' && <p className="form-error" role="alert">{status.message}</p>}
      </div>
    </section>
  );
}

export default DevlogAdmin;
