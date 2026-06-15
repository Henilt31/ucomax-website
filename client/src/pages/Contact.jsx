import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('/api/contact', form)
      toast.success('Message sent! We\'ll respond as soon as possible.')
      setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' })
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <MapPin size={22} className="text-[#e8421a]" />,
      title: 'Our Location',
      content: '989/16/2, First Floor Near Gayatri Krupa Ice Industries, Makarpura, Vadodara, Gujarat – 390010'
    },
    {
      icon: <Phone size={22} className="text-[#e8421a]" />,
      title: 'Phone Number',
      content: '+91 63588 33112',
      href: 'tel:+916358833112'
    },
    {
      icon: <Mail size={22} className="text-[#e8421a]" />,
      title: 'Email Address',
      content: 'sales@ucomax.com',
      href: 'mailto:sales@ucomax.com'
    },
    {
      icon: <Clock size={22} className="text-[#e8421a]" />,
      title: 'Business Hours',
      content: 'Mon – Fri: 10:00 AM – 8:00 PM'
    }
  ]

  return (
    <div>
      {/* Hero */}
      <div className="bg-[#0d1f33] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[#e8421a] text-xs font-bold tracking-widest uppercase">Reach Us</span>
            <h1 className="text-5xl font-bold text-white mt-2" style={{ fontFamily: 'Rajdhani' }}>
              Contact Us
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          <h2 className="text-2xl font-bold text-[#1a3a5c] mb-6" style={{ fontFamily: 'Rajdhani' }}>
            Send Us a Message
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name *</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1a3a5c] focus:ring-2 focus:ring-[#1a3a5c]/10 transition-all"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name *</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1a3a5c] focus:ring-2 focus:ring-[#1a3a5c]/10 transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1a3a5c] focus:ring-2 focus:ring-[#1a3a5c]/10 transition-all"
                placeholder="john@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1a3a5c] focus:ring-2 focus:ring-[#1a3a5c]/10 transition-all"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Message *</label>
              <textarea
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                required
                rows={5}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1a3a5c] focus:ring-2 focus:ring-[#1a3a5c]/10 transition-all resize-none"
                placeholder="Tell us about your requirements..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e8421a] text-white py-3.5 rounded-lg font-semibold hover:bg-[#c93614] transition-colors disabled:opacity-60"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.div>

        {/* Info + Map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-[#1a3a5c] mb-6" style={{ fontFamily: 'Rajdhani' }}>
              Get In Touch
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item) => (
                <div key={item.title} className="bg-[#f4f7fb] rounded-xl p-5">
                  <div className="mb-2">{item.icon}</div>
                  <p className="text-xs font-bold text-[#1a3a5c] uppercase tracking-wider mb-1">{item.title}</p>
                  {item.href ? (
                    <a href={item.href} className="text-gray-600 text-sm hover:text-[#e8421a] transition-colors">
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-gray-600 text-sm">{item.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.7407272757227!2d73.19213371111965!3d22.249913979638198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc4326d8bd8eb%3A0x90cf1129e8423603!2s989%2F16B%2C%20Makarpura%20GIDC%2C%20Makarpura%2C%20Vadodara%2C%20Gujarat%20390010!5e0!3m2!1sen!2sin!4v1756451553189!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ucomax Location"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
