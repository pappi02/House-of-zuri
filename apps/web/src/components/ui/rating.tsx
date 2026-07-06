import { Star } from "lucide-react";

export function Rating({ value = 5 }: { value?: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-500" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={14} fill={index < value ? "currentColor" : "none"} />
      ))}
    </div>
  );
}
