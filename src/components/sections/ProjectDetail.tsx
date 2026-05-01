"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { Project } from "@/data/projects";
import {
  ExternalLink,
  GitBranch,
  ArrowLeft,
  Code2,
  Zap,
  Lightbulb,
  Sparkles,
  Layers,
} from "lucide-react";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/30">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-primary/3 via-transparent to-transparent" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[900px] h-[900px] bg-primary/10 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[120px]"
        />
      </div>

      {/* Content */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8 md:py-16 lg:py-24"
      >
        {/* Navigation */}
        <motion.div variants={itemVariants} className="mb-8 md:mb-16">
             <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300"
            >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm font-bold uppercase tracking-widest">
              Back to Projects
            </span>
          </Link>
        </motion.div>

        {/* Hero Section - Full Width Banner Style */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Layers size={14} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  {project.category}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight -tracking-[0.02em] text-foreground mb-6 leading-[1.1]">
                {project.title}
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
                {project.shortDescription}
              </p>

              <div className="flex flex-wrap gap-4">
                {project.liveLink && (
                  <motion.a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-500 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <ExternalLink size={18} className="relative z-10" />
                    <span className="relative z-10">Live Preview</span>
                  </motion.a>
                )}
                {project.githubLink && (
                 <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-foreground font-bold uppercase tracking-widest text-xs hover:bg-white/10 hover:border-primary/30 transition-all duration-500"
                >
                    <GitBranch size={18} />
                    Source Code
                  </motion.a>
                )}
              </div>
            </div>

            {/* Right: Hero Image - Full Width, Prominent */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5 relative"
            >
               <div className="relative aspect-video lg:aspect-[16/10] w-full rounded-3xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/20 group">
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent z-10" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain bg-muted transition-transform duration-1000 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                />
                {/* Subtle overlay gradient for better readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Floating status badge */}
              <div className="absolute -bottom-2 -left-4 px-4 py-3 rounded-xl bg-card border border-border shadow-lg z-20 hidden md:flex">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                      Status
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      Production Ready
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Grid - SaaS Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Left: Markdown Content */}
          <div className="lg:col-span-2 space-y-16">
            <motion.section variants={itemVariants}>
              <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
                <MarkdownRenderer
                  content={project.fullDescription || "No content provided."}
                />
              </div>
            </motion.section>

            {/* Challenges Section */}
            {(project.challenges || project.futureImprovements) && (
              <motion.section
                variants={itemVariants}
                className="pt-8 border-t border-border/50"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {project.challenges && project.challenges.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Zap size={20} className="text-primary" />
                        <h3 className="text-lg font-bold">Key Challenges</h3>
                      </div>
                      <ul className="space-y-3">
                        {project.challenges.map((challenge, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="flex items-start gap-3 text-sm text-muted-foreground"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                            {challenge}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.futureImprovements &&
                    project.futureImprovements.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Lightbulb size={20} className="text-primary" />
                          <h3 className="text-lg font-bold">
                            Future Enhancements
                          </h3>
                        </div>
                        <ul className="space-y-3">
                          {project.futureImprovements.map(
                            (improvement, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                className="flex items-start gap-3 text-sm text-muted-foreground"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/30 mt-2 flex-shrink-0" />
                                {improvement}
                              </motion.li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              </motion.section>
            )}
          </div>

          {/* Right: Sticky Sidebar */}
          <aside className="space-y-6">
             <motion.div
              variants={itemVariants}
              className="p-6 rounded-3xl bg-card border border-border shadow-xl sticky top-24"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Code2 size={20} className="text-primary" />
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                     className="px-3 py-1.5 rounded-lg bg-white/5 border border-border text-sm font-medium text-foreground/90 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-default backdrop-blur-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  Project Links
                </h4>
                <div className="space-y-2">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-all duration-300"
                    >
                      <ExternalLink
                        size={16}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                      Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-foreground/80 text-sm font-medium hover:bg-white/10 transition-all duration-300"
                    >
                      <GitBranch
                        size={16}
                        className="group-hover:rotate-12 transition-transform"
                      />
                      Repository
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  Project Status
                </h4>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-green-500">
                    Production Ready
                  </span>
                </div>
              </div>
            </motion.div>
          </aside>
        </div>

        {/* CTA Section - Enhanced */}
        <motion.div variants={itemVariants} className="mt-24 md:mt-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-[2rem]" />
          <div className="relative z-10 p-8 md:p-16 rounded-[2rem] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-sm">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
                  <Sparkles size={16} className="text-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    Let&apos;s Collaborate
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight -tracking-[0.02em] text-foreground mb-6">
                  Ready to build something <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    amazing together?
                  </span>
                </h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Have a project in mind or want to discuss potential
                  opportunities? I&apos;m currently available for new
                  collaborations and freelance work.
                </p>
                <Link href="/#contact">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-500 shadow-2xl shadow-black/20 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles
                        size={16}
                        className="group-hover:rotate-12 transition-transform"
                      />
                      Get in Touch
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* Animated orbs */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-[60px] animate-pulse" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-[60px] animate-pulse" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
