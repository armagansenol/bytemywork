import Link from "next/link"
import { LogoText } from "./icons"

export default function Footer() {
  return (
    <footer className="py-28">
      <div className="container px-6 flex flex-col items-stretch gap-5">
        <nav className="mb-16">
          <ul className="flex space-x-8">
            <li>
              <Link href="/work" className="hover:text-gray-300 transition-colors">
                WORKS
              </Link>
            </li>
            {/* <li>
              <Link href="/contact" className="hover:text-gray-300 transition-colors">
                CONTACT
              </Link>
            </li> */}
          </ul>
        </nav>
        <div className="flex justify-between">
          <div className="flex gap-5 font-light">
            <p>2024, ALL RIGHTS RESERVED</p>
            <p>BASED IN ISTANBUL</p>
          </div>
          <div className="flex gap-5">
            <Link
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              [ DRIBBBLE ]
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              [ INSTAGRAM ]
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
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
