"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Briefcase, Calendar, Sparkles } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Experience = {
  id: string;
  company: string;
  role: string;
  duration: string;
  highlights: string[];
  isLatest?: boolean;
};

// ─── Data ──────────────────────────────────────────────────────────────────────

const experiences: Experience[] = [
  {
    id: "galaxy",
    company: "Galaxy Laboratories",
    role: "Full-Stack Engineer",
    duration: "May 2026 – Present",
    isLatest: true,
    highlights: [
      "Built full-stack applications using modern web technologies",
      "Developed automation workflows using LangChain, LangGraph, and n8n",
      "Integrated AI-driven pipelines for task automation and data processing",
      "Worked on scalable system design and backend architecture",
    ],
  },
  {
    id: "divergent",
    company: "Divergent Technologies Ltd.",
    role: "Junior Software Engineer (Full Stack)",
    duration: "Oct 2025 – Mar 2026",
    isLatest: false,
    highlights: [
      "Built dashboards using Next.js + TanStack",
      "Developed inventory system (NestJS + PostgreSQL)",
      "Worked on SaaS task management system (LifeOS)",
      "Implemented authentication and API systems",
    ],
  },
  {
    id: "blueberry",
    company: "Blueberry Digital Labs",
    role: "Frontend Engineer (Contract)",
    duration: "Jan 2025 – Jun 2025",
    highlights: ["Built responsive React apps", "Improved performance by 30%"],
  },
];

// ─── TimelineCard ─────────────────────────────────────────────────────────────

function TimelineCard({
  experience,
}: {
  experience: Experience;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-12 pb-12 md:pb-20">
      {/* Timeline dot and line remains the same */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute w-14 h-14 rounded-full border border-primary/20"
        />

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
           className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/20 border border-primary/80 shadow-lg shadow-primary/20"
        >
          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-primary to-primary/80" />
        </motion.div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={inView ? { height: "100%", opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }}
          className="relative w-1 flex-1 bg-gradient-to-b from-primary via-primary/50 to-transparent"
        />
      </div>

      {/* Main Card Container */}
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ opacity: 0, x: -30, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1] as any,
          delay: 0.1,
        }}
        whileHover={{ y: -6, transition: { duration: 0.3 } }}
        className={cn(
          "flex-1 relative group",
          "rounded-2xl p-6 md:p-8",
          "bg-linear-to-br from-card/80 via-card to-card/60",
           "border border-primary/30",
          "shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/15",
          "transition-all duration-500",
        )}
      >
        {/* FIX: Badge is now INSIDE the motion.div so it moves WITH the card */}
        {experience.isLatest && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
             className="absolute -top-3 right-6 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border border-primary/50 shadow-lg shadow-primary/30 z-20"
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={12} />
            </motion.div>
            Current Role
          </motion.div>
        )}

        {/* Animated background & Shimmer effects */}
        <motion.div
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.12),transparent_70%)]"
        />

        {/* Card Content (Header, Divider, Highlights) */}
        <div className="relative space-y-5">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                <Briefcase size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold">
                  {experience.company}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {experience.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-muted-foreground ml-9 px-3 py-2 bg-primary/5 rounded-lg border border-primary/10 w-fit">
              <Calendar size={14} className="text-primary/60" />
              <span className="font-medium">{experience.duration}</span>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />

          <ul className="space-y-3 text-sm md:text-base">
            {experience.highlights.map((highlight, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shadow-sm shadow-primary/50" />
                <span>{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Experience() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative py-24 md:py-40 bg-background border-b overflow-hidden"
    >
      {/* Premium background effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent" />

        {/* Animated blobs */}
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-primary/4 rounded-full blur-3xl"
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        {/* Enhanced Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: -30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={headingInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={16} className="text-primary" />
            </motion.div>
            <span className="text-sm font-semibold text-primary">
              Professional Experience
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Experience & Expertise
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
              Building impactful solutions across different technologies and
              domains. Each role has shaped my approach to software engineering.
            </p>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line for mobile - enhanced */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100%", opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent md:hidden rounded-full"
          />

          {/* Experience items */}
          <div className="space-y-2">
            {experiences.map((experience, index) => (
              <TimelineCard
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Footer accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 h-px origin-left bg-gradient-to-r from-primary via-primary/40 to-transparent rounded-full"
        />
      </div>
    </section>
  );
}
