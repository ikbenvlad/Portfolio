import React, { useState } from 'react';

// Simple contact form using Formspree (works on static hosts like GitHub Pages)
// 1. Sign up at https://formspree.io and create a form to get a FORM_ID (looks like "f/xxxxxxx").
// 2. Replace FORM_ID below with your Formspree form id.
// 3. Alternatively use EmailJS or a serverless function if you prefer.

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwpakedo'; // <-- replace this

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      // Use FormData so Formspree receives the form as a normal HTML form submit
      const formData = new FormData();
      formData.append('name', name);
  formData.append('email', email);
  // helpful for Formspree to set the reply-to header in notification emails
  formData.append('_replyto', email);
  formData.append('_subject', `New message from ${name}`);
      formData.append('message', message);

      console.debug('Submitting contact form to', FORMSPREE_ENDPOINT);
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
          // NOTE: do not set Content-Type for FormData; the browser will set the boundary
        },
        body: formData
      });

      const data = await res.json().catch(() => null);
      console.debug('Formspree response', res.status, data);

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        // capture server-provided message for debugging
        const serverMsg = (data && (data.error || (data.errors && data.errors.map(e => e.message).join('; ')))) || 'Unknown error';
        console.error('Formspree error', res.status, serverMsg, data);
        setStatus({ state: 'error', message: serverMsg });
      }
    } catch (err) {
      console.error(err);
      setStatus({ state: 'error', message: err.message || 'Network error' });
    }
  };

  return (
    <section className="container">
      <h2 className="section-title">Contact</h2>
      <div className="glass contact-container">
        <form onSubmit={handleSubmit} aria-label="Contact form">
          <label style={{display:'none'}} htmlFor="contact-name">Your Name</label>
          <input id="contact-name" name="name" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />

          <label style={{display:'none'}} htmlFor="contact-email">Your Email</label>
          <input id="contact-email" name="email" type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label style={{display:'none'}} htmlFor="contact-message">Your Message</label>
          <textarea id="contact-message" name="message" placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} />

          <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send Message'}</button>
        </form>

        {status === 'success' && <p className="form-success">Thanks — your message has been sent!</p>}
        {(status === 'error' || (status && status.state === 'error')) && (
          <p className="form-error">Sorry, something went wrong. {status && status.message ? `(${status.message})` : 'Please try again.'}</p>
        )}

        <div className="contact-info">
          <p><strong>Email:</strong> vlad@tarba.nl</p>
          <p><strong>Phone:</strong> +31642852508</p>
          <p><strong>Discord:</strong> ikbenvlad</p>
          <p>Feel free to reach out for collaborations or just a friendly hello!</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
