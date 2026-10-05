"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { PlanItem, Workout } from "@/lib/types";

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
const PLAN_CAP = 5;

interface PlanContextValue {
  plan: PlanItem[];
  saved: PlanItem[];
  planCount: number;
  savedCount: number;
  isPlanFull: boolean;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toggleDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

function readStorage(key: string): PlanItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as PlanItem[]) : [];
  } catch {
    return [];
  }
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<PlanItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage after mount, so the server-
    // rendered markup (empty lists) matches the client's first paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlan(readStorage(PLAN_KEY));
    setSaved(readStorage(SAVED_KEY));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  const isInPlan = (id: number) => plan.some((w) => w.id === id);
  const isInSaved = (id: number) => saved.some((w) => w.id === id);

  const addToPlan = (workout: Workout) => {
    if (isInPlan(workout.id)) {
      toast("Already in today's plan");
      return;
    }
    if (plan.length >= PLAN_CAP) {
      toast.error("Today's plan is full (5 lifts max)");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, done: false }]);
    toast.success("Added to today's plan");
  };

  const addToSaved = (workout: Workout) => {
    if (isInSaved(workout.id)) {
      toast("Already saved");
      return;
    }
    setSaved((prev) => [...prev, { ...workout }]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    toast("Removed from today's plan");
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
    toast("Removed from saved");
  };

  const toggleDone = (id: number) => {
    setPlan((prev) =>
      prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
    );
    const target = plan.find((w) => w.id === id);
    toast.success(target?.done ? "Marked as not done" : "Marked as done");
  };

  const value = useMemo(
    () => ({
      plan,
      saved,
      planCount: plan.length,
      savedCount: saved.length,
      isPlanFull: plan.length >= PLAN_CAP,
      isInPlan,
      isInSaved,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      toggleDone,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [plan, saved]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return ctx;
}
