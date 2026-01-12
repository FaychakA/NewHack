'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SectionId } from './sections';
import { SECTIONS } from './sections';

type Direction = 1 | -1;

export function useSectionNav(initial: SectionId = 'intro') {
  const initialIndex = useMemo(() => {
    const idx = SECTIONS.indexOf(initial);
    return idx >= 0 ? idx : 0;
  }, [initial]);

  const [index, setIndex] = useState<number>(initialIndex);

  const lockedRef = useRef(false);
  const lock = useCallback((ms = 700) => {
    lockedRef.current = true;
    window.setTimeout(() => {
      lockedRef.current = false;
    }, ms);
  }, []);

  const canGo = useCallback(
    (dir: Direction) => {
      const next = index + dir;
      return next >= 0 && next < SECTIONS.length;
    },
    [index]
  );

  const go = useCallback(
    (dir: Direction) => {
      if (lockedRef.current) return;
      const next = index + dir;
      if (next < 0 || next >= SECTIONS.length) return;
      setIndex(next);
      lock();
    },
    [index, lock]
  );

  const goTo = useCallback((id: SectionId) => {
    const next = SECTIONS.indexOf(id);
    if (next >= 0) setIndex(next);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 10) return;
      e.preventDefault();
      go(e.deltaY > 0 ? 1 : -1);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') go(1);
      if (e.key === 'ArrowUp' || e.key === 'PageUp') go(-1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [go]);

  return {
    index,
    id: SECTIONS[index],
    total: SECTIONS.length,
    canPrev: canGo(-1),
    canNext: canGo(1),
    prev: () => go(-1),
    next: () => go(1),
    goTo,
  };
}
