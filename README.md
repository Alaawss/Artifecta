# Artifecta

A React + Vite marketing site with a small local contact API.

## Scripts

- `npm run dev`: start the Vite frontend
- `npm run server`: start the contact API on `http://localhost:8787`
- `npm run build`: create a production build

## Contact backend

The contact form posts to `/api/contact`.

In local development, Vite proxies `/api/*` requests to the backend defined in `server/index.js`.

Submitted messages are stored in `server/data/contact-submissions.json`.

The backend can also email your inbox through Resend.

1. Copy [server/.env.example](/C:/Users/lenovo/Desktop/Artifecta/server/.env.example) to `server/.env`
2. Fill in:
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

After that, every contact form submission will:
- save locally in `server/data/contact-submissions.json`
- send an email to `CONTACT_TO_EMAIL`

## Recommended next step

For a real deployment, replace the file-based storage with one of these:

- Resend or Postmark if the main goal is email notifications
- Supabase if you want a lightweight hosted database and dashboard
- A small Express/Fastify API plus PostgreSQL if this site will grow into a fuller app
# Artifecta
