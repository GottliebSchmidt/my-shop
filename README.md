# 🛒 Modern React E-commerce Store

This is a modern e-commerce store built with **React**, **TypeScript**, and **Vite**. The project showcases middle-level frontend development skills, including advanced state management, routing, filtering, sorting, authentication, and SEO enhancements.

---

## 🚀 Features

* **Product listing** with filtering (by category, brand, price) and sorting (price, popularity, newest)
* **Search functionality** with dynamic URL query syncing
* **Admin panel** with simple **password-based authentication**
* **Global state management** with React Context API
* **Responsive UI** and optimized UX
* **SEO optimization** with:

  * `react-helmet-async`
  * `sitemap.xml`
  * `robots.txt`
* **Mock API** for dynamic product management
* **TypeScript** strict mode with `verbatimModuleSyntax`

---

## 🛠️ Tech Stack

* React + Vite + TypeScript
* React Router DOM
* React Context API
* react-helmet-async
* Custom Hooks & Components
* Mock server (`/data/products.ts`)

---

## 📁 Project Structure

```
src/
├── components/        # UI components
├── context/           # Context providers (Cart, Admin)
├── data/              # Mock product data
├── hooks/             # Custom React hooks
├── pages/             # Route-based pages (Home, Admin, NotFound)
├── types/             # Global TypeScript types
├── App.tsx            # Main app with routing
└── main.tsx           # Entry point
```

---

## 🔐 Admin Access

Simple password-protected access to admin panel.

> ⚠️ Note: This is a **mock implementation** and should be replaced with real authentication in production.

---

## 🧪 Future Improvements

* Product detail page
* Add to cart + checkout flow
* Persistent storage (localStorage or backend)
* Unit & integration tests
* Product create/edit functionality in admin
* Backend integration (Node.js, Firebase, Supabase, etc.)

---

## 📦 Getting Started

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
