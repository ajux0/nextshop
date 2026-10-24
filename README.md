# NextShop

A fast, SEO-friendly product catalog built with **Next.js (App Router)**, React, and the free [DummyJSON](https://dummyjson.com) API. No API keys or database needed.

## Features

- **Server Components** fetch product data on the server, so pages arrive fully rendered (good for SEO and speed).
- **Dynamic routes** (`/products/[id]`) with `generateStaticParams` (build-time prerendering) and `generateMetadata` (unique title, description, and Open Graph image per product).
- **Caching with revalidation** (`fetch` with `next: { revalidate: 3600 }`).
- **Route Handler** (`/api/products`) powering a debounced **live search** dropdown.
- **Category filter and pagination** driven by URL search params, so every view is shareable and bookmarkable.
- **Cart** built with React Context + `useReducer`, saved to `localStorage`.
- **`loading.js`, `error.js`, and `not-found.js`** for loading skeletons, error recovery, and 404s.
- **`next/image`** for optimized images, responsive layout, and light/dark mode.

## Project structure

```
app/
  layout.js            Root layout, metadata, cart provider
  page.js              Home: products, categories, pagination (server component)
  loading.js           Skeleton shown while data loads
  error.js             Error boundary with retry
  not-found.js         404 page
  products/[id]/page.js  Product detail (dynamic route + SEO metadata)
  cart/page.js         Cart page (client component)
  api/products/route.js  Search API (route handler)
components/            Header, SearchBar, ProductCard, CartProvider, ...
lib/api.js             Data fetching and helpers
```

## Run locally

Requires Node.js 18.18 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build for production

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Create a new GitHub repository and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: NextShop"
   git branch -M main
   git remote add origin https://github.com/<your-username>/nextshop.git
   git push -u origin main
   ```
2. Go to https://vercel.com/new, import the repository, and click **Deploy** (the defaults work).
3. Copy the live URL and add it to your resume and to the GitHub repository's About section.

## Tech stack

Next.js 15, React 19, JavaScript (ES6+), CSS, DummyJSON REST API, Vercel.
