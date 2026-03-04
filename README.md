# ByteBoard 📰

> The official editorial platform of the CS Department at CHRIST (Deemed to be University), Yeshwanthpur — built with React, Vite, and a brutalist design aesthetic.

**ByteBoard** is a student-run editorial platform for the Department of Computer Science at CHRIST (Deemed to be University), Yeshwanthpur Campus. It serves as a curated space for tech articles, campus dispatches, and insightful commentary — built *by students, for students*.

---

## ✨ Features

- **Brutalist Design Aesthetic** — Bold typography, hard borders, and a stark black-and-white palette with purposeful accent colors
- **Animated Loading Sequence** — Custom `ByteboardLoader` powered by Anime.js with a typewriter effect and smooth page transition
- **Interactive 3D Background** — GSAP-driven animated cubes background that persists across the site
- **Staggered Navigation Menu** — GSAP-powered staggered menu overlay in the hero section
- **Scroll Animations** — Smooth reveal animations triggered on scroll via `AnimateOnScroll`
- **Blog Listing** — Curated article feed with category filtering and a dedicated blogs page
- **Connect Form** — Pitch articles or get in touch directly through the site

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite 7](https://vitejs.dev/) |
| Routing | [React Router v7](https://reactrouter.com/) |
| Animation | [GSAP 3](https://gsap.com/) + [Anime.js 3](https://animejs.com/) + [Motion](https://motion.dev/) |
| 3D / WebGL | [Three.js](https://threejs.org/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Fonts | Playfair Display + Inter (Google Fonts) |
| Styling | Vanilla CSS with CSS custom properties |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/csbyc-blog.git
cd csbyc-blog

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The production-ready files will be output to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
csbyc-blog/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── App.jsx              # Root component with routing
    ├── main.jsx             # Entry point
    ├── assets/              # Static assets (images, fonts)
    ├── components/
    │   ├── home/            # Home page sections (Hero, ArticleList, etc.)
    │   ├── blog/            # Blog post components
    │   ├── layout/          # Navbar, Footer
    │   └── shared/          # Reusable components (AnimateOnScroll, StaggeredMenu, etc.)
    ├── pages/
    │   ├── Home.jsx
    │   ├── Blogs.jsx
    │   └── Team.jsx
    ├── styles/
    │   ├── index.css        # Global styles & CSS custom properties
    │   └── components.css   # Component-level styles
    └── utils/               # Utility functions
```

---

## 🎨 Design System

The site uses a minimal set of CSS custom properties:

| Token | Value |
|---|---|
| `--c-black` | `#0a0a0a` |
| `--c-white` | `#f5f5f0` |
| `--font-serif` | Playfair Display |
| `--font-mono` | Inter (monospaced usage) |

---

## 🙌 Contributing

This platform is open to all CS students at CHRIST (Deemed to be University), Yeshwanthpur Campus.

- **To pitch an article**, reach out via the Connect form on the site.
- **To report a bug or suggest a feature**, open a GitHub Issue.
- **To contribute code**, fork the repo and submit a Pull Request.

---

## 📄 License

This project is maintained by the CS Department student community at CHRIST (Deemed to be University), Yeshwanthpur Campus. All rights reserved.

---

*ByteBoard — clarity over noise, documentation over speculation.*
