import { Workout } from "./types";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }
  return res.json();
}

export async function getWorkoutById(id: string | number): Promise<Workout | null> {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  // Some APIs return an array for a single-id query; normalize it.
  if (Array.isArray(data)) {
    return data[0] ?? null;
  }
  return data ?? null;
}
