import { ArrowUpRight, Download } from 'lucide-react';
import { GlitchText } from '../components/Glitch';
import { Board, BoardHeader, Mark, Reveal } from '../components/sign';
import { documents, highlights, work } from '../data/portfolio';
import { pad2 } from '../lib/codes';

// Work: years of experience as one big figure above the resume and the recommendation
// letter, beside a panel per company with its roles (newest first), what each involved
// and the stack it used

const [EXPERIENCE] = highlights.find((h) => h.id === 'experience').lines;
const YEARS = EXPERIENCE.match(/^\S+/)[0]; // "3+"
const ROLES = work.flatMap((w) => w.roles);

const DOCS = [
  { id: 'resume', mark: 'seal' },
  { id: 'recommendation', mark: 'stack' },
];

function Experience({ className = '' }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Reveal className="flex flex-1 flex-col justify-between bg-ink p-6 text-paper">
        <p className="t-spec text-dim">Experience</p>
        <p className="mt-6 flex items-end gap-3">
          <span className="t-code text-[clamp(120px,11vw,170px)] leading-[0.78] text-yellow">{YEARS}</span>
          <span className="t-head mb-2 text-2xl">Years</span>
        </p>
        <p className="mt-6 text-[13.5px] leading-snug text-paper/85">{EXPERIENCE}</p>
      </Reveal>

      {DOCS.map(({ id, mark }, i) => {
        const doc = documents[id];
        const name = doc.title.replace(/\.pdf$/i, '');
        return (
          <Reveal key={id} delay={0.06 + i * 0.06} className="flex items-stretch bg-paper">
            <span className="grid w-20 shrink-0 place-items-center bg-ink">
              <Mark name={mark} className="h-10 w-10 text-yellow" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3 text-ink">
              <span className="t-code text-[18px] leading-[1.05] break-words">{name}</span>
              <span className="mt-1.5 truncate t-spec text-muted">PDF document</span>
            </span>
            <a
              href={doc.file}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${doc.title}`}
              className="grid w-14 place-items-center bg-yellow text-ink transition-colors hover:bg-ink hover:text-yellow"
            >
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </a>
            <a
              href={doc.file}
              download
              aria-label={`Download ${doc.title}`}
              className="grid w-14 place-items-center border-l border-ink/15 text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <Download size={17} strokeWidth={2.25} />
            </a>
          </Reveal>
        );
      })}
    </div>
  );
}

// One role: number, title and dates, what it involved, and its stack. A role that follows
// an earlier one at the same company is marked as a promotion.
function Role({ role, previous }) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div className="flex items-baseline gap-3">
          <span className="t-spec text-dim">{pad2(ROLES.indexOf(role) + 1)}</span>
          <h3 className="t-head text-[19px]">{role.title}</h3>
        </div>
        <p className="bg-yellow px-2 py-1 t-spec text-ink">
          {role.start} – {role.end}
        </p>
      </div>
      {previous && <p className="mt-2 t-spec text-yellow">Promoted from {previous.title}</p>}
      <ul className="mt-4 space-y-2.5">
        {role.points.map((p) => (
          <li key={p} className="flex gap-3 text-[13.5px] leading-relaxed text-paper/85">
            <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-yellow" />
            {p}
          </li>
        ))}
      </ul>
      <ul aria-label={`${role.title} stack`} className="mt-4 flex flex-wrap gap-1">
        {role.tech.map((t) => (
          <li key={t} className="bg-paper px-2 py-1 t-head text-[11px] text-ink">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Company({ company, delay }) {
  const { roles, recommendation } = company;
  return (
    <Reveal as="article" delay={delay} className="flex flex-col bg-ink text-paper">
      <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-ink-3 p-5 lg:p-6">
        <div>
          <p className="t-spec text-dim">{company.location}</p>
          <h2 className="mt-2 t-code text-[clamp(34px,3.6vw,52px)]">
            <GlitchText text={company.company} />
          </h2>
        </div>
        {roles.length > 1 && (
          <p className="t-spec text-dim">
            {roles.at(-1).start} – {roles[0].end}
          </p>
        )}
      </header>
      <div className="flex flex-col gap-8 p-5 lg:p-6">
        {roles.map((r, i) => (
          <Role key={r.title} role={r} previous={roles[i + 1]} />
        ))}
      </div>
      {recommendation && (
        <a
          href={documents.recommendation.file}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-between gap-4 bg-paper px-5 py-3 text-ink transition-colors hover:bg-yellow"
        >
          <span className="flex items-center gap-4">
            <Mark name="stack" className="h-7 w-7 shrink-0" />
            <span>
              <span className="block t-head text-xs">Letter of Recommendation</span>
              <span className="mt-0.5 block t-spec text-muted">
                {recommendation.author}, {recommendation.title}
              </span>
            </span>
          </span>
          <ArrowUpRight size={18} strokeWidth={2.5} className="shrink-0" />
        </a>
      )}
    </Reveal>
  );
}

export default function Work() {
  return (
    <Board id="work" aria-labelledby="work-title" left="Work" className="pt-10 lg:pt-12">
      <BoardHeader as="h1" index="02" title="Work" code={`${ROLES.length} roles // ${work.length} companies`} id="work-title" />

      <div className="crop mt-6">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
          <Experience className="lg:col-span-4 lg:self-start" />
          <div className="flex flex-col gap-2 lg:col-span-8">
            {work.map((c, i) => (
              <Company key={c.company} company={c} delay={0.08 + i * 0.06} />
            ))}
          </div>
        </div>
      </div>
    </Board>
  );
}
