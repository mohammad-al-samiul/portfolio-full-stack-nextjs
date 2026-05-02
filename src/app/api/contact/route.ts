import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_EMAIL = "alsamiul.programmer@gmail.com";

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
    }

    // 1. Save to Database
    let contactMessage;
    try {
      contactMessage = await prisma.contactMessage.create({
        data: { name, email, message },
      });
    } catch {
      return NextResponse.json({
        error: "Database connection failed. Please try again later.",
      }, { status: 500 });
    }

    // 2. Send Notification to Admin (Sandbox Safe)
    if (resend) {
      resend.emails.send({
        from: "onboarding@resend.dev",
        to: ADMIN_EMAIL, // Always send to yourself in Sandbox mode
        subject: `[PORTFOLIO] New Message from ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
            <h2 style="color: #000; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Inquiry</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p style="font-size: 10px; color: #999; margin-top: 30px;">Sent via Resend Sandbox Mode</p>
          </div>
        `,
      }).catch((err) => {
        console.error("[CONTACT_API] Email Notification Failed:", err);
      });
    }

    return NextResponse.json({ 
      success: true, 
      id: contactMessage.id 
    }, { status: 200 });

  } catch {
    return NextResponse.json({
      error: "An unexpected server error occurred",
    }, { status: 500 });
  }
}
