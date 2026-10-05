export default function Loader({ label = "Loading workouts…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />
      <p className="font-display text-sm uppercase tracking-wide text-neutral-400">
        {label}
      </p>
    </div>
  );
}
