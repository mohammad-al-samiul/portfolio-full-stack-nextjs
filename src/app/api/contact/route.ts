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
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background-color: #007bff; color: #ffffff; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 600;">New Contact Message</h1>
              <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Portfolio Inquiry</p>
            </div>
            <!-- Content -->
            <div style="padding: 30px;">
              <!-- Sender Info -->
              <div style="margin-bottom: 25px;">
                <h2 style="margin: 0 0 10px 0; font-size: 18px; color: #333333; font-weight: 500;">From:</h2>
                <p style="margin: 0; font-size: 16px; color: #555555;"><strong>${name}</strong></p>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #777777;">${email}</p>
              </div>
              <!-- Message -->
              <div style="background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #333333; font-weight: 500;">Message:</h3>
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #555555; white-space: pre-wrap;">${message}</p>
              </div>
              <!-- Reply Button -->
              <div style="text-align: center; margin-bottom: 25px;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #28a745; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 500; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">Reply to Email</a>
              </div>
            </div>
            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 15px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; font-size: 12px; color: #6c757d;">Portfolio Contact Form | Powered by Resend</p>
              <p style="margin: 5px 0 0 0; font-size: 10px; color: #adb5bd;">Sent via Resend Sandbox Mode</p>
            </div>
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
