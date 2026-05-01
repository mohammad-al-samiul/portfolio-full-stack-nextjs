"use client";

import { motion } from "framer-motion";

interface ProjectSkeletonProps {
  index: number;
}

export function ProjectSkeleton({ index }: ProjectSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.15,
      }}
      className="relative h-full"
    >
      <div className="relative h-full rounded-3xl overflow-hidden bg-card border border-border/50 shadow-xl flex flex-col">
        {/* Image Skeleton */}
        <div className="relative h-64 overflow-hidden bg-muted/20">
          <div className="w-full h-full bg-muted/50 animate-pulse" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />

          {/* Badge Skeleton */}
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-muted/50 animate-pulse">
            <div className="w-16 h-4 bg-muted/70 rounded" />
          </div>

          {/* Date Skeleton */}
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40">
            <div className="w-12 h-4 bg-muted/70 rounded animate-pulse" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-4">
            {/* Title Skeleton */}
            <div className="h-8 bg-muted/50 rounded-lg mb-3 animate-pulse" />
            {/* Description Skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-muted/30 rounded animate-pulse" />
              <div className="h-4 bg-muted/30 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-muted/30 rounded animate-pulse w-1/2" />
            </div>
          </div>

          {/* Tech Stack Skeleton */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="px-3 py-1.5 text-xs rounded-full bg-muted/30 animate-pulse"
              >
                <div className="w-12 h-4 bg-muted/50 rounded" />
              </div>
            ))}
          </div>

          {/* Buttons Skeleton */}
          <div className="flex gap-3 mt-auto">
            <div className="flex-1 h-12 bg-muted/50 rounded-xl animate-pulse" />
            <div className="w-12 h-12 bg-muted/50 rounded-xl animate-pulse" />
            <div className="w-12 h-12 bg-muted/50 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}