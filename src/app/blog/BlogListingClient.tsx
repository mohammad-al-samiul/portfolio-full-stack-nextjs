"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { BlogCard, Post } from "@/components/ui/BlogCard";

const categories = ["All", "Frontend", "Backend", "Fullstack", "DevOps", "AI"] as const;
type Category = (typeof categories)[number];

function BlogTab({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative px-4 py-2 text-sm font-medium rounded-xl outline-none",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {isActive && (
        <motion.span
          layoutId="active-pill-blog"
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="absolute inset-0 rounded-xl bg-muted border border-border shadow-sm"
        />
      )}
      {isActive && (
        <motion.span
          layoutId="underline-blog"
          className="absolute left-2 right-2 -bottom-1 h-[2px] rounded-full bg-primary/70"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative z-10 transition-colors duration-200">
        {label}
      </span>
    </motion.button>
  );
}

export function BlogListingClient({ initialPosts }: { initialPosts: any[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return initialPosts;
    return initialPosts.filter((p) => p.category === activeCategory);
  }, [activeCategory, initialPosts]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 flex flex-wrap justify-center gap-1"
      >
        {categories.map((category) => (
          <BlogTab
            key={category}
            label={category}
            isActive={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-24">
          <p className="text-muted-foreground">No articles found in this category.</p>
        </div>
      )}
    </div>
  );
}
