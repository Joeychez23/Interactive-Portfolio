import { useTheme } from '../lib/theme';
import { useGlitchBurst } from './GlitchBars';

// Light / dark switch. The change happens under a burst of glitch bars; with reduced motion
// it just switches.

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useTheme();
  const [bars, glitch] = useGlitchBurst();
  const dark = theme === 'dark';

  // Switch partway into the burst, while the bars cover the screen
  const toggle = () => {
    const next = dark ? 'light' : 'dark';
    if (glitch()) setTimeout(() => setTheme(next), 150);
    else setTheme(next);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
        title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
        className={`flex h-12 items-center gap-2.5 px-4 transition-colors hover:bg-ink-3 ${className}`}
      >
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 transition-transform duration-500" style={{ transform: `rotate(${dark ? 180 : 0}deg)` }}>
          <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M10 2a8 8 0 0 1 0 16Z" fill="currentColor" />
        </svg>
        <span className="t-head text-[11px]">{dark ? 'Dark' : 'Light'}</span>
      </button>
      {bars}
    </>
  );
}
