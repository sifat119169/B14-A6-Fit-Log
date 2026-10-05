import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0b0b0c]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        <div>
          <p className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.2em] text-[#ccff00]">
            Workout Library
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-6 max-w-md text-base text-neutral-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-95"
          >
            Browse Workouts
            <ArrowRight size={18} />
          </a>
        </div>
        <div className="relative flex justify-center md:justify-end">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#151517]">
            <Image
              src="/assets/banner.png"
              alt="FitLog hero"
              fill
              className="object-contain p-6"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
