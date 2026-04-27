import { cn } from "@/lib/cn";

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  display?: boolean;
}

const styles: Record<number, string> = {
  1: "font-display text-5xl md:text-7xl font-semibold leading-tight tracking-tight",
  2: "font-display text-3xl md:text-5xl font-semibold leading-tight",
  3: "font-sans text-2xl md:text-3xl font-semibold leading-snug",
  4: "font-sans text-xl md:text-2xl font-semibold",
  5: "font-sans text-lg font-semibold",
  6: "font-sans text-base font-semibold",
};

export function Heading({ level, children, className, display }: HeadingProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return (
    <Tag
      className={cn(
        styles[level],
        display && "font-display",
        className
      )}
    >
      {children}
    </Tag>
  );
}
