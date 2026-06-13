import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 4174);
const distPath = path.join(__dirname, '..', 'dist');

app.use(cors());
app.use(express.json({ limit: '32kb' }));

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

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

app.post('/api/contact', async (req, res) => {
  const result = validateInquiry(req.body || {});
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  const transporter = createTransporter();
  if (!transporter) {
    console.info('SMTP is not configured. Inquiry captured:', result.inquiry);
    return res.status(202).json({
      message:
        'Inquiry received locally. Configure SMTP in .env to send emails.',
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
});

app.use(express.static(distPath));
app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Rituraj Chess Academy server running at http://localhost:${port}`);
});
