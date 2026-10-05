import { projects } from '../data/portfolio';

// Helpers that turn portfolio data into signage: numbers and counts.

export const pad2 = (n) => String(n).padStart(2, '0');

// Projects whose stack lists this tool ("EC2" counts for "EC2 (Linux)", "Spring Core" for "Spring")
export function projectsUsing(tool, list = projects) {
  const t = tool.toLowerCase().replace(/\s*\(.*\)$/, '');
  return list.filter((p) =>
    p.tech.some((tech) => {
      const x = tech.toLowerCase();
      return x === t || x.startsWith(`${t} `) || t.startsWith(`${x} `);
    }),
  );
}
