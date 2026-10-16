"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

// Xóa hai bước: bấm lần đầu để hỏi lại, bấm lần hai mới xóa. Tự trở về sau vài giây.
export function ConfirmDeleteButton({
  label,
  onConfirm,
}: {
  label: string;
  onConfirm: () => void;
}) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const timer = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(timer);
  }, [armed]);

  if (armed) {
    return (
      <button
        type="button"
        onClick={onConfirm}
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-destructive px-4 text-sm font-medium text-paper"
      >
        <Trash2 className="size-4" aria-hidden="true" />
        Xóa hẳn?
      </button>
    );
  }
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setArmed(true)}
      className="flex size-11 items-center justify-center rounded-full text-ink/60 hover:bg-mist hover:text-destructive"
    >
      <Trash2 className="size-4" aria-hidden="true" />
    </button>
  );
}
