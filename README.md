# Project Management Framework Dashboard

A Next.js dashboard that serves as the operating manual and navigation layer for understanding company operations, project lifecycle, governance, tools, and documentation.

## Overview

This dashboard provides a single access point where users can:
- Understand how the company works
- Navigate the project lifecycle (6 phases)
- Understand governance and ceremonies
- Know which tool to use and when
- Access the right external tools
- Access official documents

**Important:** This dashboard does not replace ClickUp, MS Project, DocuWare, Xero, etc. It orchestrates understanding and access.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Database**: PostgreSQL (Vercel Postgres)
- **ORM**: Prisma
- **Authentication**: NextAuth.js with Google OAuth
- **Deployment**: Vercel

## User Access Levels

| Role | Capabilities |
|------|--------------|
| **Visitor** | View framework, lifecycle, governance (no external links) |
| **Authenticated User** | Full access including tool links and DocuWare references |
| **Admin** | CMS access to edit content, tools, phases, ceremonies, and user access |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Vercel Postgres)
- Google OAuth credentials

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

3. Configure environment variables:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Admin emails (comma-separated)
ADMIN_EMAILS="admin@yourcompany.com"
```

4. Set up the database:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

5. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Project Structure

```
/src
  /app
    /(public)/           # Public pages (Home, Framework, Lifecycle, etc.)
    /admin/              # Admin CMS interface
    /api/                # API routes
    /auth/               # Authentication pages
  /components
    /ui/                 # shadcn/ui components
    /layout/             # Header, Sidebar, Footer
    /content/            # Content display components
  /lib
    auth.ts              # NextAuth configuration
    prisma.ts            # Prisma client
    utils.ts             # Utility functions
/prisma
  schema.prisma          # Database schema
  seed.ts                # Database seeding
```

## Deployment to Vercel

1. Push your code to GitHub

2. Create a new project on Vercel and import the repository

3. Add environment variables in Vercel project settings:
   - `DATABASE_URL` (from Vercel Postgres or external DB)
   - `NEXTAUTH_URL` (your production URL)
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `ADMIN_EMAILS`

4. Enable Vercel Postgres in the Storage tab

5. Deploy!

### Post-Deployment

After the first deployment, run the database seed:

```bash
npx prisma db push
npx tsx prisma/seed.ts
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://your-domain.vercel.app/api/auth/callback/google` (production)
5. Copy Client ID and Client Secret to your environment variables

## Admin Access

Admins are determined by:
1. Email addresses listed in `ADMIN_EMAILS` environment variable
2. Email domains in the `AllowedDomain` table with `ADMIN` access level

To grant admin access:
1. Add the email to `ADMIN_EMAILS`, or
2. Use the Admin Panel > Access Control to add the domain with Admin level

## Content Management

Admins can manage:
- **Content**: Page titles, descriptions, and text blocks
- **Phases**: Lifecycle phases, entry criteria, exit gates
- **Ceremonies**: Governance ceremonies, participants, inputs/outputs
- **Tools**: Tool references, URLs, descriptions
- **Access**: Allowed domains and user roles

All changes are stored in the database and take effect immediately without redeployment.

## Design System

The dashboard uses an institutional, sober, and professional design:

- **Colors**: Navy blue (#1e3a5f), slate gray, white backgrounds
- **Typography**: System fonts for maximum compatibility
- **Components**: Square corners, 1px borders, no shadows
- **Layout**: Fixed left sidebar, clear grid structure

## License

Private - Internal use only.
