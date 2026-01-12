'use client';

type Props = {
  progress: number; // 0..100
};

export function LoadingScreen({ progress }: Props) {
  return (
    <section className="absolute inset-0 grid place-items-center bg-black text-white">
      <div className="w-[min(560px,92vw)]">
        <div className="flex items-end justify-between">
          <div className="text-sm uppercase tracking-[0.35em] text-white/60">
            loading
          </div>
          <div className="font-mono text-sm text-white/80">{progress}%</div>
        </div>

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-white transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-8 text-center">
          <div className="text-3xl font-semibold">hack24x7</div>
          <div className="mt-2 text-sm text-white/60">
            preparing the experience…
          </div>
        </div>
      </div>
    </section>
  );
}
