import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'sales@zalgoinfotech.com',
    pass: process.env.EMAIL_PASSWORD, // Gmail App Password
  },
});

export interface EmailParams {
  name: string;
  email: string;
  website?: string;
  mobile: string;
  message: string;
  service?: string;
}

export async function sendContactEmail(data: EmailParams): Promise<void> {
  try {
    // ── Office notification email ──
    const officeHtml = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#111827;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#111827;padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#0d9488,#0891b2);border-radius:12px 12px 0 0;padding:28px 32px">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <p style="margin:0 0 4px;color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:2px;text-transform:uppercase">New Lead</p>
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800">Contact Form Submission</h1>
        </td>
        <td align="right">
          <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:8px 14px;display:inline-block">
            <p style="margin:0;color:#fff;font-size:11px;font-weight:700">ZALGO INFOTECH</p>
          </div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Body -->
  <tr><td style="background:#1f2937;padding:28px 32px;border-radius:0 0 12px 12px">

    <!-- Service badge -->
    ${data.service ? `<div style="margin-bottom:20px">
      <p style="margin:0 0 8px;color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:1px">Interested In</p>
      <span style="display:inline-block;background:#0d9488;color:#fff;font-size:13px;font-weight:700;padding:6px 16px;border-radius:20px">${escapeHtml(data.service)}</span>
    </div>` : ''}

    <!-- Lead details -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
      <tr>
        <td width="50%" style="padding:0 8px 0 0;vertical-align:top">
          <div style="background:#111827;border-radius:8px;padding:16px;border-left:3px solid #0d9488">
            <p style="margin:0 0 4px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px">Name</p>
            <p style="margin:0;color:#fff;font-size:15px;font-weight:600">${escapeHtml(data.name)}</p>
          </div>
        </td>
        <td width="50%" style="padding:0 0 0 8px;vertical-align:top">
          <div style="background:#111827;border-radius:8px;padding:16px;border-left:3px solid #0d9488">
            <p style="margin:0 0 4px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px">Mobile</p>
            <p style="margin:0;color:#fff;font-size:15px;font-weight:600">${escapeHtml(data.mobile)}</p>
          </div>
        </td>
      </tr>
      <tr><td colspan="2" style="padding:12px 0 0"></td></tr>
      <tr>
        <td width="50%" style="padding:0 8px 0 0;vertical-align:top">
          <div style="background:#111827;border-radius:8px;padding:16px;border-left:3px solid #0891b2">
            <p style="margin:0 0 4px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px">Email</p>
            <a href="mailto:${escapeHtml(data.email)}" style="color:#0d9488;font-size:14px;text-decoration:none">${escapeHtml(data.email)}</a>
          </div>
        </td>
        <td width="50%" style="padding:0 0 0 8px;vertical-align:top">
          <div style="background:#111827;border-radius:8px;padding:16px;border-left:3px solid #0891b2">
            <p style="margin:0 0 4px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px">Website</p>
            <p style="margin:0;color:#d1d5db;font-size:14px">${data.website ? escapeHtml(data.website) : 'Not provided'}</p>
          </div>
        </td>
      </tr>
    </table>

    <!-- Message -->
    <p style="margin:0 0 10px;color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:1px">Message</p>
    <div style="background:#111827;border-radius:8px;padding:18px;border-left:3px solid #374151;margin-bottom:24px">
      <p style="margin:0;color:#d1d5db;font-size:14px;line-height:1.7">${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
    </div>

    <!-- Action banner -->
    <div style="background:linear-gradient(135deg,#064e3b,#065f46);border-radius:8px;padding:16px 20px;text-align:center">
      <p style="margin:0 0 4px;color:#6ee7b7;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px">Action Required</p>
      <p style="margin:0;color:#fff;font-size:14px">Reply within <strong>24 hours</strong> to maximise conversion.</p>
    </div>

    <!-- Footer -->
    <p style="margin:20px 0 0;color:#4b5563;font-size:12px;text-align:center">Zalgo Infotech · sales@zalgoinfotech.com · +91 92442 13326</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Zalgo Infotech" <${process.env.EMAIL_USER || 'sales@zalgoinfotech.com'}>`,
      to: 'sales@zalgoinfotech.com',
      subject: `🔔 New Lead: ${data.name} — Zalgo Infotech`,
      html: officeHtml,
      replyTo: data.email,
    });

    // ── Client confirmation email ──
    const clientHtml = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#0d9488,#0891b2);border-radius:12px 12px 0 0;padding:36px 32px;text-align:center">
    <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:50%;width:56px;height:56px;line-height:56px;text-align:center;margin-bottom:16px">
      <span style="font-size:28px">✓</span>
    </div>
    <h1 style="margin:0 0 8px;color:#fff;font-size:24px;font-weight:800">Message Received!</h1>
    <p style="margin:0;color:rgba(255,255,255,0.8);font-size:15px">We'll get back to you within 24 hours.</p>
  </td></tr>

  <!-- Body -->
  <tr><td style="background:#fff;padding:32px;border-radius:0 0 12px 12px">

    <p style="margin:0 0 20px;color:#374151;font-size:15px">Hi <strong>${escapeHtml(data.name)}</strong>,</p>
    <p style="margin:0 0 24px;color:#6b7280;font-size:14px;line-height:1.7">
      Thank you for reaching out to <strong style="color:#111827">Zalgo Infotech</strong>. We've received your message and our WordPress experts will review it shortly. You can expect a response within <strong style="color:#0d9488">24 hours</strong>.
    </p>

    <!-- Service tag -->
    ${data.service ? `<div style="margin-bottom:20px">
      <p style="margin:0 0 8px;color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px">You enquired about</p>
      <span style="display:inline-block;background:#f0fdfa;border:1px solid #99f6e4;color:#0f766e;font-size:13px;font-weight:700;padding:6px 16px;border-radius:20px">${escapeHtml(data.service.split(' — ')[0])}</span>
    </div>` : ''}

    <!-- Message recap -->
    <div style="background:#f9fafb;border-radius:10px;padding:20px;border:1px solid #e5e7eb;margin-bottom:24px">
      <p style="margin:0 0 12px;color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:700">Your Message</p>
      <p style="margin:0;color:#374151;font-size:14px;line-height:1.7">${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
    </div>

    <!-- What's next -->
    <p style="margin:0 0 14px;color:#111827;font-size:14px;font-weight:700">What happens next?</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
      ${[
        ['1', 'Our team reviews your message', 'Within a few hours'],
        ['2', 'We prepare a tailored response', 'Based on your needs'],
        ['3', 'You receive our proposal', 'Within 24 hours'],
      ].map(([num, text, sub]) => `
      <tr>
        <td width="36" style="vertical-align:top;padding-bottom:14px">
          <div style="width:28px;height:28px;background:#0d9488;border-radius:50%;text-align:center;line-height:28px;color:#fff;font-size:12px;font-weight:800">${num}</div>
        </td>
        <td style="vertical-align:top;padding:4px 0 14px 12px">
          <p style="margin:0;color:#111827;font-size:14px;font-weight:600">${text}</p>
          <p style="margin:2px 0 0;color:#9ca3af;font-size:12px">${sub}</p>
        </td>
      </tr>`).join('')}
    </table>

    <!-- Contact options -->
    <div style="background:#f0fdfa;border-radius:10px;padding:20px;border:1px solid #99f6e4;margin-bottom:28px">
      <p style="margin:0 0 12px;color:#0f766e;font-size:13px;font-weight:700">Need a faster response?</p>
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-right:20px">
            <a href="https://wa.me/919244213326?text=Hi%20Zalgo%20Infotech%2C%20I%20just%20submitted%20a%20contact%20form." style="color:#0d9488;font-size:14px;text-decoration:none;font-weight:600">
              💬 WhatsApp Us
            </a>
          </td>
          <td>
            <a href="tel:+919244213326" style="color:#0d9488;font-size:14px;text-decoration:none;font-weight:600">
              📞 +91 92442 13326
            </a>
          </td>
        </tr>
      </table>
    </div>

    <!-- CTA button -->
    <div style="text-align:center;margin-bottom:28px">
      <a href="https://zalgoinfotech.com/portfolio" style="display:inline-block;background:linear-gradient(135deg,#0d9488,#0891b2);color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:14px 32px;border-radius:8px">
        View Our Portfolio →
      </a>
    </div>

    <!-- Footer -->
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 20px">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <p style="margin:0;color:#111827;font-size:13px;font-weight:700">Zalgo Infotech</p>
          <p style="margin:2px 0 0;color:#9ca3af;font-size:12px">WordPress Experts Since 2016</p>
        </td>
        <td align="right">
          <p style="margin:0;color:#9ca3af;font-size:12px">sales@zalgoinfotech.com</p>
          <p style="margin:2px 0 0;color:#9ca3af;font-size:12px">+91 92442 13326</p>
        </td>
      </tr>
    </table>
  </td></tr>

  <tr><td style="padding:16px;text-align:center">
    <p style="margin:0;color:#9ca3af;font-size:11px">You received this email because you submitted a contact form at zalgoinfotech.com</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Zalgo Infotech" <${process.env.EMAIL_USER || 'sales@zalgoinfotech.com'}>`,
      to: data.email,
      subject: `We received your message, ${escapeHtml(data.name)} — Zalgo Infotech`,
      html: clientHtml,
    });

    console.log(`✅ Emails sent successfully for ${data.email}`);
  } catch (error) {
    console.error('❌ Email sending error:', error);
    throw new Error('Failed to send email');
  }
}

export interface PlanEmailParams {
  name: string;
  email: string;
  phone: string;
  website?: string;
  plan: string;
}

export async function sendPlanInquiryEmail(data: PlanEmailParams): Promise<void> {
  try {
    const officeHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#0d9488;padding:20px;border-radius:8px 8px 0 0">
          <h2 style="color:#fff;margin:0">New Maintenance Plan Inquiry</h2>
        </div>
        <div style="background:#1f2937;padding:24px;border-radius:0 0 8px 8px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#9ca3af;width:130px">Selected Plan</td>
                <td style="padding:8px 0;color:#fff;font-weight:bold;font-size:16px">${escapeHtml(data.plan)}</td></tr>
            <tr><td style="padding:8px 0;color:#9ca3af">Name</td>
                <td style="padding:8px 0;color:#fff">${escapeHtml(data.name)}</td></tr>
            <tr><td style="padding:8px 0;color:#9ca3af">Email</td>
                <td style="padding:8px 0;color:#0d9488">${escapeHtml(data.email)}</td></tr>
            <tr><td style="padding:8px 0;color:#9ca3af">Phone</td>
                <td style="padding:8px 0;color:#fff">${escapeHtml(data.phone)}</td></tr>
            <tr><td style="padding:8px 0;color:#9ca3af">Website</td>
                <td style="padding:8px 0;color:#fff">${data.website ? escapeHtml(data.website) : 'Not provided'}</td></tr>
          </table>
          <div style="margin-top:20px;padding:12px;background:#374151;border-radius:6px;border-left:4px solid #0d9488">
            <p style="color:#d1fae5;margin:0;font-size:14px">Action Required: Reply to this lead within 24 hours.</p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'sales@zalgoinfotech.com',
      to: 'sales@zalgoinfotech.com',
      subject: `New Plan Inquiry: ${data.plan} — ${data.name}`,
      html: officeHtml,
      replyTo: data.email,
    });

    const userHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#0d9488;padding:20px;border-radius:8px 8px 0 0">
          <h2 style="color:#fff;margin:0">We received your inquiry!</h2>
        </div>
        <div style="background:#1f2937;padding:24px;border-radius:0 0 8px 8px;color:#d1d5db">
          <p>Hi ${escapeHtml(data.name)},</p>
          <p>Thank you for your interest in our <strong style="color:#0d9488">${escapeHtml(data.plan)}</strong> plan.</p>
          <p>Our team will review your details and get back to you within <strong style="color:#fff">24 hours</strong> to discuss how we can help maintain and grow your WordPress website.</p>
          <div style="margin:20px 0;padding:16px;background:#374151;border-radius:8px;border-left:4px solid #0d9488">
            <p style="margin:0;color:#9ca3af;font-size:13px">Your Inquiry Details</p>
            <p style="margin:8px 0 0;color:#fff"><strong>Plan:</strong> ${escapeHtml(data.plan)}</p>
            <p style="margin:4px 0 0;color:#fff"><strong>Website:</strong> ${data.website ? escapeHtml(data.website) : 'Not provided'}</p>
          </div>
          <p>In the meantime, feel free to WhatsApp us at <a href="https://wa.me/919244213326" style="color:#0d9488">+91 92442 13326</a>.</p>
          <hr style="border:none;border-top:1px solid #374151;margin:20px 0">
          <p style="color:#6b7280;font-size:13px">Best regards,<br><strong style="color:#fff">Zalgo Infotech Team</strong><br>WordPress Experts Since 2016</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'sales@zalgoinfotech.com',
      to: data.email,
      subject: `Your ${data.plan} inquiry — Zalgo Infotech`,
      html: userHtml,
    });

    console.log(`✅ Plan inquiry emails sent for ${data.email}`);
  } catch (error) {
    console.error('❌ Plan inquiry email error:', error);
    throw new Error('Failed to send plan inquiry email');
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
