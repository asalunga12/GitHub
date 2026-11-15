import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  requestorName: string;
  soaNumber: string;
  pdfBuffer: Buffer;
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendSOAEmail({
  to,
  requestorName,
  soaNumber,
  pdfBuffer,
}: EmailOptions): Promise<void> {
  const transporter = createTransporter();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background: #f9fafb; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
        .header { background: #16a34a; padding: 32px 40px; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .header p { color: #d1fae5; margin: 4px 0 0; font-size: 14px; }
        .body { padding: 40px; }
        .greeting { font-size: 18px; color: #111827; margin-bottom: 16px; }
        .message { color: #4b5563; line-height: 1.6; margin-bottom: 24px; }
        .soa-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin-bottom: 24px; }
        .soa-label { font-size: 12px; color: #16a34a; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .soa-number { font-size: 22px; font-weight: 700; color: #111827; margin-top: 4px; }
        .cta-btn { display: inline-block; background: #16a34a; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; }
        .footer { background: #f9fafb; padding: 24px 40px; border-top: 1px solid #e5e7eb; }
        .footer p { color: #9ca3af; font-size: 12px; margin: 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Sprout Solutions</h1>
          <p>Statement of Account</p>
        </div>
        <div class="body">
          <p class="greeting">Hi ${requestorName},</p>
          <p class="message">
            Thank you for your registration. Please find your Statement of Account attached to this email.
          </p>
          <div class="soa-box">
            <div class="soa-label">Your SOA Number</div>
            <div class="soa-number">${soaNumber}</div>
          </div>
          <p class="message">
            Please settle payment upon receipt. You may also view or pay your SOA online by clicking the button below.
          </p>
          <a href="${appUrl}/soa/${soaNumber}" class="cta-btn">View SOA Online</a>
        </div>
        <div class="footer">
          <p>Best regards,<br /><strong>Sprout Solutions Finance Team</strong></p>
          <p style="margin-top: 12px;">This is an automated email. Please do not reply directly.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Sprout Solutions" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
    to,
    subject: `Statement of Account - ${soaNumber} - Sprout Solutions`,
    html,
    attachments: [
      {
        filename: `${soaNumber}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });
}
