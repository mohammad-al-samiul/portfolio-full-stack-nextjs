"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: any) {
  const [mounted, setMounted] = React.useState(false);

  // Use useEffect to ensure the component is only rendered on the client.
  // This is the standard way to avoid hydration mismatches with next-themes.
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR (Server Side Rendering), we return the children without the provider.
  // This prevents NextThemesProvider from injecting its theme-flash-prevention script 
  // into the initial HTML, which React 19 (Next.js 16) flags as an error.
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
