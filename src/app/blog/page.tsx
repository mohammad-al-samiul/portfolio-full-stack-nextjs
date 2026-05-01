import { Layers } from "lucide-react";
import { BlogListingClient } from "@/app/blog/BlogListingClient";

export const revalidate = 60;

export const metadata = {
  title: "Blog | Mohammad Al Samiul",
  description: "Read my latest articles on web development, AI, and software engineering.",
};

export default function BlogPage() {

  return (
    <div className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/30">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-32 md:pb-20 border-b">
        <div className="container relative mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Layers size={14} className="text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Insights & Stories
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            The <span className="text-primary">Dev</span> Journal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Exploring the frontiers of modern software development, one article at a time.
          </p>
        </div>
      </section>

      <BlogListingClient />
    </div>
  );
}
