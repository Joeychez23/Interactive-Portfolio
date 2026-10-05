import { useEffect, useRef } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import Footer from './components/Footer';
import { useGlitchBurst } from './components/GlitchBars';
import Intro from './components/Intro';
import Nav from './components/Nav';
import { profile } from './data/portfolio';
import { ContactMenuProvider } from './lib/contactMenu';
import { PAGES, usePage } from './lib/sections';
import About from './sections/About';
import Projects from './sections/Projects';
import Work from './sections/Work';

const VIEWS = { about: About, work: Work, projects: Projects };

// Pages picked from the nav: About Me (home), Work and Projects. Switching plays the same
// burst of glitch bars as the theme switch; under it the old page fades out, the view
// returns to the top, then the new one fades in.
export default function App() {
  const page = usePage();
  const View = VIEWS[page];
  const [bars, glitch] = useGlitchBurst();
  const shown = useRef(page);

  useEffect(() => {
    if (shown.current === page) return;
    shown.current = page;
    glitch();
  }, [page, glitch]);

  useEffect(() => {
    document.title = page === 'about' ? `${profile.name} | ${profile.role}` : `${PAGES.find((p) => p.id === page).title} | ${profile.name}`;
  }, [page]);

  return (
    <MotionConfig reducedMotion="user">
      <ContactMenuProvider>
        <div className="flex min-h-dvh flex-col">
          <Nav page={page} />
          <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
            <motion.main key={page} className="flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }}>
              <View />
            </motion.main>
          </AnimatePresence>
          <Footer />
        </div>
        <Intro />
        {bars}
      </ContactMenuProvider>
    </MotionConfig>
  );
}
