"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-destructive/5 hover:text-destructive transition-all group mt-2"
    >
      <LogOut size={18} className="group-hover:scale-110 transition-transform" />
      Sign Out
    </button>
  );
}
