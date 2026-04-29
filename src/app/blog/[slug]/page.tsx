import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock, Share2, Layers } from "lucide-react";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) return {};

  return {
    title: `${post.title} | Mohammad Al Samiul`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

const dummyFallbackPosts = [
  {
    id: "dummy-1",
    title: "The Future of Web Development with Next.js 16",
    slug: "future-of-web-dev-nextjs-16",
    excerpt: "Exploring the groundbreaking features of Next.js 16 and how it redefines the developer experience with the new Edge-first architecture.",
    content: "## Introduction\n\nNext.js 16 is finally here, and it brings a host of improvements that make building web applications faster and more intuitive than ever before.\n\n### Key Highlights\n\n1. **Edge-first Rendering**: Significant improvements to the Edge Runtime.\n2. **Enhanced Server Components**: Better streaming and partial prerendering.\n3. **New Compiler**: Faster build times and improved DX.\n\nStay tuned as we dive deep into each of these features in the coming weeks!",
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
    content: "## The Shift to Driver Adapters\n\nPrisma 7 introduces a fundamental change in how we connect to databases. By moving to an explicit driver adapter model, Prisma now offers better compatibility with Edge environments and improved control over connection pooling.\n\n```typescript\nimport { PrismaClient } from '@prisma/client';\nimport { PrismaPg } from '@prisma/adapter-pg';\nimport { Pool } from 'pg';\n\nconst pool = new Pool({ connectionString: process.env.DATABASE_URL });\nconst adapter = new PrismaPg(pool);\nconst prisma = new PrismaClient({ adapter });\n```\n\nThis setup allows for a more robust and flexible database connection strategy.",
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
    content: "## Why Animations Matter\n\nIn a SaaS product, the feel of the interface is just as important as the functionality. Framer Motion provides the tools to create 'fluid' interfaces that react to user input in a natural way.\n\n### Tips for Better CMS Motion\n\n- Use `layout` prop for grid transitions.\n- Implement `AnimatePresence` for item entry/exit.\n- Keep spring durations consistent for a unified feel.",
    category: "Fullstack",
    tags: ["Framer Motion", "UI/UX", "SaaS"],
    published: true,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    createdAt: new Date(),
  },
];

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  let post = null;
  try {
    post = await prisma.post.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.warn("Database not connected, searching in fallback posts.");
  }

  // Fallback to dummy posts if not found in DB
  if (!post) {
    post = dummyFallbackPosts.find((p) => p.slug === slug);
  }

  if (!post || (!post.published && post.id !== "dummy-1" && post.id !== "dummy-2" && post.id !== "dummy-3")) {
    notFound();
  }

  return (
    <article className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/30">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-12 md:py-24">
        {/* Navigation */}
        <div className="mb-12">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300 backdrop-blur-md"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Journal</span>
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Layers size={14} className="text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border/50 pb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                MS
              </div>
              <span className="font-semibold text-foreground">Mohammad Al Samiul</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {format(new Date(post.createdAt), "MMMM d, yyyy")}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {Math.ceil(post.content.length / 1000)} min read
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl mb-16">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-border/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
            
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
              <Share2 size={16} />
              Share Article
            </button>
          </div>

          <div className="mt-20 p-12 rounded-[2rem] bg-linear-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 text-center relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Enjoyed the read?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                I share my thoughts and learnings regularly. Subscribe to my newsletter to never miss an update.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-6 py-4 rounded-xl bg-background/50 border border-border focus:border-primary/50 outline-none transition-all"
                />
                <button className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs">
                  Join
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
