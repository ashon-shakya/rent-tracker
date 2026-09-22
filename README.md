# Rent Tracker

A modern, full-stack application built to track shared rent agreements, bonds, and payments.

## Features
- **Dashboard**: View active leases, upcoming payments, and recent activity.
- **Rent Management**: Add new rent agreements, specify start dates, rent amounts, and bond values.
- **Tenant Management**: Track roomates, their contact info, and their share of the rent.
- **Authentication**: Secure Google OAuth integration using NextAuth.js.
- **Modern UI**: Designed with a sleek, mobile-first aesthetic using Tailwind CSS and shadcn/ui.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Database**: MongoDB (with Mongoose)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Icons**: lucide-react

## Getting Started

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env.local`:
   ```env
   MONGODB_URI="your-mongodb-connection-string"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
