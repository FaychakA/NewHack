'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type AppStage = 'loading' | 'intro' | 'site';

export function useAppStage() {
  const [stage, setStage] = useState<AppStage>('loading');
  const [progress, setProgress] = useState<number>(0);

  const timerRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  const goToSite = useCallback(() => setStage('site'), []);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    timerRef.current = window.setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + 2);

        if (next === 100) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          window.setTimeout(() => setStage('intro'), 250);
        }

        return next;
      });
    }, 35);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  return { stage, progress, goToSite };
}
