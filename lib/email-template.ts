interface ContactEmailProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export function buildContactEmailHtml({ name, email, phone, message }: ContactEmailProps): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, sans-serif; margin: 0; padding: 20px; background: #f5f5f4; }
        .container { max-width: 600px; margin: 0 auto; background: white; border: 3px solid #1c1917; }
        .header { background: #1c1917; color: white; padding: 24px; }
        .header h1 { margin: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 2px; }
        .accent { display: inline-block; width: 8px; height: 8px; background: #f59e0b; margin-right: 8px; }
        .body { padding: 24px; }
        .field { margin-bottom: 16px; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #78716c; font-weight: bold; margin-bottom: 4px; }
        .value { font-size: 15px; color: #1c1917; line-height: 1.5; }
        .message-box { background: #fafaf9; border: 2px solid #e7e5e4; padding: 16px; margin-top: 4px; white-space: pre-wrap; }
        .footer { padding: 16px 24px; border-top: 2px solid #e7e5e4; font-size: 12px; color: #a8a29e; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1><span class="accent"></span>New Contact Form Submission</h1>
        </div>
        <div class="body">
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${escapeHtml(name)}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
          </div>
          ${phone ? `
          <div class="field">
            <div class="label">Phone</div>
            <div class="value"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></div>
          </div>
          ` : ""}
          <div class="field">
            <div class="label">Message</div>
            <div class="message-box value">${escapeHtml(message)}</div>
          </div>
        </div>
        <div class="footer">
          Sent via purtan-construction.com contact form
        </div>
      </div>
    </body>
    </html>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
