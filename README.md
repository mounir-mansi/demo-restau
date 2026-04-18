# Demo Restau

Full-stack restaurant / snack demo site — menu, events, gallery, contact form, and admin panel.

**Live demo:** [demo-restau.mandev.fr](https://demo-restau.mandev.fr)

---

## Stack

**Frontend**
- React 19 + Vite
- React Router v7

**Backend**
- Node.js + Express 5
- Prisma ORM + PostgreSQL
- JWT authentication (httpOnly cookies)
- Argon2 password hashing
- Cloudflare R2 (image storage)
- Resend (transactional emails)
- Helmet + rate limiting

---

## Features

- Landing page with animated sections
- Menu with categories and images
- Events page
- Photo gallery
- Contact form (email via Resend)
- Admin panel — manage menu, events, gallery, messages
- JWT-protected routes with httpOnly cookies

---

## Project Structure

```
demo-restau/
├── backend/
│   ├── prisma/         # Schema + migrations + seed
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── routes/
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        └── pages/
            ├── Accueil/
            ├── Menu/
            ├── Events/
            ├── Galerie/
            ├── Contact/
            └── AdminScreen/
```

---

## Local Setup

```bash
# Backend
cd backend
npm install
cp .env.example .env   # fill in your values
npx prisma migrate dev
npx prisma db seed
npm run dev            # :3002

# Frontend
cd frontend
npm install
npm run dev            # :5173
```

---

## Security

- Passwords hashed with Argon2
- JWT stored in httpOnly cookies (not localStorage)
- Helmet security headers
- Express rate limiting
- Environment variables for all secrets
