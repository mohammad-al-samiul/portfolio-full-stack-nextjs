import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogPostClient } from "@/components/blog/BlogPostClient";

export const revalidate = 60;

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
    excerpt:
      "Exploring the groundbreaking features of Next.js 16 and how it redefines the developer experience with the new Edge-first architecture.",
    content:
      "## Introduction\n\nNext.js 16 is finally here, and it brings a host of improvements that make building web applications faster and more intuitive than ever before.\n\n### Key Highlights\n\n1. **Edge-first Rendering**: Significant improvements to the Edge Runtime.\n2. **Enhanced Server Components**: Better streaming and partial prerendering.\n3. **New Compiler**: Faster build times and improved DX.\n\nStay tuned as we dive deep into each of these features in the coming weeks!",
    category: "Frontend",
    tags: ["Next.js", "React", "WebDev"],
    published: true,
    coverImage:
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=2070&auto=format&fit=crop",
    createdAt: new Date(),
  },
  {
    id: "dummy-2",
    title: "Mastering Prisma 7 with PostgreSQL",
    slug: "mastering-prisma-7-postgresql",
    excerpt:
      "A comprehensive guide to the new Driver Adapter system in Prisma 7 and why it's a game changer for serverless applications.",
    content:
      "## The Shift to Driver Adapters\n\nPrisma 7 introduces a fundamental change in how we connect to databases. By moving to an explicit driver adapter model, Prisma now offers better compatibility with Edge environments and improved control over connection pooling.\n\n```typescript\nimport { PrismaClient } from '@prisma/client';\nimport { PrismaPg } from '@prisma/adapter-pg';\nimport { Pool } from 'pg';\n\nconst pool = new Pool({ connectionString: process.env.DATABASE_URL });\nconst adapter = new PrismaPg(pool);\nconst prisma = new PrismaClient({ adapter });\n```\n\nThis setup allows for a more robust and flexible database connection strategy.",
    category: "Backend",
    tags: ["Prisma", "PostgreSQL", "Database"],
    published: true,
    coverImage:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2042&auto=format&fit=crop",
    createdAt: new Date(),
  },
  {
    id: "dummy-3",
    title: "Building SaaS CMS with Framer Motion",
    slug: "building-saas-cms-framer-motion",
    excerpt:
      "How to add premium micro-interactions and smooth layout transitions to your custom CMS using Framer Motion.",
    content:
      "## Why Animations Matter\n\nIn a SaaS product, the feel of the interface is just as important as the functionality. Framer Motion provides the tools to create 'fluid' interfaces that react to user input in a natural way.\n\n### Tips for Better CMS Motion\n\n- Use `layout` prop for grid transitions.\n- Implement `AnimatePresence` for item entry/exit.\n- Keep spring durations consistent for a unified feel.",
    category: "Fullstack",
    tags: ["Framer Motion", "UI/UX", "SaaS"],
    published: true,
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
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
  } catch {
    console.warn("Database not connected, searching in fallback posts.");
  }

  // Fallback to dummy posts if not found in DB
  if (!post) {
    post = dummyFallbackPosts.find((p) => p.slug === slug);
  }

  if (!post || (!post.published && post.id !== "dummy-1" && post.id !== "dummy-2" && post.id !== "dummy-3")) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
