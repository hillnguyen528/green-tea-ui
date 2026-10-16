"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Độ dịch chuyển tối đa, tính theo phần trăm chiều cao phần tử. */
  amount?: number;
};

// Chỉ dịch chuyển trên màn hình rộng; mobile giữ ảnh đứng yên để nhẹ máy.
export function Parallax({ children, className, amount = 12 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${amount}%`]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="relative size-full max-md:transform-none!">
        {children}
      </motion.div>
    </div>
  );
}
