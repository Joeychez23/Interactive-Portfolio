import { useId } from 'react';

// Grey pattern fields from the reference signage, each filling its parent on a dark panel:
// triangles and quarter circles. Fields are
// size-contained, so they never make their parent grow.

const svgId = (id) => id.replace(/[^\w-]/g, '');
const field = 'block h-full w-full bg-ink-2 [contain:size]';

// Stable 0..1 value per cell, so patterns don't reshuffle between renders
const hash = (a, b, salt = 0) => (Math.imul(((a + 31) * 73856093) ^ ((b + 17) * 19349663) ^ ((salt + 7) * 83492791), 2654435761) >>> 0) / 4294967296;

// Rows of triangles pointing right, in two greys
export function Triangles({ className = '' }) {
  const id = svgId(useId());
  return (
    <svg aria-hidden="true" className={`${field} ${className}`}>
      <defs>
        <pattern id={id} width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M4 4 40 22 4 40Z" className="fill-pattern" />
        </pattern>
        <pattern id={`${id}b`} width="44" height="44" patternUnits="userSpaceOnUse" x="22" y="22">
          <path d="M4 4 40 22 4 40Z" className="fill-pattern-soft" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}b)`} />
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// Grid of quarter circles turned at random, with the odd small marker
export function Quarters({ cols = 8, rows = 6, className = '' }) {
  const s = 50;
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${cols * s} ${rows * s}`} preserveAspectRatio="xMidYMid slice" className={`${field} ${className}`}>
      {Array.from({ length: rows }, (_, y) =>
        Array.from({ length: cols }, (_, x) => {
          const turn = Math.floor(hash(x, y) * 4) * 90;
          const mark = hash(x, y, 2);
          return (
            <g key={`${x}-${y}`} transform={`translate(${x * s} ${y * s}) rotate(${turn} ${s / 2} ${s / 2})`}>
              <path d={`M0 0H${s}A${s} ${s} 0 0 1 0 ${s}Z`} className={hash(x, y, 1) < 0.5 ? 'fill-pattern' : 'fill-pattern-soft'} />
              {mark < 0.12 && <path d={`M${s - 14} ${s - 18}l8 10h-16Z`} className="fill-pattern" />}
              {mark > 0.9 && <circle cx={s - 12} cy={s - 12} r="3.5" className="fill-pattern" />}
            </g>
          );
        }),
      )}
    </svg>
  );
}
