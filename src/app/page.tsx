"use client";

import { useEffect, useMemo, useState } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";
import SearchInput from "@/components/SearchInput";
import Loader from "@/components/Loader";
import { getWorkouts } from "@/lib/api";
import { SortKey, Workout } from "@/lib/types";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    getWorkouts()
      .then((data) => {
        if (active) setWorkouts(data);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const visibleWorkouts = useMemo(() => {
    const filtered = workouts.filter((w) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        w.name.toLowerCase().includes(q) ||
        w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
      );
    });
    return [...filtered].sort((a, b) => b[sortKey] - a[sortKey]);
  }, [workouts, sortKey, query]);

  return (
    <>
      <Hero />

      <section id="library" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
              The Library
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchInput value={query} onChange={setQuery} />
            <SortDropdown value={sortKey} onChange={setSortKey} />
          </div>
        </div>

        {loading && <Loader />}

        {!loading && error && (
          <p className="py-16 text-center text-sm text-red-400">
            Couldn&apos;t load the workout library. Please try again later.
          </p>
        )}

        {!loading && !error && visibleWorkouts.length === 0 && (
          <p className="py-16 text-center text-sm text-neutral-500">
            No workouts match your search.
          </p>
        )}

        {!loading && !error && visibleWorkouts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
