"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedinIn, FaFacebook } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { HiOutlineExternalLink } from "react-icons/hi";

export function Footer() {
  return (
    <footer className="relative bg-background border-t border-border/50 py-12 md:py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                M
              </div>
              <span className="font-bold tracking-tight text-xl">
                Al Samiul
              </span>
            </Link>

            <p className="text-muted-foreground max-w-sm leading-relaxed mb-8">
              Building scalable, high-performance web applications with a focus
              on premium user experiences and modern design systems.
            </p>

            {/* 🔥 Updated Social Icons */}
            <div className="flex items-center gap-3">
              {[
                {
                  icon: <FaGithub size={16} />,
                  href: "https://github.com/mohammad-al-samiul",
                },
                {
                  icon: <FaFacebook size={16} />,
                  href: "https://web.facebook.com/mohammadalsamiul",
                },
                {
                  icon: <FaLinkedinIn size={16} />,
                  href: "https://www.linkedin.com/in/al-samiul-dev",
                },
                {
                  icon: <IoMailOutline size={16} />,
                  href: "mailto:alsamiul.programmer@gmail.com",
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-foreground mb-6">
              Navigation
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/#about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href="/#skills"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-foreground mb-6">
              Resources
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Documentation <HiOutlineExternalLink size={14} />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Style Guide
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>

              {/* Hidden Admin */}
              <li>
                <Link
                  href="/admin/login"
                  className="text-[10px] text-muted-foreground/10 hover:text-primary transition-colors"
                >
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Mohammad Al Samiul. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
              Built with Next.js & Framer Motion
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
