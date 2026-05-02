import { createUnsubscribeToken } from "@/lib/newsletter-unsubscribe";
import { buildWelcomeEmailHtml, buildUnsubscribeUrl } from "@/lib/email/welcome-html";
import { getFromEmail, getResend } from "@/lib/email/resend-config";

/**
 * Sends a welcome email to a new subscriber.
 * Isolated errors; does not throw if Resend is unset (logs only).
 */
export async function sendWelcomeEmail(email: string): Promise<boolean> {
  console.log(`[WELCOME_EMAIL] Attempting to send welcome email to ${email}`);
  const resend = getResend();
  if (!resend) {
    console.warn(
      "[WELCOME_EMAIL] RESEND_API_KEY not set — skipping welcome email",
    );
    return false;
  }

  try {
    const token = createUnsubscribeToken(email);
    const unsubscribeUrl = buildUnsubscribeUrl(token);

    const html = buildWelcomeEmailHtml({
      email,
      unsubscribeUrl,
    });

    const { error } = await resend.emails.send({
      from: getFromEmail(),
      to: email,
      subject: "You're subscribed 🎉",
      html,
    });

    if (error) {
      console.error("[WELCOME_EMAIL] Send failed:", error.message);
      return false;
    }

    console.info(`[WELCOME_EMAIL] Sent to ${email}`);
    return true;
  } catch (e) {
    console.error("[WELCOME_EMAIL] Unexpected error:", e);
    return false;
  }
}