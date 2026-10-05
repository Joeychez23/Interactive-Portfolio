import { ArrowUpRight } from 'lucide-react';
import CutoutPortrait from '../components/CutoutPortrait';
import { Quarters } from '../components/patterns';
import { Board, BoardHeader, Mark, Reveal } from '../components/sign';
import { highlights, profile } from '../data/portfolio';
import { PROFILES } from '../lib/profiles';

// About Me, the home page: a tall mark banner and a small white plate with the portrait
// side by side, and the bio, along the top; the highlights as three coloured tabs below,
// then the profiles (LinkedIn, GitHub, LeetCode) as white label strips

const [LEAD, ...REST] = profile.bio.split(/(?<=\.)\s+/);
const TONES = ['bg-yellow text-ink', 'bg-blue text-paper', 'bg-ink text-paper'];

export default function About() {
  return (
    <Board id="about" aria-labelledby="about-title" left="About Me" className="pt-10 lg:pt-12">
      <BoardHeader as="h1" index="01" title="About Me" code={`Profile // ${profile.location}`} id="about-title" />

      <div className="crop mt-6">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-12">
          <Reveal className="col-span-1 grid stack min-h-[320px] overflow-hidden bg-ink text-paper lg:col-span-3 lg:row-span-2">
            <div className="h-[42%] self-end">
              <Quarters cols={6} rows={3} />
            </div>
            <Mark name="person" className="m-5 h-24 w-24 self-start justify-self-start text-paper" />
            <p className="m-5 self-end justify-self-end bg-ink px-1.5 t-spec text-dim">No. 01</p>
          </Reveal>

          <Reveal delay={0.06} className="col-span-1 flex min-h-[320px] flex-col bg-paper text-ink lg:col-span-3 lg:row-span-2">
            <div className="flex items-baseline justify-between gap-3 px-5 pt-5">
              <p className="t-head text-[19px]">About Me</p>
              <span className="t-spec text-muted">02</span>
            </div>
            <CutoutPortrait src={profile.photo} alt={`Portrait of ${profile.name}`} className="mx-5 mt-3 min-h-[200px] flex-1" />
            <div className="mx-5 flex items-end justify-between gap-3 border-t-2 border-ink pt-3 pb-5">
              <p className="t-head text-xs">{profile.role}</p>
              <span aria-hidden="true" className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-ink" />
                <span className="h-2 w-5 rounded-full bg-ink" />
                <span className="h-2 w-2 bg-yellow" />
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="col-span-2 flex flex-col justify-between gap-6 py-2 lg:col-span-6 lg:row-span-2 lg:pl-6">
            <p className="font-sans text-[clamp(22px,2.1vw,30px)] leading-[1.18] font-medium [font-stretch:105%]">{LEAD}</p>
            <p className="max-w-[60ch] text-[13.5px] leading-relaxed text-fg/75">{REST.join(' ')}</p>
            <p className="t-spec text-muted">&gt; {profile.tagline}</p>
          </Reveal>

          {highlights.map((h, i) => (
            <Reveal key={h.id} delay={0.1 + i * 0.06} className={`col-span-2 flex min-h-[150px] flex-col justify-between p-5 lg:col-span-4 ${TONES[i]}`}>
              <div className="flex items-baseline justify-between">
                <h2 className="t-head text-lg">{h.title}</h2>
                <span className="t-spec opacity-70">No. 0{i + 1}</span>
              </div>
              <ul className="mt-4 space-y-1">
                {h.lines.map((l) => (
                  <li key={l} className="text-[13px] leading-snug">
                    {l}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          {PROFILES.map((s, i) => (
            <Reveal key={s.site} delay={0.2 + i * 0.05} className="col-span-2 lg:col-span-4">
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glitch-hover group flex h-16 items-center gap-4 bg-paper px-5 text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <span data-text={s.site} className="glitch t-head text-sm">
                  <span>{s.site}</span>
                </span>
                <span className="min-w-0 truncate t-spec text-muted group-hover:text-dim">/ {s.handle}</span>
                <ArrowUpRight size={18} strokeWidth={2.5} className="ml-auto shrink-0" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Board>
  );
}
