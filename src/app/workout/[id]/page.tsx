"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarPlus, Bookmark } from "lucide-react";
import { getWorkoutById } from "@/lib/api";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";
import Loader from "@/components/Loader";
import StatsRow from "@/components/StatsRow";

const SPEC_ROWS: { label: string; key: keyof Workout | "muscleGroups" }[] = [
  { label: "Equipment", key: "equipment" },
  { label: "Difficulty", key: "difficulty" },
  { label: "Sets", key: "sets" },
  { label: "Reps", key: "reps" },
  { label: "Duration", key: "duration" },
  { label: "Calories", key: "caloriesBurned" },
  { label: "Rating", key: "rating" },
];

function formatValue(workout: Workout, key: keyof Workout | "muscleGroups") {
  const value = workout[key as keyof Workout];
  if (key === "duration") return `${value} min`;
  if (key === "caloriesBurned") return `${value} kcal`;
  return String(value);
}

export default function WorkoutDetailPage() {
  const params = useParams<{ id: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { addToPlan, addToSaved, isInPlan, isInSaved, isPlanFull } = usePlan();

  useEffect(() => {
    let active = true;
    getWorkoutById(params.id)
      .then((data) => {
        if (!active) return;
        if (!data) {
          setNotFound(true);
        } else {
          setWorkout(data);
        }
      })
      .catch(() => active && setNotFound(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [params.id]);

  if (loading) return <Loader label="Loading workout…" />;

  if (notFound || !workout) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold uppercase">
          Workout not found
        </h1>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-5 py-2.5 font-display text-sm font-bold uppercase text-black"
        >
          <ArrowLeft size={16} /> Back to library
        </Link>
      </div>
    );
  }

  const inPlan = isInPlan(workout.id);
  const inSaved = isInSaved(workout.id);
  const disableAdd = inPlan || (isPlanFull && !inPlan);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/#library"
        className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white"
      >
        <ArrowLeft size={16} /> Back to library
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Left: media */}
        <div className="relative h-72 overflow-hidden rounded-2xl border border-white/10 bg-[#151517] sm:h-96 md:h-full">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            unoptimized
            priority
          />
        </div>

        {/* Right: content */}
        <div className="flex flex-col">
          <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-wide sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-sm text-neutral-400">{workout.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4">
            <StatsRow
              duration={workout.duration}
              calories={workout.caloriesBurned}
              rating={workout.rating}
            />
          </div>

          {/* Key specs panel */}
          <div className="mt-6 divide-y divide-white/10 rounded-xl border border-white/10 bg-[#151517]">
            {SPEC_ROWS.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between px-4 py-2.5 text-sm"
              >
                <span className="font-display uppercase tracking-wide text-neutral-500">
                  {row.label}
                </span>
                <span className="font-medium text-neutral-200">
                  {formatValue(workout, row.key)}
                </span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-6">
            <h2 className="font-display text-lg font-bold uppercase tracking-wide">
              Instructions
            </h2>
            <ol className="mt-3 space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-neutral-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => addToPlan(workout)}
              disabled={disableAdd}
              className="inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CalendarPlus size={16} />
              {inPlan ? "In today's plan" : "Add to today's plan"}
            </button>
            <button
              onClick={() => addToSaved(workout)}
              disabled={inSaved}
              className="inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-white transition hover:border-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Bookmark size={16} />
              {inSaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
