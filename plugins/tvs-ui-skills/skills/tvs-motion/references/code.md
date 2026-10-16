# Mã nguồn tham chiếu: hằng số và primitive chuyển động

Trích nguyên văn từ dự án Trà Việt Số (Next.js 16, Tailwind CSS 4, motion). Đường dẫn là đường dẫn trong dự án gốc; khi chuyển sang dự án mới, đặt lại cho hợp cấu trúc mới.

### `src/lib/motion.ts`

```ts
export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const duration = {
  fast: 0.2,
  base: 0.5,
  slow: 0.9,
} as const;

export const stagger = 0.08;
```

### `src/components/motion/motion-provider.tsx`

```tsx
"use client";

import { MotionConfig } from "motion/react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

### `src/components/motion/reveal.tsx`

```tsx
"use client";

import { motion } from "motion/react";
import { duration, ease } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: duration.slow, ease: ease.out, delay }}
    >
      {children}
    </Component>
  );
}
```

### `src/components/motion/parallax.tsx`

```tsx
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
```

### `src/components/motion/steam.tsx`

```tsx
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
```

### `src/components/home/hero.tsx`

```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Parallax } from "@/components/motion/parallax";
import { CtaLink } from "@/components/ui/cta-link";
import { regions } from "@/data/regions";
import { teas } from "@/data/teas";
import { SITE } from "@/lib/site";

const STATS = [
  { value: regions.length, label: "vùng trà" },
  { value: teas.length, label: "loại trà" },
  { value: 4, label: "cấp độ thưởng trà" },
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-charcoal text-porcelain">
      <Parallax className="absolute inset-0 -z-20" amount={12}>
        <Image
          src="/images/hero-moc-chau.jpg"
          alt="Những lớp đồi chè Mộc Châu nối nhau trong nắng sớm màu mật ong"
          fill
          preload
          quality={60}
          sizes="100vw"
          className="scale-110 object-cover"
        />
      </Parallax>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-charcoal)_4%,rgb(16_21_19/0.72)_38%,rgb(16_21_19/0.25)_70%,rgb(16_21_19/0.55)_100%)]"
      />

      <div className="container-tvs flex flex-1 flex-col justify-end pt-28 pb-10 md:pb-14">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow animate-rise text-gold">
              {SITE.englishName}
            </p>
            <h1 className="display-hero mt-4 animate-rise [animation-delay:120ms]">
              Trà Việt <em className="text-gold">Số</em>
            </h1>
            <p className="mt-5 max-w-xl animate-rise text-lg leading-relaxed text-porcelain/85 [animation-delay:240ms] md:text-xl">
              Số hóa nghệ thuật làm và thưởng trà Việt Nam. Khám phá vùng trà,
              tìm gu của bạn và viết tiếp câu chuyện.
            </p>

            <div className="mt-8 flex animate-rise flex-col gap-3 [animation-delay:360ms] sm:flex-row sm:flex-wrap sm:items-center">
              <CtaLink href="/atlas" variant="gold">
                Khám phá bản đồ trà
                <ArrowRight aria-hidden="true" />
              </CtaLink>
              <CtaLink href="#gu-tra" variant="outlineLight">
                Tìm gu trà của bạn
              </CtaLink>
              <Link
                href="/write"
                className="inline-flex min-h-12 items-center gap-1.5 self-start px-2 text-[0.9375rem] font-medium text-porcelain/85 underline decoration-porcelain/30 underline-offset-8 transition-colors hover:text-porcelain hover:decoration-oolong-gold sm:self-auto"
              >
                Viết câu chuyện trà
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <figure className="hidden animate-rise justify-self-end [animation-delay:500ms] lg:col-span-4 lg:block">
            <div className="relative aspect-[4/5] w-64 rotate-2 overflow-hidden rounded-3xl border border-porcelain/15 shadow-2xl shadow-charcoal/60 xl:w-72">
              <Image
                src="/images/harvest.jpg"
                alt="Người phụ nữ đội nón lá hái chè trên đồi"
                fill
                sizes="18rem"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 max-w-64 text-[0.8125rem] leading-relaxed text-porcelain/70 xl:max-w-72">
              <span className="text-gold">Một tôm hai lá.</span> Chén trà
              ngon bắt đầu từ bàn tay hái búp lúc sớm mai.
            </figcaption>
          </figure>
        </div>

        <div className="mt-10 flex animate-rise items-end justify-between gap-6 border-t border-porcelain/15 pt-6 [animation-delay:620ms] md:mt-14">
          <dl className="flex gap-7 sm:gap-12">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="text-[0.8125rem] text-porcelain/65">
                  {stat.label}
                </dt>
                <dd className="font-display text-3xl md:text-4xl">
                  {String(stat.value).padStart(2, "0")}
                </dd>
              </div>
            ))}
          </dl>
          <a
            href="#gu-tra"
            className="hidden items-center gap-3 text-[0.8125rem] text-porcelain/70 transition-colors hover:text-porcelain sm:flex"
          >
            Cuộn để bắt đầu
            <span
              aria-hidden="true"
              className="relative block h-10 w-px overflow-hidden bg-porcelain/20"
            >
              <span className="absolute inset-0 animate-scroll-cue bg-oolong-gold" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
```
