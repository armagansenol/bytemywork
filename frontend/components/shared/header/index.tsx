import s from "./header.module.css"

import { cva, type VariantProps } from "class-variance-authority"
import cn from "clsx"
import Link from "next/link"

import { Logo } from "@/components/shared/icons"
import { ScrambleHover } from "@/components/shared/scramble-hover"

const headerVariants = cva("container relative flex justify-between items-center py-4", {
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
      <nav>
        <ul className="flex gap-8">
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
          {/* <li>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              CONTACT
            </Link>
          </li> */}
        </ul>
      </nav>

      {variant === "withLogo" && (
        <Link href="/" className={cn(s.logo)}>
          <Logo />
        </Link>
      )}

      <div className="flex items-center gap-4">
        <Link href="/tr" aria-label="Switch to Turkish">
          TR
        </Link>
        <Link href="/en">EN</Link>
      </div>
    </header>
  )
}
