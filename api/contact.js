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
        <h2>New Rituraj Chess Academy Inquiry</h2>
        <p><strong>Name:</strong> ${htmlInquiry.name}</p>
        <p><strong>Email:</strong> ${htmlInquiry.email}</p>
        <p><strong>Phone:</strong> ${htmlInquiry.phone}</p>
        <p><strong>Program:</strong> ${htmlInquiry.program}</p>
        <p><strong>Message:</strong></p>
        <p>${htmlInquiry.message}</p>
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
