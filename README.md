# Project Jabar Digital Academy
## Tugas 5

Berikut contoh file `README.md` lengkap dan profesional, yang:

* Menjelaskan bahwa pengguna perlu membuat file `.env`
* Menyediakan contoh langsung yang bisa di-*copy-paste*
* Cocok untuk proyek Next.js + Prisma + PostgreSQL

---

### 📄 Contoh `README.md`

````md
# 📦 Recipe App JDA

A modern recipe application using **Next.js**, **Prisma**, and **PostgreSQL** — built with developer experience and scalability in mind.

---

## 🚀 Getting Started

Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal:

### 1. Clone repository
```bash
git clone https://github.com/janfdev/recipe-jda-nextjs.git
cd recipe-app-jda
````

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Buat file `.env` berdasarkan file contoh `.env.example`:

```bash
cp .env.example .env
```

Lalu isi dengan kredensial dan konfigurasi yang sesuai.

#### Contoh isi `.env.example`:

```env
# Recommended for most uses
DATABASE_URL=

# For uses requiring a connection without pgbouncer
DATABASE_URL_UNPOOLED=

# Parameters for constructing your own connection string
PGHOST=
PGHOST_UNPOOLED=
PGUSER=
PGDATABASE=
PGPASSWORD=

# Parameters for Vercel Postgres Templates
POSTGRES_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
POSTGRES_URL_NO_SSL=
POSTGRES_PRISMA_URL=

# Neon Auth environment variables for Next.js
NEXT_PUBLIC_STACK_PROJECT_ID=
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=
STACK_SECRET_SERVER_KEY=
```

> Jangan lupa **jaga kerahasiaan file `.env`**, dan pastikan file `.env` tidak dikomit ke repository (sudah termasuk di `.gitignore`).

---

### 4. Jalankan Prisma dan migrasi database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Jalankan development server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

---

## 🛠️ Tech Stack

* [Next.js](https://nextjs.org/)
* [Prisma](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Vercel](https://vercel.com/)

---

