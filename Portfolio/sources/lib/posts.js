// Devlog post files (sources/posts/<slug>.md) use one fixed frontmatter shape, written by /devlog/admin:
// ---\ntitle: "<JSON string>"\ndate: YYYY-MM-DD\npinned: true|false\n---\n\n<body>\n
const HEAD = /^---\ntitle: ([^\n]*)\ndate: (\d{4}-\d{2}-\d{2})\npinned: (true|false)\n---(?:\n|$)/;

const toLF = (text) => text.replace(/\r\n?/g, '\n');

// Returns null for anything that is not in the shape above, so one bad file never breaks the page.
export function parsePost(text) {
  const src = toLF(text);
  const m = HEAD.exec(src);
  if (!m) return null;
  let title;
  try { title = JSON.parse(m[1]); } catch { return null; }
  if (typeof title !== 'string' || !title.trim()) return null;
  let body = src.slice(m[0].length);
  if (body.startsWith('\n')) body = body.slice(1); // the blank line after the frontmatter
  if (body.endsWith('\n')) body = body.slice(0, -1); // the final newline serializePost adds
  return { title, date: m[2], pinned: m[3] === 'true', body };
}

export function serializePost({ title, date, pinned, body }) {
  return `---\ntitle: ${JSON.stringify(title)}\ndate: ${date}\npinned: ${pinned ? 'true' : 'false'}\n---\n\n${toLF(body)}\n`;
}

// Pinned first, then newest, then slug so the order is stable.
export function comparePosts(a, b) {
  return (b.pinned - a.pinned) || b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug);
}
