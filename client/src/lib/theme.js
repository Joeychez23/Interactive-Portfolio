import { useCallback, useState } from 'react';

// Light by default; a visitor's choice is kept in localStorage. index.html applies the
// saved theme before first paint, so this only has to keep it in sync.
const KEY = 'theme';

const current = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // non-fatal: the choice just won't survive a reload
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(current);
  const set = useCallback((next) => {
    applyTheme(next);
    setTheme(next);
  }, []);
  return [theme, set];
}
