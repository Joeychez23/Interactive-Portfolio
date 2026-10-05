import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';

// A burst of glitch bars over the whole screen, like the block cuts in the reference motion
// pieces. Changes made under one (switching theme or page) happen behind the bars.

const COLORS = ['bg-yellow', 'bg-blue', 'bg-fg', 'bg-yellow', 'bg-ink'];

// Bars are laid on a 100 × 100 grid over the screen, each spanning a band of rows and a run
// of columns
const rand = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

function GlitchBars() {
  // Picked once per burst, so whatever changes underneath mid-burst doesn't reshuffle them
  const [bars] = useState(() =>
    Array.from({ length: 11 }, (_, i) => {
      const [row, col] = [rand(1, 96), Math.random() < 0.5 ? 1 : rand(1, 40)];
      return {
        row: `${row} / span ${Math.min(rand(2, 10), 101 - row)}`,
        col: `${col} / span ${Math.min(rand(40, 100), 101 - col)}`,
        shift: (Math.random() - 0.5) * 80,
        color: COLORS[i % COLORS.length],
      };
    }),
  );
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80] grid grid-cols-[repeat(100,1fr)] grid-rows-[repeat(100,1fr)] overflow-hidden">
      {bars.map((b, i) => (
        <motion.span
          key={i}
          className={b.color}
          style={{ gridRow: b.row, gridColumn: b.col }}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0], x: [0, b.shift, -b.shift / 2, b.shift / 3, 0] }}
          transition={{ duration: 0.38, times: [0, 0.18, 0.42, 0.66, 1], ease: 'linear', delay: (i % 4) * 0.015 }}
        />
      ))}
    </div>
  );
}

// Returns the bars to render (null between bursts) and a function that starts a burst. The
// function returns false, and nothing plays, when reduced motion is on.
export function useGlitchBurst() {
  const reduce = useReducedMotion();
  const [burst, setBurst] = useState(null);

  const play = useCallback(() => {
    if (reduce) return false;
    const key = Date.now();
    setBurst(key);
    setTimeout(() => setBurst((b) => (b === key ? null : b)), 440);
    return true;
  }, [reduce]);

  return [burst ? createPortal(<GlitchBars key={burst} />, document.body) : null, play];
}
