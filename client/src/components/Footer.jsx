import { profile } from '../data/portfolio';

// Bars from the name's letters, so the same name always prints the same barcode
const BARS = [...profile.name.toUpperCase().replace(/\s/g, '')].map((ch) => 1 + (ch.charCodeAt(0) % 3));

function Barcode() {
  let x = 0;
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${BARS.reduce((s, w) => s + w * 2 + 1, 0)} 12`} className="h-3 w-auto fill-current">
      {BARS.map((w, i) => {
        const rect = <rect key={i} x={x} width={w} height="12" />;
        x += w * 2 + 1;
        return rect;
      })}
    </svg>
  );
}

// Footer strip across the bottom edge, matching the nav
export default function Footer() {
  return (
    <footer className="mt-20 bg-ink text-paper">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <span className="t-head text-sm">{profile.name}</span>
        <span className="t-spec text-dim">
          {profile.role} // {profile.location}
        </span>
        <span className="ml-auto flex items-center gap-3 t-spec text-dim">
          <Barcode />
          47.76° N · 122.20° W · {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
