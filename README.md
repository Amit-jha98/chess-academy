# Rituraj Chess Academy

Vite + React website for Rituraj Chess Academy with a Node/Nodemailer contact form endpoint.

## Run Locally

```bash
npm install
npm run dev
```

The Vite dev server runs the frontend. For contact form testing, configure `.env` from `.env.example` and run:

```bash
npm run build
npm start
```

## SMTP Setup

Create a `.env` file and set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, and `INQUIRY_TO`. Submitted inquiries are sent to `INQUIRY_TO`.

## Deploy to Vercel

This project is Vercel-ready:

- Frontend builds with `npm run build`
- Static output is `dist`
- Contact form runs from `api/contact.js`
- SPA routing is handled by `vercel.json`

Add these Environment Variables in Vercel Project Settings:

```bash
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM="Rituraj Chess Academy <no-reply@riturajacademy.com>"
INQUIRY_TO=support@nextgenix.in
```

Then import the repository into Vercel and deploy.
