import { prisma } from "@/lib/prisma";
import { createUnsubscribeToken } from "@/lib/newsletter-unsubscribe";
import {
  buildNewPostEmailHtml,
  buildPostPublicUrl,
} from "@/lib/email/new-post-html";
import { getFromEmail, getResend } from "@/lib/email/resend-config";
import { getSiteUrl } from "@/lib/site-url";

export type PostEmailPayload = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
};

const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 150;

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Sends new-post announcement to all newsletter subscribers.
 * Isolated per-recipient errors; does not throw if Resend is unset (logs only).
 */
export async function sendNewPostEmailsToSubscribers(
  post: PostEmailPayload,
): Promise<{ sent: number; failed: number }> {
  const resend = getResend();
  if (!resend) {
    console.warn(
      "[NEW_POST_EMAIL] RESEND_API_KEY not set — skipping subscriber emails",
    );
    return { sent: 0, failed: 0 };
  }

  const subscribers = await prisma.newsletter.findMany({
    select: { email: true },
  });

  if (subscribers.length === 0) {
    return { sent: 0, failed: 0 };
  }

  const postUrl = buildPostPublicUrl(post.slug);
  const site = getSiteUrl();
  let sent = 0;
  let failed = 0;

  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const chunk = subscribers.slice(i, i + BATCH_SIZE);

    const results = await Promise.allSettled(
      chunk.map(async ({ email }) => {
        const token = createUnsubscribeToken(email);
        const unsubscribeUrl = `${site}/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;

        const html = buildNewPostEmailHtml({
          title: post.title,
          excerpt: post.excerpt,
          postUrl,
          unsubscribeUrl,
        });

        const { error } = await resend.emails.send({
          from: getFromEmail(),
          to: email,
          subject: `New post: ${post.title}`,
          html,
        });

        if (error) {
          throw new Error(error.message);
        }
      }),
    );

    for (const r of results) {
      if (r.status === "fulfilled") sent += 1;
      else {
        failed += 1;
        console.error(
          "[NEW_POST_EMAIL] Recipient send failed:",
          r.reason instanceof Error ? r.reason.message : r.reason,
        );
      }
    }

    if (i + BATCH_SIZE < subscribers.length) {
      await delay(BATCH_DELAY_MS);
    }
  }

  console.info(
    `[NEW_POST_EMAIL] Post "${post.slug}" — sent: ${sent}, failed: ${failed}, total: ${subscribers.length}`,
  );

  return { sent, failed };
}

/** Safe wrapper for `after()` / fire-and-forget — never throws. */
export async function runNewPostEmailJob(post: PostEmailPayload): Promise<void> {
  try {
    await sendNewPostEmailsToSubscribers(post);
  } catch (e) {
    console.error("[NEW_POST_EMAIL] Job failed:", e);
  }
}
