import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0b0c]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Image src="/assets/logo.png" alt="FitLog logo" width={22} height={22} />
          <span className="font-display text-lg font-bold uppercase tracking-wide">
            FitLog
          </span>
        </div>
        <p className="text-center text-xs text-neutral-500 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
