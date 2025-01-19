import s from "./header.module.css"

import { cva, type VariantProps } from "class-variance-authority"
import cn from "clsx"
import Link from "next/link"

import { Logo } from "@/components/shared/icons"
import { ScrambleHover } from "@/components/shared/scramble-hover"

const headerVariants = cva("container-section relative flex items-center justify-between", {
  variants: {
    variant: {
      withLogo: "",
      withoutLogo: "justify-end",
    },
  },
  defaultVariants: {
    variant: "withLogo",
  },
})

interface HeaderProps extends VariantProps<typeof headerVariants> {
  variant?: "withLogo" | "withoutLogo"
}

export function Header({ variant }: HeaderProps) {
  return (
    <header className={cn(s.header, headerVariants({ variant }))}>
      {/* Mobile-first approach with responsive nav */}
      <nav className="order-2 md:order-1">
        <ul className="flex gap-4 md:gap-8 text-sm md:text-base">
          <li>
            <Link href="/work">
              <ScrambleHover
                text={"WORK"}
                scrambleSpeed={60}
                sequential={true}
                revealDirection="start"
                useOriginalCharsOnly={false}
                characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
              />
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <ScrambleHover
                text={"CONTACT"}
                scrambleSpeed={60}
                sequential={true}
                revealDirection="start"
                useOriginalCharsOnly={false}
                characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
              />
            </Link>
          </li>
        </ul>
      </nav>
      {variant === "withLogo" && (
        <Link href="/" className={cn(s.logo, "order-1 md:order-2 w-8 md:w-auto")}>
          <Logo />
        </Link>
      )}
      <div className="flex items-center gap-2 md:gap-4 text-sm md:text-base order-3">
        <Link href="/tr" aria-label="Switch to Turkish">
          TR
        </Link>
        <Link href="/en">EN</Link>
      </div>
    </header>
  )
}
