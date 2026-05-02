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

export function buildNewPostEmailHtml(opts: {
  title: string;
  excerpt: string;
  postUrl: string;
  unsubscribeUrl: string;
}): string {
  const title = escapeHtml(opts.title);
  const excerpt = escapeHtml(opts.excerpt);
  const hrefPost = escapeAttr(opts.postUrl);
  const hrefUnsub = escapeAttr(opts.unsubscribeUrl);
  const plainPost = escapeHtml(opts.postUrl);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0a0a0a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background:linear-gradient(180deg,#141414 0%,#0f0f0f 100%);border-radius:16px;border:1px solid #262626;overflow:hidden;">
          <tr>
            <td style="padding:28px 28px 12px;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#737373;">New article</p>
              <h1 style="margin:12px 0 0;font-size:22px;line-height:1.35;font-weight:700;color:#fafafa;">${title}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 24px;">
              <p style="margin:0;font-size:15px;line-height:1.65;color:#a3a3a3;">${excerpt}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px;">
              <a href="${hrefPost}" style="display:inline-block;padding:14px 24px;background-color:#fafafa;color:#0a0a0a;text-decoration:none;font-size:13px;font-weight:700;border-radius:10px;letter-spacing:0.06em;text-transform:uppercase;">Read full post</a>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 28px;border-top:1px solid #262626;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#737373;">
                You received this because you subscribed to updates on the portfolio site.<br />
                <a href="${hrefUnsub}" style="color:#a3a3a3;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-size:11px;color:#525252;">If the button doesn’t work, copy this link:<br /><span style="word-break:break-all;color:#737373;">${plainPost}</span></p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildPostPublicUrl(slug: string): string {
  return `${getSiteUrl()}/blog/${slug}`;
}
