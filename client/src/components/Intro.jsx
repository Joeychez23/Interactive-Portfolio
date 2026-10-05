import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { profile } from '../data/portfolio';

// Opening card: segmented rings turn round the name, then the board slides up out of
// the way. About a second and a half; any key, click or tap skips it.

const DURATION = 1500;

// Arc segments for one ring; lengths and gaps vary but are fixed
function segments(seed, count) {
  const out = [];
  let a = seed * 41;
  for (let i = 0; i < count; i++) {
    const len = 16 + ((seed * 13 + i * 29) % 38);
    out.push([a, a + len]);
    a += len + 7 + ((seed + i * 7) % 13);
  }
  return out;
}

const RINGS = [
  { r: 150, width: 30, className: 'stroke-fg', segs: segments(1, 7), spin: 30 },
  { r: 112, width: 14, className: 'stroke-yellow', segs: segments(2, 5), spin: -45 },
  { r: 184, width: 8, className: 'stroke-blue', segs: segments(3, 9), spin: -20 },
];

const arc = (r, a0, a1) => {
  const p = (a) => [250 + r * Math.cos(((a - 90) * Math.PI) / 180), 250 + r * Math.sin(((a - 90) * Math.PI) / 180)];
  const [[x0, y0], [x1, y1]] = [p(a0), p(a1)];
  return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
};

export default function Intro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(!reduce);

  useEffect(() => {
    if (!show) return;
    const hide = () => setShow(false);
    const timer = setTimeout(hide, DURATION);
    window.addEventListener('keydown', hide);
    window.addEventListener('pointerdown', hide);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', hide);
      window.removeEventListener('pointerdown', hide);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-50 grid place-items-center bg-board"
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.55, ease: [0.7, 0, 0.3, 1] } }}
        >
          <div className="grid stack h-[min(500px,90vw)] w-[min(500px,90vw)]">
            {RINGS.map((ring) => (
              <motion.svg
                key={ring.r}
                viewBox="0 0 500 500"
                className="h-full w-full"
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: ring.spin }}
                transition={{ duration: DURATION / 1000, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {ring.segs.map(([a0, a1]) => (
                  <path key={a0} d={arc(ring.r, a0, a1)} fill="none" className={ring.className} strokeWidth={ring.width} />
                ))}
              </motion.svg>
            ))}
            <div className="place-self-center text-center">
              <p className="t-code text-[clamp(30px,6vw,44px)]">{profile.name}</p>
              <p className="mt-3 t-spec text-muted">{profile.role}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
