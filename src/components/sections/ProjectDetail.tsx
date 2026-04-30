"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Project } from "@/data/projects";
import {
  ExternalLink,
  GitBranch,
  ArrowLeft,
  Code2,
  Zap,
  Lightbulb,
  CheckCircle2,
  Calendar,
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
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/30">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]"
        />
      </div>

      {/* Content */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative mx-auto max-w-5xl px-4 md:px-6 lg:px-8 py-12 md:py-24"
      >
        {/* Navigation */}
        <motion.div variants={itemVariants} className="mb-12">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300 backdrop-blur-md"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Projects</span>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Layers size={14} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                {project.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              {project.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {project.shortDescription}
            </p>

            <div className="flex flex-wrap gap-4">
              {project.liveLink && (
                <motion.a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                >
                  <ExternalLink size={18} />
                  Live Preview
                </motion.a>
              )}
              {project.githubLink && (
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-foreground font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
                >
                  <GitBranch size={18} />
                  Source Code
                </motion.a>
              )}
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-5 relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-40" />
            </div>
            
            {/* Floating decoration */}
            <div className="absolute -bottom-6 -left-6 p-6 rounded-2xl bg-background/80 backdrop-blur-xl border border-white/10 shadow-xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</p>
                  <p className="text-sm font-bold">Production Ready</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          <div className="lg:col-span-2 space-y-16">
            <motion.section variants={itemVariants}>
              <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {project.fullDescription || "No content provided."}
                </ReactMarkdown>
              </div>
            </motion.section>
          </div>

          <aside className="space-y-10">
            {/* Tech Stack Sidebar */}
            <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md sticky top-24">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Code2 size={20} className="text-primary" />
                Technology
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:border-primary/50 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-10 pt-10 border-t border-white/10">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Key Features</h4>
                <ul className="space-y-3">
                  {["Responsive Design", "API Integration", "Secure Auth", "Performance Optimized"].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={16} className="text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </aside>
        </div>

        {/* Footer CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-32 p-12 md:p-16 rounded-[2rem] bg-linear-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 text-center relative overflow-hidden group"
        >
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Let&apos;s build something <br className="hidden md:block" /> amazing together.
            </h3>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-lg">
              Inspired by this project? I&apos;m currently available for new opportunities and collaborations.
            </p>
            <Link href="/#contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-2xl bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-500 shadow-2xl shadow-black/20"
              >
                Get in Touch
              </motion.button>
            </Link>
          </div>
          
          {/* Animated background element */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
        </motion.div>
      </motion.div>
    </div>
  );
}
