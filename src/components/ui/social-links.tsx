"use client";

import * as React from "react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/mohammad-al-samiul",
    icon: FaGithub,
    color: "hover:text-foreground dark:hover:text-foreground",
    shadow: "hover:shadow-black/20 dark:hover:shadow-white/20",
    bgHover: "hover:bg-accent/50",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/al-samiul-dev/",
    icon: FaLinkedin,
    color: "hover:text-[#0a66c2] dark:hover:text-[#4298e1]",
    shadow: "hover:shadow-[#0a66c2]/20 dark:hover:shadow-[#4298e1]/20",
    bgHover: "hover:bg-[#0a66c2]/10 dark:hover:bg-[#4298e1]/10",
  },
  {
    name: "Facebook",
    url: "https://web.facebook.com/mohammadalsamiul",
    icon: FaFacebook,
    color: "hover:text-[#1877f2] dark:hover:text-[#1877f2]",
    shadow: "hover:shadow-[#1877f2]/20",
    bgHover: "hover:bg-[#1877f2]/10",
  },
];

export function SocialLinks() {
  return (
    <div className="flex flex-row items-center justify-center gap-4 flex-wrap">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <div key={social.name} className="relative group">
            {/* Tooltip */}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 scale-50 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 bg-foreground text-background text-xs font-semibold px-2.5 py-1.5 rounded-md shadow-lg pointer-events-none whitespace-nowrap z-20">
              {social.name}
              {/* Tooltip Arrow */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-solid border-t-foreground border-t-[5px] border-x-transparent border-x-[5px] border-b-0"></span>
            </span>

            <motion.a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit my ${social.name} profile`}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-background border border-border shadow-sm transition-all duration-300 text-muted-foreground ${social.color} ${social.shadow} ${social.bgHover}`}
            >
              <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </motion.a>
          </div>
        );
      })}
    </div>
  );
}
