import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Lock, Plus, X } from 'lucide-react';
import { GlitchText } from '../components/Glitch';
import { Triangles } from '../components/patterns';
import { Board, BoardHeader } from '../components/sign';
import { projects } from '../data/portfolio';
import { pad2, projectsUsing } from '../lib/codes';

// Projects as a directory sign: every project on a numbered strip, each opening and closing
// on its own (as many at once as you like) to show it in full underneath. Pointing at a
// screenshot tears it into jumping bands for a moment; opening a project shears its panel
// in and glitches its title.

const N = projects.length;
const LIVE = projects.filter((p) => p.link).length;

// Where a project lives: its link's host and path, or a note that it's internal
const where = (p) => (p.link ? p.link.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'Internal / client work');

// Ten horizontal bands of the screenshot, each jumping at its own moment; two are tinted
// yellow and blue
const TINTS = { 2: ['#ffd300', 'multiply'], 7: ['#2f55ff', 'screen'] };
const BANDS = Array.from({ length: 10 }, (_, i) => ({
  clip: `inset(${i * 10}% 0 ${90 - i * 10}% 0)`,
  delay: `${[3, 0, 6, 2, 8, 1, 5, 9, 4, 7][i] * 14}ms`,
  shift: `${(i % 2 ? 1 : -1) * (10 + ((i * 7) % 18))}px`,
  tint: TINTS[i],
}));

function Status({ project, className = '' }) {
  return (
    <span className={`flex items-center gap-1.5 t-spec ${className}`}>
      {project.link ? <span className="h-1.5 w-1.5 bg-current" /> : <Lock size={11} strokeWidth={2.5} />}
      {project.link ? 'Live' : 'Internal'}
    </span>
  );
}

function Shot({ project, index }) {
  return (
    <div className="group grid stack aspect-[16/10] w-full overflow-hidden bg-ink-2">
      <img src={project.image} alt={`Screenshot of ${project.title}`} className="h-full w-full object-cover [contain:size]" />
      {BANDS.map((b, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="glitch-band"
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundColor: b.tint?.[0],
            backgroundBlendMode: b.tint?.[1],
            clipPath: b.clip,
            '--delay': b.delay,
            '--shift': b.shift,
          }}
        />
      ))}
      <span className="self-start justify-self-start bg-ink px-2 py-1 t-spec text-dim">
        No. {pad2(index + 1)} / {pad2(N)}
      </span>
    </div>
  );
}

// One project, in full: the screenshot beside the write-up on wide screens
function Detail({ project, index, onClose }) {
  return (
    <article aria-labelledby={`${project.slug}-title`} className="glitch-in grid grid-cols-1 bg-ink text-paper lg:grid-cols-12">
      <div className="lg:col-span-7">
        <Shot project={project} index={index} />
      </div>
      <div className="flex flex-col p-5 lg:col-span-5 lg:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 id={`${project.slug}-title`} className="t-code text-[clamp(34px,3.2vw,48px)]">
            <GlitchText text={project.title} />
          </h3>
          <Status project={project} className={`mt-2 shrink-0 ${project.link ? 'text-yellow' : 'text-dim'}`} />
        </div>
        <p className="mt-4 self-start bg-paper px-2 py-1 t-spec break-all text-ink">{where(project)}</p>
        <p className="mt-4 max-w-[62ch] text-[14px] leading-relaxed text-paper/85">{project.description}</p>

        <ul className="mt-6 grid grid-cols-2 gap-1 sm:grid-cols-3">
          {project.tech.map((t) => {
            const others = projectsUsing(t).length - 1;
            return (
              <li key={t} className="bg-yellow px-3 py-2 text-ink">
                <p className="t-head text-xs">{t}</p>
                <p className="mt-0.5 t-spec opacity-70">{others > 0 ? `+${others} other project${others === 1 ? '' : 's'}` : 'This project'}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto flex items-stretch gap-1 pt-8">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 flex-1 items-center justify-between bg-paper px-4 t-head text-sm text-ink transition-colors hover:bg-yellow"
            >
              View project <ArrowUpRight size={18} strokeWidth={2.5} />
            </a>
          ) : (
            <p className="flex flex-1 items-center bg-ink-3 px-4 py-3 text-[13px] text-dim">Not publicly viewable (internal/client work).</p>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${project.title}`}
            className="flex h-12 shrink-0 items-center gap-2 bg-ink-3 px-4 t-head text-[11px] transition-colors hover:bg-yellow hover:text-ink"
          >
            Close <X size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(() => new Set());
  const rows = useRef([]);

  const toggle = (slug) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(slug)) next.add(slug);
      return next;
    });

  // Up and down move between strips; Enter or Space opens and closes one
  const onKey = (i) => (e) => {
    const to = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: N - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    rows.current[(to + N) % N]?.focus();
  };

  return (
    <Board id="projects" aria-labelledby="projects-title" className="pt-10 lg:pt-12">
      <BoardHeader
        as="h1"
        index="03"
        title="Projects"
        code={`${N} projects // ${LIVE} live`}
        id="projects-title"
        aside={
          <AnimatePresence initial={false}>
            {open.size > 0 && (
              <motion.button
                type="button"
                onClick={() => setOpen(new Set())}
                className="-my-1 flex h-8 items-center gap-2 bg-paper px-3 t-head text-[11px] text-ink transition-colors hover:bg-yellow"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.18 }}
              >
                Close all <X size={14} strokeWidth={2.5} />
              </motion.button>
            )}
          </AnimatePresence>
        }
      />

      <div className="crop mt-6">
        <ul className="flex flex-col gap-1">
          {projects.map((p, i) => {
            const isOpen = open.has(p.slug);
            return (
              <li key={p.slug}>
                <button
                  ref={(el) => (rows.current[i] = el)}
                  type="button"
                  onClick={() => toggle(p.slug)}
                  onKeyDown={onKey(i)}
                  aria-expanded={isOpen}
                  aria-controls={`${p.slug}-detail`}
                  className={`glitch-hover flex min-h-[72px] w-full items-stretch text-left transition-colors ${isOpen ? 'bg-yellow text-ink' : 'bg-ink text-paper hover:bg-ink-3'}`}
                >
                  <span className={`grid w-14 shrink-0 place-items-center t-code text-[22px] ${isOpen ? 'bg-ink text-yellow' : 'bg-ink-2 text-dim'}`}>
                    {pad2(i + 1)}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3">
                    <span data-text={p.title} className="glitch t-code text-[22px] leading-[1.02]">
                      <span>{p.title}</span>
                    </span>
                    <span className={`mt-1.5 truncate t-spec ${isOpen ? 'text-ink/60' : 'text-dim'}`}>{p.tech.join(' + ')}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-4 pr-4">
                    <Status project={p} className={`hidden sm:flex ${isOpen ? 'text-ink' : p.link ? 'text-yellow' : 'text-dim'}`} />
                    <Plus size={20} strokeWidth={2.5} className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${p.slug}-detail`}
                      className="overflow-hidden"
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0, transition: { duration: 0.22, ease: [0.7, 0, 0.3, 1] } }}
                      transition={{ duration: 0.38, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      <div className="pt-1">
                        <Detail project={p} index={i} onClose={() => toggle(p.slug)} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}

          <li aria-hidden="true" className="hidden h-28 stack md:grid">
            <Triangles />
            <p className="mr-4 mb-3 self-end justify-self-end t-code text-[32px] text-paper">
              {pad2(N)} projects · {pad2(LIVE)} live
            </p>
          </li>
        </ul>
      </div>
    </Board>
  );
}
