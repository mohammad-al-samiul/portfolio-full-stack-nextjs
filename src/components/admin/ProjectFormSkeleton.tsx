"use client";

import { motion } from "framer-motion";

export function ProjectFormSkeleton() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Header Skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between mb-12"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-muted/50 border border-border animate-pulse" />
          <div className="space-y-2">
            <div className="h-8 w-48 rounded-xl bg-muted/50 border border-border animate-pulse" />
            <div className="h-4 w-64 rounded-xl bg-muted/50 border border-border animate-pulse" />
          </div>
        </div>
        <div className="h-12 w-36 rounded-2xl bg-muted/50 border border-border animate-pulse" />
      </motion.div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-8 rounded-3xl border border-white/5 space-y-6"
          >
            <div className="space-y-2">
              <div className="h-3 w-24 rounded-full bg-muted/50 animate-pulse" />
              <div className="h-12 rounded-2xl bg-muted/30 border border-border animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-16 rounded-full bg-muted/50 animate-pulse" />
              <div className="h-11 rounded-2xl bg-muted/30 border border-border animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-24 rounded-full bg-muted/50 animate-pulse" />
              <div className="h-24 rounded-2xl bg-muted/30 border border-border animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-48 rounded-full bg-muted/50 animate-pulse" />
              <div className="h-32 rounded-2xl bg-muted/30 border border-border animate-pulse" />
            </div>
          </motion.div>

          {/* Links Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-8 rounded-3xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <div className="h-3 w-24 rounded-full bg-muted/50 animate-pulse" />
              <div className="h-11 rounded-2xl bg-muted/30 border border-border animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-28 rounded-full bg-muted/50 animate-pulse" />
              <div className="h-11 rounded-2xl bg-muted/30 border border-border animate-pulse" />
            </div>
          </motion.div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {/* Media Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-8 rounded-3xl border border-white/5 space-y-6"
          >
            <div className="h-3 w-32 rounded-full bg-muted/50 animate-pulse" />
            <div className="h-10 rounded-xl bg-muted/30 border border-border animate-pulse" />
            <div className="aspect-video rounded-2xl bg-muted/30 border border-border animate-pulse" />
          </motion.div>

          {/* Tech Stack Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-8 rounded-3xl border border-white/5 space-y-6"
          >
            <div className="h-3 w-20 rounded-full bg-muted/50 animate-pulse" />
            <div className="flex gap-2">
              <div className="flex-1 h-11 rounded-xl bg-muted/30 border border-border animate-pulse" />
              <div className="w-12 h-11 rounded-xl bg-muted/30 border border-border animate-pulse" />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-16 rounded-lg bg-muted/30 animate-pulse" />
              <div className="h-8 w-20 rounded-lg bg-muted/30 animate-pulse" />
            </div>
          </motion.div>

          {/* Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-8 rounded-3xl border border-white/5 space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-32 rounded-full bg-muted/50 animate-pulse" />
              <div className="w-12 h-6 rounded-full bg-muted animate-pulse" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 rounded-full bg-muted/50 animate-pulse" />
              <div className="w-12 h-6 rounded-full bg-muted animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
