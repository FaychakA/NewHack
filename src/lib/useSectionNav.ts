'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/dist/Observer';

import { SECTIONS } from './sections';
import type { SectionId } from './sections';

type Direction = 1 | -1;

export function useSectionNav(initial: SectionId = 'intro') {
  const initialIndex = useMemo(() => {
    const idx = SECTIONS.indexOf(initial);
    return idx >= 0 ? idx : 0;
  }, [initial]);

  const [index, setIndex] = useState(initialIndex);
  const locked = useRef(false);

  const go = (dir: Direction) => {
    if (locked.current) return;

    const next = index + dir;
    if (next < 0 || next >= SECTIONS.length) return;

    locked.current = true;
    setIndex(next);

    window.setTimeout(() => {
      locked.current = false;
    }, 600);
  };

  useEffect(() => {
    // safety: client-only
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(Observer);

    const obs = Observer.create({
      target: window,
      type: 'wheel,touch,pointer',
      wheelSpeed: -1,
      tolerance: 12,
      preventDefault: true,
      onDown: () => go(1),
      onUp: () => go(-1),
    });

    return () => obs.kill();
  }, [index]);

  return {
    index,
    id: SECTIONS[index],
    total: SECTIONS.length,
    prev: () => go(-1),
    next: () => go(1),
  };
}
