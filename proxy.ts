import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - /studio (Sanity Studio)
    // - /api routes
    // - /_next (Next.js internals)
    // - /favicon.ico, /sitemap.xml, /robots.txt
    // - static files with extensions
    "/((?!studio|api|_next|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
