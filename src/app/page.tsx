import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { LatestBlog } from "@/components/sections/LatestBlog";
import { Contact } from "@/components/sections/Contact";
import { Post } from "@/lib/types";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://samiul.vercel.app";

export const metadata: Metadata = {
  title: "Mohammad Al Samiul | Full-Stack Software Engineer",
  description: "Welcome to the portfolio of Mohammad Al Samiul, a Full-Stack Software Engineer specializing in React, Next.js, Node.js, and web development. Explore my projects, skills, and experience.",
  openGraph: {
    title: "Mohammad Al Samiul | Full-Stack Software Engineer",
    description: "Full-Stack Software Engineer specializing in web development with React, Next.js, and modern technologies.",
    url: siteUrl,
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dt9bjjzrd/image/upload/v1777565997/samiul_bvwuq9.jpg",
        width: 1200,
        height: 630,
        alt: "Mohammad Al Samiul",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Al Samiul | Full-Stack Software Engineer",
    description: "Explore my portfolio, projects, and experience as a Full-Stack Software Engineer.",
    images: ["https://res.cloudinary.com/dt9bjjzrd/image/upload/v1777565997/samiul_bvwuq9.jpg"],
  },
};

export default async function Home() {
  // Fetch latest 3 published blog posts
  let posts: Post[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch (error) {
    console.error("Home page: Failed to fetch blog posts", error);
  }

  // JSON-LD Structured Data for Person
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohammad Al Samiul",
    url: siteUrl,
    image: "https://res.cloudinary.com/dt9bjjzrd/image/upload/v1777565997/samiul_bvwuq9.jpg",
    jobTitle: "Full-Stack Software Engineer",
    description: "Full-Stack Software Engineer specializing in web development",
    sameAs: [
      "https://github.com",
      "https://linkedin.com",
      "https://twitter.com",
    ],
  };

  // JSON-LD Structured Data for Website
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mohammad Al Samiul Portfolio",
    url: siteUrl,
    description: "Full-Stack Software Engineer Portfolio",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div className="flex flex-col w-full">
        <Hero />

        <About />

        <Skills />

        <Experience />

        <Projects />

        {/* Shared Data Source: Fetching directly from Prisma */}
        <LatestBlog posts={posts} />
        <Contact />
      </div>
    </>
  );
}
