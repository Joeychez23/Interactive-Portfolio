import { useEffect, useState } from 'react';

// The site's pages, in nav order. About Me is the home page.
// Contact isn't a page: it opens the contact menu under the nav.
export const PAGES = [
  { id: 'about', title: 'About Me' },
  { id: 'work', title: 'Work' },
  { id: 'projects', title: 'Projects' },
];

// Pages live in the hash (#/work, #/projects; home is #/), so links, back/forward and reloads work
// on any static host. Anything unknown is the home page.
export const pageHref = (id) => (id === 'about' ? '#/' : `#/${id}`);

const read = () => {
  const id = window.location.hash.replace(/^#\/?/, '');
  return PAGES.some((p) => p.id === id) ? id : 'about';
};

// Id of the page in the address bar
export function usePage() {
  const [page, setPage] = useState(read);
  useEffect(() => {
    const onChange = () => setPage(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return page;
}
