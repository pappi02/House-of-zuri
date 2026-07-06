import { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow ? <p className="text-[11px] uppercase tracking-[0.35em] text-amber-600">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">{title}</h2>
      {description ? <p className="max-w-2xl text-base leading-7 text-stone-600">{description}</p> : null}
    </div>
  );
}
