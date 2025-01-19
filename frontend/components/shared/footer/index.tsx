import Link from "next/link"
import { LogoText } from "@/components/shared/icons"

export function Footer() {
  return (
    <footer className="container-section pb-16 md:pb-28">
      <div className="flex flex-col items-stretch gap-10 lg:gap-6 border-t border-dynamic-black pt-8 md:pt-16">
        <nav className="pb-8 md:pb-16">
          <ul className="flex justify-center md:justify-start space-x-8">
            <li>
              <Link href="/work">WORKS</Link>
            </li>
            <li>
              <Link href="/contact">CONTACT</Link>
            </li>
          </ul>
        </nav>
        <div className="flex flex-col-reverse items-center md:items-stretch gap-12 md:flex-row md:justify-between">
          <div className="flex flex-col-reverse items-center md:items-start gap-4 md:flex-row md:gap-10 font-light">
            <p>2024, ALL RIGHTS RESERVED</p>
            <p>BASED IN ISTANBUL</p>
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row md:justify-start gap-8 md:gap-8 font-semibold">
            <Link href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="text-base">
              [ DRIBBBLE ]
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-base">
              [ INSTAGRAM ]
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-base">
              [ LINKEDIN ]
            </Link>
          </div>
        </div>
        <div className="flex justify-center md:justify-start">
          <LogoText />
        </div>
      </div>
    </footer>
  )
}
