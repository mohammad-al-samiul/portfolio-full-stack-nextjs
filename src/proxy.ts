import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

// Create the NextAuth proxy
const { auth } = NextAuth(authConfig);

// Export the proxy with explicit API route exclusion
export default auth((req) => {
  // Skip auth checks for API routes entirely
  if (req.nextUrl.pathname.startsWith("/api")) {
    return null;
  }
  // Let the auth config handle the rest
  return;
});

export const config = {
  // Matcher ignoring `api`, `_next/static`, `_next/image`, and images
  // The negative lookahead (?!) ensures these paths are excluded
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};