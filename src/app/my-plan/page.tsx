"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import PlanCard from "./PlanCard";
import Loader from "@/components/Loader";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, toggleDone } = usePlan();
  const [tab, setTab] = useState<Tab>("plan");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Brief loading state to mirror data fetching, since plan/saved are
    // hydrated from localStorage on mount.
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const metrics = useMemo(() => {
    return plan.reduce(
      (acc, item) => ({
        exercises: acc.exercises + 1,
        minutes: acc.minutes + item.duration,
        calories: acc.calories + item.caloriesBurned,
      }),
      { exercises: 0, minutes: 0, calories: 0 }
    );
  }, [plan]);

  const list = tab === "plan" ? plan : saved;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-sm text-neutral-400">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          { label: "Exercises", value: metrics.exercises },
          { label: "Minutes", value: metrics.minutes },
          { label: "Calories", value: metrics.calories },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-white/10 bg-[#151517] p-4 text-center"
          >
            <p className="font-display text-3xl font-bold text-[#ccff00]">
              {m.value}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wide text-neutral-500">
              {m.label}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-10 flex gap-2 border-b border-white/10">
        {(["plan", "saved"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide transition ${
              tab === t
                ? "border-b-2 border-[#ccff00] text-[#ccff00]"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            {t === "plan" ? "Today's Plan" : "Saved"}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {loading && <Loader label="Loading workouts…" />}

        {!loading && list.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-white/10 bg-[#151517] py-20 text-center">
            <Dumbbell size={32} className="text-neutral-600" />
            <h2 className="font-display text-xl font-bold uppercase tracking-wide">
              Nothing here yet
            </h2>
            <p className="max-w-xs text-sm text-neutral-500">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-2 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-black"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {!loading && list.length > 0 && (
          <div className="flex flex-col gap-4">
            {list.map((item) => (
              <PlanCard
                key={item.id}
                item={item}
                showDone={tab === "plan"}
                onToggleDone={tab === "plan" ? toggleDone : undefined}
                onRemove={tab === "plan" ? removeFromPlan : removeFromSaved}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
