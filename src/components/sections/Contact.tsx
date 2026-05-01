"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineChatBubbleLeftRight,
  HiOutlinePaperAirplane,
} from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { FaFacebook } from "react-icons/fa";

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting contact form:", formData);
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Form submitted successfully:", data);
        toast.success("Message sent! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await res
          .json()
          .catch(() => ({ error: "Something went wrong" }));
        console.error("Form submission failed:", errorData);
        toast.error(errorData.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <HiOutlineEnvelope size={24} />,
      label: "Email",
      value: "alsamiul.programmer@gmail.com",
      href: "mailto:alsamiul.programmer@gmail.com",
    },
    {
      icon: <HiOutlinePhone size={24} />,
      label: "Phone",
      value: "+8801832997080",
      href: "tel:+8801832997080",
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Side: Info */}
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <HiOutlineChatBubbleLeftRight
                    size={14}
                    className="text-primary"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Get in touch
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Let&apos;s discuss your{" "}
                  <span className="text-primary">next big idea.</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-md">
                  Whether you have a specific project in mind or just want to
                  say hi, my inbox is always open.
                </p>
              </motion.div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-6 p-6 rounded-3xl bg-muted/30 border border-white/5 hover:bg-muted/50 hover:scale-[1.02] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                        {info.label}
                      </p>
                      <p className="text-lg font-semibold">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="flex gap-4">
                {[
                  {
                    icon: <FaGithub size={20} />,
                    href: "https://github.com/mohammad-al-samiul",
                  },
                  {
                    icon: <FaLinkedinIn size={20} />,
                    href: "https://www.linkedin.com/in/al-samiul-dev",
                  },
                  {
                    icon: <FaFacebook size={20} />,
                    href: "https://web.facebook.com/mohammadalsamiul",
                  },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="w-12 h-12 rounded-full bg-muted/50 border border-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right Side: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 rounded-[2.5rem] bg-background border border-border/50 shadow-xl relative"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-border focus:border-primary/50 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-border focus:border-primary/50 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-border focus:border-primary/50 outline-none transition-all resize-none"
                    placeholder="How can I help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.01] transition-all disabled:opacity-70 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <AiOutlineLoading3Quarters
                        className="animate-spin"
                        size={18}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <HiOutlinePaperAirplane size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
