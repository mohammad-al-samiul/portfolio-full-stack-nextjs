"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Mail,
  ExternalLink,
} from "lucide-react";
import { SignOutButton } from "./SignOutButton";
import { cn } from "@/lib/utils";

interface SidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Articles", href: "/admin/posts", icon: FileText },
    { name: "Portfolio", href: "/admin/projects", icon: Briefcase },
    { name: "Inbox", href: "/admin/messages", icon: Mail },
  ];

  return (
    <aside className="w-full md:w-72 md:h-screen md:sticky md:top-0 border-b md:border-b-0 md:border-r border-border/50 bg-card/30 backdrop-blur-3xl z-30 flex flex-col">
      <div className="p-8">
        <nav className="space-y-1">
          <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-3">
            Main Menu
          </p>
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all group relative",
                  isActive
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebarActive"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <link.icon
                  size={20}
                  className={cn(
                    "transition-transform group-hover:scale-110",
                    isActive && "scale-110",
                  )}
                />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-border/50 bg-muted/20">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {user?.name?.[0] || user?.email?.[0] || "A"}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold truncate">
              {user?.name || user?.email || "Admin"}
            </span>
            <span className="text-[10px] text-muted-foreground truncate uppercase tracking-widest font-bold">
              Administrator
            </span>
          </div>
        </div>
        <SignOutButton />
        <Link
          href="/"
          className="flex items-center justify-center gap-2 mt-4 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
        >
          View Website <ExternalLink size={12} />
        </Link>
      </div>
    </aside>
  );
}
