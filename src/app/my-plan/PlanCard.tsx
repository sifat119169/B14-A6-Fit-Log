"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { PlanItem } from "@/lib/types";
import StatsRow from "@/components/StatsRow";

export default function PlanCard({
  item,
  onRemove,
  onToggleDone,
  showDone,
}: {
  item: PlanItem;
  onRemove: (id: number) => void;
  onToggleDone?: (id: number) => void;
  showDone?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#151517] p-4 sm:flex-row sm:items-center">
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg bg-[#0b0b0c] sm:h-16 sm:w-20">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="flex-1">
        <h3
          className={`font-display text-base font-bold uppercase tracking-wide ${
            item.done ? "text-neutral-500 line-through" : "text-white"
          }`}
        >
          {item.name}
        </h3>
        <p className="text-xs text-neutral-500">{item.equipment}</p>
        <div className="mt-2">
          <StatsRow
            duration={item.duration}
            calories={item.caloriesBurned}
            rating={item.rating}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/workout/${item.id}`}
          className="rounded-md border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-200 hover:border-white"
        >
          View Details
        </Link>
        {showDone && onToggleDone && (
          <button
            onClick={() => onToggleDone(item.id)}
            title="Mark as done"
            className={`flex h-8 w-8 items-center justify-center rounded-md border transition ${
              item.done
                ? "border-[#ccff00] bg-[#ccff00] text-black"
                : "border-white/20 text-neutral-200 hover:border-[#ccff00]"
            }`}
          >
            <Check size={16} />
          </button>
        )}
        <button
          onClick={() => onRemove(item.id)}
          title="Remove"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-white/20 text-neutral-200 hover:border-red-400 hover:text-red-400"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
