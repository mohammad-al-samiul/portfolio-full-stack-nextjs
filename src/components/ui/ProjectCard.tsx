"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/lib/types";
import { FaExternalLinkAlt, FaGithub, FaArrowRight } from "react-icons/fa";
import { Sparkles } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.06,
      }}
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      {/* 🔥 Floating Featured Badge */}
      {project.featured && (
        <div className="absolute -top-3 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-full bg-muted text-foreground border border-border shadow-lg">
          <Sparkles size={10} />
          Featured
        </div>
      )}

      {/* Card */}
      <div className="relative h-full rounded-2xl overflow-visible bg-card border border-border shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col">
        {/* Image */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-muted/20">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/5">
              🚀
            </div>
          )}

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col flex-1 gap-4">
          <div className="space-y-3">
            <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
              {project.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Tech */}
          {project.techStack?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-md bg-muted border border-border text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="pt-6 mt-auto border-t border-border/50 flex items-center justify-between gap-3">
            {/* Links */}
            <div className="flex gap-2">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary transition"
                >
                  <FaExternalLinkAlt size={14} />
                </motion.a>
              )}

              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary transition"
                >
                  <FaGithub size={14} />
                </motion.a>
              )}
            </div>

            {/* Details Button */}
            <Link href={`/projects/${project.slug}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest"
              >
                Details
                <FaArrowRight size={12} />
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-radial-gradient from-primary/10 via-transparent to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}
