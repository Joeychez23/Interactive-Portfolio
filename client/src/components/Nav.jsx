import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { documents, profile } from '../data/portfolio';
import { pad2 } from '../lib/codes';
import { useContactMenu } from '../lib/contactMenu';
import { PAGES, pageHref } from '../lib/sections';
import ContactMenu from './ContactMenu';
import { Mark } from './sign';
import ThemeToggle from './ThemeToggle';

// Signage strip across the top edge of the screen: name (home), numbered page links (the
// current one on a white plate; clicking it again goes back to the top), the theme switch,
// Contact (unfolds the contact menu underneath, in the flow of the page) and the resume PDF
export default function Nav({ page }) {
  const { open, setOpen } = useContactMenu();
  const reduce = useReducedMotion();

  const toTopIfCurrent = (id) => (e) => {
    if (id !== page) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-ink text-paper">
      <div className="flex flex-wrap items-stretch lg:flex-nowrap">
        <a href={pageHref('about')} onClick={toTopIfCurrent('about')} className="flex h-12 items-center gap-3 pr-5" aria-label={`${profile.name}, home`}>
          <span className="grid h-12 w-12 place-items-center bg-yellow text-ink">
            <Mark name="person" className="h-6 w-6" />
          </span>
          <span className="hidden t-head text-[13px] whitespace-nowrap sm:inline">{profile.name}</span>
        </a>

        <nav
          aria-label="Pages"
          className="order-3 flex w-full items-stretch overflow-x-auto border-t border-ink-3 lg:order-none lg:w-auto lg:flex-1 lg:border-t-0"
        >
          {PAGES.map((s, i) => {
            const current = page === s.id;
            return (
              <a
                key={s.id}
                href={pageHref(s.id)}
                onClick={toTopIfCurrent(s.id)}
                aria-current={current ? 'page' : undefined}
                className={`flex h-10 shrink-0 items-center gap-2 px-3.5 transition-colors lg:h-12 ${current ? 'bg-paper text-ink' : 'hover:bg-ink-3'}`}
              >
                <span className={`t-spec ${current ? 'text-muted' : 'text-dim'}`}>{pad2(i + 1)}</span>
                <span className="t-head text-[11px]">{s.title}</span>
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-stretch lg:ml-0">
          <ThemeToggle className="[&>span]:hidden sm:[&>span]:inline" />
          <button
            type="button"
            data-contact-toggle
            aria-expanded={open}
            aria-controls="contact-menu"
            onClick={() => setOpen(!open)}
            className={`flex h-12 items-center gap-2 px-4 t-head text-[11px] transition-colors ${open ? 'bg-paper text-ink' : 'bg-yellow text-ink hover:bg-paper'}`}
          >
            Contact <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          <a
            href={documents.resume.file}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center gap-2 px-4 t-head text-[11px] transition-colors hover:bg-ink-3"
          >
            Resume <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
        </div>
      </div>

      <ContactMenu />
    </header>
  );
}
