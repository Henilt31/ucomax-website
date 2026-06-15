import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeft, RefreshCw, Check } from 'lucide-react'
import { industries, applications, requirements, findProducts } from '../data/productFinder'
import { getProductBySlug, categoryColors, categoryIcons } from '../data/products'

function FinderProductImage({ slug, name, category }) {
  const colors = categoryColors[category] || { from: '#1a3a5c', to: '#2d5f8a' }
  const icon = categoryIcons[category] || '📦'
  
  const [imgSrc, setImgSrc] = useState(`/images/products/${slug}.png`)
  const [imgError, setImgError] = useState(false)

  const handleImageError = () => {
    if (imgSrc.endsWith('.png')) {
      setImgSrc(`/images/products/${slug}.svg`)
    } else {
      setImgError(true)
    }
  }

  useEffect(() => {
    setImgSrc(`/images/products/${slug}.png`)
    setImgError(false)
  }, [slug])

  return (
    <div className="w-full sm:w-28 h-28 rounded-lg flex items-center justify-center bg-white border border-gray-100 p-2 flex-shrink-0 overflow-hidden relative">
      {!imgError ? (
        <img
          src={imgSrc}
          alt={name}
          onError={handleImageError}
          className="h-full w-full object-contain"
        />
      ) : (
        <div
          className="w-full h-full rounded-lg flex items-center justify-center text-white text-3xl"
          style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
        >
          {icon}
        </div>
      )}
    </div>
  )
}

export default function ProductFinder({ isOpen, onClose, onOpenRFQ, onProductSelect }) {
  const [step, setStep] = useState(1)
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [selectedApplication, setSelectedApplication] = useState('')
  const [selectedRequirement, setSelectedRequirement] = useState('')

  const resetFinder = () => {
    setSelectedIndustry('')
    setSelectedApplication('')
    setSelectedRequirement('')
    setStep(1)
  }

  // Get recommended products
  const matchedSlugs = step === 4 ? findProducts(selectedIndustry, selectedApplication, selectedRequirement) : []
  const recommendedProducts = matchedSlugs.map(slug => getProductBySlug(slug)).filter(Boolean)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4" onClick={onClose}>
        <motion.div
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 30, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#1a3a5c] px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-xl" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                Smart Product Finder
              </h2>
              <p className="text-white/70 text-xs mt-0.5">Find the perfect UCOMAX solution for your exact requirements</p>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Stepper bar */}
          <div className="bg-[#f4f7fb] border-b border-gray-100 px-6 py-3 flex justify-between items-center text-xs font-semibold text-gray-500">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#e8421a]' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${step >= 1 ? 'border-[#e8421a] bg-[#e8421a]/10' : ''}`}>1</span>
              Industry
            </div>
            <div className="h-[1px] bg-gray-200 flex-1 mx-3" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#e8421a]' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${step >= 2 ? 'border-[#e8421a] bg-[#e8421a]/10' : ''}`}>2</span>
              Application
            </div>
            <div className="h-[1px] bg-gray-200 flex-1 mx-3" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#e8421a]' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${step >= 3 ? 'border-[#e8421a] bg-[#e8421a]/10' : ''}`}>3</span>
              Requirement
            </div>
            <div className="h-[1px] bg-gray-200 flex-1 mx-3" />
            <div className={`flex items-center gap-1.5 ${step === 4 ? 'text-[#e8421a]' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${step === 4 ? 'border-[#e8421a] bg-[#e8421a]/10' : ''}`}>4</span>
              Results
            </div>
          </div>

          {/* Content area */}
          <div className="p-6 overflow-y-auto flex-1">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-bold text-[#1a3a5c] mb-2" style={{ fontFamily: 'Rajdhani' }}>Select Your Industry</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {industries.map(ind => (
                      <button
                        key={ind}
                        onClick={() => { setSelectedIndustry(ind); setStep(2) }}
                        className={`p-4 rounded-xl border text-left font-medium transition-all ${
                          selectedIndustry === ind
                            ? 'border-[#e8421a] bg-[#e8421a]/5 text-[#e8421a]'
                            : 'border-gray-200 hover:border-[#1a3a5c] hover:bg-gray-50'
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-bold text-[#1a3a5c] mb-2" style={{ fontFamily: 'Rajdhani' }}>Select Application</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {applications.map(app => (
                      <button
                        key={app}
                        onClick={() => { setSelectedApplication(app); setStep(3) }}
                        className={`p-4 rounded-xl border text-left font-medium transition-all ${
                          selectedApplication === app
                            ? 'border-[#e8421a] bg-[#e8421a]/5 text-[#e8421a]'
                            : 'border-gray-200 hover:border-[#1a3a5c] hover:bg-gray-50'
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-bold text-[#1a3a5c] mb-2" style={{ fontFamily: 'Rajdhani' }}>Select Primary Requirement</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {requirements.map(req => (
                      <button
                        key={req}
                        onClick={() => { setSelectedRequirement(req); setStep(4) }}
                        className={`p-4 rounded-xl border text-left font-medium transition-all ${
                          selectedRequirement === req
                            ? 'border-[#e8421a] bg-[#e8421a]/5 text-[#e8421a]'
                            : 'border-gray-200 hover:border-[#1a3a5c] hover:bg-gray-50'
                        }`}
                      >
                        {req}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="bg-[#f4f7fb] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                    <div>
                      <span className="text-gray-400">Profile:</span>{' '}
                      <span className="font-bold text-[#1a3a5c]">{selectedIndustry}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="font-bold text-[#1a3a5c]">{selectedApplication}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="font-bold text-[#1a3a5c]">{selectedRequirement}</span>
                    </div>
                    <button onClick={resetFinder} className="text-[#e8421a] flex items-center gap-1 hover:underline text-xs font-semibold">
                      <RefreshCw size={12} /> Reset Finder
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-[#1a3a5c]" style={{ fontFamily: 'Rajdhani' }}>Recommended Products</h3>
                  <div className="space-y-4">
                    {recommendedProducts.length === 0 ? (
                      <p className="text-gray-500 text-sm text-center py-6">No matches found for this specific combination. Try modifying your criteria.</p>
                    ) : (
                      recommendedProducts.map(prod => {
                        const colors = categoryColors[prod.category] || { from: '#1a3a5c', to: '#2d5f8a' }
                        const icon = categoryIcons[prod.category] || '📦'
                        return (
                          <div key={prod.slug} className="flex flex-col sm:flex-row gap-4 border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                            <FinderProductImage slug={prod.slug} name={prod.name} category={prod.category} />
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="font-bold text-[#1a3a5c] text-lg leading-tight" style={{ fontFamily: 'Rajdhani' }}>{prod.name}</h4>
                                <span className="text-xs text-[#e8421a] font-bold uppercase tracking-wider">{prod.category}</span>
                                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{prod.shortDescription}</p>
                              </div>
                              <div className="flex gap-2 mt-4 sm:mt-0">
                                <button
                                  onClick={() => { onClose(); onProductSelect(prod.slug) }}
                                  className="border border-[#1a3a5c] text-[#1a3a5c] px-3 py-1.5 rounded text-xs font-semibold hover:bg-[#1a3a5c] hover:text-white transition-colors"
                                >
                                  View Product
                                </button>
                                <button
                                  onClick={() => { onClose(); onOpenRFQ([prod.name]) }}
                                  className="bg-[#e8421a] text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-[#c93614] transition-colors"
                                >
                                  Request Quote
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer controls */}
          <div className="border-t border-gray-100 px-6 py-4 flex justify-between items-center bg-gray-50">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 text-gray-500 hover:text-[#1a3a5c] transition-colors text-sm font-semibold"
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                disabled={
                  (step === 1 && !selectedIndustry) ||
                  (step === 2 && !selectedApplication) ||
                  (step === 3 && !selectedRequirement)
                }
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-1.5 bg-[#1a3a5c] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#15304e] transition-colors disabled:opacity-50"
              >
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="bg-[#1a3a5c] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#15304e] transition-colors"
              >
                Done
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
