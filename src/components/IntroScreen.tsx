'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  onComplete: () => void;
};

export function IntroScreen({ onComplete }: Props) {
  const [hold, setHold] = useState(0); // 0..100
  const [completed, setCompleted] = useState(false);

  const holdingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const startHold = () => {
    if (completed) return;

    holdingRef.current = true;

    const tick = () => {
      setHold((v) => {
        const next = Math.min(100, v + 2);
        if (next >= 100) {
          holdingRef.current = false;
          setCompleted(true);
          return 100;
        }
        return next;
      });

      if (holdingRef.current) rafRef.current = requestAnimationFrame(tick);
      else rafRef.current = null;
    };

    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
  };

  const stopHold = () => {
    holdingRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;

    // якщо вже completed — не скидати
    if (!completed) setHold(0);
  };

  useEffect(() => {
    if (!completed) return;
    onComplete();
  }, [completed, onComplete]);

  useEffect(() => {
    return () => {
      holdingRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="absolute inset-0 grid place-items-center bg-black text-white">
      <div className="text-center">
        <div className="text-sm uppercase tracking-[0.35em] text-white/60">
          hack24x7
        </div>

        <h1 className="mt-4 text-4xl font-semibold">Press & Hold</h1>
        <p className="mt-2 max-w-md text-white/60">
          Утримуй кнопку, щоб запустити сайт.
        </p>

        <div className="mt-10 flex items-center justify-center">
          <button
            type="button"
            className="relative grid h-28 w-28 place-items-center rounded-full border border-white/20 bg-white/5 select-none"
            onPointerDown={startHold}
            onPointerUp={stopHold}
            onPointerCancel={stopHold}
            onPointerLeave={stopHold}
          >
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 44}
                strokeDashoffset={(1 - hold / 100) * (2 * Math.PI * 44)}
              />
            </svg>

            <span className="relative text-xs uppercase tracking-[0.2em] text-white/80">
              hold
            </span>
          </button>
        </div>

        <div className="mt-4 font-mono text-xs text-white/60">{hold}%</div>
      </div>
    </section>
  );
}
