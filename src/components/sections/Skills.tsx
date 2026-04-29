"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiRedux,
  SiReactquery,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiPostman,
} from "react-icons/si";
import type { IconType } from "react-icons";

// ─── Types ────────────────────────────────────────────────────────────────────

type Skill = {
  name: string;
  level: number; // 0–100
  Icon: IconType;
  color: string; // icon brand colour (hex)
};

type Category = {
  id: string;
  label: string;
  skills: Skill[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories: Category[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React.js", level: 95, Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", level: 92, Icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", level: 94, Icon: SiTypescript, color: "#3178C6" },
      { name: "Redux", level: 88, Icon: SiRedux, color: "#764ABC" },
      {
        name: "TanStack Query",
        level: 85,
        Icon: SiReactquery,
        color: "#fb5429",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", level: 94, Icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", level: 90, Icon: SiExpress, color: "#eeeeee" },
      { name: "NestJS", level: 88, Icon: SiNestjs, color: "#E0234E" },
    ],
  },
  {
    id: "database",
    label: "Database",
    skills: [
      { name: "MongoDB", level: 89, Icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", level: 92, Icon: SiPostgresql, color: "#4169E1" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "Git", level: 97, Icon: SiGit, color: "#F05032" },
      { name: "Docker", level: 90, Icon: SiDocker, color: "#2496ED" },
      { name: "Postman", level: 85, Icon: SiPostman, color: "#FF6C37" },
    ],
  },
];

const ALL_ID = "all";

// ─── ProgressBar ─────────────────────────────────────────────────────────────

function ProgressBar({ level, color }: { level: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div
      ref={ref}
      className="w-full h-1.5 rounded-full bg-border overflow-hidden"
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}cc, ${color})` }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : {}}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] as any, delay: 0.1 }}
      />
    </div>
  );
}

// ─── SkillCard ────────────────────────────────────────────────────────────────

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { name, level, Icon, color } = skill;

  return (
    <motion.div
      // Starts slightly to the left and transparent
      initial={{ opacity: 0, x: -30, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as any,
        // This creates the "one by one" effect
        delay: index * 0.06,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl p-5",
        "bg-card border border-border",
        "cursor-default transition-shadow duration-300",
        hovered ? "shadow-lg" : "shadow-sm",
      )}
      style={{
        boxShadow: hovered
          ? `0 0 0 1.5px ${color}55, 0 8px 32px ${color}22`
          : undefined,
      }}
    >
      {/* ... rest of your internal SkillCard code remains the same ... */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}14, transparent 70%)`,
        }}
      />
      <div className="relative flex items-start justify-between">
        <motion.div
          animate={hovered ? { rotate: [0, -8, 8, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted"
        >
          <Icon size={20} style={{ color }} />
        </motion.div>
        <span className="text-xs font-semibold tabular-nums text-muted-foreground">
          {level}%
        </span>
      </div>
      <div className="relative space-y-2">
        <p className="text-sm font-semibold text-foreground leading-tight">
          {name}
        </p>
        <ProgressBar level={level} color={color} />
      </div>
    </motion.div>
  );
}

// ─── CategoryTab ─────────────────────────────────────────────────────────────

function CategoryTab({
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
          layoutId="active-pill"
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="absolute inset-0 rounded-xl bg-muted border border-border shadow-sm"
        />
      )}

      {/* Subtle underline glow */}
      {isActive && (
        <motion.span
          layoutId="underline"
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

export function Skills() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });
  const [activeTab, setActiveTab] = useState<string>(ALL_ID);

  const tabs = [
    { id: ALL_ID, label: "All" },
    ...categories.map(({ id, label }) => ({ id, label })),
  ];

  const visibleSkills =
    activeTab === ALL_ID
      ? categories.flatMap((c) => c.skills)
      : (categories.find((c) => c.id === activeTab)?.skills ?? []);

  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 bg-background border-b overflow-hidden"
    >
      {/* ── Background decoration ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,#88888818_1px,transparent_1px)] bg-[size:28px_28px]" />
        {/* Gradient blob */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[680px] rounded-full bg-primary/8 blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* ── Section heading ── */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            My Toolkit
          </span>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Skills &amp; Technologies
          </h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            The stack I rely on to build fast, scalable, and polished products.
          </p>
        </motion.div>

        {/* ── Category tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-10 flex flex-wrap justify-center gap-1"
        >
          {tabs.map(({ id, label }) => (
            <CategoryTab
              key={id}
              label={label}
              isActive={activeTab === id}
              onClick={() => setActiveTab(id)}
            />
          ))}
        </motion.div>

        {/* ── Skill cards grid ── */}
        <motion.div
          layout
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as any }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              layout
              className="relative contents"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {visibleSkills.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Category summaries (visible in All view) ── */}
        {activeTab === ALL_ID && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {categories.map(({ id, label, skills }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                {label}
                <span className="text-muted-foreground/60">
                  {skills.length} skills
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
