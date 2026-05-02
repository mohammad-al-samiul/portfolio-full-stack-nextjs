import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyUnsubscribeToken } from "@/lib/newsletter-unsubscribe";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  const base = `${getSiteUrl()}/newsletter/unsubscribed`;

  if (!token) {
    return NextResponse.redirect(`${base}?error=missing`);
  }

  const email = verifyUnsubscribeToken(token);
  if (!email) {
    return NextResponse.redirect(`${base}?error=invalid`);
  }

  try {
    await prisma.newsletter.deleteMany({ where: { email } });
  } catch (e) {
    console.error("[NEWSLETTER_UNSUBSCRIBE]", e);
    return NextResponse.redirect(`${base}?error=server`);
  }

  return NextResponse.redirect(base);
}
