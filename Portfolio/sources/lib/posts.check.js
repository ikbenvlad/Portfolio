// Self-check for posts.js. Run from Portfolio/: node sources/lib/posts.check.js
import assert from 'node:assert/strict';
import { parsePost, serializePost, comparePosts } from './posts.js';

const titles = ['a: "b"', 'back\\slash \\n', '日本語のタイトル', 'colon: in title', 'multi\nline', 'line\u2028separator'];
const bodies = ['', 'plain', '\n\nleading blank lines', 'before\n---\nafter\n\n---\n', 'trailing newline\n', '---\ntitle: "fake"\n---'];
for (const title of titles) {
  for (const body of bodies) {
    for (const pinned of [true, false]) {
      const post = { title, date: '2026-11-22', pinned, body };
      assert.deepEqual(parsePost(serializePost(post)), post);
    }
  }
}

// CRLF files parse; serialize writes LF only.
assert.deepEqual(
  parsePost('---\r\ntitle: "T"\r\ndate: 2026-01-02\r\npinned: false\r\n---\r\n\r\nA\r\nB\r\n'),
  { title: 'T', date: '2026-01-02', pinned: false, body: 'A\nB' }
);
assert.ok(!serializePost({ title: 'T', date: '2026-01-02', pinned: true, body: 'a\r\nb\rc' }).includes('\r'));

const malformed = [
  '',
  'no frontmatter',
  '---\ntitle: T\ndate: 2026-01-02\npinned: false\n---\n', // title not JSON
  '---\ntitle: 5\ndate: 2026-01-02\npinned: false\n---\n', // title not a string
  '---\ntitle: "  "\ndate: 2026-01-02\npinned: false\n---\n', // blank title
  '---\ntitle: "T"\ndate: 2026-1-2\npinned: false\n---\n',
  '---\ntitle: "T"\ndate: 2026-01-02\npinned: yes\n---\n',
  '---\ntitle: "T"\ndate: 2026-01-02\n---\n', // pinned missing
  '---\ntitle: "T"\ndate: 2026-01-02\npinned: false\n---body', // no newline after closing ---
];
for (const text of malformed) assert.equal(parsePost(text), null, JSON.stringify(text));

const order = [
  { slug: 'b', date: '2026-01-01', pinned: false },
  { slug: 'a', date: '2026-01-01', pinned: false },
  { slug: 'old-pin', date: '2025-01-01', pinned: true },
  { slug: 'new', date: '2026-05-01', pinned: false },
].sort(comparePosts).map((p) => p.slug);
assert.deepEqual(order, ['old-pin', 'new', 'a', 'b']);

console.log('posts.js self-check passed');
