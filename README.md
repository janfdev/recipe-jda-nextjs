# **ReciVerse**

ReciVerse is a full-stack recipe sharing application built with the Next.js App Router, Prisma, and Tailwind CSS. It features a complete user authentication system, a dedicated admin dashboard for content management, and a beautiful, responsive interface for users to browse and interact with recipes.

## ✨ Features

- **User Authentication:** Secure user registration and login powered by NextAuth.js.
- **Admin Dashboard:** A comprehensive, protected dashboard for administrators to manage site content, including recipes, categories, and view user comments.
- **Full Recipe CRUD:** Admins have complete control to create, read, update, and delete recipes.
- **Dynamic Category Management:** Easily add, edit, and delete recipe categories.
- **Cloud-Based Image Uploads:** Seamless image handling for recipes and user profiles using Cloudinary.
- **Interactive Commenting:** Registered users can engage with recipes by leaving comments.
- **Advanced Recipe Browsing:** Soon Feature.
- **User Profile Management:** Now Admin and user can update name and profile.
- **Modern UI/UX:** Built with shadcn/ui and Tailwind CSS, featuring a responsive design and a dark/light mode toggle.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router & Turbopack)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Image Management:** [Cloudinary](https://cloudinary.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/janfdev/recipe-jda-nextjs.git
cd recipe-jda-nextjs
```

### 2. Install Dependencies

This project uses `npm` as the package manager.

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project by copying the example file.

```bash
cp .env.example .env
```

Now, open the `.env` file and fill in the required values.

```env
# PostgreSQL connection string
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# NextAuth secret key (generate a random string)
# You can use `openssl rand -base64 32` to generate one
NEXTAUTH_SECRET=

# Base URL for your application
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Set Up the Database

Run the Prisma commands to generate the client and apply database migrations.

```bash
# Generate Prisma Client
npx prisma generate

# Apply migrations to your database schema
npx prisma migrate dev
```

### 5. Seed the Database (Optional)

To create a default admin user, run the seed script.

```bash
npx prisma db seed
```

The default admin credentials will be:

- **Email:** `admin@gmail.com`
- **Password:** `admin123456`

### 6. Run the Development Server

You can now start the application.

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 📂 Project Structure

The project follows a feature-driven structure within the Next.js App Router paradigm.

```
/
├── app/                  # Main application source
│   ├── (auth)/           # Authentication routes (login, register)
│   ├── admin/            # Protected admin dashboard routes
│   ├── api/              # API endpoints for backend logic
│   ├── recipes/          # Public recipe browsing pages
│   └── user/             # Protected user-specific routes (profile, etc.)
│
├── components/           # Reusable React components
│   ├── admin/            # Components specific to the admin dashboard
│   ├── layout/           # Shared layout components (Header, Footer)
│   ├── recipes/          # Components related to recipe display
│   └── ui/               # UI primitives from shadcn/ui
│
├── hooks/                # Custom React hooks for data fetching and logic
│
├── lib/                  # Shared libraries, helpers, and configurations
│   ├── auth.ts           # NextAuth.js configuration
│   ├── cloudinary.ts     # Cloudinary SDK configuration and helpers
│   ├── prisma.ts         # Prisma client instance
│   └── types/            # TypeScript type definitions
│
├── middleware/           # Edge middleware for route protection
│
└── prisma/               # Database configuration
    ├── migrations/       # Database migration history
    ├── schema.prisma     # The single source of truth for your DB schema
    └── seed.ts           # Script to seed the database with initial data
```
