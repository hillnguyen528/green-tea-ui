import { cn } from "@/lib/utils";

export const inputClass =
  "block min-h-12 w-full rounded-2xl border border-ink/20 bg-card px-4 py-3 text-base text-ink placeholder:text-ink/45 transition-colors focus-visible:border-leaf aria-invalid:border-destructive";

type FieldProps = {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
};

// Nhãn, gợi ý và lỗi gắn với ô nhập qua id: `${htmlFor}-hint`, `${htmlFor}-error`.
export function Field({
  label,
  htmlFor,
  hint,
  error,
  optional,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={htmlFor} className="flex items-baseline justify-between gap-3 text-sm font-medium">
        {label}
        {optional && <span className="text-[0.8125rem] font-normal text-ink/65">Không bắt buộc</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className="text-[0.8125rem] text-ink/70">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-[0.8125rem] font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function ChipToggle({
  pressed,
  onClick,
  children,
  tone = "light",
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center rounded-full border px-4 text-sm whitespace-nowrap transition-colors duration-200 active:scale-[0.97]",
        tone === "dark"
          ? pressed
            ? "border-gold bg-gold text-night"
            : "border-paper/20 text-paper/85 hover:border-paper/50"
          : pressed
            ? "border-ink bg-ink text-paper"
            : "border-ink/15 text-ink/80 hover:border-ink/50",
      )}
    >
      {children}
    </button>
  );
}
