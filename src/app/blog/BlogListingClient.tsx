"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { BlogCard } from "@/components/ui/BlogCard";
import { Post } from "@/lib/types";
import { BlogSkeleton } from "@/components/ui/BlogSkeleton";
import { usePosts } from "@/hooks/usePosts";
import { ShareModal } from "@/components/blog/ShareModal";

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

export function BlogListingClient() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { data: posts = [], isLoading, error } = usePosts("public");

  const handleShare = (post: Post) => {
    setSelectedPost(post);
    setShareModalOpen(true);
  };

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [activeCategory, posts]);

  if (error) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="text-center py-24">
          <p className="text-destructive">Failed to load articles. Please try again.</p>
        </div>
      </div>
    );
  }

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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
      >
        <AnimatePresence mode="popLayout">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <BlogSkeleton key={`skeleton-${index}`} index={index} />
              ))
            : filteredPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={index}
                  onShare={handleShare}
                />
              ))
          }
        </AnimatePresence>
      </motion.div>

      {selectedPost && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          slug={selectedPost.slug}
          title={selectedPost.title}
        />
      )}
    </div>
  );
}
