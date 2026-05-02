import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  FileText,
  Briefcase,
  Plus,
  BarChart3,
  ArrowUpRight,
  Eye,
  MessageSquare,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }

  // Fetch some basic stats
  const [postCount, projectCount, messageCount] = await Promise.all([
    prisma.post.count(),
    prisma.project.count(),
    prisma.contactMessage.count(),
  ]);

  const stats = [
    { name: "Total Posts", value: postCount, icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Total Projects", value: projectCount, icon: Briefcase, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "New Messages", value: messageCount, icon: MessageSquare, color: "text-orange-500", bg: "bg-orange-500/10" },
    { name: "Page Views", value: "2.4k", icon: Eye, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {session.user?.name || "Admin"}. Here&apos;s what&apos;s happening.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/admin/posts/new">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
              <Plus size={16} />
              New Post
            </button>
          </Link>
          <Link href="/admin/projects/new">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground font-bold text-xs uppercase tracking-widest hover:bg-muted/80 transition-all">
              <Plus size={16} />
              New Project
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.name} className="glass p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.name}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions / Recent Activity */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-8 rounded-3xl border border-white/5">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <BarChart3 size={20} className="text-primary" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/admin/posts" className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                <FileText className="text-primary mb-4" size={24} />
                <h4 className="font-bold mb-1">Manage Posts</h4>
                <p className="text-sm text-muted-foreground">Edit, publish, or delete your blog articles.</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Go to Posts <ArrowUpRight size={14} />
                </div>
              </Link>
              <Link href="/admin/projects" className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                <Briefcase className="text-purple-500 mb-4" size={24} />
                <h4 className="font-bold mb-1">Manage Projects</h4>
                <p className="text-sm text-muted-foreground">Add new showcase projects to your portfolio.</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-purple-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Go to Projects <ArrowUpRight size={14} />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-3xl border border-white/5 h-full">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare size={20} className="text-orange-500" />
              Recent Messages
            </h3>
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">You have {messageCount} message(s) waiting in your inbox.</p>
              <Link href="/admin/messages">
                <button className="w-full mt-2 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-orange-500/10 hover:text-orange-500 text-xs font-bold uppercase tracking-widest transition-all">
                  Open Inbox
                </button>
              </Link>
              <div className="pt-6 border-t border-white/5">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">System Status</p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium">Database: Connected</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium">Auth System: Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
