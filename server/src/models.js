const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
  product: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  countryCode: { type: String, default: '+91' },
  status: { type: String, enum: ['pending', 'responded', 'closed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
})

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
})

const rfqSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, default: '+91' },
  industry: { type: String, required: true },
  products: [{ type: String }],
  quantity: { type: Number, default: 1 },
  requirements: { type: String },
  status: { type: String, enum: ['pending', 'reviewed', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
})

const analyticsEventSchema = new mongoose.Schema({
  eventType: { type: String, required: true },
  eventData: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
})

const Quote = mongoose.model('Quote', quoteSchema)
const Contact = mongoose.model('Contact', contactSchema)
const Rfq = mongoose.model('Rfq', rfqSchema)
const AnalyticsEvent = mongoose.model('AnalyticsEvent', analyticsEventSchema)

module.exports = { Quote, Contact, Rfq, AnalyticsEvent }

