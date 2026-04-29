"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Rocket,
  Code2,
  Users,
  TreePine,
  Layers,
  Cloud,
  Sparkles,
  BrainCircuit,
  GitMerge,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface PassionCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const timelineItems: TimelineItem[] = [
  {
    year: "HSC Days",
    title: "The Spark",
    description:
      'C programming. One small question changed everything: "Can I solve real-life problems using code?" That curiosity became an obsession.',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    year: "University",
    title: "CSE & Deeper Roots",
    description:
      "Pursued Computer Science & Engineering. Moved from solving math with loops to building multi-layered systems — and loved every bit of it.",
    icon: <BrainCircuit className="w-4 h-4" />,
  },
  {
    year: "Full-Stack Era",
    title: "Production-Ready",
    description:
      "Started building scalable apps with Next.js, Node.js, and NestJS. Obsessed with performance, clean architecture, and systems that don't break under pressure.",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    year: "Now",
    title: "Beyond the Code",
    description:
      "Mentoring juniors, contributing to tech communities, exploring system design, UI/UX, cloud, DSA, and open source — one elegant solution at a time.",
    icon: <Rocket className="w-4 h-4" />,
  },
];

const passionCards: PassionCard[] = [
  {
    icon: <Layers className="w-5 h-5" />,
    title: "System Design",
    description: "Architecting systems that scale gracefully under real load.",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "UI / UX",
    description: "Crafting interfaces that feel as good as they look.",
  },
  {
    icon: <Cloud className="w-5 h-5" />,
    title: "Cloud & Scale",
    description: "Distributed systems, serverless, and modern infrastructure.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Mentoring",
    description:
      "Helping junior devs level up — debugging, architecture, mindset.",
  },
  {
    icon: <BrainCircuit className="w-5 h-5" />,
    title: "DSA",
    description: "Because elegant algorithms are a form of art.",
  },
  {
    icon: <GitMerge className="w-5 h-5" />,
    title: "Open Source",
    description: "Giving back to the community that shaped me.",
  },
];

const TYPED_WORDS = [
  "Full-Stack Developer",
  "System Designer",
  "Performance Nerd",
  "UI/UX Enthusiast",
  "Open Source Advocate",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypedText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TYPED_WORDS[wordIndex];
    const speed = isDeleting ? 45 : 90;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1400);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % TYPED_WORDS.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex]);

  return (
    <span className="text-primary font-semibold">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function TimelineNode({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 md:gap-0 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
        className="md:w-[calc(50%-2.5rem)] w-full"
      >
        <div
          className={`group relative bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 ${
            isEven ? "md:mr-10" : "md:ml-10"
          }`}
        >
          {/* Year badge */}
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary mb-3">
            {item.icon}
            {item.year}
          </span>
          <h3 className="text-base font-bold text-foreground mb-1.5">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>
      </motion.div>

      {/* Center dot — hidden on mobile */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.35, delay: index * 0.08 + 0.2 }}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-5 h-5 rounded-full bg-primary ring-4 ring-background items-center justify-center"
      >
        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
      </motion.div>

      {/* Empty spacer for opposite side on desktop */}
      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
    </div>
  );
}

function PassionCard({ card, index }: { card: PassionCard; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="group flex gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-default"
    >
      <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
        {card.icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground mb-0.5">
          {card.title}
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function About() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-muted/30 border-b overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/8 blur-[120px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* ── Section heading ── */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <Code2 className="w-3.5 h-3.5" />
            Get to know me
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground">
            A <TypedText />
          </p>
        </motion.div>

        {/* ── Story intro ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mx-auto text-center mb-20"
        >
          <blockquote className="relative text-xl md:text-2xl font-medium text-foreground/80 italic leading-relaxed border-l-0">
            <span className="text-5xl text-primary/30 font-serif leading-none select-none absolute -top-3 -left-2">
              "
            </span>
            Can I solve real-life problems using code?
            <span className="text-5xl text-primary/30 font-serif leading-none select-none absolute -bottom-6 -right-2">
              "
            </span>
          </blockquote>
          <p className="mt-8 text-sm text-muted-foreground leading-relaxed">
            That question — asked during my HSC days while writing my very first
            C program — set everything in motion. What started as curiosity
            quickly became a craft, then a career, and now a genuine love for
            building things that matter.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative max-w-3xl mx-auto mb-24">
          {/* Vertical line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border" />

          <div className="flex flex-col gap-10">
            {timelineItems.map((item, i) => (
              <TimelineNode key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* ── Story body ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mx-auto text-center mb-20"
        >
          <p className="text-muted-foreground leading-relaxed">
            Today I work across the full stack with{" "}
            <span className="text-foreground font-medium">Next.js</span>,{" "}
            <span className="text-foreground font-medium">Node.js</span>, and{" "}
            <span className="text-foreground font-medium">NestJS</span> — always
            thinking beyond the feature itself: how will this behave at 10×
            traffic? Does the architecture stay readable as the team grows? Does
            the user feel the difference?
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            But my journey isn&apos;t just about code. I actively{" "}
            <span className="text-foreground font-medium">
              mentor junior developers
            </span>{" "}
            and participate in{" "}
            <span className="text-foreground font-medium">tech communities</span>
            , because the best growth happens when knowledge moves in both
            directions.
          </p>
        </motion.div>

        {/* ── What drives me cards ── */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-2 mb-6"
          >
            <Rocket className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
              What drives me
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {passionCards.map((card, i) => (
              <PassionCard key={card.title} card={card} index={i} />
            ))}
          </div>

          {/* Off-hours note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            <TreePine className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
            When I&apos;m not building — you&apos;ll find me grinding{" "}
            <span className="text-foreground font-medium">DSA</span>, exploring{" "}
            <span className="text-foreground font-medium">open source</span>, or
            simply breaking complex problems into elegant solutions.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
