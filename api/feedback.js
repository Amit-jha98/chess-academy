import nodemailer from 'nodemailer';

const required = ['name', 'email', 'rating', 'category', 'message'];

function clean(value) {
  return String(value || '').trim();
}

function validateFeedback(body) {
  const feedback = Object.fromEntries(
    required.map((field) => [field, clean(body[field])]),
  );

  const missing = required.filter((field) => !feedback[field]);
  if (missing.length) {
    return { error: `Missing required fields: ${missing.join(', ')}` };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(feedback.email)) {
    return { error: 'Please enter a valid email address.' };
  }

  if (feedback.message.length < 10) {
    return { error: 'Please include a more detailed message.' };
  }

  // phone is optional
  feedback.phone = clean(body.phone);

  return { feedback };
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

  const result = validateFeedback(req.body || {});
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  const transporter = createTransporter();
  if (!transporter) {
    return res.status(202).json({
      message:
        'Feedback received. Configure SMTP environment variables in Vercel to send emails.',
    });
  }

  const { name, email, phone, rating, category, message } = result.feedback;
  const htmlFeedback = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    rating: escapeHtml(rating),
    category: escapeHtml(category),
    message: escapeHtml(message).replace(/\n/g, '<br />'),
  };

  try {
    // 1. Send feedback to the Academy
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.INQUIRY_TO,
      replyTo: email,
      subject: `New academy feedback from ${name} (${rating} Stars)`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fdf5e6; border: 1px solid #e2d1b3; border-radius: 8px; overflow: hidden; color: #333;">
          <div style="background-color: #101624; padding: 24px; text-align: center; border-bottom: 4px solid #d4af37;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">RITURAJ CHESS ACADEMY</h1>
            <p style="color: #d4af37; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase;">New Feedback Received</p>
          </div>
          <div style="padding: 32px 24px; background-color: #ffffff;">
            <h2 style="margin-top: 0; color: #101624; font-size: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Sender Details</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; width: 120px; color: #666; font-weight: bold;">Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; color: #111; font-weight: bold;">${htmlFeedback.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; color: #666; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; color: #111;"><a href="mailto:${htmlFeedback.email}" style="color: #c99318; text-decoration: none;">${htmlFeedback.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; color: #666; font-weight: bold;">Phone:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; color: #111;">${htmlFeedback.phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; color: #666; font-weight: bold;">Category:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; color: #111;">${htmlFeedback.category}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; color: #666; font-weight: bold;">Rating:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; color: #111; font-size: 16px;">${'⭐'.repeat(Number(htmlFeedback.rating))} (${htmlFeedback.rating}/5)</td>
              </tr>
            </table>

            <h2 style="margin-top: 0; color: #101624; font-size: 18px;">Feedback Message</h2>
            <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; border-left: 4px solid #d4af37; color: #444; line-height: 1.6;">
              ${htmlFeedback.message}
            </div>
          </div>
          <div style="background-color: #fdf5e6; padding: 16px; text-align: center; font-size: 12px; color: #888;">
            This email was generated automatically from the Rituraj Chess Academy feedback form.
          </div>
        </div>
      `,
    });

    // 2. Send acknowledgment email to the sender
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: `Thank you for your feedback - Rituraj Chess Academy`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fdf5e6; border: 1px solid #e2d1b3; border-radius: 8px; overflow: hidden; color: #333;">
          <div style="background-color: #101624; padding: 24px; text-align: center; border-bottom: 4px solid #d4af37;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">RITURAJ CHESS ACADEMY</h1>
          </div>
          <div style="padding: 32px 24px; background-color: #ffffff;">
            <h2 style="margin-top: 0; color: #101624; font-size: 20px;">Hello ${htmlFeedback.name},</h2>
            <p style="color: #444; line-height: 1.6;">Thank you for taking the time to share your feedback regarding <strong>${htmlFeedback.category}</strong>. We read every single message and deeply appreciate your input!</p>
            <p style="color: #444; line-height: 1.6;">Your insights help us continuously improve our academy and offer the best possible chess coaching experience.</p>
            
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

    return res.json({ message: 'Thank you. Your feedback has been submitted.' });
  } catch (error) {
    console.error('Email send failed:', error);
    return res.status(500).json({
      error: 'We could not submit your feedback right now. Please try again soon.',
    });
  }
}
