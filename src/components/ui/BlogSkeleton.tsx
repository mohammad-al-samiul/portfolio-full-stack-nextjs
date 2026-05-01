"use client";

import { motion } from "framer-motion";

interface BlogSkeletonProps {
  index: number;
}

export function BlogSkeleton({ index }: BlogSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as never,
        delay: index * 0.06,
      }}
      className="group relative h-full"
    >
      <div className="relative h-full rounded-3xl overflow-hidden bg-card border border-border/50 shadow-xl flex flex-col">
        {/* Image Skeleton */}
        <div className="relative h-56 overflow-hidden bg-muted/20">
          <div className="w-full h-full bg-muted/50 animate-pulse" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />

          {/* Category Badge Skeleton */}
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-muted/90">
            <div className="w-16 h-4 bg-muted/70 rounded animate-pulse" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-8 flex-1 flex flex-col">
          {/* Meta Info Skeleton */}
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 bg-muted/50 rounded animate-pulse" />
              <div className="w-16 h-4 bg-muted/50 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 bg-muted/50 rounded animate-pulse" />
              <div className="w-12 h-4 bg-muted/50 rounded animate-pulse" />
            </div>
          </div>

          {/* Title Skeleton */}
          <div className="h-8 bg-muted/50 rounded-lg mb-4 animate-pulse" />

          {/* Excerpt Skeleton */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-muted/30 rounded animate-pulse" />
            <div className="h-4 bg-muted/30 rounded animate-pulse w-5/6" />
            <div className="h-4 bg-muted/30 rounded animate-pulse w-4/6" />
          </div>

          {/* Read More Skeleton */}
          <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
            <div className="w-20 h-4 bg-muted/50 rounded animate-pulse" />
            <div className="w-4 h-4 bg-muted/50 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
