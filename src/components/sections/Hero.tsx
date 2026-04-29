"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SocialLinks } from "@/components/ui/social-links";


export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Subtle Background Animation (Grid + Glow) */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-primary/20 opacity-30 blur-[100px] animate-pulse"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary/20 p-1 overflow-hidden backdrop-blur-sm bg-background">
            <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden relative">
              <Image
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Samiul&backgroundColor=b6e3f4"
                alt="Mohammad Al Samiul"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Hi, I&apos;m{" "}
            <span className="text-primary">Mohammad Al Samiul</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
            Junior Software Engineer (Full Stack)
          </h2>
          <p className="max-w-150 mx-auto text-lg md:text-xl text-muted-foreground mt-4">
            Full-stack engineer specializing in scalable web applications using
            Next.js, NestJS, and modern state management tools.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8"
        >
          <Link
            href="https://drive.google.com/file/d/1-cf0hhj02O0LNSNRl2oPeb-ZmF1cR8U4/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full w-full sm:w-auto bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:scale-105 transition-transform"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Link>
          <Link
            href="#projects"
            className="inline-flex items-center justify-center rounded-full w-full sm:w-auto border border-primary/30 bg-background px-6 py-3 text-sm font-semibold text-primary hover:scale-105 transition-transform"
          >
            View Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>

        {/* Social Links Added Below CTAs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12"
        >
          <SocialLinks />
        </motion.div>
      </div>
    </section>
  );
}
