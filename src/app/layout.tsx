import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SessionProviderWrapper } from "@/components/providers/SessionProviderWrapper";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { GlobalLoader } from "@/components/ui/GlobalLoader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageLoader } from "@/components/ui/PageLoader";
import { Toaster } from "sonner";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://samiul.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mohammad Al Samiul | Full-Stack Software Engineer & Developer",
  description: "Portfolio of Mohammad Al Samiul - Full-Stack Software Engineer specializing in web development, React, Next.js, Node.js, and modern technologies. Explore projects, blog, and experience.",
  keywords: [
    "Mohammad Al Samiul",
    "Al Samiul",
    "Full-Stack Developer",
    "Full Stack Engineer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Web Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "Portfolio",
    "Web Development",
  ],
  authors: [{ name: "Mohammad Al Samiul" }],
  creator: "Mohammad Al Samiul",
  publisher: "Mohammad Al Samiul",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Mohammad Al Samiul | Full-Stack Software Engineer",
    title: "Mohammad Al Samiul | Full-Stack Software Engineer & Developer",
    description: "Portfolio of Mohammad Al Samiul - Full-Stack Software Engineer specializing in web development, React, Next.js, and modern technologies.",
    images: [
      {
        url: "https://res.cloudinary.com/dt9bjjzrd/image/upload/v1777565997/samiul_bvwuq9.jpg",
        width: 1200,
        height: 630,
        alt: "Mohammad Al Samiul - Full-Stack Software Engineer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Al Samiul | Full-Stack Software Engineer",
    description: "Full-Stack Software Engineer & Web Developer. Check out my portfolio, projects, and blog.",
    images: ["https://res.cloudinary.com/dt9bjjzrd/image/upload/v1777565997/samiul_bvwuq9.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="https://res.cloudinary.com/dt9bjjzrd/image/upload/v1777565997/samiul_bvwuq9.jpg" />
        <link rel="canonical" href={siteUrl} />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <SessionProviderWrapper>
          <QueryProvider>
            <GlobalLoader />
            <ThemeProvider>
              <Suspense fallback={null}>
                <PageLoader />
              </Suspense>
              <Toaster position="top-right" richColors />
              <Navbar />
              <main className="flex-1 pt-20">{children}</main>
              <Footer />
            </ThemeProvider>
          </QueryProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
