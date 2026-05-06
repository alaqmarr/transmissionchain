const BRAND_YELLOW = "#facc15";
const BRAND_GREEN = "#22c55e";
const BRAND_BLACK = "#111111";
const BRAND_WHITE = "#fafaf9";

function baseLayout(content: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transmission Centre</title>
  </head>
  <body style="margin:0;padding:0;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#f4f4f5;color:${BRAND_BLACK};">
    <table role="presentation" style="width:100%;border-collapse:collapse;background-color:#f4f4f5;">
      <tr>
        <td style="padding:40px 20px;">
          <table role="presentation" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg, ${BRAND_YELLOW}, ${BRAND_GREEN});padding:32px 40px;text-align:center;">
                <h1 style="margin:0;font-size:28px;font-weight:800;color:${BRAND_BLACK};letter-spacing:-0.5px;">⚙️ Transmission Centre</h1>
                <p style="margin:8px 0 0;font-size:13px;color:${BRAND_BLACK};opacity:0.7;letter-spacing:1px;text-transform:uppercase;font-weight:600;">Premium Transmission Products</p>
              </td>
            </tr>
            <!-- Content -->
            <tr>
              <td style="padding:40px;">
                ${content}
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="background-color:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;">
                <table role="presentation" style="width:100%;">
                  <tr>
                    <td style="text-align:center;">
                      <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:${BRAND_BLACK};">Transmission Centre</p>
                      <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.6;">
                        House No 5-1-446, 1st Floor, Near Lorry Adda<br>
                        Ranigunj, Secunderabad - 500003, Telangana
                      </p>
                      <p style="margin:12px 0 0;font-size:11px;color:#9ca3af;">
                        © ${new Date().getFullYear()} Transmission Centre. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}

/**
 * Email sent to the CUSTOMER when they submit an enquiry (auto-reply).
 */
export function customerAutoReplyTemplate({
  customerName,
  message,
  productName,
}: {
  customerName: string;
  message: string;
  productName?: string;
}) {
  const content = `
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:${BRAND_BLACK};letter-spacing:-0.3px;">Thank You, ${customerName}!</h2>
    <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;">
      We've received your enquiry and our team will get back to you within <strong style="color:${BRAND_BLACK};">24 hours</strong>.
    </p>

    ${productName ? `
    <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr>
        <td style="padding:16px 20px;background:linear-gradient(135deg,${BRAND_YELLOW}15,${BRAND_GREEN}15);border-radius:12px;border-left:4px solid ${BRAND_GREEN};">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${BRAND_GREEN};">Product of Interest</p>
          <p style="margin:0;font-size:16px;font-weight:700;color:${BRAND_BLACK};">${productName}</p>
        </td>
      </tr>
    </table>
    ` : ''}

    <div style="background-color:#f9fafb;border-radius:12px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;">Your Message</p>
      <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;">${message}</p>
    </div>

    <p style="margin:0 0 24px;font-size:14px;color:#6b7280;line-height:1.6;">
      In the meantime, feel free to browse our product catalog or reach us directly on WhatsApp for urgent queries.
    </p>

    <table role="presentation" style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="text-align:center;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://transmissioncentre.com'}/products" 
             style="display:inline-block;background:linear-gradient(135deg,${BRAND_YELLOW},${BRAND_GREEN});color:${BRAND_BLACK};padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:800;font-size:14px;letter-spacing:0.3px;">
            Browse Our Products →
          </a>
        </td>
      </tr>
    </table>
  `;

  return baseLayout(content);
}

/**
 * Email sent to the ADMIN when a new enquiry is submitted.
 */
export function adminEnquiryAlertTemplate({
  customerName,
  customerEmail,
  customerPhone,
  message,
  productName,
}: {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  message: string;
  productName?: string;
}) {
  const content = `
    <div style="text-align:center;margin-bottom:24px;">
      <span style="display:inline-block;background:linear-gradient(135deg,${BRAND_YELLOW}20,${BRAND_GREEN}20);border:1px solid ${BRAND_GREEN}30;padding:6px 16px;border-radius:20px;font-size:12px;font-weight:700;color:${BRAND_GREEN};text-transform:uppercase;letter-spacing:1.5px;">
        🔔 New Enquiry
      </span>
    </div>

    <h2 style="margin:0 0 24px;font-size:22px;font-weight:800;color:${BRAND_BLACK};letter-spacing:-0.3px;text-align:center;">You've Got a New Enquiry!</h2>

    <!-- Customer Details -->
    <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:24px;background-color:#f9fafb;border-radius:12px;overflow:hidden;">
      <tr>
        <td style="padding:16px 20px;border-bottom:1px solid #e5e7eb;">
          <p style="margin:0 0 2px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;">Customer Name</p>
          <p style="margin:0;font-size:16px;font-weight:700;color:${BRAND_BLACK};">${customerName}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 20px;border-bottom:1px solid #e5e7eb;">
          <p style="margin:0 0 2px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;">Email</p>
          <p style="margin:0;font-size:16px;color:${BRAND_BLACK};">
            <a href="mailto:${customerEmail}" style="color:#2563eb;text-decoration:none;font-weight:600;">${customerEmail}</a>
          </p>
        </td>
      </tr>
      ${customerPhone ? `
      <tr>
        <td style="padding:16px 20px;border-bottom:1px solid #e5e7eb;">
          <p style="margin:0 0 2px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;">Phone</p>
          <p style="margin:0;font-size:16px;color:${BRAND_BLACK};font-weight:600;">${customerPhone}</p>
        </td>
      </tr>
      ` : ''}
      ${productName ? `
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 2px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;">Product Interest</p>
          <p style="margin:0;font-size:16px;font-weight:700;color:${BRAND_GREEN};">${productName}</p>
        </td>
      </tr>
      ` : ''}
    </table>

    <!-- Message -->
    <div style="background-color:#f9fafb;border-radius:12px;padding:20px;margin-bottom:24px;border-left:4px solid ${BRAND_YELLOW};">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;">Message</p>
      <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;">${message}</p>
    </div>

    <table role="presentation" style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="text-align:center;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://transmissioncentre.com'}/admin/enquiries" 
             style="display:inline-block;background:${BRAND_BLACK};color:#ffffff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:800;font-size:14px;letter-spacing:0.3px;">
            View in Admin Panel →
          </a>
        </td>
      </tr>
    </table>
  `;

  return baseLayout(content);
}

/**
 * Email sent to the CUSTOMER when admin replies to their enquiry.
 */
export function adminReplyTemplate({
  customerName,
  replyMessage,
  originalMessage,
}: {
  customerName: string;
  replyMessage: string;
  originalMessage: string;
}) {
  const content = `
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:${BRAND_BLACK};letter-spacing:-0.3px;">Hello, ${customerName}!</h2>
    <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;">
      Our team has responded to your enquiry. Please see the reply below:
    </p>

    <!-- Admin Reply -->
    <div style="background:linear-gradient(135deg,${BRAND_YELLOW}10,${BRAND_GREEN}10);border-radius:12px;padding:24px;margin-bottom:24px;border-left:4px solid ${BRAND_GREEN};">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${BRAND_GREEN};">Our Reply</p>
      <p style="margin:0;font-size:15px;color:#374151;line-height:1.7;white-space:pre-wrap;">${replyMessage}</p>
    </div>

    <!-- Original Message -->
    <div style="background-color:#f9fafb;border-radius:12px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;">Your Original Message</p>
      <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;font-style:italic;">${originalMessage}</p>
    </div>

    <p style="margin:0 0 24px;font-size:14px;color:#6b7280;line-height:1.6;">
      If you have further questions, feel free to reply to this email or contact us directly.
    </p>

    <table role="presentation" style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="text-align:center;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://transmissioncentre.com'}/contact" 
             style="display:inline-block;background:linear-gradient(135deg,${BRAND_YELLOW},${BRAND_GREEN});color:${BRAND_BLACK};padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:800;font-size:14px;letter-spacing:0.3px;">
            Contact Us Again →
          </a>
        </td>
      </tr>
    </table>
  `;

  return baseLayout(content);
}
