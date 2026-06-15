# UCOMAX Website – Full Stack Rebuild

## Tech Stack
- **Frontend**: React 18, Vite, Framer Motion, Three.js (@react-three/fiber), Tailwind CSS, React Router v6
- **Backend**: Node.js, Express, MongoDB (Mongoose), Nodemailer
- **Design**: Rajdhani + Inter fonts, UCOMAX brand colors (#1a3a5c navy, #e8421a red)

---

## Project Structure
```
ucomax/
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── components/   Navbar, Footer, QuoteModal, ThreeBackground, AnimatedSection
│   │   ├── pages/        Home, About, Contact, CategoryPage, ProductPage
│   │   ├── data/         catalog.js (all nav + product data)
│   │   └── App.jsx
│   └── package.json
└── server/          # Node.js + Express backend
    ├── src/
    │   ├── index.js   (main server)
    │   └── models.js  (Quote + Contact schemas)
    ├── .env.example
    └── package.json
```

---

## Setup Instructions

### 1. Install Dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 2. Configure Backend

```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and SMTP credentials
```

**MongoDB options:**
- Local: `mongodb://localhost:27017/ucomax`
- Atlas: `mongodb+srv://<user>:<pass>@cluster.mongodb.net/ucomax`

**Email (Gmail example):**
- Enable 2FA on your Gmail account
- Create an App Password at https://myaccount.google.com/apppasswords
- Use that as `SMTP_PASS`

### 3. Run in Development

```bash
# Terminal 1 – Backend
cd server
npm run dev

# Terminal 2 – Frontend
cd client
npm run dev
```

Frontend: http://localhost:5173  
Backend API: http://localhost:5000

### 4. Build for Production

```bash
cd client
npm run build
# Outputs to client/dist/
```

Serve the `dist/` folder via nginx or any static host, and run the Node.js backend with PM2:

```bash
npm install -g pm2
cd server
pm2 start src/index.js --name ucomax-api
```

---

## Features

### Frontend
- ✅ Full mega dropdown navigation (matches ucomax.com exactly)
- ✅ Hero slider with Three.js animated background (particles, grid, floating ring)
- ✅ Framer Motion scroll-triggered animations (slide-up from below)
- ✅ Stats bar, pillars, virtual tour, product tabs, services grid
- ✅ About page with all content from original site
- ✅ Contact page with Google Maps embed
- ✅ Quote modal (floating trigger on every page)
- ✅ WhatsApp floating button
- ✅ Mobile-responsive sliding drawer nav
- ✅ Product & Category pages
- ✅ Search overlay

### Backend
- ✅ Quote request endpoint → saves to MongoDB + sends email
- ✅ Contact form endpoint → saves to MongoDB + sends email
- ✅ Input validation with express-validator
- ✅ Rate limiting (20 requests / 15 min)
- ✅ Helmet security headers
- ✅ Admin endpoints for reading leads

---

## Brand Colors
- **Navy**: `#1a3a5c`
- **Dark Navy**: `#0d1f33`
- **Red/Orange (accent)**: `#e8421a`
- **Light BG**: `#f4f7fb`

## Logo/Favicon
The UCOMAX logo and favicon are loaded directly from:
- `https://www.ucomax.com/assets/img/logo-header.png`
- `https://www.ucomax.com/assets/img/logo-footer.png`

> ⚠️ For production, download and host these locally in `client/public/`.

---

## Contact Info (hardcoded in all pages)
- **Address**: 989/16/2, First Floor Near Gayatri Krupa Ice Industries, Makarpura, Vadodara, Gujarat – 390010
- **Phone**: +91 63588 33112
- **Email**: sales@ucomax.com
- **WhatsApp**: https://wa.me/916358833112
