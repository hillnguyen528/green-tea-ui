import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  tone?: "light" | "dark";
  accent?: "gold" | "clay" | "leaf";
  className?: string;
  id?: string;
};

const ACCENT = {
  gold: "text-highlight",
  clay: "text-warm",
  leaf: "text-leaf",
};

export function SectionHeader({
  eyebrow,
  title,
  lede,
  tone = "light",
  accent = "leaf",
  className,
  id,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className={cn("eyebrow", ACCENT[accent])}>{eyebrow}</p>
      <h2 id={id} className="display-section mt-4">
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            tone === "dark" ? "text-paper/70" : "text-ink/70",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
