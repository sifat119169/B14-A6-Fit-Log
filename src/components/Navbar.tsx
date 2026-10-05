"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/#library", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0b0c]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/logo.png" alt="FitLog logo" width={28} height={28} />
          <span className="font-display text-xl font-bold uppercase tracking-wide">
            FitLog
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/my-plan"
                ? pathname === "/my-plan"
                : pathname === "/";
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-display text-sm font-semibold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "text-[#ccff00]"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold uppercase tracking-wide text-black transition hover:brightness-95 sm:px-4 sm:text-sm"
          >
            Plan {planCount}
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-white/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white transition hover:border-white sm:px-4 sm:text-sm"
          >
            Saved {savedCount}
          </Link>
        </div>
      </div>
    </header>
  );
}
