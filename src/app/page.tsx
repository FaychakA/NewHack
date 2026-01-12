'use client';

import { useSectionNav } from '@/lib/useSectionNav';
import { SECTIONS } from '@/lib/sections';

export default function Home() {
  const nav = useSectionNav('intro');

  return (
    <main className="h-dvh w-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed left-4 top-4 z-50 rounded-md bg-white/10 px-3 py-2 text-xs backdrop-blur">
        <div>
          section: <b>{nav.id}</b> ({nav.index + 1}/{nav.total})
        </div>
        <div className="opacity-70">wheel / arrows to navigate</div>
      </div>

      <div className="relative h-dvh w-screen">
        {SECTIONS.map((id, i) => {
          const active = i === nav.index;

          return (
            <section
              key={id}
              aria-hidden={!active}
              className={[
                'absolute inset-0 grid place-items-center transition-opacity duration-500',
                active ? 'opacity-100' : 'pointer-events-none opacity-0',
              ].join(' ')}
            >
              <div className="text-center">
                <div className="text-sm uppercase tracking-[0.25em] opacity-70">
                  {id}
                </div>
                <h1 className="mt-3 text-4xl font-semibold">Hack24x7</h1>
                <p className="mt-3 max-w-md text-white/70">
                  Placeholder секція. Далі замінимо на реальний дизайн і
                  підключимо GSAP-анімації.
                </p>

                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    className="pointer-events-auto rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10 disabled:opacity-40"
                    onClick={nav.prev}
                    disabled={!nav.canPrev}
                  >
                    Prev
                  </button>
                  <button
                    className="pointer-events-auto rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10 disabled:opacity-40"
                    onClick={nav.next}
                    disabled={!nav.canNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
