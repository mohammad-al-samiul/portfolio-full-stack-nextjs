"use client";

import { useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { projects, Project } from "@/data/projects";
import {
  ExternalLink,
  GitBranch,
  Sparkles,
  ArrowRight,
  Layers,
} from "lucide-react";

// ─── ProjectTab ─────────────────────────────────────────────────────────────

function ProjectTab({
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
      {/* Animated active pill */}
      {isActive && (
        <motion.span
          layoutId="active-pill-projects"
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="absolute inset-0 rounded-xl bg-muted border border-border shadow-sm"
        />
      )}

      {/* Subtle underline glow */}
      {isActive && (
        <motion.span
          layoutId="underline-projects"
          className="absolute left-2 right-2 -bottom-1 h-[2px] rounded-full bg-primary/70"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <span
        className={cn(
          "relative z-10 transition-colors duration-200",
          isActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {label}
      </span>
    </motion.button>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      layout
      // Animation: Enter from LEFT (-30px), fade in, scale slightly
      initial={{ opacity: 0, x: -30, scale: 0.95 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      exit={{ opacity: 0, x: 30, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as any,
        delay: index * 0.06, // Smooth stagger
      }}
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      <div
        className={cn(
          "relative h-full rounded-2xl overflow-hidden",
          "bg-card border border-border",
          "shadow-xl hover:shadow-2xl transition-all duration-500",
          "flex flex-col",
        )}
      >
        {/* Image container */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-muted/20">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Featured badge */}
          {project.featured && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.06 + 0.2 }}
              className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-full bg-primary/20 text-primary border border-primary/30 shadow-lg"
            >
              <Sparkles size={10} />
              Featured
            </motion.div>
          )}

          {/* Category badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-full bg-muted/90 text-foreground border border-border">
            {project.category}
          </div>

          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="relative flex-1 p-6 md:p-8 flex flex-col gap-4">
          {/* Title and description */}
          <div className="space-y-3">
            <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.techStack.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-primary/5 text-primary/70 border border-primary/10"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-muted/50 text-muted-foreground border border-border/50">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          {/* Links and button */}
          <div className="pt-6 mt-2 border-t border-border/50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {project.liveLink && (
                <motion.a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(var(--primary), 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-muted/30 text-muted-foreground hover:text-primary transition-colors duration-300"
                  title="View Live"
                >
                  <ExternalLink size={18} />
                </motion.a>
              )}
              {project.githubLink && (
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(var(--primary), 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-muted/30 text-muted-foreground hover:text-primary transition-colors duration-300"
                  title="View GitHub"
                >
                  <GitBranch size={18} />
                </motion.a>
              )}
            </div>

            <Link href={`/projects/${project.slug}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
              >
                Details
                <ArrowRight size={14} />
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Premium Hover Effects */}
        {/* Gradient glow */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-radial-gradient from-primary/10 via-transparent to-transparent" />

        {/* Animated border glow */}
        <motion.div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/20 transition-colors duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const categories = ["All", "Frontend", "Backend", "Fullstack"] as const;
type Category = (typeof categories)[number];

export function Projects({
  initialProjects = [],
}: {
  initialProjects?: any[];
}) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  const fetchedProjects: Project[] = useMemo(() => {
    return initialProjects.map((p: any) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      shortDescription: p.description || "",
      fullDescription: p.content || "",
      image:
        p.coverImage ||
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop",
      techStack: p.techStack || [],
      liveLink: p.liveUrl,
      githubLink: p.githubUrl,
      challenges: [] as string[],
      futureImprovements: [] as string[],
      featured: p.featured,
      category: "Fullstack" as const,
    }));
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    // Use fetched projects, but if empty, can fallback to static projects
    const dataToFilter =
      fetchedProjects.length > 0 ? fetchedProjects : projects;

    if (activeCategory === "All") return dataToFilter;
    return dataToFilter.filter((p) => p.category === activeCategory);
  }, [activeCategory, fetchedProjects]);

  return (
    <section
      id="projects"
      className="relative py-24 md:py-40 bg-background border-b overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* Premium background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"
        />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Enhanced Heading */}
        <div ref={headingRef} className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-6"
          >
            <Layers size={14} className="text-muted-foreground" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              My Portfolio
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            Featured Projects
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            A collection of projects where design meets high-performance
            engineering.
          </motion.p>
        </div>

        {/* Filter System (Reusing Skills Tab style) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="mb-12 flex flex-wrap justify-center gap-1"
        >
          {categories.map((category) => (
            <ProjectTab
              key={category}
              label={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 text-center"
        >
          <div className="inline-block p-1 rounded-3xl bg-linear-to-r from-primary/10 via-primary/5 to-transparent">
            <div className="px-10 py-12 rounded-2xl bg-card border border-border shadow-sm">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Want to see more?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm md:text-base">
                Check out my GitHub for more experiments and open-source
                contributions.
              </p>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-500"
              >
                Explore GitHub
                <GitBranch size={16} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
