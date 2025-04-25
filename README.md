![FlowersBench Screenshot](https://github.com/user-attachments/assets/f1ede937-0574-4a18-9f7a-0386c65b4831)

# FlowersBench

[🌸 Live Site](https://flowersbench.com)

FlowersBench is a public, portfolio project for benchmarking AI models, featuring a leaderboard, model comparison tools, and an admin panel. Built with Next.js, Supabase, and Tailwind CSS, it provides a fun and ethical way to compare LLMs, originally created for a friend to track and evaluate models.

## Features

- 🌸 **Leaderboard:** View and rank AI models by score, organization, and more.
- 📝 **Admin Panel:** Secure login for admins to add, edit, or remove leaderboard entries and feature tweets.
- 🧑‍💻 **Model Comparison:** Greentext and UI benchmarking pages to compare model outputs side-by-side.
- 🐦 **Featured Tweet:** Display a highlighted tweet on the homepage, editable by admins.
- 🔒 **Authentication:** Only admins can access editing features.
- 📱 **Responsive Design:** Works great on desktop and mobile.
- 🚀 **Deployed on Vercel**

## Tech Stack

- [Next.js (App Router)](https://nextjs.org/)
- [React](https://react.dev/)
- [Supabase](https://supabase.com/) (Auth & Database)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenRouter/AI SDK](https://openrouter.ai/)
- [Vercel](https://vercel.com/) (Deployment)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/flowers_bench.git
cd flowers_bench/flowersbench
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up Supabase

- Create a [Supabase](https://supabase.com/) project.
- Manually create the required tables:
  - `leaderboards` (id, model_name, score, organization, created_at)
  - `featured_tweets` (id, tweet_id, created_at)
  - `profiles` (id, is_admin)
- Enable authentication and set up at least one admin user in the `profiles` table.

### 4. Configure environment variables

Create a `.env.local` file in the root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENROUTER_API_KEY=your_openrouter_api_key # (for admin use)
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment

This project is ready to deploy on [Vercel](https://vercel.com/). Just connect your repo and set the environment variables in the Vercel dashboard.

## License

This project is public for portfolio/demo purposes, but not open for contributions. No license is provided.  
This project is not licensed for reuse or modification.

## Credits

- Built by Jason Botterill for @flowersslop
- Inspired by the need for transparent, fun LLM benchmarking

---

> “The most ethical benchmarking of AI models under evaluation.”  
> — FlowersBench
