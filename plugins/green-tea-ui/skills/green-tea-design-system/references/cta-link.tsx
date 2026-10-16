import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ctaVariants = cva(
  "group/cta inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 ease-calm active:scale-[0.97] [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-0.5",
  {
    variants: {
      variant: {
        gold: "bg-gold text-night hover:bg-[#d9ae5c]",
        leaf: "bg-leaf text-paper hover:bg-[#275a3a]",
        ink: "bg-ink text-paper hover:bg-night",
        outlineLight:
          "border border-paper/35 text-paper hover:border-paper hover:bg-paper/10",
        outlineDark:
          "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5",
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
