# Developer Portfolio Template

A highly customizable, high-performance developer portfolio template built with modern web technologies, React, and Tailwind CSS. 

This template features responsive UI components, interactive layouts, and minimal configuration, designed specifically for showcasing creative web development projects.

## 🚀 Features

- **Blazing Fast**: Built for static site generation achieving 100/100 Lighthouse performance.
- **Component-Driven**: Utilizes React for complex interactive UI components like navbars and modals.
- **Styling**: Fully integrated with Tailwind CSS and custom global stylesheets.
- **Animation Ready**: Structured to easily integrate GSAP (GreenSock) or similar libraries for high-performance scroll and layout animations.
- **SEO Optimized**: Canonical URLs, Open Graph data, and strict semantic HTML.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## 📁 Project Structure

```text
├── public/           # Static assets, images, JSON animations
├── src/
│   ├── assets/       # Fonts and unprocessed assets
│   ├── components/   # UI components and layouts
│   ├── content/      # Markdown blog posts and collections
│   ├── data/         # Project and Experience TS data files
│   ├── layouts/      # Base page wrappers
│   └── pages/        # Routing pages
├── tailwind.config.js# Tailwind theme config
└── package.json      # Dependencies and scripts
```

## 📝 Customization

To make this template your own:
1. Update `src/data/experience.ts` and `src/data/projects.ts` with your actual work history.
2. Modify `src/consts.ts` for global site metadata.
3. Replace the placeholder social links in the `src/components/` files.
