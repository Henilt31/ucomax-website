require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const { body, validationResult } = require('express-validator')
const { Quote, Contact, Rfq, AnalyticsEvent } = require('./models')

const app = express()
const PORT = process.env.PORT || 5000

// ─── Middleware ───────────────────────────────────────────────
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rate limiter for form endpoints
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 50, // raised limit to allow analytics tracking comfortably
  message: { error: 'Too many requests. Please try again later.' }
})

// ─── Database ─────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ucomax')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err.message))

// ─── Mailer ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

async function sendMail(subject, html) {
  if (!process.env.SMTP_USER) return // skip if not configured
  try {
    await transporter.sendMail({
      from: `"Ucomax Website" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject,
      html
    })
  } catch (err) {
    console.error('Mail error:', err.message)
  }
}

// ─── Routes ───────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})

// Analytics track endpoint
app.post('/api/analytics', async (req, res) => {
  try {
    const { eventType, eventData } = req.body
    if (!eventType) return res.status(400).json({ error: 'eventType is required' })

    const event = await AnalyticsEvent.create({ eventType, eventData })
    res.json({ success: true, id: event._id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// RFQ submission endpoint
app.post('/api/rfq',
  formLimiter,
  [
    body('companyName').trim().notEmpty().withMessage('Company Name is required'),
    body('contactPerson').trim().notEmpty().withMessage('Contact Person is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('industry').trim().notEmpty().withMessage('Industry is required'),
    body('products').isArray({ min: 1 }).withMessage('At least one product must be selected'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    try {
      const { companyName, contactPerson, email, phone, country, industry, products, quantity, requirements } = req.body
      const rfq = await Rfq.create({
        companyName,
        contactPerson,
        email,
        phone,
        country: country || '+91',
        industry,
        products,
        quantity,
        requirements
      })

      // Send email summary
      await sendMail(
        `New Advanced RFQ from ${companyName}`,
        `<h2>New RFQ Received</h2>
        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>Contact Person:</strong> ${contactPerson}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${country} ${phone}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Products to Quote:</strong> ${products.join(', ')}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Additional Requirements:</strong></p>
        <p>${requirements || 'None'}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN')}</p>`
      )

      res.json({ success: true, id: rfq._id })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
)

// Quote request
app.post('/api/quote',
  formLimiter,
  [
    body('product').trim().notEmpty().withMessage('Product name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    try {
      const { product, email, phone, countryCode } = req.body
      const quote = await Quote.create({ product, email, phone, countryCode })

      await sendMail(
        `New Quote Request – ${product}`,
        `<h2>New Quote Request</h2>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN')}</p>`
      )

      res.json({ success: true, id: quote._id })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
)

// Contact form
app.post('/api/contact',
  formLimiter,
  [
    body('firstName').trim().notEmpty().withMessage('First name required'),
    body('lastName').trim().notEmpty().withMessage('Last name required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('phone').trim().notEmpty().withMessage('Phone required'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message too short'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    try {
      const { firstName, lastName, email, phone, message } = req.body
      const contact = await Contact.create({ firstName, lastName, email, phone, message })

      await sendMail(
        `New Contact Message from ${firstName} ${lastName}`,
        `<h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN')}</p>`
      )

      res.json({ success: true, id: contact._id })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
)

// Admin: get all quotes
app.get('/api/admin/quotes', async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 }).limit(100)
    res.json(quotes)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Admin: get all contacts
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100)
    res.json(contacts)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Admin: get all RFQs
app.get('/api/admin/rfqs', async (req, res) => {
  try {
    const rfqs = await Rfq.find().sort({ createdAt: -1 }).limit(100)
    res.json(rfqs)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Admin: get analytics events
app.get('/api/admin/analytics', async (req, res) => {
  try {
    const events = await AnalyticsEvent.find().sort({ createdAt: -1 }).limit(500)
    res.json(events)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// ─── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Ucomax server running on port ${PORT}`)
})

