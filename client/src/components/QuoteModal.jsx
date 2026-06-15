import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function QuoteModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ product: '', email: '', phone: '', countryCode: '+91' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('/api/quote', form)
      toast.success('Quote request sent! We\'ll get back to you soon.')
      setForm({ product: '', email: '', phone: '', countryCode: '+91' })
      onClose()
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-[#1a3a5c] px-6 py-4 flex items-center justify-between">
              <h2 className="text-white font-semibold text-lg" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Request a Quote
              </h2>
              <button onClick={onClose} className="text-white/70 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={form.product}
                  onChange={e => setForm(p => ({ ...p, product: e.target.value }))}
                  required
                  placeholder="Enter product name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a5c] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  required
                  placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a5c] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="flex gap-2">
                  <select
                    value={form.countryCode}
                    onChange={e => setForm(p => ({ ...p, countryCode: e.target.value }))}
                    className="border border-gray-200 rounded-lg px-2 py-2.5 text-sm outline-none focus:border-[#1a3a5c]"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+81">🇯🇵 +81</option>
                  </select>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    required
                    placeholder="Phone number"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a3a5c] transition-colors"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#e8421a] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#c93614] transition-colors disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Send Quote Request'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
