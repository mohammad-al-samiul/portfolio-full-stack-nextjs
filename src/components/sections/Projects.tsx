"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/lib/types";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectSkeleton } from "@/components/ui/ProjectSkeleton";
import { GitBranch, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

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

// ─── Main Component ───────────────────────────────────────────────────────────

const categories = ["All", "Frontend", "Backend", "Fullstack"] as const;
type Category = (typeof categories)[number];

type ExtendedProject = Project & { category: Category };

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const { data: projects = [], isLoading, error } = useProjects("public");

  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  const fetchedProjects: ExtendedProject[] = useMemo(() => {
    return projects
      .filter((p) => p.published)
      .map((p) => ({
        ...p,
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
        published: p.published,
        category: "Fullstack" as const,
      }));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return fetchedProjects;
    return fetchedProjects.filter((p) => p.category === activeCategory);
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          <AnimatePresence mode="popLayout">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <ProjectSkeleton key={`skeleton-${index}`} index={index} />
                ))
              : error
              ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-destructive">Failed to load projects. Please try again.</p>
                  </div>
                )
              : filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))
            }
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
