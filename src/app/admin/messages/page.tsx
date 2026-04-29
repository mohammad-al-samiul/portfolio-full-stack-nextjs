import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { 
  HiOutlineEnvelope,
  HiOutlineUser,
  HiOutlineCalendarDays,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClock
} from "react-icons/hi2";
import { DeleteMessageButton } from "@/components/admin/DeleteMessageButton";
import { ReplyForm } from "@/components/admin/ReplyForm";

interface Reply {
  id: string;
  content: string;
  createdAt: Date;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  replies: Reply[];
}

export default async function MessagesDashboard() {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      replies: {
        orderBy: { createdAt: "asc" }
      }
    }
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
        <p className="text-muted-foreground">Manage and respond to inquiries from your website.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {messages.map((msg: ContactMessage) => (
          <div key={msg.id} className="glass p-8 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 pb-6 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <HiOutlineUser size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{msg.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <HiOutlineEnvelope size={14} />
                    {msg.email}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div suppressHydrationWarning className="flex items-center justify-end gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <HiOutlineCalendarDays size={12} />
                    {format(new Date(msg.createdAt), "MMM d, yyyy")}
                  </div>
                  <div suppressHydrationWarning className="flex items-center justify-end gap-2 text-[10px] font-bold uppercase tracking-widest text-primary mt-1">
                    <HiOutlineClock size={12} />
                    {format(new Date(msg.createdAt), "HH:mm")}
                  </div>
                </div>
                
                <DeleteMessageButton id={msg.id} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <HiOutlineChatBubbleLeftRight size={16} className="text-primary mt-1 flex-shrink-0" />
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>
            </div>

            {/* Admin Reply System */}
            <ReplyForm messageId={msg.id} existingReplies={msg.replies} />
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center py-32 glass rounded-[3rem]">
            <div className="inline-flex p-6 rounded-full bg-muted/50 mb-4">
              <HiOutlineEnvelope size={40} className="text-muted-foreground/30" />
            </div>
            <h3 className="text-xl font-bold">Your inbox is empty</h3>
            <p className="text-muted-foreground mt-2">New messages will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
