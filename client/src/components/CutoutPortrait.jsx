import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

// The portrait as a poster: the photo cut away from its plain studio wall, toned from
// ink to paper, standing in front of a blue disc on whatever panel holds it. The disc pops
// in and the photo rises into place on arrival; hovering shears it in bands for a moment.
// The photo never sizes the panel: give the component its size from outside.

const INK = [27, 28, 30];
const PAPER = [245, 245, 240];

const load = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

// Separable box blur of a 0..1 mask, for a soft cut edge
function feather(mask, w, h, r) {
  const tmp = new Float32Array(mask.length);
  const out = new Float32Array(mask.length);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let sum = 0;
      let n = 0;
      for (let k = -r; k <= r; k++) {
        const xx = x + k;
        if (xx >= 0 && xx < w) {
          sum += mask[y * w + xx];
          n++;
        }
      }
      tmp[y * w + x] = sum / n;
    }
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let sum = 0;
      let n = 0;
      for (let k = -r; k <= r; k++) {
        const yy = y + k;
        if (yy >= 0 && yy < h) {
          sum += tmp[yy * w + x];
          n++;
        }
      }
      out[y * w + x] = sum / n;
    }
  return out;
}

// Cut the subject out: flood-fill from the photo's edges through pale, colourless pixels
// (the wall, and the grey chair touching the edge), feather the edge, tone ink → paper
async function cutout(src) {
  const img = await load(src);
  const [w, h] = [img.naturalWidth, img.naturalHeight];
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, w, h);
  const px = data.data;
  const n = w * h;

  const lum = new Float32Array(n);
  const wallish = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const [r, g, b] = [px[i * 4], px[i * 4 + 1], px[i * 4 + 2]];
    lum[i] = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    wallish[i] = lum[i] > 0.42 && Math.max(r, g, b) - Math.min(r, g, b) < 34 ? 1 : 0;
  }

  const bg = new Float32Array(n);
  const queue = new Int32Array(n);
  let [head, tail] = [0, 0];
  const push = (i) => {
    if (!bg[i] && wallish[i]) {
      bg[i] = 1;
      queue[tail++] = i;
    }
  };
  for (let x = 0; x < w; x++) {
    push(x);
    push((h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    push(y * w);
    push(y * w + w - 1);
  }
  while (head < tail) {
    const i = queue[head++];
    const x = i % w;
    if (x > 0) push(i - 1);
    if (x < w - 1) push(i + 1);
    if (i >= w) push(i - w);
    if (i < n - w) push(i + w);
  }

  const alpha = feather(
    bg.map((v) => 1 - v),
    w,
    h,
    2,
  );

  // Stretch the subject's tones (2nd–98th percentile) and lift the shadows a touch
  const subject = [];
  for (let i = 0; i < n; i += 5) if (alpha[i] > 0.9) subject.push(lum[i]);
  subject.sort((a, b) => a - b);
  const [lo, hi] = [subject[Math.floor(subject.length * 0.02)] ?? 0, subject[Math.floor(subject.length * 0.98)] ?? 1];

  for (let i = 0; i < n; i++) {
    const t = Math.min(1, Math.max(0, (lum[i] - lo) / (hi - lo || 1))) ** 0.9;
    px[i * 4] = INK[0] + (PAPER[0] - INK[0]) * t;
    px[i * 4 + 1] = INK[1] + (PAPER[1] - INK[1]) * t;
    px[i * 4 + 2] = INK[2] + (PAPER[2] - INK[2]) * t;
    px[i * 4 + 3] = Math.round(alpha[i] * 255);
  }
  ctx.putImageData(data, 0, 0);
  return canvas.toDataURL('image/png');
}

const Plus = ({ className }) => (
  <svg viewBox="0 0 16 16" className={`h-4 w-4 fill-ink ${className}`}>
    <path d="M7 0h2v16H7zM0 7h16v2H0z" />
  </svg>
);

export default function CutoutPortrait({ src, alt, className = '' }) {
  const [url, setUrl] = useState(null);
  const imgRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    let live = true;
    cutout(src)
      .then((u) => live && setUrl(u))
      .catch(() => live && setUrl(src));
    return () => {
      live = false;
    };
  }, [src]);

  const shear = () => {
    const el = imgRef.current;
    if (!el || reduce) return;
    el.classList.remove('is-glitching');
    void el.offsetWidth; // restart the animation
    el.classList.add('is-glitching');
    clearTimeout(el.shearTimer);
    el.shearTimer = setTimeout(() => el.classList.remove('is-glitching'), 450);
  };

  const ease = [0.2, 0.8, 0.2, 1];

  return (
    <div className={`grid stack overflow-clip [contain:size] ${className}`} onPointerEnter={shear}>
      {/* Ring, disc and plus marks behind the head, sized from the panel's height and
          centred a touch below the middle */}
      <div aria-hidden="true" className="grid stack aspect-square h-[76%] translate-y-[6.6%] place-self-center">
        <span className="rounded-full border-2 border-ink/40" />
        <motion.span
          className="m-[12%] rounded-full bg-blue"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.1 }}
        />
        <Plus className="-translate-y-1/2 self-start justify-self-center" />
        <Plus className="-translate-x-1/2 self-center justify-self-start" />
        <Plus className="translate-x-1/2 self-center justify-self-end" />
      </div>

      {url && (
        <motion.div
          className="h-[80%] w-max self-end [justify-self:unsafe_center]"
          style={{ x: '2%' }}
          initial={{ y: '14%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <img ref={imgRef} src={url} alt={alt} className="shear block h-full w-auto max-w-none" />
        </motion.div>
      )}
    </div>
  );
}
