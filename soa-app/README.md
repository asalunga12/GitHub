# Sprout Solutions — Statement of Account App

A production-ready web application for generating, managing, and paying Statements of Account (SOA).

## Features

- **Public SOA Request Form** — with dynamic registrant list, CSV upload, real-time price calculation
- **Automated PDF Generation** — professional layout using PDFKit
- **Email Delivery** — Nodemailer with PDF attachment
- **Admin Finance Dashboard** — full CRUD, search, filter, pagination
- **Stripe Payments** — hosted checkout, webhook-driven status updates
- **Security** — Zod validation, rate limiting, honeypot anti-spam

## Stack

- **Next.js 14** (App Router)
- **PostgreSQL + Prisma ORM**
- **PDFKit** — PDF generation
- **Nodemailer** — email
- **Stripe** — payments
- **PapaParse** — CSV parsing
- **TailwindCSS** — styling

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in values
cp .env.example .env

# 3. Run database migrations
npx prisma migrate dev --name init

# 4. Generate Prisma client
npx prisma generate

# 5. Start dev server
npm run dev
```

App runs at: http://localhost:3000

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home / landing |
| `/request-soa` | Public SOA request form |
| `/admin` | Admin finance dashboard |
| `/soa/[soaNumber]` | View & pay individual SOA |

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/generate-soa` | Create SOA, generate PDF, send email |
| GET | `/api/soa` | List all SOAs (paginated) |
| GET | `/api/soa/:soaNumber` | Get single SOA |
| PATCH | `/api/soa/:soaNumber` | Update SOA status |
| GET | `/api/soa/:soaNumber/pdf` | Download PDF |
| POST | `/api/soa/:soaNumber/resend-email` | Resend email |
| POST | `/api/stripe-checkout` | Create Stripe session |
| POST | `/api/stripe-webhook` | Handle Stripe events |

## SOA Number Format

`SOA-YYYY-XXXX` (e.g., `SOA-2026-0001`)

## CSV Format for Registrants

```csv
name,email
Juan Dela Cruz,juan@email.com
Maria Santos,maria@email.com
```

## Environment Variables

See `.env.example` for all required environment variables.

## Stripe Webhook Setup

```bash
# Local testing
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

## Deployment

Fully compatible with **Vercel** and **Railway**.
