"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, Clock, ArrowRight, Layers, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Post } from "@/lib/types";

interface BlogCardProps {
  post: Post;
  index: number;
  onShare?: (post: Post) => void;
}

export function BlogCard({ post, index, onShare }: BlogCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleShare = () => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Trigger highlight animation
      setIsHighlighted(true);
      setTimeout(() => setIsHighlighted(false), 2000);

      // Call the share handler
      onShare?.(post);
    }
  };

  return (
    <motion.div
      ref={cardRef}
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
      animate={isHighlighted ? { scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" } : {}}
      className={cn(
        "group relative h-full transition-all duration-300",
        isHighlighted && "ring-2 ring-blue-500/50"
      )}
    >
       <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative h-full rounded-3xl overflow-hidden bg-card border border-border/50 shadow-xl flex flex-col">
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
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-muted/90 text-foreground border border-border text-[10px] font-bold uppercase tracking-widest">
              {post.category}
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleShare();
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
              title="Share Article"
            >
              <Share2 size={16} />
            </button>
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
