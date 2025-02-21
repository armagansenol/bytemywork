import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Match only the specific locales we support
    "/(en|tr)/:path*",

    // Modify this matcher to be more specific and avoid unnecessary matches
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}
