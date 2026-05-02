import { Resend } from "resend";

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  return key ? new Resend(key) : null;
}

/** Must be a verified sender/domain in Resend for production. */
export function getFromEmail(): string {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev"
  );
}
