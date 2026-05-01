"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock, Share2, Layers } from "lucide-react";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

import { ShareModal } from "./ShareModal";

interface BlogPostClientProps {
  post: {
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
  };
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <article className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/30">
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        slug={post.slug}
        title={post.title}
      />

      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 md:px-6 lg:px-8 py-12 md:py-24">
        {/* Navigation */}
        <div className="mb-12">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm font-bold uppercase tracking-widest">
              Back to Journal
            </span>
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
              <span className="font-semibold text-foreground">
                Mohammad Al Samiul
              </span>
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
          <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl mb-16">
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
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold uppercase tracking-widest text-[10px] hover:bg-primary/20 hover:border-primary/30 transition-all duration-300"
              >
                <Share2 size={16} />
                Share Article
              </button>
            </div>
          </div>

          <div className="mt-20 p-12 rounded-[2rem] bg-linear-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 text-center relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Enjoyed the read?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                I share my thoughts and learnings regularly. Subscribe to my
                newsletter to never miss an update.
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
