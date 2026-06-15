import { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Columns, Trash2, Printer, Download, Share2 } from 'lucide-react'
import { getProductBySlug } from '../data/products'
import toast from 'react-hot-toast'

const CompareContext = createContext()

export function useCompare() {
  return useContext(CompareContext)
}

export function CompareProvider({ children }) {
  const [comparedSlugs, setComparedSlugs] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  const toggleCompare = (slug) => {
    if (comparedSlugs.includes(slug)) {
      setComparedSlugs(prev => prev.filter(s => s !== slug))
    } else {
      if (comparedSlugs.length >= 3) {
        toast.error('You can compare a maximum of 3 products.')
        return
      }
      setComparedSlugs(prev => [...prev, slug])
    }
  }

  const removeCompare = (slug) => {
    setComparedSlugs(prev => prev.filter(s => s !== slug))
  }

  const clearCompare = () => {
    setComparedSlugs([])
  }

  return (
    <CompareContext.Provider value={{ comparedSlugs, toggleCompare, removeCompare, clearCompare, modalOpen, setModalOpen }}>
      {children}
      <CompareTray />
      <CompareModal />
    </CompareContext.Provider>
  )
}

function CompareTray() {
  const { comparedSlugs, removeCompare, clearCompare, setModalOpen } = useCompare()

  if (comparedSlugs.length === 0) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-24 z-[150] bg-white rounded-xl shadow-2xl border border-gray-200 p-4 max-w-sm w-full">
      <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
        <div className="flex items-center gap-2 font-bold text-[#1a3a5c]" style={{ fontFamily: 'Rajdhani' }}>
          <Columns size={16} className="text-[#e8421a]" />
          Compare ({comparedSlugs.length}/3)
        </div>
        <button onClick={clearCompare} className="text-gray-400 hover:text-gray-600 text-xs font-semibold">
          Clear
        </button>
      </div>

      <div className="space-y-2 mb-3">
        {comparedSlugs.map(slug => {
          const prod = getProductBySlug(slug)
          if (!prod) return null
          return (
            <div key={slug} className="flex items-center justify-between text-xs bg-gray-50 px-2.5 py-1.5 rounded">
              <span className="font-semibold text-[#1a3a5c] truncate pr-2">{prod.name}</span>
              <button onClick={() => removeCompare(slug)} className="text-gray-400 hover:text-[#e8421a] flex-shrink-0">
                <X size={14} />
              </button>
            </div>
          )
        })}
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="w-full bg-[#1a3a5c] text-white py-2 rounded text-xs font-bold hover:bg-[#15304e] transition-colors flex items-center justify-center gap-1.5"
      >
        Open Comparison <ArrowRight size={12} />
      </button>
    </div>
  )
}

function CompareModal() {
  const { comparedSlugs, removeCompare, modalOpen, setModalOpen } = useCompare()

  if (!modalOpen || comparedSlugs.length === 0) return null

  const products = comparedSlugs.map(slug => getProductBySlug(slug)).filter(Boolean)

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/compare?products=${comparedSlugs.join(',')}`
    navigator.clipboard.writeText(shareUrl)
    toast.success('Comparison link copied to clipboard!')
  }

  // Generate comparison spec list keys
  const specKeys = Array.from(
    new Set(products.flatMap(p => p.specifications?.map(s => s.label) || []))
  )

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
        <motion.div
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 30, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#1a3a5c] px-6 py-4 flex items-center justify-between">
            <h2 className="text-white font-bold text-xl" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Product Comparison Table
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button onClick={handlePrint} title="Print" className="text-white/70 hover:text-white transition-colors">
                  <Printer size={18} />
                </button>
                <button onClick={handleShare} title="Share Link" className="text-white/70 hover:text-white transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-white/70 hover:text-white transition-colors ml-2">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="p-6 overflow-auto flex-1">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border-b-2 border-gray-200 bg-gray-50 text-left p-3 font-bold text-[#1a3a5c] w-1/4">Feature / Spec</th>
                  {products.map(p => (
                    <th key={p.slug} className="border-b-2 border-gray-200 bg-gray-50 p-3 text-center relative w-1/4">
                      <button
                        onClick={() => removeCompare(p.slug)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-[#e8421a]"
                        title="Remove from comparison"
                      >
                        <Trash2 size={14} />
                      </button>
                      <div className="font-bold text-[#1a3a5c] text-base mt-2" style={{ fontFamily: 'Rajdhani' }}>{p.name}</div>
                      <span className="text-xs text-[#e8421a] font-bold uppercase tracking-wider">{p.category}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-gray-100 p-3 font-semibold text-[#1a3a5c]">Short Description</td>
                  {products.map(p => (
                    <td key={p.slug} className="border-b border-gray-100 p-3 text-gray-500 text-center leading-relaxed">
                      {p.shortDescription}
                    </td>
                  ))}
                </tr>

                {specKeys.map((label, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-[#f4f7fb]/30' : 'bg-white'}>
                    <td className="border-b border-gray-100 p-3 font-semibold text-[#1a3a5c]">{label}</td>
                    {products.map(p => {
                      const spec = p.specifications?.find(s => s.label === label)
                      return (
                        <td key={p.slug} className="border-b border-gray-100 p-3 text-gray-600 text-center">
                          {spec ? spec.value : '—'}
                        </td>
                      )
                    })}
                  </tr>
                ))}

                <tr>
                  <td className="border-b border-gray-100 p-3 font-semibold text-[#1a3a5c]">Key Highlights</td>
                  {products.map(p => (
                    <td key={p.slug} className="border-b border-gray-100 p-3 text-gray-600 text-center">
                      <ul className="text-xs text-left inline-block space-y-1 list-disc list-inside">
                        {p.highlights?.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
