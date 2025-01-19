import Link from "next/link"
import { LogoText } from "@/components/shared/icons"

export function Footer() {
  return (
    <footer className="py-28">
      <div className="container flex flex-col items-stretch gap-5 border-t border-dynamic-black pt-16">
        <nav className="pb-16">
          <ul className="flex space-x-8">
            <li>
              <Link href="/work">WORKS</Link>
            </li>
            <li>
              <Link href="/contact">CONTACT</Link>
            </li>
          </ul>
        </nav>
        <div className="flex justify-between">
          <div className="flex gap-10 font-light">
            <p>2024, ALL RIGHTS RESERVED</p>
            <p>BASED IN ISTANBUL</p>
          </div>
          <div className="flex gap-8 font-semibold">
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
        <div>
          <LogoText />
        </div>
      </div>
    </footer>
  )
}
