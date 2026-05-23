# AG Traders — Ecommerce

Online store for physical goods in Pakistan. Guest checkout with manual payment (JazzCash, EasyPaisa, bank transfer).

## Local setup

1. Install [Node.js LTS](https://nodejs.org/)
2. Create a free [Neon](https://neon.tech) PostgreSQL database (or use local Postgres)
3. Copy `.env.example` → `.env` and fill in `DATABASE_URL` and admin credentials
4. Run:

```bash
npm install
npm run db:setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build (migrate + Next.js) |
| `npm run db:setup` | Migrate database + seed sample data |
| `npm run db:seed` | Seed only |

## Admin

- URL: `/admin/login`
- Credentials: `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`

## Deploy to Vercel

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for full steps (PostgreSQL, env vars, seeding).

Quick summary:

1. Push to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Set `DATABASE_URL`, admin env vars, `NEXT_PUBLIC_SITE_URL`
4. Deploy → run `npm run db:seed` once against production DB

## Tech stack

- Next.js 15 · React 19 · Tailwind CSS 4
- Prisma · PostgreSQL
- Deployed on Vercel
