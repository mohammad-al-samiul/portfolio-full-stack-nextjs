import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Layers, Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogListingClient } from "@/app/blog/BlogListingClient";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  published: boolean;
  coverImage: string | null;
  createdAt: Date;
}

export const metadata = {
  title: "Blog | Mohammad Al Samiul",
  description: "Read my latest articles on web development, AI, and software engineering.",
};

const dummyFallbackPosts = [
  {
    id: "dummy-1",
    title: "The Future of Web Development with Next.js 16",
    slug: "future-of-web-dev-nextjs-16",
    excerpt: "Exploring the groundbreaking features of Next.js 16 and how it redefines the developer experience with the new Edge-first architecture.",
    content: "## Introduction\n\nNext.js 16 is finally here...",
    category: "Frontend",
    tags: ["Next.js", "React", "WebDev"],
    published: true,
    coverImage: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=2070&auto=format&fit=crop",
    createdAt: new Date(),
  },
  {
    id: "dummy-2",
    title: "Mastering Prisma 7 with PostgreSQL",
    slug: "mastering-prisma-7-postgresql",
    excerpt: "A comprehensive guide to the new Driver Adapter system in Prisma 7 and why it's a game changer for serverless applications.",
    content: "## The Shift to Driver Adapters...",
    category: "Backend",
    tags: ["Prisma", "PostgreSQL", "Database"],
    published: true,
    coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2042&auto=format&fit=crop",
    createdAt: new Date(),
  },
  {
    id: "dummy-3",
    title: "Building SaaS CMS with Framer Motion",
    slug: "building-saas-cms-framer-motion",
    excerpt: "How to add premium micro-interactions and smooth layout transitions to your custom CMS using Framer Motion.",
    content: "## Why Animations Matter...",
    category: "Fullstack",
    tags: ["Framer Motion", "UI/UX", "SaaS"],
    published: true,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    createdAt: new Date(),
  },
];

export default async function BlogPage() {
  let posts: Post[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("Blog database not ready, showing fallback posts.");
  }

  // Use dummy posts if database is empty or connection fails
  const displayPosts = posts.length > 0 ? posts : dummyFallbackPosts;

  return (
    <div className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/30">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-32 md:pb-20 border-b">
        <div className="container relative mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Layers size={14} className="text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Insights & Stories
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            The <span className="text-primary">Dev</span> Journal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Exploring the frontiers of modern software development, one article at a time.
          </p>
        </div>
      </section>

      <BlogListingClient initialPosts={displayPosts} />
    </div>
  );
}
