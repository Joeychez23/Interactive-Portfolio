// Contact form plumbing, kept separate from the UI so it can be tested.

export const LIMITS = { name: 100, email: 254, subject: 150, message: 5000 };
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const TIMEOUT_MS = 15000;
const RETRY_DELAY_MS = 1500;

// The email Lambda's API URL, from client/.env
export function contactEndpoint() {
  return import.meta.env.VITE_EMAIL_URL || import.meta.env.REACT_APP_EMAIL_URL || null;
}

// Returns the list of missing/invalid fields, worded for "Please add …"
export function validate({ name, email, subject, message }) {
  const errors = [];
  if (name.trim().length < 2) errors.push('your name');
  if (!EMAIL_RE.test(email.trim()) || email.length > LIMITS.email) errors.push('a valid email');
  if (subject.trim().length < 2) errors.push('a subject');
  if (message.trim().length < 2) errors.push('a message');
  return errors;
}

// Trim and cap every field so nothing oversized is ever sent
export function toPayload(form) {
  const clip = (key) => form[key].trim().slice(0, LIMITS[key]);
  return { email: clip('email'), name: clip('name'), subject: clip('subject').replace(/[\r\n]+/g, ' '), message: clip('message') };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// POSTs to the Lambda, same contract as before: success means { status: 200 } back.
// A cold-starting Lambda can fail the first request with a gateway error (which
// the browser reports as a CORS block), so retry exactly once after a pause.
export async function sendContactMessage(payload, { endpoint = contactEndpoint(), retryDelay = RETRY_DELAY_MS } = {}) {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const last = attempt === 2;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (res.status >= 500 && !last) {
        await sleep(retryDelay);
        continue;
      }
      const data = await res.json().catch(() => null);
      return data?.status === 200;
    } catch {
      // Network error, timeout, or a CORS-masked gateway error
      if (last) return false;
      await sleep(retryDelay);
    }
  }
  return false;
}

// Fallback when sending fails: open the visitor's own mail app, pre-filled
export function mailtoLink(to, payload) {
  const body = `${payload.message}\n\n— ${payload.name} (${payload.email})`.slice(0, 1800);
  return `mailto:${to}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;
}
