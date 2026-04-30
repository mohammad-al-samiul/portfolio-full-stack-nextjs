import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginRoute = nextUrl.pathname === "/admin/login";
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isApiRoute = nextUrl.pathname.startsWith("/api");

      // Always allow API routes to pass through
      // This prevents HTML redirects on API requests
      if (isApiRoute) {
        return true;
      }

      if (isLoginRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/admin/dashboard", nextUrl));
        }
        return true;
      }

      if (isAdminRoute) {
        if (!isLoggedIn) {
          return false; // Redirects to pages.signIn
        }
        return true;
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  providers: [], // Providers are added in auth.ts to avoid Edge Runtime issues
} satisfies NextAuthConfig;
