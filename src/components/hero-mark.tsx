"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPH = "/brand/mark-bone.png";
const ALPHA_HIT = 24;

/** Fill the outer silhouette so rib gaps don't flicker the hover. */
function silhouetteFromAlpha(data: Uint8ClampedArray, width: number, height: number) {
  const solid = new Uint8Array(width * height);

  for (let y = 0; y < height; y++) {
    let min = -1;
    let max = -1;
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > ALPHA_HIT) {
        if (min < 0) min = x;
        max = x;
      }
    }
    if (min < 0) continue;
    solid.fill(1, y * width + min, y * width + max + 1);
  }

  for (let x = 0; x < width; x++) {
    let min = -1;
    let max = -1;
    for (let y = 0; y < height; y++) {
      if (data[(y * width + x) * 4 + 3] > ALPHA_HIT) {
        if (min < 0) min = y;
        max = y;
      }
    }
    if (min < 0) continue;
    for (let y = min; y <= max; y++) solid[y * width + x] = 1;
  }

  return solid;
}

export function HeroMark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hitRef = useRef<{ map: Uint8Array; width: number; height: number } | null>(
    null,
  );
  const [hot, setHot] = useState(false);
  const [pose, setPose] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const paint = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      hitRef.current = {
        map: silhouetteFromAlpha(data, canvas.width, canvas.height),
        width: canvas.width,
        height: canvas.height,
      };
    };

    if (img.complete && img.naturalWidth) paint();
    else img.addEventListener("load", paint, { once: true });
  }, []);

  const onMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    const hit = hitRef.current;
    if (!wrap || !hit) return;

    const rect = wrap.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const px = Math.min(hit.width - 1, Math.max(0, Math.floor(x * hit.width)));
    const py = Math.min(hit.height - 1, Math.max(0, Math.floor(y * hit.height)));
    const over = hit.map[py * hit.width + px] === 1;

    setHot(over);
    wrap.style.cursor = over ? "pointer" : "default";
    if (!over) return;

    setPose({
      rx: (0.5 - y) * 42,
      ry: (x - 0.5) * 48,
      mx: x * 100,
      my: y * 100,
    });
  }, []);

  const onLeave = useCallback(() => {
    setHot(false);
    if (wrapRef.current) wrapRef.current.style.cursor = "default";
  }, []);

  return (
    <div
      ref={wrapRef}
      className="hero-mark-wrap hero-rise hero-rise-3 mx-auto hidden min-[1100px]:block"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div
        className={hot ? "hero-mark is-hot" : "hero-mark"}
        style={
          {
            "--mx": `${pose.mx}%`,
            "--my": `${pose.my}%`,
            transform: hot
              ? `perspective(620px) rotateX(${pose.rx}deg) rotateY(${pose.ry}deg) scale(1.12)`
              : undefined,
          } as React.CSSProperties
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={GLYPH}
          alt=""
          draggable={false}
          className="hero-mark-glyph"
        />
        <span className="hero-mark-brass" aria-hidden="true" />
        <span className="hero-mark-sheen" aria-hidden="true" />
      </div>
    </div>
  );
}
