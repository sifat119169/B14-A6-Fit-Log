import { Clock, Flame, Star } from "lucide-react";

export default function StatsRow({
  duration,
  calories,
  rating,
}: {
  duration: number;
  calories: number;
  rating: number;
}) {
  return (
    <div className="flex items-center gap-4 text-xs text-neutral-400">
      <span className="flex items-center gap-1">
        <Clock size={14} className="text-neutral-500" />
        {duration} min
      </span>
      <span className="flex items-center gap-1">
        <Flame size={14} className="text-orange-500" />
        {calories} kcal
      </span>
      <span className="flex items-center gap-1">
        <Star size={14} className="fill-[#ccff00] text-[#ccff00]" />
        {rating}
      </span>
    </div>
  );
}
