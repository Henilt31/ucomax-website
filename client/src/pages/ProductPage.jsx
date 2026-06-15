import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Phone, Mail, ChevronRight, CheckCircle2, ArrowRight, Columns, Download, Eye, FileText } from 'lucide-react'
import { getProductBySlug, getRelatedProducts, categoryColors, categoryIcons } from '../data/products'
import { useEffect, useState } from 'react'

// Enhancement Layer Imports
import { useAnalytics } from '../hooks/useAnalytics'
import { useCompare } from '../components/CompareSystem'

function ProductImagePlaceholder({ product }) {
  const colors = categoryColors[product.category] || { from: '#1a3a5c', to: '#2d5f8a' }
  const icon = categoryIcons[product.category] || '📦'

  return (
    <div
      className="w-full h-full min-h-[400px] rounded-2xl flex items-center justify-center relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-8 right-8 w-48 h-48 rounded-full border-2 border-white/30" />
        <div className="absolute bottom-8 left-8 w-32 h-32 rounded-full border-2 border-white/30" />
        <div className="absolute top-1/3 left-1/4 w-24 h-24 rounded-full border border-white/20" />
      </div>
      <div className="text-center relative z-10 px-8">
        <div className="text-7xl mb-4 opacity-80">{icon}</div>
        <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: 'Rajdhani' }}>{product.name}</h3>
        <div className="text-white/60 text-sm font-medium tracking-wider uppercase">{product.category}</div>
      </div>
    </div>
  )
}

function RelatedProductCard({ product }) {
  const colors = categoryColors[product.category] || { from: '#1a3a5c', to: '#2d5f8a' }
  const icon = categoryIcons[product.category] || '📦'

  return (
    <Link
      to={`/product/${product.slug}`}
      className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-[#e8421a]/30 transition-all group"
    >
      <div
        className="h-32 flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
      >
        <div className="text-3xl opacity-70">{icon}</div>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-[#1a3a5c] text-sm group-hover:text-[#e8421a] transition-colors" style={{ fontFamily: 'Rajdhani' }}>
          {product.name}
        </h4>
        <p className="text-gray-400 text-xs mt-1 line-clamp-1">{product.shortDescription}</p>
      </div>
    </Link>
  )
}

export default function ProductPage({ onQuoteOpen, onOpenRFQ }) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const analytics = useAnalytics()
  const { comparedSlugs, toggleCompare } = useCompare()
  const [activeResTab, setActiveResTab] = useState('datasheet')

  const product = getProductBySlug(slug)
  const relatedProducts = product ? getRelatedProducts(slug, 4) : []

  // Log product view
  useEffect(() => {
    if (product) {
      analytics.trackProductView(product.slug, product.name)
    }
  }, [slug, product])

  // Fallback for products not yet in database
  if (!product) {
    const fallbackName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    return (
      <div>
        <div className="bg-[#f4f7fb] border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-[#e8421a] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-[#1a3a5c] font-medium">{fallbackName}</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-[#1a3a5c] to-[#2d5f8a] rounded-2xl flex items-center justify-center min-h-[400px]">
              <div className="text-center px-8">
                <div className="text-6xl mb-4 opacity-80">📦</div>
                <h3 className="text-white text-2xl font-bold" style={{ fontFamily: 'Rajdhani' }}>{fallbackName}</h3>
                <div className="text-white/60 text-sm mt-2">UCOMAX Product</div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-[#1a3a5c] mb-4 transition-colors">
                <ArrowLeft size={14} /> Back
              </button>
              <h1 className="text-4xl font-bold text-[#1a3a5c] mb-4" style={{ fontFamily: 'Rajdhani' }}>{fallbackName}</h1>
              <div className="h-1 w-16 bg-[#e8421a] rounded mb-6" />
              <p className="text-gray-600 leading-relaxed mb-8">
                Ucomax's {fallbackName} is engineered to deliver precision and reliability for demanding industrial applications. Built to the highest quality standards with ISO certification.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => onOpenRFQ([fallbackName])} className="bg-[#e8421a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#c93614] transition-colors">Request Quote (RFQ)</button>
                <a href="tel:+916358833112" className="flex items-center gap-2 border border-[#1a3a5c] text-[#1a3a5c] px-6 py-3 rounded-lg font-semibold hover:bg-[#1a3a5c] hover:text-white transition-colors">
                  <Phone size={16} /> Call Us
                </a>
                <a href="https://wa.me/916358833112" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1da851] transition-colors">WhatsApp</a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  const isCompared = comparedSlugs.includes(product.slug)

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#f4f7fb] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#e8421a] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to={`/category/${product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="hover:text-[#e8421a] transition-colors">
            {product.category}
          </Link>
          {product.subcategory && product.subcategory !== product.category && (
            <>
              <ChevronRight size={12} />
              <Link to={`/subcategory/${product.subcategory.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="hover:text-[#e8421a] transition-colors">
                {product.subcategory}
              </Link>
            </>
          )}
          <ChevronRight size={12} />
          <span className="text-[#1a3a5c] font-medium">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <ProductImagePlaceholder product={product} />
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-[#1a3a5c] mb-4 transition-colors">
              <ArrowLeft size={14} /> Back
            </button>

            <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
              <div className="inline-block bg-[#e8421a]/10 text-[#e8421a] text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                {product.category}
              </div>

              {/* Compare Checkbox */}
              <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer select-none border border-gray-200 rounded-lg px-2.5 py-1 hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={isCompared}
                  onChange={() => toggleCompare(product.slug)}
                  className="rounded border-gray-300 text-[#e8421a] focus:ring-[#e8421a]"
                />
                Add to Compare
              </label>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mb-3" style={{ fontFamily: 'Rajdhani' }}>
              {product.name}
            </h1>
            <div className="h-1 w-16 bg-[#e8421a] rounded mb-5" />

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Highlights */}
            {product.highlights?.length > 0 && (
              <div className="bg-[#f4f7fb] rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-[#1a3a5c] mb-3">Key Highlights</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[#e8421a] flex-shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => onOpenRFQ([product.name])}
                className="bg-[#e8421a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#c93614] transition-colors shadow-md hover:shadow-lg"
              >
                Request Quote (RFQ)
              </button>
              <a
                href="tel:+916358833112"
                className="flex items-center gap-2 border-2 border-[#1a3a5c] text-[#1a3a5c] px-5 py-3 rounded-lg font-semibold hover:bg-[#1a3a5c] hover:text-white transition-colors"
              >
                <Phone size={16} /> Call Us
              </a>
              <a
                href="https://wa.me/916358833112"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#1da851] transition-colors"
              >
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>

            {/* Contact info */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-6 text-sm text-gray-500">
              <a href="tel:+916358833112" className="flex items-center gap-1.5 hover:text-[#1a3a5c]">
                <Phone size={14} /> +91 63588 33112
              </a>
              <a href="mailto:sales@ucomax.com" className="flex items-center gap-1.5 hover:text-[#1a3a5c]">
                <Mail size={14} /> sales@ucomax.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Technical Resource tabs for this product */}
        <div className="mt-14 border-t border-gray-200 pt-8">
          <h3 className="text-2xl font-bold text-[#1a3a5c] mb-4" style={{ fontFamily: 'Rajdhani' }}>Product Documentation</h3>
          <div className="flex border-b border-gray-100 gap-4 mb-4">
            {['datasheet', 'brochure', 'user manual'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveResTab(tab)}
                className={`py-2 px-1 text-sm font-semibold capitalize border-b-2 transition-colors ${
                  activeResTab === tab ? 'border-[#e8421a] text-[#e8421a]' : 'border-transparent text-gray-400 hover:text-[#1a3a5c]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#e8421a]/10 text-[#e8421a] rounded-lg flex items-center justify-center">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#1a3a5c]" style={{ fontFamily: 'Rajdhani' }}>
                  {product.name} {activeResTab}
                </h4>
                <p className="text-xs text-gray-400">PDF document • 1.5 MB</p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  analytics.trackResourceDownload(`${product.name} ${activeResTab}`, product.category)
                  toast.success('Document download initiated.')
                }}
                className="flex-1 sm:flex-initial bg-[#1a3a5c] text-white hover:bg-[#15304e] px-4 py-2 rounded text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Download size={14} /> Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        {product.specifications?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-14"
          >
            <h2 className="text-2xl font-bold text-[#1a3a5c] mb-6" style={{ fontFamily: 'Rajdhani' }}>
              Technical Specifications
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-[#f4f7fb]' : 'bg-white'} border-b border-gray-100 last:border-0`}>
                      <td className="px-6 py-4 text-sm font-semibold text-[#1a3a5c] w-1/3 align-top">{spec.label}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1a3a5c]" style={{ fontFamily: 'Rajdhani' }}>
                Related Products
              </h2>
              <Link
                to={`/category/${product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="text-[#e8421a] text-sm font-medium flex items-center gap-1 hover:underline"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((rp) => (
                <RelatedProductCard key={rp.slug} product={rp} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

