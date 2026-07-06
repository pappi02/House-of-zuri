"use client";

import * as React from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-black text-white hover:bg-black/90 border border-black",
  secondary:
    "bg-gold text-black hover:bg-gold/90 border border-gold",
  outline:
    "bg-transparent text-foreground border border-white/20 hover:border-white/40 hover:bg-white/5",
  ghost:
    "bg-transparent text-foreground/80 hover:text-foreground hover:bg-white/5",
  danger:
    "bg-red-600 text-white hover:bg-red-600/90 border border-red-600",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4",
  md: "h-10 px-5",
  lg: "h-12 px-6 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className ?? ""}`}
      {...props}
    />
  );
}
