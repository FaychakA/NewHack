'use client';

import { IntroScreen } from '@/components/IntroScreen';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useAppStage } from '@/lib/useAppStage';
import { useSectionNav } from '@/lib/useSectionNav';

export default function Home() {
  const { stage, progress, goToSite } = useAppStage();
  const nav = useSectionNav('intro');

  return (
    <main className="h-dvh w-screen overflow-hidden bg-black text-white">
      {stage === 'loading' && <LoadingScreen progress={progress} />}
      {stage === 'intro' && <IntroScreen onComplete={goToSite} />}

      {stage === 'site' && (
        <div className="relative h-dvh w-screen">
          <div className="pointer-events-none fixed left-4 top-4 z-50 rounded-md bg-white/10 px-3 py-2 text-xs backdrop-blur">
            <div>
              section: <b>{nav.id}</b> ({nav.index + 1}/{nav.total})
            </div>
            <div className="opacity-70">scroll / swipe to navigate</div>
          </div>

          <section className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-sm uppercase tracking-[0.25em] opacity-70">
                {nav.id}
              </div>
              <h1 className="mt-3 text-4xl font-semibold">Hack24x7</h1>
              <p className="mt-3 max-w-md text-white/70">
                Далі замінимо це на реальний дизайн із Figma і підключимо enter/exit.
              </p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
