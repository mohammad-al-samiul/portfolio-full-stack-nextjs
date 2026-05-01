"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { NewsletterModal } from "./NewsletterModal";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const navLinks = [
  { name: "Home", href: "/#home", id: "home" },
  { name: "About", href: "/#about", id: "about" },
  { name: "Skills", href: "/#skills", id: "skills" },
  { name: "Experience", href: "/#experience", id: "experience" },
  { name: "Projects", href: "/#projects", id: "projects" },
  { name: "Blog", href: "/#blog", id: "blog" },
  { name: "Contact", href: "/#contact", id: "contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const [hashState, setHashState] = React.useState("home");
  const pathname = usePathname();

  // Track mounted state and initial hash
  React.useEffect(() => {
    setIsMounted(true);
    // Set initial hash from URL
    if (pathname === "/" && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const isValidSection = navLinks.some((link) => link.id === hash);
      if (isValidSection) {
        setHashState(hash);
      }
    }
  }, [pathname]);

  // Setup Intersection Observer for scroll-based active state
  React.useEffect(() => {
    if (pathname !== "/" || !isMounted) return;

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Trigger when section is in middle of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the first visible section
      const visibleEntry = entries.find((entry) => entry.isIntersecting);

      if (visibleEntry) {
        const sectionId = visibleEntry.target.id;
        // Only update if it's a valid section
        if (navLinks.some((link) => link.id === sectionId)) {
          // Update hash silently without triggering full navigation
          if (window.location.hash !== `#${sectionId}`) {
            window.history.replaceState(null, "", `#${sectionId}`);
            setHashState(sectionId);
          }
        }
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    // Observe all sections
    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      navLinks.forEach((link) => {
        const element = document.getElementById(link.id);
        if (element) {
          observer.unobserve(element);
        }
      });
      observer.disconnect();
    };
  }, [isMounted, pathname]);

  // Scroll spy - only for visual feedback, not for active state
  React.useEffect(() => {
    if (pathname !== "/" || !isMounted) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, isMounted]);

  // Handle navigation to section
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    setIsOpen(false);

    if (pathname === "/") {
      e.preventDefault();
      const elem = document.getElementById(id);
      if (elem) {
        // Immediately update active state (don't wait for scroll observer)
        setHashState(id);
        window.scrollTo({
          top: elem.offsetTop - 80,
          behavior: "smooth",
        });
        // Update hash to match the active state
        window.history.replaceState(null, "", `#${id}`);
      } else if (id === "home") {
        // Immediately update active state for home
        setHashState("home");
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(null, "", "/");
      }
    }
  };

  // Determine active state from hash (on home page) or pathname (on other pages)
  const getIsActive = (link: { id: string; href: string }) => {
    if (pathname === "/") {
      return hashState === link.id;
    }
    // On other pages, check if pathname matches
    return pathname === link.href.split("#")[0];
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || pathname !== "/"
          ? "bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          onClick={(e) => {
            setIsOpen(false);
            if (pathname === "/") {
              e.preventDefault();
              // Immediately set to home
              setHashState("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.replaceState(null, "", "/");
            }
          }}
          className="group flex items-center gap-2 z-50"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
            M
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
            Al Samiul
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-muted/30 backdrop-blur-sm border border-white/5">
          {navLinks.map((link) => {
            const isActive = getIsActive(link);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-xl ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center pr-3 border-r border-border/50">
            <ThemeToggle />
          </div>

          <NewsletterModal
            trigger={
              <button className="hidden lg:block px-5 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all cursor-pointer">
                Subscribe
              </button>
            }
          />

          {/* Mobile Toggle */}
          <Button
            onClick={() => setIsOpen(true)}
            variant="ghost"
            size="icon"
            className="md:hidden rounded-xl hover:bg-primary/10 group"
          >
            <Menu className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </Button>
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent
            side="right"
            className="w-[85vw] p-0 bg-background/95 backdrop-blur-2xl border-l border-white/10"
          >
            <VisuallyHidden>
              <SheetTitle>Menu</SheetTitle>
            </VisuallyHidden>
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <span className="font-bold text-lg uppercase tracking-widest text-muted-foreground/50">
                  Navigation
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <nav className="flex-1 p-6 space-y-2">
                {navLinks.map((link) => {
                  const isActive = getIsActive(link);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className={`flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                      }`}
                    >
                      {link.name}
                      <ArrowRight
                        size={18}
                        className={isActive ? "opacity-100" : "opacity-0"}
                      />
                    </Link>
                  );
                })}
              </nav>

              <div className="p-8 border-t border-white/5 flex items-center justify-between">
                <ThemeToggle />
                <span className="text-xs text-muted-foreground font-medium">
                  © 2026 Al Samiul
                </span>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
