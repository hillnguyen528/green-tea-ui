"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ShareButtonProps = {
  title: string;
  text?: string;
  label?: string;
  className?: string;
};

// Dùng Web Share API khi trình duyệt hỗ trợ, còn lại thì sao chép liên kết.
export function ShareButton({
  title,
  text,
  label = "Chia sẻ",
  className,
}: ShareButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // Người dùng đóng bảng chia sẻ: không cần báo gì.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2400);
  }

  return (
    <button
      type="button"
      onClick={share}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-[0.9375rem] font-medium whitespace-nowrap transition-[background-color,border-color,transform] duration-200 ease-calm active:scale-[0.97]",
        className,
      )}
    >
      {status === "copied" ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Share2 className="size-4" aria-hidden="true" />
      )}
      <span aria-live="polite">
        {status === "copied"
          ? "Đã sao chép liên kết"
          : status === "failed"
            ? "Chưa sao chép được, bạn thử lại nhé"
            : label}
      </span>
    </button>
  );
}
