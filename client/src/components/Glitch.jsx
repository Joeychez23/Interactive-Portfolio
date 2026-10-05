import { useCallback, useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

// Glitch, used only as a signal: text shears and splits into a yellow and a blue copy for
// a moment when it first scrolls into view and whenever it's pointed at or focused.

export function GlitchText({ text, as: Tag = 'span', className = '', onView = true, delay = 150 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const play = useCallback(() => {
    const el = ref.current;
    if (!el || reduce) return;
    el.classList.remove('is-glitching');
    void el.offsetWidth; // restart the animation
    el.classList.add('is-glitching');
    clearTimeout(el.glitchTimer);
    el.glitchTimer = setTimeout(() => el.classList.remove('is-glitching'), 450);
  }, [reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!onView || !el) return;
    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        timer = setTimeout(play, delay);
        observer.disconnect();
      },
      { rootMargin: '-10% 0px' },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [onView, play, delay]);

  return (
    <Tag ref={ref} data-text={text} className={`glitch ${className}`} onMouseEnter={play} onFocus={play}>
      <span>{text}</span>
    </Tag>
  );
}
