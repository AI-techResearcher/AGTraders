# Deploy AG Traders on Vercel

## Why PostgreSQL?

Vercel serverless functions cannot use a local SQLite file. This project uses **PostgreSQL** (free tier on [Neon](https://neon.tech) or [Vercel Postgres](https://vercel.com/storage/postgres)).

---

## 1. Create a PostgreSQL database

### Option A — Neon (recommended, free)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a project → copy the **connection string**
3. Use the **pooled** connection string for `DATABASE_URL` (ends with `-pooler` or add `?pgbouncer=true`)

### Option B — Vercel Postgres

1. In your Vercel project → **Storage** → **Create Database** → Postgres
2. Connect it to the project — `DATABASE_URL` is added automatically

---

## 2. Push code to GitHub

```bash
git init
git add .
git commit -m "Prepare for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

---

## 3. Import project on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Root directory: `.` (project root)

**Build settings** (should match `vercel.json`):

| Setting | Value |
|---------|--------|
| Build Command | `prisma generate && prisma migrate deploy && next build` |
| Install Command | `npm install` |
| Output Directory | (default) |

---

## 4. Environment variables

In Vercel → **Project → Settings → Environment Variables**, add:

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `ADMIN_EMAIL` | Yes | Admin login email |
| `ADMIN_PASSWORD` | Yes | Strong password |
| `ADMIN_SECRET` | Yes | Random string, 32+ characters |
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://your-app.vercel.app` |
| `JAZZCASH_NUMBER` | No | Payment display defaults |
| `EASYPAISA_NUMBER` | No | |
| `BANK_NAME` | No | |
| `BANK_ACCOUNT_TITLE` | No | |
| `BANK_ACCOUNT_NUMBER` | No | |
| `BANK_IBAN` | No | |

Copy from `.env.example` and use production values.

Apply to **Production**, **Preview**, and **Development**.

---

## 5. Deploy

Click **Deploy**. The build will:

1. Install dependencies (`postinstall` runs `prisma generate`)
2. Run database migrations (`prisma migrate deploy`)
3. Build Next.js

---

## 6. Seed production data (once)

After the first successful deploy, seed sample products from your machine:

```bash
# Set DATABASE_URL to your production Neon/Vercel Postgres URL
set DATABASE_URL=postgresql://...
npx tsx prisma/seed.ts
```

Or use Neon SQL editor to verify tables exist after migrate.

---

## 7. Post-deploy checklist

- [ ] Visit `/` — storefront loads
- [ ] Visit `/admin/login` — admin works
- [ ] Change `ADMIN_PASSWORD` and `ADMIN_SECRET` in Vercel env
- [ ] Set payment details in **Admin → Payment settings**
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your real domain
- [ ] Test checkout and order tracking

---

## Local development (with PostgreSQL)

1. Copy `.env.example` to `.env`
2. Set `DATABASE_URL` to your Neon dev branch or local Postgres
3. Run:

```bash
npm install
npm run db:setup
npm run dev
```

---

## Custom domain

Vercel → **Settings → Domains** → add your domain → update `NEXT_PUBLIC_SITE_URL`.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails on Prisma | Ensure `DATABASE_URL` is set in Vercel env before build |
| `migrate deploy` fails | Check Postgres URL and SSL (`?sslmode=require`) |
| Admin login fails | Verify `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SECRET` |
| Images not loading | Unsplash URLs are allowed in `next.config.ts` |
| Empty shop | Run `npm run db:seed` against production `DATABASE_URL` |
