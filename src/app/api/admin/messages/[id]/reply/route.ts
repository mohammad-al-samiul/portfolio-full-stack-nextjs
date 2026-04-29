import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_EMAIL = "alsamiul.programmer@gmail.com";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Reply content is required" }, { status: 400 });
    }

    const originalMessage = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!originalMessage) {
      return NextResponse.json({ error: "Original message not found" }, { status: 404 });
    }

    // 1. Save reply to DB (Critical path)
    const reply = await prisma.reply.create({
      data: {
        content,
        contactMessageId: id,
      },
    });

    // 2. Handle Email Redirection for Sandbox/Trial Mode
    let emailStatus = "skipped";
    
    if (resend) {
      // In Sandbox mode (no domain), we send TO the admin instead of the user
      // to avoid Resend's 403 error.
      const recipient = ADMIN_EMAIL;
      
      try {
        const { data, error } = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: recipient,
          subject: `[TRIAL MODE] Reply to ${originalMessage.name}`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reply from Samiul Portfolio</title>
              </head>
              <body style="margin: 0; padding: 0; background-color: #f6f9fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #32325d;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 40px 20px;">
                  <tr>
                    <td align="center">
                      <table width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08); border: 1px solid #e6ebf1;">
                        <!-- Header -->
                        <tr>
                          <td style="padding: 32px 40px; border-bottom: 1px solid #f6f9fc;">
                            <div style="display: flex; align-items: center; gap: 12px;">
                              <div style="width: 32px; height: 32px; background-color: #000; border-radius: 8px; color: #fff; text-align: center; line-height: 32px; font-weight: bold; font-size: 18px;">M</div>
                              <span style="font-size: 18px; font-weight: 700; color: #1a1f36; letter-spacing: -0.02em;">Samiul Portfolio</span>
                            </div>
                          </td>
                        </tr>

                        <!-- Sandbox Notice (Conditional-style) -->
                        <tr>
                          <td style="padding: 0 40px;">
                            <div style="margin-top: 24px; padding: 16px; background-color: #fff9db; border: 1px solid #fff3bf; border-radius: 8px; color: #856404; font-size: 13px; line-height: 1.5;">
                              <strong>Sandbox Mode:</strong> This email was redirected to you during development. 
                              <br>Original recipient: <code style="background: rgba(0,0,0,0.05); padding: 2px 4px; border-radius: 4px;">${originalMessage.email}</code>
                            </div>
                          </td>
                        </tr>

                        <!-- Reply Body -->
                        <tr>
                          <td style="padding: 40px;">
                            <h1 style="margin: 0 0 24px; font-size: 24px; font-weight: 700; color: #1a1f36; letter-spacing: -0.02em;">Message Response</h1>
                            <p style="margin: 0 0 32px; font-size: 16px; line-height: 1.6; color: #4f566b;">
                              Hello ${originalMessage.name}, thank you for reaching out. Here is the response to your inquiry:
                            </p>

                            <!-- Highlighted Content -->
                            <div style="padding: 32px; background-color: #f7fafc; border-left: 4px solid #000; border-radius: 4px; font-size: 16px; line-height: 1.6; color: #1a1f36; white-space: pre-wrap;">${content}</div>
                          </td>
                        </tr>

                        <!-- Original Message Reference -->
                        <tr>
                          <td style="padding: 0 40px 40px;">
                            <div style="border-top: 1px solid #f6f9fc; padding-top: 32px;">
                              <p style="margin: 0 0 12px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #8898aa;">Your Original Message</p>
                              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #4f566b; font-style: italic;">"${originalMessage.message}"</p>
                            </div>
                          </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                          <td style="padding: 32px 40px; background-color: #f7fafc; border-top: 1px solid #e6ebf1; text-align: center;">
                            <p style="margin: 0; font-size: 12px; color: #8898aa;">
                              Sent from the admin dashboard of <strong>alsamiul.com</strong>
                            </p>
                            <p style="margin: 8px 0 0; font-size: 12px; color: #8898aa;">
                              Bangladesh • +8801832997080
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `,
        });

        if (error) {
          console.error("[REPLY_API] Resend API Error:", error);
          emailStatus = "error";
        } else {
          console.log("[REPLY_API] Sandbox email delivered to admin:", recipient);
          emailStatus = "sandbox_delivered";
        }
      } catch (emailError) {
        console.error("[REPLY_API] Resend Exception:", emailError);
        emailStatus = "exception";
      }
    }

    return NextResponse.json({
      success: true,
      reply,
      emailStatus
    });

  } catch (error) {
    console.error("[REPLY_API] Critical Failure:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
