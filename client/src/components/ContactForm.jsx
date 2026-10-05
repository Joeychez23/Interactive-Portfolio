import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { profile } from '../data/portfolio';
import { contactEndpoint, LIMITS, mailtoLink, sendContactMessage, toPayload, validate } from '../lib/contact';

// The contact form: validates, posts to the email Lambda (see lib/contact.js), and offers a
// pre-filled email instead if sending fails. A hidden honeypot field catches bots.

const SENT_KEY = 'messageBool'; // same key as the old site, so past senders stay "sent"
const listFmt = new Intl.ListFormat('en', { type: 'conjunction' });

function readSent() {
  try {
    return Boolean(localStorage.getItem(SENT_KEY));
  } catch {
    return false;
  }
}

const label = 'mb-1 block t-spec text-dim';
const field =
  'w-full border-2 border-ink-3 bg-ink-2 px-3 py-2.5 text-[13.5px] text-paper caret-yellow placeholder:text-dim/70 focus:border-yellow focus:outline-none';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  // Honeypot: hidden from people, but bots that fill every field will fill it
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState(readSent() ? 'sent' : 'idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const [fallback, setFallback] = useState(null); // mailto link offered when sending fails

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missing = validate(form);
    if (missing.length) {
      setStatus('error');
      setError(`Please add ${listFmt.format(missing)}.`);
      return;
    }
    const payload = toPayload(form);
    const endpoint = contactEndpoint();
    if (!endpoint) {
      setStatus('error');
      setError("The contact form isn't configured here.");
      setFallback(mailtoLink(profile.email, payload));
      return;
    }

    setStatus('sending');
    setError('');
    setFallback(null);
    // A filled honeypot means a bot: act as if it worked, send nothing
    const ok = company ? true : await sendContactMessage(payload, { endpoint });
    if (!ok) {
      setStatus('error');
      setError("Couldn't reach the mail server. Try again in a moment, or");
      setFallback(mailtoLink(profile.email, payload));
      return;
    }
    try {
      localStorage.setItem(SENT_KEY, 'true');
    } catch {
      // non-fatal: only means the form re-enables on the next visit
    }
    setStatus('sent');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const sent = status === 'sent';

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Name</span>
          <input className={field} value={form.name} onChange={update('name')} maxLength={LIMITS.name} placeholder="Your name" autoComplete="name" />
        </label>
        <label className="block">
          <span className={label}>Email</span>
          <input
            className={field}
            type="email"
            value={form.email}
            onChange={update('email')}
            maxLength={LIMITS.email}
            placeholder="your.email@example.com"
            autoComplete="email"
          />
        </label>
      </div>
      <label className="block">
        <span className={label}>Subject</span>
        <input className={field} value={form.subject} onChange={update('subject')} maxLength={LIMITS.subject} placeholder="Your subject" />
      </label>
      <label className="block">
        <span className={label}>Message</span>
        <textarea
          className={`${field} min-h-28 resize-y`}
          rows={5}
          value={form.message}
          onChange={update('message')}
          maxLength={LIMITS.message}
          placeholder="Tell me about your opportunity…"
        />
      </label>

      {/* Honeypot: zero height (its margin cancels the form's gap) and out of the tab order */}
      <label aria-hidden="true" className="-mt-3 h-0 overflow-hidden">
        Company
        <input tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
      </label>

      <button
        type="submit"
        disabled={status === 'sending' || sent}
        className="flex h-12 items-center justify-between bg-yellow px-4 t-head text-sm text-ink transition-colors hover:bg-paper disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sent ? 'Message sent' : status === 'sending' ? 'Sending…' : 'Send message'}
        {sent ? <Check size={18} strokeWidth={2.5} /> : <ArrowUpRight size={18} strokeWidth={2.5} />}
      </button>
      <p aria-live="polite" className={`min-h-5 text-[13px] ${status === 'error' ? 'text-[#ff8a7a]' : 'text-yellow'}`}>
        {status === 'error' ? error : sent ? "Thanks! I'll get back to you soon." : ''}
        {status === 'error' && fallback && (
          <>
            {' '}
            <a href={fallback} className="underline underline-offset-4 hover:text-paper">
              email it instead
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
