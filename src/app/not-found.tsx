import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
      <p className="font-display text-6xl font-bold text-[#ccff00]">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-neutral-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-black"
      >
        <ArrowLeft size={16} /> Back to home
      </Link>
    </div>
  );
}
