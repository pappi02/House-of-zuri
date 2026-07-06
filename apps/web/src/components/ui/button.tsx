import { ButtonHTMLAttributes, Children, ReactElement, ReactNode, cloneElement, isValidElement } from "react";

const base = "inline-flex items-center justify-center gap-2 rounded-full border text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

const variants = {
  primary: "border-stone-900 bg-stone-900 text-white hover:bg-stone-800",
  secondary: "border-amber-500 bg-amber-500 text-stone-950 hover:bg-amber-400",
  outline: "border-stone-300 bg-white text-stone-800 hover:border-stone-900 hover:text-stone-900",
  ghost: "border-transparent bg-transparent text-stone-700 hover:bg-stone-100 hover:text-stone-900",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  children: ReactNode;
  asChild?: boolean;
};

export function Button({ className = "", variant = "primary", size = "md", children, asChild = false, ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  if (asChild && Children.count(children) === 1 && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      className: `${classes} ${child.props.className ?? ""}`.trim(),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
