"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, Clock, ArrowRight, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string;
  tags: string[];
  createdAt: Date;
}

interface BlogCardProps {
  post: Post;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -30, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as any,
        delay: index * 0.06,
      }}
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative h-full rounded-3xl overflow-hidden glass border border-border/50 shadow-xl flex flex-col">
          {/* Image */}
          <div className="relative h-56 overflow-hidden bg-muted/20">
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/5">
                <Layers size={40} className="text-primary/20" />
              </div>
            )}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/40 text-white border border-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest">
              {post.category}
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          </div>

          {/* Content */}
          <div className="p-8 flex-1 flex flex-col">
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-4">
              <div suppressHydrationWarning className="flex items-center gap-1.5">
                <Calendar size={12} />
                {format(new Date(post.createdAt), "MMM d, yyyy")}
              </div>
              <div suppressHydrationWarning className="flex items-center gap-1.5">
                <Clock size={12} />
                {Math.ceil((post.content?.length || 0) / 1000)} min read
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
              {post.title}
            </h3>
            <p className="text-muted-foreground line-clamp-3 leading-relaxed mb-6">
              {post.excerpt}
            </p>
            <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              Read Article
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
