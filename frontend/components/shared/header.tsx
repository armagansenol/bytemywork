import Link from "next/link"
import { Logo } from "./icons"

export default function Header() {
  return (
    <header className="container flex justify-between items-center py-4">
      <nav>
        <ul className="flex space-x-8">
          <li>
            <Link href="/work" className="hover:text-gray-300 transition-colors">
              WORK
            </Link>
          </li>
          {/* <li>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              CONTACT
            </Link>
          </li> */}
        </ul>
      </nav>
      <Link href="/" className="h-16 w-16">
        <Logo />
      </Link>
      <div className="flex items-center space-x-4">
        <Link href="/tr" className="text-gray-400 hover:text-white transition-colors" aria-label="Switch to Turkish">
          TR
        </Link>
        <span className="text-gray-600">|</span>
        <Link href="/en" className="hover:text-gray-300 transition-colors" aria-label="Switch to English">
          EN
        </Link>
      </div>
    </header>
  )
}
