import { cn } from "@/lib/utils";

// Hơi trà: ba sợi mảnh trôi lên rồi tan. Thuần CSS, tự tắt khi người dùng giảm chuyển động.
export function Steam({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 56"
      fill="none"
      aria-hidden="true"
      className={cn("h-14 w-12", className)}
    >
      {[
        "M12 52c-5-8 5-12 0-20s5-12 0-20",
        "M24 54c-5-8 5-13 0-21s5-13 0-21",
        "M36 52c-5-8 5-12 0-20s5-12 0-20",
      ].map((d, index) => (
        <path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="animate-steam"
          style={{ animationDelay: `${index * 1.3}s` }}
        />
      ))}
    </svg>
  );
}
