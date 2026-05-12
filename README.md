# 🌍 Empower Pathways — Power of Youth Development

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![TanStack Router](https://img.shields.io/badge/TanStack_Router-Hash_Mode-FF4154?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)

> A youth-led NGO platform based in **Mwanza, Tanzania** — connecting ideas, skills and markets to enable sustainable livelihoods for youth and young mothers.



## ✨ Features

- **Public website** with Home, About, Programs, Events, and Contact pages
- **Events system** with detail pages, photo galleries, and RSVP functionality
- **Admin dashboard** with protected login route
- **Supabase integration** for impact stats, programs, and contact form submissions
- **Hash-based routing** for seamless deployment on shared hosting (no server rewrites needed)
- **Fully responsive** mobile-first design
- **Framer Motion** animations throughout



## 🗂 Project Structure

```
empower-pathways-main/
├── public/                  # Static assets (logo, images)
├── src/
│   ├── assets/              # Images imported at build time
│   ├── components/          # Shared UI components
│   │   ├── ui/              # shadcn/ui primitives
│   │   ├── Logo.tsx
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   └── SiteLayout.tsx
│   ├── hooks/               # Custom React hooks
│   ├── integrations/
│   │   └── supabase/        # Supabase client & types
│   ├── lib/
│   │   └── events.ts        # Static events data
│   ├── routes/              # TanStack file-based routes
│   │   ├── __root.tsx
│   │   ├── index.tsx        # Home page (/)
│   │   ├── about.tsx
│   │   ├── programs.tsx
│   │   ├── contact.tsx
│   │   ├── events.tsx       # Events listing (/events)
│   │   ├── events.$slug.tsx # Event detail (/events/:slug)
│   │   ├── admin.tsx
│   │   ├── admin.index.tsx
│   │   └── admin.login.tsx
│   ├── main.tsx             # App entry point
│   ├── router.tsx           # TanStack Router (hash history)
│   ├── routeTree.gen.ts     # Auto-generated route tree
│   └── styles.css           # Global styles
├── index.html
├── vite.config.ts
├── package.json
└── tsconfig.json
```



## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Install dependencies

```bash
npm install
```

### Set up environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

Output will be in `dist/` as a standard static site — just upload the contents to your hosting provider.

### Preview the production build

```bash
npm run preview
```



## 🌐 Deployment (Shared Hosting / cPanel)

This app uses **hash-based routing** (`/#/about`, `/#/events`) so it works on any shared host without `.htaccess` rewrites.

1. Run `npm run build`
2. Upload the contents of the `dist/` folder to your `public_html` directory (or subdirectory)
3. Done — no server configuration needed



## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.8 |
| Build tool | Vite 7 |
| Routing | TanStack Router (hash mode) |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui + Radix UI |
| Backend / DB | Supabase |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Icons | Lucide React |
| Toasts | Sonner |



## 📋 Routes

| Path | Description |
|---|---|
| `/#/` | Home page with hero, impact stats, programs preview |
| `/#/about` | Organisation story and team |
| `/#/programs` | All five programme tracks |
| `/#/events` | Events listing with gallery |
| `/#/events/:slug` | Individual event detail + RSVP |
| `/#/contact` | Contact and partner enquiry form |
| `/#/admin/login` | Admin login |
| `/#/admin` | Protected admin dashboard |



## 🗃 Supabase Tables

| Table | Purpose |
|---|---|
| `impact_stats` | Home page impact numbers |
| `programs` | Programme cards and details |
| `contact_messages` | Contact form + RSVP submissions |



## 📸 Adding Events

Events are currently managed as static data in `src/lib/events.ts`. To add a new event:

1. Add your event images to `src/assets/`
2. Import them at the top of `events.ts`
3. Add a new entry to the `EVENTS` array following the existing structure
4. Rebuild and deploy



## 🤝 Contributing

Pull requests are welcome. For major changes please open an issue first to discuss what you'd like to change.



## 📄 License

MIT © [Power of Youth Development](https://pyd.or.tz)

---

<p align="center">Built with ❤️ in Mwanza, Tanzania</p>
