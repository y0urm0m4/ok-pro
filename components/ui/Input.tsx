import { cn } from "@/lib/cn";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  dark?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, dark = false, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className={cn("text-sm font-medium", dark ? "text-white/90" : "text-text")}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-xl border px-4 py-3 text-sm transition-colors duration-200",
            "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent",
            dark
              ? "border-white/20 bg-white/10 text-white placeholder:text-white/40"
              : "border-border bg-surface text-text placeholder:text-text-muted",
            error && "border-red-400 focus:border-red-400 focus:ring-red-400",
            className
          )}
          {...props}
        />
        {error && <p className={cn("text-xs", dark ? "text-red-400" : "text-red-500")}>{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
