import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAnalytics } from '../hooks/useAnalytics'

export default function RFQModal({ isOpen, onClose, initialProducts = [] }) {
  const [form, setForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '+91',
    industry: '',
    products: initialProducts,
    quantity: 1,
    requirements: ''
  })
  const [loading, setLoading] = useState(false)
  const analytics = useAnalytics()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.products.length === 0) {
      toast.error('Please enter or select at least one product.')
      return
    }
    setLoading(true)
    try {
      await axios.post('/api/rfq', form)
      toast.success('RFQ Submitted successfully!')
      analytics.trackRFQSubmit(form)
      setForm({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        country: '+91',
        industry: '',
        products: [],
        quantity: 1,
        requirements: ''
      })
      onClose()
    } catch (err) {
      const errMsg = err.response?.data?.errors?.[0]?.msg || 'Failed to submit RFQ.'
      toast.error(errMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleProductAdd = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const val = e.target.value.trim()
      if (val && !form.products.includes(val)) {
        setForm(prev => ({ ...prev, products: [...prev.products, val] }))
        e.target.value = ''
      }
    }
  }

  const removeProduct = (prod) => {
    setForm(prev => ({ ...prev, products: prev.products.filter(p => p !== prod) }))
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4" onClick={onClose}>
        <motion.div
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 30, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#1a3a5c] px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-xl" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Request For Quotation (RFQ)
              </h2>
              <p className="text-white/70 text-xs mt-0.5">Submit detail requirements to receive professional quotation</p>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1a3a5c] uppercase mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter company name"
                  value={form.companyName}
                  onChange={e => setForm(p => ({ ...p, companyName: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a3a5c] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1a3a5c] uppercase mb-1">Contact Person *</label>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={form.contactPerson}
                  onChange={e => setForm(p => ({ ...p, contactPerson: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a3a5c] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1a3a5c] uppercase mb-1">Email ID *</label>
                <input
                  type="email"
                  required
                  placeholder="your@company.com"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a3a5c] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1a3a5c] uppercase mb-1">Phone Number *</label>
                <div className="flex gap-1.5">
                  <select
                    value={form.country}
                    onChange={e => setForm(p => ({ ...p, country: e.target.value }))}
                    className="border border-gray-200 rounded-lg px-1.5 py-2 text-sm outline-none focus:border-[#1a3a5c]"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+49">🇩🇪 +49</option>
                  </select>
                  <input
                    type="tel"
                    required
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a3a5c] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1a3a5c] uppercase mb-1">Industry *</label>
                <select
                  required
                  value={form.industry}
                  onChange={e => setForm(p => ({ ...p, industry: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a3a5c] transition-colors"
                >
                  <option value="">Select industry</option>
                  <option value="Aerospace">Aerospace</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Oil & Gas">Oil & Gas</option>
                  <option value="Foundry">Foundry</option>
                  <option value="Research Lab">Research Lab</option>
                  <option value="Education">Education</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1a3a5c] uppercase mb-1">Quantity *</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={form.quantity}
                  onChange={e => setForm(p => ({ ...p, quantity: parseInt(e.target.value) || 1 }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a3a5c] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1a3a5c] uppercase mb-1">Product Selection *</label>
              <div className="border border-gray-200 rounded-lg p-2 bg-gray-50 min-h-[44px] flex flex-wrap gap-2">
                {form.products.map(prod => (
                  <span key={prod} className="bg-[#1a3a5c]/10 text-[#1a3a5c] px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    {prod}
                    <button type="button" onClick={() => removeProduct(prod)} className="text-[#e8421a] hover:text-[#c93614]">
                      <X size={12} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Type product name and press Enter"
                  onKeyDown={handleProductAdd}
                  className="flex-1 min-w-[150px] bg-transparent outline-none text-sm py-1 px-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1a3a5c] uppercase mb-1">Additional Requirements / Specifications</label>
              <textarea
                placeholder="Include details about portable needs, accuracy tolerances, custom certifications, etc."
                rows="3"
                value={form.requirements}
                onChange={e => setForm(p => ({ ...p, requirements: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a3a5c] transition-colors"
              />
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#e8421a] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#c93614] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? 'Submitting...' : (
                  <>
                    Submit RFQ <Send size={15} />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
