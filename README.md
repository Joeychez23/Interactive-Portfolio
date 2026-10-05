# Interactive Portfolio

Joseph Sanchez's portfolio as a set of signage boards, on three pages picked from the nav along the top of the screen (About Me, the home page; Work; and Projects), designed from a set of reference artwork (wayfinding signage sheets, brand boards and digitized motion graphics): dark panels laid out on a pale board, yellow and blue tabs, grey pattern fields, crop marks, and sideways labels. Light by default, with a dark theme behind the toggle in the nav (the choice is remembered).

About Me (home): a mark banner beside a small white plate holding the cut-out portrait, the bio, and three highlight tabs. Work: years of experience with the resume and recommendation letter, beside a panel per company with its roles, what each involved and its stack. Projects: numbered strips that each open and close on their own to show the project in full; pointing at a screenshot tears it into jumping bands for a moment, and opening a project shears its panel in. Contact in the nav unfolds a menu under it with the email, phone and profiles and the message form.

Glitch is used as a signal rather than decoration: section titles shear and split into yellow and blue copies as they arrive or are pointed at, the name decodes from noise after the intro, and switching theme happens under a burst of glitch bars. A short ring intro plays on load; any key or click skips it.

Colours and fonts are theme tokens at the top of `client/src/index.css`: Saira for codes, Archivo for labels, IBM Plex Mono for body and spec text, Instrument Serif for the motto.

## Tech Stack

- **Frontend:** React 19 + Vite, Tailwind CSS v4, Motion (scroll reveals, intro), lucide-react (small icons), Fontsource fonts
- **Backend:** Node.js / Express — serves the built client in production, plus `/api/health` for load-balancer checks
- **Tests:** Vitest (contact form and its Lambda client, data helpers)

## Project Structure

```
.
├── client/                    # React frontend (Vite)
│   ├── public/                # Images, Resume.pdf, recommendation letter
│   └── src/
│       ├── data/portfolio.js  # ALL content: profile, projects, skills, links
│       ├── sections/          # The pages: About (home), Work and Projects
│       ├── components/        # Signage kit, pattern fields, cut-out portrait, glitch, Nav, contact menu + form, theme toggle
│       └── lib/               # Data helpers, contact client (+ tests), theme, contact-menu state, section tracking
└── server/                    # Express app (serves client/build in production)
```

To add or edit a project, skill, or link, change `client/src/data/portfolio.js` — every board reads from it.

## Getting Started

### Install

```bash
npm run install   # installs deps in both server/ and client/
```

### Develop

```bash
npm run develop   # client dev server (localhost:3000) + server with nodemon (localhost:3001), concurrently
```

### Test

```bash
npm test
```

### Production build

```bash
npm run build     # builds the React client into client/build
npm start         # rebuilds client, then serves it via the Express server
```

The build uses relative asset paths, so `client/build` can also be uploaded as-is to S3 + CloudFront.

## Environment

- `client/.env` — `REACT_APP_EMAIL_URL` (or `VITE_EMAIL_URL`): endpoint the contact form POSTs `{ email, name, subject, message }` to; it expects `{ status: 200 }` back. If unset, the form offers a pre-filled email instead.
- `server/.env` — `NODE_ENV=production` to serve the build, optional `PORT` (default 3001).

See the `.env.example` files.
