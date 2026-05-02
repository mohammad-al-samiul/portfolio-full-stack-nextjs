import { getSiteUrl } from "@/lib/site-url";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Encode URL for use inside double-quoted HTML attributes. */
function escapeAttr(url: string): string {
  return url.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

export function buildWelcomeEmailHtml(opts: {
  email: string;
  unsubscribeUrl: string;
}): string {
  const email = escapeHtml(opts.email);
  const hrefUnsub = escapeAttr(opts.unsubscribeUrl);
  const hrefBlog = escapeAttr(`${getSiteUrl()}/blog`);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You’re subscribed 🎉</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0a0a0a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background:linear-gradient(180deg,#141414 0%,#0f0f0f 100%);border-radius:16px;border:1px solid #262626;overflow:hidden;">
          <tr>
            <td style="padding:28px 28px 12px;text-align:center;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#737373;">Welcome</p>
              <h1 style="margin:12px 0 0;font-size:22px;line-height:1.35;font-weight:700;color:#fafafa;">You’re subscribed 🎉</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 24px;">
              <p style="margin:0;font-size:15px;line-height:1.65;color:#a3a3a3;">
                Thanks for subscribing! You'll be the first to know when I publish new articles, projects, and updates on my portfolio.
              </p>
              <p style="margin:16px 0 0;font-size:15px;line-height:1.65;color:#a3a3a3;">
                Stay tuned for fresh content delivered straight to your inbox.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px;">
              <a href="${hrefBlog}" style="display:inline-block;padding:14px 24px;background-color:#fafafa;color:#0a0a0a;text-decoration:none;font-size:13px;font-weight:700;border-radius:10px;letter-spacing:0.06em;text-transform:uppercase;">Visit Blog</a>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 28px;border-top:1px solid #262626;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#737373;">
                You can unsubscribe at any time.<br />
                <a href="${hrefUnsub}" style="color:#a3a3a3;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildUnsubscribeUrl(token: string): string {
  return `${getSiteUrl()}/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;
}