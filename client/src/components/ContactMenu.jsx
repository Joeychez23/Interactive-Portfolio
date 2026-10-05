import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, Copy, X } from 'lucide-react';
import { profile } from '../data/portfolio';
import { useContactMenu } from '../lib/contactMenu';
import { PROFILES } from '../lib/profiles';
import ContactForm from './ContactForm';
import { Mark } from './sign';

// Contact menu: unfolds under the nav when Contact is clicked, pushing the page down rather
// than floating over it. Quick channels on one side, the message form on the other. Esc, a
// click outside, changing page or Close folds it away.

const tile = 'flex min-h-16 flex-col justify-between bg-ink-2 px-3 py-2.5 transition-colors hover:bg-ink-3';

function Channels() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard blocked; the address is on screen to copy by hand
    }
  };

  return (
    <ul className="grid grid-cols-2 gap-1">
      <li className="col-span-2">
        <button type="button" onClick={copyEmail} aria-label="Copy email address" className={`${tile} w-full text-left`}>
          <span className="flex justify-between t-spec text-dim">Email {copied ? <Check size={13} className="text-yellow" /> : <Copy size={13} />}</span>
          <span className="t-head text-[13px] break-all normal-case">{copied ? 'Copied to clipboard' : profile.email}</span>
        </button>
      </li>
      <li>
        <a href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`} className={tile}>
          <span className="t-spec text-dim">Phone</span>
          <span className="t-head text-[12px]">{profile.phone}</span>
        </a>
      </li>
      <li>
        <p className={`${tile} hover:bg-ink-2`}>
          <span className="t-spec text-dim">Location</span>
          <span className="t-head text-[12px]">{profile.location}</span>
        </p>
      </li>
      {PROFILES.map((s) => (
        <li key={s.site}>
          <a href={s.link} target="_blank" rel="noopener noreferrer" className={tile}>
            <span className="flex justify-between t-spec text-dim">
              {s.site} <ArrowUpRight size={13} />
            </span>
            <span className="t-head text-[12px] normal-case">{s.handle}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function ContactMenu() {
  const { open, setOpen } = useContactMenu();
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus({ preventScroll: true });
    const close = () => setOpen(false);
    const onKey = (e) => e.key === 'Escape' && close();
    const onDown = (e) => {
      if (panelRef.current?.contains(e.target) || e.target.closest?.('[data-contact-toggle]')) return;
      close();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('hashchange', close);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('hashchange', close);
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id="contact-menu"
          role="dialog"
          aria-label="Contact"
          className="overflow-hidden border-t border-ink-3"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0, transition: { duration: 0.22, ease: [0.7, 0, 0.3, 1] } }}
          transition={{ duration: 0.38, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div ref={panelRef} tabIndex={-1} className="max-h-[calc(100dvh-5.5rem)] overflow-y-auto outline-none lg:max-h-[calc(100dvh-3rem)]">
            <div className="mx-auto max-w-[1320px] px-4 pt-6 pb-8 lg:px-12">
              <div className="flex items-center gap-3">
                <Mark name="signal" className="h-7 w-7 text-yellow" />
                <div className="min-w-0 flex-1">
                  <p className="t-head text-lg">Contact</p>
                  <p className="t-spec text-dim">Write, call or connect</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close contact menu"
                  className="grid h-9 w-9 place-items-center bg-paper text-ink transition-colors hover:bg-yellow"
                >
                  <X size={17} strokeWidth={2.5} />
                </button>
              </div>
              <div aria-hidden="true" className="mt-4 flex h-1.5 gap-1">
                <span className="w-2/5 bg-yellow" />
                <span className="w-1/5 bg-blue" />
                <span className="w-8 bg-paper" />
              </div>
              <div className="mt-6 grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="mb-3 t-head text-sm">Reach me</p>
                  <Channels />
                </div>
                <div className="lg:col-span-7">
                  <p className="mb-3 t-head text-sm">Send a message</p>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
