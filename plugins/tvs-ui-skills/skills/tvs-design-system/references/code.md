# Mã nguồn tham chiếu: token, font, nút, tiêu đề section

Trích nguyên văn từ dự án Trà Việt Số (Next.js 16, Tailwind CSS 4, motion). Đường dẫn là đường dẫn trong dự án gốc; khi chuyển sang dự án mới, đặt lại cho hợp cấu trúc mới.

### `src/app/globals.css`

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@theme inline {
  /* Bảng màu Trà Việt Số */
  --color-tea-ink: #18231b;
  --color-tea-leaf: #2f6b45;
  --color-young-leaf: #8ccb7a;
  --color-oolong-gold: #c89b45;
  --color-shan-mist: #eef3ea;
  --color-porcelain: #faf8f2;
  --color-rose-clay: #b96d5a;
  --color-charcoal: #101513;

  --font-sans: var(--font-be-vietnam), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-fraunces), ui-serif, Georgia, serif;
  --font-heading: var(--font-fraunces), ui-serif, Georgia, serif;

  --ease-tea: cubic-bezier(0.22, 1, 0.36, 1);

  --animate-rise: rise 0.9s var(--ease-tea) both;
  --animate-fade: fade 1.2s var(--ease-tea) both;
  --animate-steam: steam 5s ease-in-out infinite;
  --animate-pulse-ring: pulse-ring 2.4s ease-out infinite;
  --animate-scroll-cue: scroll-cue 2.2s var(--ease-tea) infinite;

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(1.5rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes steam {
    0% {
      opacity: 0;
      transform: translateY(8px) scaleY(0.9);
    }
    35% {
      opacity: 0.5;
    }
    100% {
      opacity: 0;
      transform: translateY(-22px) scaleY(1.1);
    }
  }
  @keyframes pulse-ring {
    0% {
      opacity: 0.7;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(2.6);
    }
  }
  @keyframes scroll-cue {
    0% {
      transform: scaleY(0);
      transform-origin: top;
    }
    50% {
      transform: scaleY(1);
      transform-origin: top;
    }
    51% {
      transform: scaleY(1);
      transform-origin: bottom;
    }
    100% {
      transform: scaleY(0);
      transform-origin: bottom;
    }
  }

  /* Token của shadcn/ui, ánh xạ sang bảng màu ở :root */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --background: #faf8f2;
  --foreground: #18231b;
  --card: #ffffff;
  --card-foreground: #18231b;
  --popover: #ffffff;
  --popover-foreground: #18231b;
  --primary: #2f6b45;
  --primary-foreground: #faf8f2;
  --secondary: #eef3ea;
  --secondary-foreground: #18231b;
  --muted: #eef3ea;
  --muted-foreground: #56635a;
  --accent: #eef3ea;
  --accent-foreground: #18231b;
  --destructive: #b3402e;
  --border: #dfe5da;
  --input: #dfe5da;
  --ring: #2f6b45;
  --radius: 0.875rem;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  html {
    @apply font-sans;
    scroll-behavior: smooth;
  }
  body {
    @apply bg-background text-foreground;
  }
  h1,
  h2,
  h3 {
    text-wrap: balance;
  }
  :focus-visible {
    outline: 2px solid var(--color-oolong-gold);
    outline-offset: 3px;
  }
  ::selection {
    background: var(--color-oolong-gold);
    color: var(--color-charcoal);
  }
}

/* Màu chữ nhấn tự đổi theo nền: đồng sẫm trên nền sáng, vàng sáng trên nền tối, để luôn đạt 4.5:1. */
:root,
[class~="bg-porcelain"],
[class~="bg-shan-mist"],
[class~="bg-card"],
[class*="bg-porcelain/9"] {
  --gold-text: #7a5c16;
  --clay-text: #9a4f3d;
}

[class~="bg-charcoal"],
[class~="bg-tea-ink"],
[class*="bg-charcoal/"] {
  --gold-text: #c89b45;
  --clay-text: #d98f7c;
}

@utility text-gold {
  color: var(--gold-text);
}

@utility text-clay {
  color: var(--clay-text);
}

@utility container-tvs {
  margin-inline: auto;
  width: 100%;
  max-width: 80rem;
  padding-inline: 1.25rem;
  @media (width >= 48rem) {
    padding-inline: 2.5rem;
  }
}

@utility eyebrow {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

@utility display-hero {
  font-family: var(--font-display);
  font-size: clamp(3.25rem, 11vw, 9rem);
  line-height: 1.02;
  letter-spacing: -0.03em;
  font-weight: 400;
}

@utility display-section {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4.5vw, 3.75rem);
  line-height: 1.12;
  letter-spacing: -0.02em;
  font-weight: 400;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### `src/app/layout.tsx`

```tsx
import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Fraunces } from "next/font/google";
import { AppHeader } from "@/components/layout/app-header";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SITE } from "@/lib/site";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    url: "/",
    images: [
      {
        url: "/images/hero-moc-chau.jpg",
        width: 1920,
        height: 1281,
        alt: "Đồi chè Mộc Châu trong nắng sớm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: ["/images/hero-moc-chau.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#101513",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${fraunces.variable} antialiased`}
    >
      <body className="flex min-h-svh flex-col">
        <a
          href="#noi-dung"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-porcelain focus:px-4 focus:py-2 focus:text-tea-ink"
        >
          Bỏ qua điều hướng
        </a>
        <MotionProvider>
          <AppHeader />
          <main id="noi-dung" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
```

### `src/components/ui/cta-link.tsx`

```tsx
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ctaVariants = cva(
  "group/cta inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 ease-tea active:scale-[0.97] [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-0.5",
  {
    variants: {
      variant: {
        gold: "bg-oolong-gold text-charcoal hover:bg-[#d9ae5c]",
        leaf: "bg-tea-leaf text-porcelain hover:bg-[#275a3a]",
        ink: "bg-tea-ink text-porcelain hover:bg-charcoal",
        outlineLight:
          "border border-porcelain/35 text-porcelain hover:border-porcelain hover:bg-porcelain/10",
        outlineDark:
          "border border-tea-ink/25 text-tea-ink hover:border-tea-ink hover:bg-tea-ink/5",
      },
    },
    defaultVariants: { variant: "leaf" },
  },
);

type CtaLinkProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof ctaVariants>;

export function CtaLink({ className, variant, ...props }: CtaLinkProps) {
  return <Link className={cn(ctaVariants({ variant }), className)} {...props} />;
}

export { ctaVariants };
```

### `src/components/home/section-header.tsx`

```tsx
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
  gold: "text-gold",
  clay: "text-clay",
  leaf: "text-tea-leaf",
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
            tone === "dark" ? "text-porcelain/70" : "text-tea-ink/70",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
```

### `src/components/layout/logo.tsx`

```tsx
import { cn } from "@/lib/utils";

export function LeafMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-7", className)}
    >
      <path
        d="M16 29C8.5 25.5 5 19.5 6 12 11 12.5 14.5 15 16 19c1.5-4 5-6.500 10-7 1 7.500-2.500 13.500-10 17Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M16 20c-.8-5.500 0-10.500 2.200-16C20.500 8 20.800 12.500 16 20Z"
        fill="var(--color-oolong-gold)"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LeafMark />
      <span className="font-display text-xl leading-none tracking-tight">
        Trà Việt Số
      </span>
    </span>
  );
}
```

### `src/components/tea/tea-level-badge.tsx`

```tsx
import { TEA_LEVELS } from "@/data/teas";
import { cn } from "@/lib/utils";
import type { TeaLevel } from "@/types";

// Cấp độ càng cao càng nhiều chấm, để không phải dựa vào màu.
const DOTS: Record<TeaLevel, number> = {
  everyday: 1,
  specialty: 2,
  rare: 3,
  premium: 4,
};

export function TeaLevelBadge({
  level,
  tone = "light",
  className,
}: {
  level: TeaLevel;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.8125rem] font-medium whitespace-nowrap",
        tone === "dark"
          ? "border-porcelain/25 text-porcelain"
          : "border-tea-ink/15 bg-porcelain text-tea-ink",
        className,
      )}
    >
      <span aria-hidden="true" className="flex gap-0.5">
        {Array.from({ length: 4 }, (_, index) => (
          <span
            key={index}
            className={cn(
              "size-1.5 rounded-full",
              index < DOTS[level]
                ? "bg-oolong-gold"
                : tone === "dark"
                  ? "bg-porcelain/20"
                  : "bg-tea-ink/15",
            )}
          />
        ))}
      </span>
      {TEA_LEVELS[level].label}
    </span>
  );
}
```

### `src/components/ui/field.tsx`

```tsx
import { cn } from "@/lib/utils";

export const inputClass =
  "block min-h-12 w-full rounded-2xl border border-tea-ink/20 bg-card px-4 py-3 text-base text-tea-ink placeholder:text-tea-ink/45 transition-colors focus-visible:border-tea-leaf aria-invalid:border-destructive";

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
        {optional && <span className="text-[0.8125rem] font-normal text-tea-ink/65">Không bắt buộc</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className="text-[0.8125rem] text-tea-ink/70">
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
            ? "border-oolong-gold bg-oolong-gold text-charcoal"
            : "border-porcelain/20 text-porcelain/85 hover:border-porcelain/50"
          : pressed
            ? "border-tea-ink bg-tea-ink text-porcelain"
            : "border-tea-ink/15 text-tea-ink/80 hover:border-tea-ink/50",
      )}
    >
      {children}
    </button>
  );
}
```
