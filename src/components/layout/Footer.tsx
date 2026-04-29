import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { HiOutlineExternalLink } from "react-icons/hi";

export function Footer() {
  return (
    <footer className="relative bg-background border-t border-border/50 py-12 md:py-20 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                M
              </div>
              <span className="font-bold tracking-tight text-xl">Al Samiul</span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed mb-8">
              Building scalable, high-performance web applications with a focus on premium user experiences and modern design systems.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2.5 rounded-xl bg-muted/50 border border-border/50 hover:bg-primary/10 hover:text-primary transition-all">
                <FaGithub size={20} />
              </Link>
              <Link href="#" className="p-2.5 rounded-xl bg-muted/50 border border-border/50 hover:bg-primary/10 hover:text-primary transition-all">
                <FaTwitter size={20} />
              </Link>
              <Link href="#" className="p-2.5 rounded-xl bg-muted/50 border border-border/50 hover:bg-primary/10 hover:text-primary transition-all">
                <FaLinkedinIn size={20} />
              </Link>
              <Link href="mailto:contact@alsamiul.com" className="p-2.5 rounded-xl bg-muted/50 border border-border/50 hover:bg-primary/10 hover:text-primary transition-all">
                <IoMailOutline size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-foreground mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="/#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Me</Link></li>
              <li><Link href="/#skills" className="text-sm text-muted-foreground hover:text-primary transition-colors">Skills</Link></li>
              <li><Link href="/#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">Projects</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Journal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-foreground mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">Documentation <HiOutlineExternalLink size={14} /></Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Style Guide</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              {/* Hidden Entry Point to Admin Panel */}
              <li><Link href="/admin/login" className="text-[10px] text-muted-foreground/10 hover:text-primary transition-colors">Admin Console</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Mohammad Al Samiul. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Built with Next.js & Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
