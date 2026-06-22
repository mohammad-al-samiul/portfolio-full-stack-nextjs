import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Mohammad Al Samiul",
  description: "Admin dashboard for portfolio management",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row overflow-hidden">
      {session ? (
        <>
          {/* Conditional Rendering: Sidebar only shown when authenticated */}
          <Sidebar user={session.user!} />

          {/* Main Content Area */}
          <main className="flex-1 min-h-screen relative overflow-y-auto">
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px]" />
            </div>
            <div className="relative z-10">
              {children}
            </div>
          </main>
        </>
      ) : (
        /* Conditional Rendering: Minimal layout for Login page */
        <main className="w-full h-screen">
          {children}
        </main>
      )}
    </div>
  );
}
