import nodemailer from 'nodemailer';

const required = ['name', 'email', 'phone', 'program', 'message'];

function clean(value) {
  return String(value || '').trim();
}

function validateInquiry(body) {
  const inquiry = Object.fromEntries(
    required.map((field) => [field, clean(body[field])]),
  );

  const missing = required.filter((field) => !inquiry[field]);
  if (missing.length) {
    return { error: `Missing required fields: ${missing.join(', ')}` };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    return { error: 'Please enter a valid email address.' };
  }

  if (inquiry.message.length < 10) {
    return { error: 'Please include a short message with your inquiry.' };
  }

  return { inquiry };
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function createTransporter() {
  const smtpReady =
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.INQUIRY_TO;

  if (!smtpReady) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || '').toLowerCase() === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const result = validateInquiry(req.body || {});
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  const transporter = createTransporter();
  if (!transporter) {
    return res.status(202).json({
      message:
        'Inquiry received. Configure SMTP environment variables in Vercel to send emails.',
    });
  }

  const { name, email, phone, program, message } = result.inquiry;
  const htmlInquiry = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    program: escapeHtml(program),
    message: escapeHtml(message).replace(/\n/g, '<br />'),
  };

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.INQUIRY_TO,
      replyTo: email,
      subject: `New chess academy inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Program: ${program}`,
        '',
        message,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fdf5e6; border: 1px solid #e2d1b3; border-radius: 8px; overflow: hidden; color: #333;">
          <div style="background-color: #101624; padding: 24px; text-align: center; border-bottom: 4px solid #d4af37;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">RITURAJ CHESS ACADEMY</h1>
            <p style="color: #d4af37; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase;">New Admission Inquiry</p>
          </div>
          <div style="padding: 32px 24px; background-color: #ffffff;">
            <h2 style="margin-top: 0; color: #101624; font-size: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Student Details</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; width: 120px; color: #666; font-weight: bold;">Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; color: #111; font-weight: bold;">${htmlInquiry.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; color: #666; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; color: #111;"><a href="mailto:${htmlInquiry.email}" style="color: #c99318; text-decoration: none;">${htmlInquiry.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; color: #666; font-weight: bold;">Phone:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; color: #111;">${htmlInquiry.phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; color: #666; font-weight: bold;">Program:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; color: #111;">${htmlInquiry.program}</td>
              </tr>
            </table>

            <h2 style="margin-top: 0; color: #101624; font-size: 18px;">Message</h2>
            <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; border-left: 4px solid #d4af37; color: #444; line-height: 1.6;">
              ${htmlInquiry.message}
            </div>
          </div>
          <div style="background-color: #fdf5e6; padding: 16px; text-align: center; font-size: 12px; color: #888;">
            This email was generated automatically from the Rituraj Chess Academy website contact form.
          </div>
        </div>
      `,
    });

    // Send acknowledgment email to the sender
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: `We have received your inquiry - Rituraj Chess Academy`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fdf5e6; border: 1px solid #e2d1b3; border-radius: 8px; overflow: hidden; color: #333;">
          <div style="background-color: #101624; padding: 24px; text-align: center; border-bottom: 4px solid #d4af37;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">RITURAJ CHESS ACADEMY</h1>
          </div>
          <div style="padding: 32px 24px; background-color: #ffffff;">
            <h2 style="margin-top: 0; color: #101624; font-size: 20px;">Hello ${htmlInquiry.name},</h2>
            <p style="color: #444; line-height: 1.6;">Thank you for your interest in Rituraj Chess Academy. We have successfully received your inquiry regarding the <strong>${htmlInquiry.program}</strong>.</p>
            <p style="color: #444; line-height: 1.6;">Our head coach or a member of our team will review your message and contact you shortly at <strong>${htmlInquiry.phone}</strong> or via this email address.</p>
            
            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #eee;">
              <p style="margin: 0; color: #666; font-size: 14px;">Best Regards,</p>
              <p style="margin: 5px 0 0 0; color: #101624; font-weight: bold;">The Rituraj Chess Academy Team</p>
              <p style="margin: 5px 0 0 0; color: #666; font-size: 13px;">📞 +91 8076 940 504 &nbsp;|&nbsp; ✉️ riturajchessacademy@gmail.com</p>
              <p style="margin: 5px 0 0 0; color: #c99318; font-size: 14px;"><a href="https://riturajacademy.com" style="color: #c99318; text-decoration: none;">www.riturajacademy.com</a></p>
            </div>
          </div>
        </div>
      `,
    });

    return res.json({ message: 'Thank you. Your inquiry has been sent.' });
  } catch (error) {
    console.error('Email send failed:', error);
    return res.status(500).json({
      error: 'We could not send the inquiry right now. Please try again soon.',
    });
  }
}
