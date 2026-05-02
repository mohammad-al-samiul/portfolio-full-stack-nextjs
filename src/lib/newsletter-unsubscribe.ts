import { createHmac, timingSafeEqual } from "node:crypto";

function getSecret(): string {
  const s =
    process.env.NEWSLETTER_UNSUBSCRIBE_SECRET ??
    process.env.AUTH_SECRET ??
    process.env.NEXTAUTH_SECRET;
  if (!s) {
    console.warn(
      "[newsletter] NEWSLETTER_UNSUBSCRIBE_SECRET (or AUTH_SECRET) missing — unsubscribe links disabled",
    );
  }
  return s ?? "development-only-change-me";
}

/** Signed token for one-click unsubscribe (no DB column required). */
export function createUnsubscribeToken(email: string): string {
  const normalized = email.toLowerCase().trim();
  const sig = createHmac("sha256", getSecret())
    .update(normalized)
    .digest("hex");
  const payload = Buffer.from(
    JSON.stringify({ e: normalized, s: sig }),
    "utf8",
  ).toString("base64url");
  return payload;
}

export function verifyUnsubscribeToken(token: string): string | null {
  try {
    const raw = Buffer.from(token, "base64url").toString("utf8");
    const parsed = JSON.parse(raw) as { e?: string; s?: string };
    if (!parsed.e || !parsed.s) return null;
    const expected = createHmac("sha256", getSecret())
      .update(parsed.e)
      .digest("hex");
    const a = Buffer.from(parsed.s, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    return parsed.e;
  } catch {
    return null;
  }
}
