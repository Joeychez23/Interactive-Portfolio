import { useId } from 'react';
import { motion } from 'motion/react';
import { GlitchText } from './Glitch';

// The signage kit: section marks, side labels, page boards, the connector glyph and
// section headers (crop marks are the `crop` class in index.css), drawn from the reference artwork's vocabulary.

const svgId = (id) => id.replace(/[^\w-]/g, '');

// Geometric marks built from circles, slabs and steps, one per section
export function Mark({ name, className = '' }) {
  const cut = svgId(useId());
  const common = { viewBox: '0 0 100 100', className: `fill-current ${className}`, 'aria-hidden': true };
  switch (name) {
    case 'person':
      return (
        <svg {...common}>
          <circle cx="50" cy="20" r="14" />
          <rect x="22" y="40" width="56" height="14" rx="7" />
          <rect x="35" y="58" width="30" height="14" />
          <rect x="35" y="76" width="12" height="20" />
          <rect x="53" y="76" width="12" height="20" />
        </svg>
      );
    case 'stack':
      return (
        <svg {...common}>
          <circle cx="50" cy="15" r="10" />
          <rect x="31" y="31" width="38" height="28" rx="5" />
          <rect x="8" y="65" width="38" height="28" rx="5" />
          <rect x="54" y="65" width="38" height="28" rx="5" />
        </svg>
      );
    case 'seal':
      return (
        <svg {...common}>
          <defs>
            <mask id={cut}>
              <rect width="100" height="100" fill="white" />
              <rect x="25" y="20" width="32" height="6" fill="black" />
              <rect x="25" y="32" width="32" height="6" fill="black" />
              <rect x="25" y="44" width="18" height="6" fill="black" />
              <circle cx="68" cy="72" r="23" fill="black" />
              <circle cx="68" cy="72" r="8" fill="black" />
            </mask>
          </defs>
          <rect x="14" y="6" width="54" height="72" rx="6" mask={`url(#${cut})`} />
          <path fillRule="evenodd" d="M68 53a19 19 0 1 1 0 38 19 19 0 0 1 0-38Zm0 11a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />
        </svg>
      );
    case 'signal':
      return (
        <svg {...common}>
          <circle cx="24" cy="76" r="11" />
          <path d="M24 48a28 28 0 0 1 28 28" fill="none" stroke="currentColor" strokeWidth="11" />
          <path d="M24 22a54 54 0 0 1 54 54" fill="none" stroke="currentColor" strokeWidth="11" />
        </svg>
      );
    default:
      return null;
  }
}

// Label set sideways along an edge
export function SideCode({ children, className = '' }) {
  return (
    <p aria-hidden="true" className={`t-code text-[17px] text-fg [writing-mode:vertical-rl] rotate-180 ${className}`}>
      {children}
    </p>
  );
}

// A board: centred, with optional labels set sideways in its margins on large screens
// (`left` near the top, `right` near the bottom). Margins are grid columns. Vertical
// padding comes from `className`.
export function Board({ left, right, className = '', children, ...rest }) {
  return (
    <section
      className={`mx-auto grid max-w-[1320px] grid-cols-[minmax(0,1fr)] px-4 lg:grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] lg:px-1 ${className}`}
      {...rest}
    >
      {left && <SideCode className="mt-16 hidden self-start justify-self-start lg:col-start-1 lg:row-start-1 lg:block">{left}</SideCode>}
      <div className="min-w-0 lg:col-start-2 lg:row-start-1">{children}</div>
      {right && <SideCode className="mb-6 hidden self-end justify-self-end lg:col-start-3 lg:row-start-1 lg:block">{right}</SideCode>}
    </section>
  );
}

// The -=▭=- connector glyph
export function Connector({ className = 'text-fg' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 14" className={`h-3.5 w-16 ${className}`}>
      <g stroke="currentColor" strokeWidth="2.5" fill="none">
        <path d="M0 7h12M14 4h7M14 10h7M43 4h7M43 10h7M52 7h12" />
        <rect x="24" y="2" width="16" height="10" rx="2" />
      </g>
    </svg>
  );
}

// Fades and lifts a block into place the first time it scrolls into view
export function Reveal({ children, delay = 0, className = '', as = 'div', ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Section header: number, title (which glitches as it arrives), connector and a note, plus
// any controls (`aside`) at the right end of the row
export function BoardHeader({ index, title, code, id, aside, as: Heading = 'h2' }) {
  return (
    <div className="flex items-end gap-4 border-b-2 border-fg pb-3">
      <p aria-hidden="true" className="t-code text-[44px] leading-[0.8]">
        {index}
      </p>
      <Heading id={id} className="t-head text-[22px]">
        <GlitchText text={title} />
      </Heading>
      <Connector className="mb-1 hidden sm:block" />
      <div className="ml-auto flex items-end gap-4">
        <p className="hidden t-spec text-muted sm:block">{code}</p>
        {aside}
      </div>
    </div>
  );
}
