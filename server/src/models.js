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

const Quote = mongoose.model('Quote', quoteSchema)
const Contact = mongoose.model('Contact', contactSchema)

module.exports = { Quote, Contact }
