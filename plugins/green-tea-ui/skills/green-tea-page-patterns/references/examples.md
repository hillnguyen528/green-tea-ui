# Ví dụ section

Mã nguyên văn từ dự án Trà Việt Số (Next.js 16, Tailwind CSS 4, motion), đã đổi tên token sang bộ tên của green-tea-ui. Các import `@/data/...`, `@/lib/quiz`, `@/lib/site`, `@/lib/store/...` là dữ liệu và logic riêng của dự án gốc: thay bằng dữ liệu của dự án bạn. Dùng để học bố cục và nhịp, không chép nguyên.

## Hero tràn viền: ảnh parallax, tiêu đề lớn, 3 CTA, ảnh phụ xoay nhẹ, dải số liệu và gợi ý cuộn

Tệp gốc: `src/components/home/hero.tsx`

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
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-night text-paper">
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
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-night)_4%,rgb(16_21_19/0.72)_38%,rgb(16_21_19/0.25)_70%,rgb(16_21_19/0.55)_100%)]"
      />

      <div className="container-page flex flex-1 flex-col justify-end pt-28 pb-10 md:pb-14">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow animate-rise text-highlight">
              {SITE.englishName}
            </p>
            <h1 className="display-hero mt-4 animate-rise [animation-delay:120ms]">
              Trà Việt <em className="text-highlight">Số</em>
            </h1>
            <p className="mt-5 max-w-xl animate-rise text-lg leading-relaxed text-paper/85 [animation-delay:240ms] md:text-xl">
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
                className="inline-flex min-h-12 items-center gap-1.5 self-start px-2 text-[0.9375rem] font-medium text-paper/85 underline decoration-paper/30 underline-offset-8 transition-colors hover:text-paper hover:decoration-gold sm:self-auto"
              >
                Viết câu chuyện trà
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <figure className="hidden animate-rise justify-self-end [animation-delay:500ms] lg:col-span-4 lg:block">
            <div className="relative aspect-[4/5] w-64 rotate-2 overflow-hidden rounded-3xl border border-paper/15 shadow-2xl shadow-night/60 xl:w-72">
              <Image
                src="/images/harvest.jpg"
                alt="Người phụ nữ đội nón lá hái chè trên đồi"
                fill
                sizes="18rem"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 max-w-64 text-[0.8125rem] leading-relaxed text-paper/70 xl:max-w-72">
              <span className="text-highlight">Một tôm hai lá.</span> Chén trà
              ngon bắt đầu từ bàn tay hái búp lúc sớm mai.
            </figcaption>
          </figure>
        </div>

        <div className="mt-10 flex animate-rise items-end justify-between gap-6 border-t border-paper/15 pt-6 [animation-delay:620ms] md:mt-14">
          <dl className="flex gap-7 sm:gap-12">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="text-[0.8125rem] text-paper/65">
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
            className="hidden items-center gap-3 text-[0.8125rem] text-paper/70 transition-colors hover:text-paper sm:flex"
          >
            Cuộn để bắt đầu
            <span
              aria-hidden="true"
              className="relative block h-10 w-px overflow-hidden bg-paper/20"
            >
              <span className="absolute inset-0 animate-scroll-cue bg-gold" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
```

## Quy trình đánh số: cột trái sticky (tiêu đề + ảnh dọc), cột phải danh sách số lớn

Tệp gốc: `src/components/home/leaf-to-cup.tsx`

```tsx
import Image from "next/image";
import { SectionHeader } from "@/components/home/section-header";
import { Reveal } from "@/components/motion/reveal";

const STEPS = [
  {
    name: "Hái",
    fact: "Một tôm hai lá",
    description: "Hái tay lúc sáng sớm, chỉ lấy búp non và hai lá kề bên.",
  },
  {
    name: "Làm héo",
    fact: "Vài giờ",
    description: "Lá rải mỏng cho ráo nước, mềm lại và bắt đầu dậy hương.",
  },
  {
    name: "Diệt men",
    fact: "Chảo nóng",
    description: "Sao nhanh trên chảo nóng để giữ màu xanh và chặn vị ngái.",
  },
  {
    name: "Vò",
    fact: "Bằng tay hoặc máy",
    description: "Lá được vò cho xoăn lại, tinh chất thấm ra bề mặt sợi trà.",
  },
  {
    name: "Sấy và lên hương",
    fact: "Lửa nhỏ",
    description: "Sấy khô rồi sao thêm một lượt lửa nhỏ. Hương cốm hiện ra từ đây.",
  },
  {
    name: "Hãm",
    fact: "80–85°C · 30–45 giây",
    description: "Tráng ấm, rót nước, chờ một nhịp. Phần còn lại là của bạn.",
  },
];

export function LeafToCup() {
  return (
    <section aria-labelledby="leaf-heading" className="bg-mist py-20 md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionHeader
                id="leaf-heading"
                eyebrow="Nghệ thuật làm trà"
                title={
                  <>
                    Từ đồi chè <em className="text-leaf">đến chén trà</em>
                  </>
                }
                lede="Sáu công đoạn, phần lớn vẫn nhờ vào bàn tay và kinh nghiệm của người làm trà."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <figure className="mt-10">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-[4/5]">
                  <Image
                    src="/images/harvest-2.jpg"
                    alt="Người hái chè đội nón lá cúi hái búp giữa đồi chè xanh"
                    fill
                    sizes="(min-width: 1024px) 32rem, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-[0.8125rem] text-ink/70">
                  Đây là quy trình của trà xanh. Ô long và hồng trà có thêm
                  bước lên men.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {STEPS.map((step, index) => (
            <Reveal
              as="li"
              key={step.name}
              className="group grid grid-cols-[3.75rem_1fr] gap-x-4 border-t border-ink/15 py-7 last:border-b md:grid-cols-[6.5rem_1fr] md:gap-x-8 md:py-9"
            >
              <span
                aria-hidden="true"
                className="font-display text-5xl leading-none text-highlight opacity-70 transition-opacity duration-500 group-hover:opacity-100 md:text-7xl"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-2xl md:text-3xl">{step.name}</h3>
                  <p className="text-[0.8125rem] font-medium text-leaf">{step.fact}</p>
                </div>
                <p className="mt-2 max-w-md leading-relaxed text-ink/70">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

## Panel mở rộng ngang: 4 tấm ảnh, tấm đang chọn giãn ra và hiện nội dung

Tệp gốc: `src/components/home/tea-levels.tsx`

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/home/section-header";
import { Reveal } from "@/components/motion/reveal";
import { TEA_LEVELS, teas } from "@/data/teas";
import { cn } from "@/lib/utils";
import type { TeaLevel } from "@/types";

const LEVELS: { id: TeaLevel; image: string; alt: string }[] = [
  {
    id: "everyday",
    image: "/images/phu-tho-hill.jpg",
    alt: "Đồi chè bậc thang xanh đậm dưới trời nhiều mây ở Phú Thọ",
  },
  {
    id: "specialty",
    image: "/images/thai-nguyen-hill.jpg",
    alt: "Những luống chè xanh mướt trên đồi ở Thái Nguyên",
  },
  {
    id: "rare",
    image: "/images/shan-tuyet-tree.jpg",
    alt: "Cây chè Shan Tuyết cổ thụ thân lớn, tán rộng",
  },
  {
    id: "premium",
    image: "/images/tea-lotus-dry.jpg",
    alt: "Trà sen khô sợi nhỏ, sẫm màu",
  },
];

export function TeaLevels() {
  const [activeId, setActiveId] = useState<TeaLevel>("everyday");

  return (
    <section aria-labelledby="levels-heading" className="bg-mist py-20 md:py-32">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            id="levels-heading"
            eyebrow="Bốn cấp độ"
            accent="gold"
            title={
              <>
                Từ chén trà mỗi ngày <em className="text-leaf">đến trà quý</em>
              </>
            }
            lede="Trà ngon không bắt đầu từ trà đắt. Hãy đi từ thứ dễ uống nhất, rồi để vị giác dẫn đường."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-12 flex flex-col gap-4 lg:mt-16 lg:h-[34rem] lg:flex-row">
            {LEVELS.map((level, index) => {
              const info = TEA_LEVELS[level.id];
              const active = level.id === activeId;
              const examples = teas.filter((tea) => tea.level === level.id).slice(0, 3);
              return (
                <li
                  key={level.id}
                  onMouseEnter={() => setActiveId(level.id)}
                  onFocus={() => setActiveId(level.id)}
                  className={cn(
                    "group relative isolate flex min-h-[19rem] overflow-hidden rounded-3xl bg-night text-paper transition-[flex-grow] duration-700 ease-calm lg:min-h-0 lg:basis-0",
                    active ? "lg:grow-[3.2]" : "lg:grow",
                  )}
                >
                  <Image
                    src={level.image}
                    alt={level.alt}
                    fill
                    sizes="(min-width: 1024px) 40rem, 100vw"
                    className={cn(
                      "-z-20 object-cover transition-[transform,opacity] duration-700 ease-calm",
                      active ? "lg:scale-100 lg:opacity-100" : "lg:scale-105 lg:opacity-60",
                    )}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/60 to-night/20"
                  />

                  <div className="flex w-full flex-col justify-between gap-10 p-6 lg:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-display text-xl text-highlight">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "rounded-full border border-paper/30 px-3 py-1 text-[0.8125rem] whitespace-nowrap transition-opacity duration-500",
                          !active && "lg:opacity-0",
                        )}
                      >
                        {info.english}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-4xl leading-tight lg:text-[2.75rem]">
                        <Link
                          href={`/teas?level=${level.id}`}
                          className="after:absolute after:inset-0 after:rounded-3xl"
                        >
                          {info.label}
                        </Link>
                      </h3>
                      <div
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-700 ease-calm",
                          active
                            ? "lg:grid-rows-[1fr] lg:opacity-100"
                            : "lg:grid-rows-[0fr] lg:opacity-0",
                        )}
                      >
                        <div className="overflow-hidden lg:w-[26rem] lg:max-w-full">
                          <p className="mt-3 leading-relaxed text-paper/80">
                            {info.description}
                          </p>
                          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Ví dụ">
                            {examples.map((tea) => (
                              <li
                                key={tea.id}
                                className="rounded-full bg-paper/10 px-3 py-1 text-[0.8125rem]"
                              >
                                {tea.name}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-5 flex items-center gap-1.5 text-[0.9375rem] font-medium text-highlight">
                            Xem nhóm {info.label.toLowerCase()}
                            <ArrowUpRight className="size-4" aria-hidden="true" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
```

## Thẻ trắc nghiệm nhiều bước: thanh tiến độ, lựa chọn lớn, bước chờ có hơi trà, kết quả

Tệp gốc: `src/components/ai/tea-preference-quiz.tsx`

```tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Steam } from "@/components/motion/steam";
import { CtaLink } from "@/components/ui/cta-link";
import { TEA_LEVELS, TEA_TYPES } from "@/data/teas";
import { duration, ease, stagger } from "@/lib/motion";
import { QUIZ_QUESTIONS, recommendTea, type QuizResult } from "@/lib/quiz";

const BREWING_DELAY_MS = 1100;

const panel = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: duration.base, ease: ease.out },
};

export function TeaPreferenceQuiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const total = QUIZ_QUESTIONS.length;
  const brewing = step === total && !result;
  const question = QUIZ_QUESTIONS[step];

  function choose(questionId: string, optionId: string) {
    const next = { ...answers, [questionId]: optionId };
    setAnswers(next);
    setStep(step + 1);
    if (step + 1 === total) {
      timer.current = setTimeout(
        () => setResult(recommendTea(next)),
        BREWING_DELAY_MS,
      );
    }
  }

  function restart() {
    clearTimeout(timer.current);
    setAnswers({});
    setResult(null);
    setStep(0);
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-ink text-paper">
      <div className="flex items-center justify-between gap-4 border-b border-paper/10 px-6 py-4 md:px-8">
        <p className="text-[0.8125rem] text-paper/65">
          {result
            ? "Gu trà của bạn"
            : brewing
              ? "Sắp xong rồi"
              : `Câu ${step + 1} trên ${total}`}
        </p>
        <div className="flex gap-1.5" aria-hidden="true">
          {QUIZ_QUESTIONS.map((item, index) => (
            <span
              key={item.id}
              className={`h-1 w-8 rounded-full transition-colors duration-500 ${
                index < step ? "bg-gold" : index === step ? "bg-paper/60" : "bg-paper/15"
              }`}
            />
          ))}
        </div>
      </div>

      <div
        className="flex min-h-[26rem] flex-col justify-center px-6 py-8 md:min-h-[28rem] md:px-8 md:py-10"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          {question && (
            <motion.fieldset key={question.id} {...panel}>
              <legend className="font-display text-3xl leading-tight md:text-4xl">
                {question.prompt}
              </legend>
              <div className="mt-7 grid gap-3">
                {question.options.map((option, index) => (
                  <motion.button
                    key={option.id}
                    type="button"
                    onClick={() => choose(question.id, option.id)}
                    className="group flex min-h-14 items-center justify-between gap-4 rounded-2xl border border-paper/15 px-5 py-3 text-left transition-colors duration-200 hover:border-gold hover:bg-paper/5"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: duration.base,
                      ease: ease.out,
                      delay: 0.08 + index * stagger,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>
                      <span className="text-base font-medium md:text-lg">
                        {option.label}
                      </span>
                      {option.hint && (
                        <span className="text-paper/60">, {option.hint}</span>
                      )}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-highlight opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.fieldset>
          )}

          {brewing && (
            <motion.div
              key="brewing"
              {...panel}
              className="flex flex-col items-center text-center"
              role="status"
            >
              <Steam className="text-highlight" />
              <p className="mt-4 font-display text-2xl">Đang ủ gợi ý…</p>
              <p className="mt-2 text-sm text-paper/60">
                Chờ một nhịp thở, như chờ trà ngấm.
              </p>
            </motion.div>
          )}

          {result && (
            <motion.div key="result" {...panel}>
              <p className="eyebrow text-highlight">Bạn là</p>
              <h3 className="mt-2 font-display text-4xl leading-tight md:text-5xl">
                {result.profile.title}
              </h3>
              <p className="mt-3 max-w-md text-paper/75">
                {result.profile.description}
              </p>

              <div className="mt-7 flex gap-4 rounded-2xl bg-paper/[0.06] p-4">
                <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-xl sm:w-28">
                  <Image
                    src={result.tea.images[0]}
                    alt={result.tea.name}
                    fill
                    sizes="7rem"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.8125rem] text-paper/60">
                    Nên thử trước · {result.tea.origin}
                  </p>
                  <p className="mt-1 flex items-center gap-2 font-display text-2xl leading-tight">
                    <span
                      aria-hidden="true"
                      className="size-3 shrink-0 rounded-full ring-2 ring-paper/20"
                      style={{ backgroundColor: result.tea.liquorColor }}
                    />
                    {result.tea.name}
                  </p>
                  <p className="mt-1 text-[0.8125rem] text-paper/60">
                    {TEA_TYPES[result.tea.type]} ·{" "}
                    {TEA_LEVELS[result.tea.level].label}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {result.tea.flavorNotes.map((note) => (
                      <li
                        key={note}
                        className="rounded-full border border-paper/20 px-2.5 py-1 text-[0.8125rem]"
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-4 text-sm text-paper/70">
                Pha thử: nước {result.tea.brewingGuide.waterTemp},{" "}
                {result.tea.brewingGuide.teaAmount}, hãm{" "}
                {result.tea.brewingGuide.steepTime}.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CtaLink href="/ai-tea-master" variant="gold">
                  Hỏi AI Trà Sư kỹ hơn
                  <ArrowRight aria-hidden="true" />
                </CtaLink>
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 text-[0.9375rem] font-medium text-paper/80 transition-colors hover:text-paper"
                >
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Làm lại
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

## Dải kêu gọi cuối trang: ảnh nền tối, tiêu đề rất lớn căn giữa, hai CTA

Tệp gốc: `src/components/home/join-cta.tsx`

```tsx
import Image from "next/image";
import { ArrowRight, PenLine } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta-link";

export function JoinCta() {
  return (
    <section
      aria-labelledby="join-heading"
      className="relative isolate overflow-hidden bg-night py-28 text-paper md:py-44"
    >
      <Image
        src="/images/moc-chau-mist.jpg"
        alt="Những lớp núi đồi Mộc Châu chìm trong sương vàng lúc bình minh"
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--color-night)_0%,rgb(16_21_19/0.55)_35%,rgb(16_21_19/0.7)_100%)]"
      />
      <Reveal className="container-page text-center">
        <p className="eyebrow text-highlight">Young CommuniTEA</p>
        <h2
          id="join-heading"
          className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.08] tracking-tight"
        >
          Viết chương trà <em className="text-highlight">của riêng bạn</em>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper/80">
          Lưu lại từng chén trà trong Tea Journal, kể câu chuyện của bạn và cùng
          cộng đồng đưa trà Việt vào đời sống số.
        </p>
        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <CtaLink href="/auth/sign-up" variant="gold">
            Đăng ký thành viên
            <ArrowRight aria-hidden="true" />
          </CtaLink>
          <CtaLink href="/write" variant="outlineLight">
            <PenLine aria-hidden="true" />
            Viết câu chuyện trà
          </CtaLink>
        </div>
      </Reveal>
    </section>
  );
}
```

## Header trong suốt trên hero tối, chuyển nền sáng khi cuộn, menu mobile toàn màn hình

Tệp gốc: `src/components/layout/app-header.tsx`

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { CtaLink } from "@/components/ui/cta-link";
import { duration, ease, stagger } from "@/lib/motion";
import { MAIN_NAV } from "@/lib/site";
import { useSession } from "@/lib/store/stores";
import { cn } from "@/lib/utils";

// Các trang mở đầu bằng hero tối tràn viền: header trong suốt cho tới khi cuộn.
function hasDarkHero(pathname: string) {
  return (
    pathname === "/" ||
    pathname.startsWith("/atlas") ||
    pathname.startsWith("/ai-tea-master") ||
    pathname === "/about"
  );
}

export function AppHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const session = useSession();

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 24));

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const overDarkHero = hasDarkHero(pathname) && !scrolled;
  const light = overDarkHero || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-500 ease-calm",
        light
          ? "border-b border-transparent text-paper"
          : "border-b border-ink/10 bg-paper/90 text-ink backdrop-blur-md",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          aria-label="Trà Việt Số, về trang chủ"
          className="relative z-50 rounded-full"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <nav aria-label="Điều hướng chính" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="relative py-2 text-sm font-medium opacity-85 transition-opacity duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 after:ease-calm hover:opacity-100 hover:after:scale-x-100 aria-[current=page]:opacity-100 aria-[current=page]:after:scale-x-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          {session ? (
            <Link
              href="/dashboard"
              className="flex min-h-10 items-center gap-2.5 rounded-full py-1 pr-4 pl-1 text-sm font-medium ring-1 ring-current/20 transition-colors hover:ring-current/50"
            >
              <span
                aria-hidden="true"
                className="flex size-8 items-center justify-center rounded-full bg-clay text-paper"
              >
                {session.displayName.charAt(0).toUpperCase()}
              </span>
              Trang của tôi
            </Link>
          ) : (
            <>
              <Link
                href="/auth/sign-in"
                className="text-sm font-medium opacity-85 transition-opacity hover:opacity-100"
              >
                Đăng nhập
              </Link>
              <CtaLink
                href="/auth/sign-up"
                variant={light ? "gold" : "ink"}
                className="min-h-10 px-5 text-sm"
              >
                Tham gia
              </CtaLink>
            </>
          )}
        </div>

        <button
          type="button"
          className="relative z-50 -mr-2 inline-flex size-11 items-center justify-center rounded-full lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-night px-5 pt-24 pb-8 text-paper lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: ease.inOut }}
          >
            <nav aria-label="Điều hướng chính trên di động">
              <ul className="flex flex-col">
                {MAIN_NAV.map((item, index) => (
                  <motion.li
                    key={item.href}
                    className="border-b border-paper/10"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: duration.base,
                      ease: ease.out,
                      delay: 0.1 + index * stagger,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 font-display text-3xl"
                    >
                      {item.label}
                      <ArrowRight className="size-5 text-highlight" aria-hidden="true" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto grid grid-cols-2 gap-3 pt-8">
              {session ? (
                <CtaLink
                  href="/dashboard"
                  variant="gold"
                  className="col-span-2"
                  onClick={() => setOpen(false)}
                >
                  Trang của tôi
                </CtaLink>
              ) : (
                <>
                  <CtaLink
                    href="/auth/sign-in"
                    variant="outlineLight"
                    onClick={() => setOpen(false)}
                  >
                    Đăng nhập
                  </CtaLink>
                  <CtaLink href="/auth/sign-up" variant="gold" onClick={() => setOpen(false)}>
                    Tham gia
                  </CtaLink>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```
