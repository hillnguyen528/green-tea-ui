"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterChipsProps<K extends string> = {
  label: string;
  groups: { key: K; label: string; options: { value: string; label: string }[] }[];
  filters: Partial<Record<K, string>>;
  onToggle: (key: K, value: string) => void;
  className?: string;
};

export function FilterChips<K extends string>({
  label,
  groups,
  filters,
  onToggle,
  className,
}: FilterChipsProps<K>) {
  return (
    <section aria-label={label} className={cn("space-y-3", className)}>
      {groups.map((group) => (
        <div key={group.key} className="flex items-center gap-3">
          <h2 className="w-16 shrink-0 text-[0.8125rem] text-ink/70">
            {group.label}
          </h2>
          <ul className="-mr-5 flex min-w-0 flex-1 gap-2 overflow-x-auto pr-5 pb-1 [scrollbar-width:none] md:mr-0 md:flex-wrap md:overflow-visible md:pr-0">
            {group.options.map((option) => {
              const pressed = filters[group.key] === option.value;
              return (
                <li key={option.value} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => onToggle(group.key, option.value)}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-sm whitespace-nowrap transition-colors duration-200 active:scale-[0.97]",
                      pressed
                        ? "border-ink bg-ink text-paper"
                        : "border-ink/15 text-ink/80 hover:border-ink/50",
                    )}
                  >
                    {option.label}
                    {pressed && <X className="size-3.5" aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}
