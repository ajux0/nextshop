# NextShop

A fast, SEO-friendly product catalog built with **Next.js (App Router)** and React. It fetches products on the server, supports live search, category filtering, pagination, and a persistent shopping cart, with prices shown in Indian rupees (INR).

**Live Demo:** https://nextshop-wine.vercel.app/

## Features

- **Server Components:** product data is fetched on the server, so pages arrive fully rendered for better SEO and faster loads.
- **Dynamic routes:** `/products/[id]` pages use `generateStaticParams` for build-time prerendering and `generateMetadata` for a unique title, description, and Open Graph image per product.
- **Cached data with revalidation:** `fetch` with `next: { revalidate: 3600 }` refreshes data every hour.
- **Route Handler API:** `/api/products` powers a debounced live search dropdown.
- **Category filter and pagination:** driven by URL search params, so every view is shareable and bookmarkable.
- **Shopping cart:** built with React Context and `useReducer`, saved to `localStorage`, with quantity controls and order totals.
- **Loading, error, and 404 states:** `loading.js` skeletons, `error.js` with a retry button, and a custom `not-found.js`.
- **Optimized images** with `next/image`, a responsive layout, and automatic light and dark mode.
- **INR pricing:** prices are converted from USD and formatted with Indian number grouping (for example, ₹1,23,456).

## Tech Stack

- Next.js (App Router), React
- JavaScript (ES6+), CSS
- DummyJSON REST API (no API key needed)
- Deployed on Vercel

## Project Structure

```
app/
  layout.js                Root layout, metadata, cart provider
  page.js                  Home: products, categories, pagination (server component)
  loading.js               Skeleton shown while data loads
  error.js                 Error boundary with retry
  not-found.js             404 page
  products/[id]/page.js    Product detail (dynamic route + SEO metadata)
  cart/page.js             Cart page (client component)
  api/products/route.js    Search API (route handler)
components/                Header, SearchBar, ProductCard, CartProvider, ...
lib/api.js                 Data fetching, price formatting, helpers
```

## Getting Started

Requires Node.js 20.9 or newer.

```bash
git clone https://github.com/ajux0/nextshop.git
cd nextshop
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

### Production build

```bash
npm run build
npm start
```

## Currency

DummyJSON returns prices in US dollars. The app converts them for display using a fixed rate defined in `lib/api.js`:

```js
const USD_TO_INR = 88;
```

Change this value to update every price in the app.

## Deployment

The app is deployed on Vercel. Every push to the `main` branch triggers an automatic redeploy.

To deploy your own copy:

1. Push the project to a GitHub repository (see the steps below).
2. Go to https://vercel.com/new and import the repository.
3. Keep the default settings and click **Deploy**. No environment variables are required.

## Git: Commit and Push

### First time

1. Create an empty repository on GitHub named `nextshop` (do not add a README or other files).
2. In the project folder, run:

```bash
git init
git add .
git commit -m "Initial commit: NextShop with Next.js"
git branch -M main
git remote add origin https://github.com/ajux0/nextshop.git
git push -u origin main
```

If Git asks who you are, set your details once and repeat the commit:

```bash
git config --global user.name "Muhammed Ajmal M"
git config --global user.email "ajmalm4325@gmail.com"
```

### After making changes

```bash
git add .
git commit -m "Describe your change"
git push
```

Run `git status` at any time. The message "nothing to commit, working tree clean" means everything is saved.

## Author

**Muhammed Ajmal M**
GitHub: [github.com/ajux0](https://github.com/ajux0) | LinkedIn: [linkedin.com/in/muhammed-ajmal-m](https://linkedin.com/in/muhammed-ajmal-m)