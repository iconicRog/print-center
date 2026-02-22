# PrintCenter — Stationery & Digital Print Website

A modern, fully responsive marketing website for a professional print center business. Built with React, Vite, and Tailwind CSS v4, featuring immersive 3D animations, a dual theme switcher, and a polished multi-page layout.

---

## Live Demo

Deployed on Netlify — [print-center](https://github.com/iconicRog/print-center)

---

## Screenshots

| Home | Services | Contact |
|------|----------|---------|
| Hero with 3D Ballpit & Orb background | Accordion service cards with preview images | Contact form with WhatsApp integration |

---

## Features

- **Multi-page SPA** — Home, About, Services, Contact with React Router v6
- **3D Hero Background** — Three.js Ballpit physics simulation + OGL WebGL Orb shader
- **Theme Switcher** — Classic (gold/navy) and Aurora (violet/indigo) themes via CSS custom properties
- **Mobile Responsive** — Fully optimised for phones, tablets, and desktops
- **Animated UI** — Framer Motion scroll-reveal animations throughout
- **Contact Form** — Validated form with loading state and success feedback
- **WhatsApp Integration** — Direct chat-to-quote button on Contact and Footer
- **Capability Gallery** — 6-card image grid showcasing print services
- **Services Accordion** — Expandable service cards with preview images
- **Custom Favicon & Assets** — Local image assets served from `/public`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev) |
| Build Tool | [Vite 7](https://vite.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| 3D / WebGL | [Three.js](https://threejs.org) + [OGL](https://github.com/oframe/ogl) |
| Routing | [React Router v6](https://reactrouter.com) |
| Icons | [Lucide React](https://lucide.dev) |
| Deployment | [Netlify](https://netlify.com) |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hero with 3D background, services overview, capabilities grid, stats counter |
| `/about` | Company story, values, team photo, 4-step process timeline |
| `/services` | Expandable accordion for each service with images and details |
| `/contact` | Contact form, WhatsApp button, business hours, location map |

---

## Project Structure

```
print-center/
├── public/                  # Static assets (images, favicon)
│   ├── favicon.png
│   ├── photo-printing.png
│   ├── large-format-printing.png
│   ├── business-branding.png
│   ├── custom-stationery.png
│   ├── event-materials.png
│   └── Office-Supplies.png
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Responsive nav with mobile drawer
│   │   ├── Hero.jsx         # Hero section with Ballpit + Orb
│   │   ├── Ballpit.jsx      # Three.js physics ball simulation
│   │   ├── Orb.jsx          # OGL GLSL shader orb
│   │   ├── Footer.jsx       # Footer with CTA strip
│   │   ├── SectionHeader.jsx
│   │   ├── AnimatedContainer.jsx
│   │   └── CTAButton.jsx
│   ├── context/
│   │   └── ThemeContext.jsx  # Classic / Aurora theme state
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   └── index.css            # Tailwind + CSS custom properties
├── netlify.toml             # Netlify build config + SPA redirects
├── vite.config.js
└── index.html
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/iconicRog/print-center.git
cd print-center

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output is written to the `dist/` directory.

---

## Deployment

This project is configured for one-click Netlify deployment.

### Netlify (recommended)

1. Push to GitHub
2. Connect repo on [app.netlify.com](https://app.netlify.com)
3. Build settings are auto-detected from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy — React Router SPA redirects are handled automatically

### Manual / Other Hosts

For any static host, ensure all routes redirect to `index.html` (already configured in `netlify.toml`).

---

## Customisation

### Update contact details

Edit the phone, email, address, and WhatsApp number in:
- `src/pages/Contact.jsx`
- `src/components/Footer.jsx`

### Swap capability images

Drop new images into `public/` and update the `img` paths in the `capabilities` array in `src/pages/Home.jsx`.

### Change theme colours

CSS custom properties are defined in `src/index.css` under `:root` (Classic) and `[data-theme="aurora"]` (Aurora).

---

## License

This project is for demonstration and commercial use by the business owner. All rights reserved.
