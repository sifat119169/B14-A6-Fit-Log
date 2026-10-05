import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/lib/types";
import StatsRow from "./StatsRow";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#151517] transition hover:border-[#ccff00]/50 hover:-translate-y-0.5"
    >
      <div className="relative h-44 w-full overflow-hidden bg-[#0b0b0c]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          unoptimized
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg font-bold uppercase leading-snug tracking-wide">
          {workout.name}
        </h3>
        <p className="text-xs text-neutral-500">{workout.equipment}</p>
        <div className="mt-auto pt-2">
          <StatsRow
            duration={workout.duration}
            calories={workout.caloriesBurned}
            rating={workout.rating}
          />
        </div>
      </div>
    </Link>
  );
}
