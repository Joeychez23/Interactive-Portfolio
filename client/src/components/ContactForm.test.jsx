import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ContactForm from './ContactForm';
import { LIMITS, mailtoLink, sendContactMessage, toPayload, validate } from '../lib/contact';

const LAMBDA_URL = 'https://api.example.test/api/email';
const ok = () => new Response(JSON.stringify({ status: 200 }), { status: 200 });
const gatewayError = () => new Response(JSON.stringify({ message: 'Internal server error' }), { status: 502 });
const payload = { name: 'Ada', email: 'ada@example.com', subject: 'Hi', message: 'Hello there' };

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  cleanup();
});

describe('sendContactMessage', () => {
  it('sends once when the Lambda answers', async () => {
    const fetchMock = vi.fn().mockResolvedValue(ok());
    vi.stubGlobal('fetch', fetchMock);
    await expect(sendContactMessage(payload, { endpoint: LAMBDA_URL, retryDelay: 0 })).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual(payload);
  });

  it('retries exactly once after a gateway error (cold start)', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(gatewayError()).mockResolvedValueOnce(ok());
    vi.stubGlobal('fetch', fetchMock);
    await expect(sendContactMessage(payload, { endpoint: LAMBDA_URL, retryDelay: 0 })).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('retries once after a network/CORS failure, then gives up', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    vi.stubGlobal('fetch', fetchMock);
    await expect(sendContactMessage(payload, { endpoint: LAMBDA_URL, retryDelay: 0 })).resolves.toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('does not retry when the Lambda answers but reports failure', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ status: 500 }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    await expect(sendContactMessage(payload, { endpoint: LAMBDA_URL, retryDelay: 0 })).resolves.toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe('form helpers', () => {
  it('validates required fields', () => {
    expect(validate({ name: 'A', email: 'nope', subject: '', message: '' })).toEqual([
      'your name',
      'a valid email',
      'a subject',
      'a message',
    ]);
    expect(validate(payload)).toEqual([]);
  });

  it('trims, caps lengths, and keeps the subject on one line', () => {
    const out = toPayload({ ...payload, subject: ' Hi\r\nBcc: x ', message: 'x'.repeat(LIMITS.message + 50) });
    expect(out.subject).toBe('Hi Bcc: x');
    expect(out.message).toHaveLength(LIMITS.message);
  });

  it('builds an encoded mailto fallback', () => {
    const link = mailtoLink('me@example.com', { ...payload, subject: 'Hi & bye' });
    expect(link).toMatch(/^mailto:me@example\.com\?subject=Hi%20%26%20bye&body=/);
  });
});

describe('ContactForm', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubEnv('VITE_EMAIL_URL', LAMBDA_URL);
  });

  const fillForm = () => {
    fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: payload.name } });
    fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), { target: { value: payload.email } });
    fireEvent.change(screen.getByPlaceholderText('Your subject'), { target: { value: payload.subject } });
    fireEvent.change(screen.getByPlaceholderText(/Tell me about/), { target: { value: payload.message } });
  };

  it('posts the message to the Lambda URL and shows success', async () => {
    const fetchMock = vi.fn().mockResolvedValue(ok());
    vi.stubGlobal('fetch', fetchMock);
    render(<ContactForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/I'll get back to you soon/)).toBeTruthy();
    expect(fetchMock.mock.calls[0][0]).toBe(LAMBDA_URL);
  });

  it('silently drops submissions that fill the honeypot', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const { container } = render(<ContactForm />);
    fillForm();
    fireEvent.change(container.querySelector('label[aria-hidden] input'), { target: { value: 'Spam Inc' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/I'll get back to you soon/)).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('offers an email fallback when sending fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    render(<ContactForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    // waits out the single 1.5s retry pause
    const link = await screen.findByRole('link', { name: /email it instead/i }, { timeout: 3000 });
    expect(link.getAttribute('href')).toMatch(/^mailto:/);
  });
});
