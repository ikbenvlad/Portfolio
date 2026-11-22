import React, { useState } from 'react';
import BlogPost from '../components/BlogPost';
import { parsePost, serializePost, comparePosts } from '../lib/posts';

// A static site cannot keep a secret, so each change is committed with the author's own
// GitHub token. The deploy workflow rebuilds the site when the commit lands on main.
const POSTS_API = 'https://api.github.com/repos/ikbenvlad/Portfolio/contents/Portfolio/sources/posts';

const ERRORS = {
  401: 'GitHub rejected the token. It may be mistyped or expired.',
  403: 'The token is not allowed to write to ikbenvlad/Portfolio. It needs Contents: read and write.',
  404: 'Repository not found for this token. Limit the token to ikbenvlad/Portfolio.',
  422: 'A post with this date and title already exists. Change the title, or edit that post.'
};
const CHANGED = 'This post changed elsewhere. Reload posts.';
const LIVE = 'Committed to main. Live after deploy (~1-2 min).';

const today = () => new Date().toLocaleDateString('en-CA'); // local YYYY-MM-DD

// btoa only accepts Latin-1, so encode the text as UTF-8 bytes first.
function toBase64(text) {
  let binary = '';
  new TextEncoder().encode(text).forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

// atob skips the line breaks GitHub puts in base64 content; the bytes are UTF-8.
function fromBase64(base64) {
  return new TextDecoder().decode(Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)));
}

function slugify(date, title) {
  const words = title.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
  // Titles with no Latin letters slug to nothing; a time suffix keeps same-day posts apart.
  return `${date}-${words || Date.now().toString(36)}`;
}

// `existing`: the request carried a sha we loaded, so 404/409/422 mean the file changed since.
async function errorMessage(res, existing) {
  const data = await res.json().catch(() => null);
  const detail = data && data.message ? ` (${res.status}: ${data.message})` : ` (${res.status})`;
  const changed = existing && [404, 409, 422].includes(res.status);
  return (changed ? CHANGED : ERRORS[res.status] || 'GitHub returned an error.') + detail;
}

function DevlogAdmin() {
  // Kept in memory only: every ikbenvlad.github.io/* site shares this origin, so no web storage.
  const [token, setToken] = useState('');
  const [posts, setPosts] = useState(null); // null until loaded; [{ slug, sha, title, date, pinned, body, broken? }]
  const [editing, setEditing] = useState(null); // slug of the post in the form; null = new post
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(today);
  const [body, setBody] = useState('');
  const [pinned, setPinned] = useState(false);
  const [busy, setBusy] = useState(false); // one request at a time keeps writes serial
  const [confirming, setConfirming] = useState(null); // slug whose Delete was clicked once
  const [status, setStatus] = useState(null); // { state: 'success' | 'error', message }

  const api = async (path, options) => {
    try {
      return await fetch(POSTS_API + path, {
        ...options,
        cache: 'no-store', // GitHub lets browsers cache reads for 60 s; always fetch the current sha
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
    } catch (err) {
      throw new Error(`Network error: ${err.message}`);
    }
  };

  const run = async (task) => {
    if (!token.trim()) {
      setStatus({ state: 'error', message: 'Enter the GitHub token first.' });
      return;
    }
    setBusy(true);
    setConfirming(null);
    setStatus(null);
    try {
      await task();
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    } finally {
      setBusy(false);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setTitle('');
    setDate(today());
    setBody('');
    setPinned(false);
  };

  // Returns the new sha from the response, so the list stays current without re-reading.
  const putPost = async (slug, post, sha, message) => {
    const res = await api(`/${encodeURIComponent(slug)}.md`, {
      method: 'PUT',
      // JSON.stringify drops an undefined sha, which makes this a create (422 if the file exists).
      body: JSON.stringify({ message, content: toBase64(serializePost(post)), sha, branch: 'main' })
    });
    if (!res.ok) throw new Error(await errorMessage(res, Boolean(sha)));
    return (await res.json()).content.sha;
  };

  const loadPosts = () => run(async () => {
    const res = await api('?ref=main');
    if (res.status === 404) { // the folder only exists once the first post is committed
      setPosts([]);
      return;
    }
    if (!res.ok) throw new Error(await errorMessage(res, false));
    const files = (await res.json()).filter((f) => f.type === 'file' && f.name.endsWith('.md'));
    const loaded = await Promise.all(files.map(async (f) => {
      const fileRes = await api(`/${encodeURIComponent(f.name)}?ref=main`);
      if (!fileRes.ok) throw new Error(await errorMessage(fileRes, false));
      const file = await fileRes.json();
      const post = parsePost(fromBase64(file.content))
        || { broken: true, title: f.name, date: '', pinned: false, body: '' };
      return { ...post, slug: f.name.slice(0, -'.md'.length), sha: file.sha };
    }));
    // A post open in the form that changed remotely would be overwritten by the next save, so close it.
    const openSha = editing && posts?.find((p) => p.slug === editing)?.sha;
    setPosts(loaded);
    if (editing && loaded.find((p) => p.slug === editing)?.sha !== openSha) {
      resetForm();
      setStatus({ state: 'error', message: 'The post you were editing changed elsewhere, so the form was closed. Open it again.' });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Keep first-line indentation: a body may open with an indented code block.
    const post = { title: title.trim(), date, pinned, body: body.replace(/^\n+|\s+$/g, '') };
    if (!post.title || !post.body || !date) {
      setStatus({ state: 'error', message: 'Title, date and body are all required.' });
      return;
    }
    // Never commit a file the public page would skip as malformed.
    if (!parsePost(serializePost(post))) {
      setStatus({ state: 'error', message: 'The date must be YYYY-MM-DD.' });
      return;
    }
    const current = editing && posts.find((p) => p.slug === editing);
    if (editing && !current) { // deleted by a reload; a sha-less PUT would silently re-create it
      setStatus({ state: 'error', message: CHANGED });
      return;
    }
    run(async () => {
      const slug = editing || slugify(date, post.title);
      const sha = await putPost(slug, post, current?.sha, `${editing ? 'Edit' : 'Add'} devlog post: ${post.title}`);
      setPosts((list) => list && [...list.filter((p) => p.slug !== slug), { ...post, slug, sha }]);
      resetForm();
      setStatus({ state: 'success', message: LIVE });
    });
  };

  const startEdit = (p) => {
    setEditing(p.slug);
    setTitle(p.title);
    setDate(p.date);
    setBody(p.body);
    setPinned(p.pinned);
    setConfirming(null);
    setStatus(null);
    document.getElementById('post-title').focus();
  };

  const togglePin = (p) => run(async () => {
    const next = { title: p.title, date: p.date, pinned: !p.pinned, body: p.body };
    const sha = await putPost(p.slug, next, p.sha, `${next.pinned ? 'Pin' : 'Unpin'} devlog post: ${p.title}`);
    setPosts((list) => list.map((q) => (q.slug === p.slug ? { ...q, ...next, sha } : q)));
    if (editing === p.slug) setPinned(next.pinned); // so saving the open form does not undo the toggle
    setStatus({ state: 'success', message: LIVE });
  });

  const removePost = (p) => {
    if (confirming !== p.slug) { // first click only arms the button
      setConfirming(p.slug);
      return;
    }
    run(async () => {
      const res = await api(`/${encodeURIComponent(p.slug)}.md`, {
        method: 'DELETE',
        body: JSON.stringify({ message: `Delete devlog post: ${p.title}`, sha: p.sha, branch: 'main' })
      });
      if (!res.ok) throw new Error(await errorMessage(res, true));
      setPosts((list) => list.filter((q) => q.slug !== p.slug));
      if (editing === p.slug) resetForm();
      setStatus({ state: 'success', message: LIVE });
    });
  };

  const sorted = posts && [...posts].sort(comparePosts);

  return (
    <section className="container">
      <h2 className="section-title">Devlog admin</h2>
      <div className="glass admin-card">
        <p>
          Needs a fine-grained personal access token limited to <strong>ikbenvlad/Portfolio</strong> with
          {' '}<strong>Contents: read and write</strong>. The token stays in this tab and is only sent to api.github.com.
        </p>
        <label htmlFor="post-token">GitHub token</label>
        <input id="post-token" type="password" autoComplete="off" value={token} onChange={(e) => setToken(e.target.value)} />
        <button type="button" onClick={loadPosts} disabled={busy}>{posts ? 'Reload posts' : 'Load posts'}</button>
        {sorted && sorted.length === 0 && <p>No posts yet.</p>}
        {sorted && sorted.length > 0 && (
          <ul className="admin-posts">
            {sorted.map((p) => {
              const arming = confirming === p.slug;
              return (
                <li key={p.slug}>
                  <span>
                    <strong>{p.title}</strong>{' '}
                    <small>{p.broken ? 'malformed frontmatter, fix it on GitHub' : p.date + (p.pinned ? ' · Pinned' : '')}</small>
                  </span>
                  <span>
                    <button type="button" onClick={() => startEdit(p)} disabled={busy || p.broken} aria-label={`Edit ${p.title}`}>
                      Edit
                    </button>
                    <button type="button" onClick={() => togglePin(p)} disabled={busy || p.broken} aria-label={`${p.pinned ? 'Unpin' : 'Pin'} ${p.title}`}>
                      {p.pinned ? 'Unpin' : 'Pin'}
                    </button>
                    <button type="button" className={arming ? 'danger' : undefined} onClick={() => removePost(p)} disabled={busy} aria-label={`${arming ? 'Confirm delete' : 'Delete'} ${p.title}`}>
                      {arming ? 'Confirm delete' : 'Delete'}
                    </button>
                    {arming && <button type="button" onClick={() => setConfirming(null)}>Cancel</button>}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {status?.state === 'success' && <p className="form-success" role="status">{status.message}</p>}
      {status?.state === 'error' && <p className="form-error" role="alert">{status.message}</p>}
      <div className="glass admin-card">
        <h3>{editing ? `Editing ${editing}.md` : 'New post'}</h3>
        <form onSubmit={handleSubmit} aria-label={editing ? 'Edit devlog post' : 'New devlog post'}>
          <label htmlFor="post-title">Title</label>
          <input id="post-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="post-date">Date</label>
          <input id="post-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <label htmlFor="post-body">Body (Markdown)</label>
          <textarea id="post-body" rows={12} value={body} onChange={(e) => setBody(e.target.value)} />
          <label className="form-check">
            <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} /> Pinned
          </label>
          <button type="submit" disabled={busy}>{busy ? 'Working...' : editing ? 'Save' : 'Publish'}</button>
          {editing && <button type="button" onClick={resetForm} disabled={busy}>Cancel edit</button>}
        </form>
        {body.trim() && (
          <details>
            <summary>Preview</summary>
            <BlogPost title={title} date={date} pinned={pinned} body={body} />
          </details>
        )}
      </div>
    </section>
  );
}

export default DevlogAdmin;
