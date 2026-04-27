import { cn } from "@/lib/cn";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-text">{label}</label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-xl border border-border bg-surface px-4 py-3 text-text placeholder:text-text-muted text-sm transition-colors duration-200",
            "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent",
            error && "border-red-400 focus:border-red-400 focus:ring-red-400",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
