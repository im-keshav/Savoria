# Savoria — Premium Fine Dining Restaurant Web Application

A full-fidelity, award-winning clone and brand reimagining of **Restroe** (`https://restroe.com/`), customized and enhanced for **Savoria**. Built with React 19, Vite, Tailwind CSS v4, Framer Motion, GSAP, Lenis Smooth Scrolling, and an Express JSON database backend.

---

## ✨ Features & Architecture

### 1. Visual & Interactive Polish
- **Identical Layout & High-Res Assets**: Hero banner, Chef portrait, 8 signature dishes, timing schedule, guest avatars, and custom branding marks cloned directly with exact dimensions and typography.
- **Lenis Smooth Scrolling**: Decoupled, buttery 60fps wheel and anchor smooth scrolling matching modern Awwwards standards.
- **GSAP Custom Cursor**: Dual-layer cursor follower with magnetic scaling and blend modes on interactive elements (automatically adapts on touch devices).
- **Framer Motion Reveals**: Spring physics (`stiffness: 320, damping: 70, mass: 1`) on all headings, cards, badges, and review modules.
- **Interactive 360° Dish Rotation**: Hovering over dishes triggers a 180°/360° spring rotation physics effect, replicating the signature Restroe behavior.
- **Category Filter & Dish Detail Modal**: Filter dishes by category (*All, Pasta, Mains, Salads, Seafood*) and click any dish to inspect preparation times, calorie counts, chef ingredients, and add to table order.
- **Interactive Table Booking Drawer / Modal**: Complete 3-step table reservation system (Party size, date, time slots, seating selection, guest details, and confetti celebration).

### 2. Complete Section Breakdown
1. **Glassmorphism Navbar**: Fixed header with scroll threshold detection (`bg-white/80 backdrop-blur-md`), Savoria branding, desktop navigation links, "Book a table" action, and animated mobile hamburger drawer.
2. **Hero Section**: Full-viewport banner (`/assets/heroBanner.png`), *"WHERE FLAVOR MEETS ELEGANCE"*, social proof rating (*4.8/5 Rating — 10,000 reviews* with guest avatars).
3. **About Section**: High-res dish presentation, decorative laurel emblems, *"Experience dining beyond expectations"*, story, and interactive *"Bistro Royale, NY — View on Map"* pill.
4. **Stats / Values**: Clean numbered counters for `01` Premium Ingredients, `02` Chef's Expertise, and `03` Warm Hospitality.
5. **Chef's Signature Selection**: 8 rotating signature dishes with prices, hover spin physics, category filters, and detail preview modal.
6. **What Sets Us Apart**: 3 key differentiators with Lucide vector icons (`ChefHat`, `Leaf`, `Heart`) and portrait of Master Chef Laurent Rossi.
7. **Table Reservation Process**: 3-step booking walkthrough accompanied by verified guest review card.
8. **Opening Time / Schedule**: Weekly schedule card set on the warm dining background (`/assets/restro-timing.png`).
9. **Guest Testimonials**: Responsive 3-column grid of verified diner ratings and reviews.
10. **Frequently Asked Questions**: Smooth collapsible accordions with plus/minus toggles for common guest inquiries.
11. **Call to Action**: High-energy orange banner with floating dishes, parallax effects, and direct booking trigger.
12. **Footer**: Savoria branding, about paragraph, newsletter subscription with instant feedback, social handles, quick links, sitemap, and the oversized background watermark **SAVORIA**.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite 6](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@theme` token definitions
- **Typography**: [Geist](https://vercel.com/font) & [Urbanist](https://fonts.google.com/specimen/Urbanist) via Google Fonts
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Celebration Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Backend & Persistence**: Node.js, [Express](https://expressjs.com/), `server/data/db.json`

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Vite Frontend (Port 5173)
```bash
npm run dev
```

### 3. Run Backend API Server (Port 5001)
```bash
npm run server
```

### 4. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```
├── public/
│   └── assets/
│       ├── about.png
│       ├── chef.png
│       ├── dish1.png - dish8.png
│       ├── favicon.svg
│       ├── heroBanner.png
│       ├── iconL.png & iconR.png
│       ├── logo.svg
│       ├── restro-timing.png
│       └── user-1.jpeg - user-4.jpeg
├── server/
│   ├── data/
│   │   └── db.json               # Persistent data for dishes, bookings, hours, FAQs
│   └── index.js                  # Express API server (port 5001)
├── src/
│   ├── components/
│   │   ├── About.jsx             # About section & location map pill
│   │   ├── BookingProcess.jsx    # 3-step reservation guide
│   │   ├── CTA.jsx               # Floating dish call-to-action
│   │   ├── CustomCursor.jsx      # GSAP cursor follower
│   │   ├── DishDetailModal.jsx   # Quick view modal with order trigger
│   │   ├── FAQ.jsx               # Expandable accordion FAQs
│   │   ├── Features.jsx          # Differentiator cards & Chef showcase
│   │   ├── Footer.jsx            # Multi-column footer & SAVORIA watermark
│   │   ├── Hero.jsx              # Hero banner & guest social proof
│   │   ├── MotionReveal.jsx      # Framer Motion spring physics wrapper
│   │   ├── Navbar.jsx            # Sticky glassmorphism header & mobile drawer
│   │   ├── ReservationModal.jsx  # Stepped booking modal with confetti
│   │   ├── SignatureDishes.jsx   # 360° spring spinning dish grid & filters
│   │   ├── SmoothScroll.jsx      # Lenis smooth scroll setup
│   │   ├── Stats.jsx             # Key value counters
│   │   ├── Testimonials.jsx      # Guest review cards
│   │   └── Timing.jsx            # Operating hours card
│   ├── data/
│   │   └── restaurantData.js     # All restaurant structured content
│   ├── App.jsx                   # Master application assembler
│   ├── index.css                 # Tailwind v4 theme, fonts & layout rules
│   └── main.jsx                  # React DOM root
├── index.html
├── package.json
└── vite.config.js
```

