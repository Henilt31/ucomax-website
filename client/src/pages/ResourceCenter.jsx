import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Download, Eye, X, FileText, BookOpen, ShieldCheck, Award } from 'lucide-react'
import { navData } from '../data/catalog'
import { getProductBySlug } from '../data/products'
import { useAnalytics } from '../hooks/useAnalytics'

// static resources database mock data
const resourceDb = [
  {
    name: 'AC Yoke Datasheet',
    productName: 'AC Yoke',
    category: 'NDT Products',
    type: 'Datasheets',
    fileSize: '1.2 MB',
    pdfUrl: '/resources/ac-yoke-datasheet.pdf'
  },
  {
    name: 'AC Yoke User Manual',
    productName: 'AC Yoke',
    category: 'NDT Products',
    type: 'User Manuals',
    fileSize: '2.5 MB',
    pdfUrl: '/resources/ac-yoke-manual.pdf'
  },
  {
    name: 'AC/DC Yoke Certification',
    productName: 'AC/DC Yoke',
    category: 'NDT Products',
    type: 'Certifications',
    fileSize: '0.8 MB',
    pdfUrl: '/resources/ac-dc-cert.pdf'
  },
  {
    name: 'Metscope Prime Brochure',
    productName: 'Metscope Prime',
    category: 'Microscope',
    type: 'Brochures',
    fileSize: '3.1 MB',
    pdfUrl: '/resources/metscope-prime-brochure.pdf'
  },
  {
    name: 'Stereo Prime Technical Specifications',
    productName: 'Stereo Prime',
    category: 'Microscope',
    type: 'Technical Specifications',
    fileSize: '1.4 MB',
    pdfUrl: '/resources/stereo-prime-specs.pdf'
  },
  {
    name: 'DIGICAM 5MP Brochure',
    productName: 'DIGICAM 5MP (USB 3.0)',
    category: 'Camera',
    type: 'Brochures',
    fileSize: '1.8 MB',
    pdfUrl: '/resources/digicam-5mp-brochure.pdf'
  }
]

export default function ResourceCenter() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeTab, setActiveTab] = useState('All')
  const [previewFile, setPreviewFile] = useState(null)
  const analytics = useAnalytics()

  const tabs = ['All', 'Datasheets', 'Brochures', 'User Manuals', 'Certifications', 'Technical Specifications']

  const handleDownload = (res) => {
    analytics.trackResourceDownload(res.name, res.category)
    // mock download
    const link = document.createElement('a')
    link.href = '#'
    link.setAttribute('download', res.name)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Filter resources
  const filteredResources = resourceDb.filter(res => {
    const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.productName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory
    const matchesTab = activeTab === 'All' || res.type === activeTab
    return matchesSearch && matchesCategory && matchesTab
  })

  return (
    <div className="bg-[#f4f7fb] min-h-screen pb-16">
      {/* Banner */}
      <div className="bg-[#0d1f33] py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#e8421a] blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span className="text-[#e8421a] text-xs font-bold tracking-widest uppercase">Support Center</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4" style={{ fontFamily: 'Rajdhani' }}>
            Technical Resource Center
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-sm leading-relaxed">
            Access product datasheets, compliance certifications, user manuals, brochures, and technical blueprints.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-[#1a3a5c] text-lg mb-4" style={{ fontFamily: 'Rajdhani' }}>Search Documents</h3>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Product name or keyword..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-[#1a3a5c] text-lg mb-3" style={{ fontFamily: 'Rajdhani' }}>Filter By Category</h3>
            <div className="space-y-1">
              {['All', 'NDT Products', 'Microscope', 'Software', 'Camera'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors font-medium ${
                    selectedCategory === cat
                      ? 'bg-[#1a3a5c] text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#1a3a5c]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources list */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-[#e8421a] text-white shadow-sm'
                    : 'bg-white text-gray-500 hover:text-[#1a3a5c]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredResources.length === 0 ? (
              <div className="sm:col-span-2 text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100 shadow-sm">
                No matching documents found. Please adjust search parameters.
              </div>
            ) : (
              filteredResources.map((res, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs bg-[#e8421a]/10 text-[#e8421a] px-2 py-0.5 rounded-full font-bold uppercase">
                        {res.type}
                      </span>
                      <span className="text-xs text-gray-400">{res.fileSize}</span>
                    </div>
                    <h4 className="font-bold text-[#1a3a5c] text-base leading-tight mb-1" style={{ fontFamily: 'Rajdhani' }}>
                      {res.name}
                    </h4>
                    <p className="text-xs text-gray-400">Related: {res.productName}</p>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
                    <button
                      onClick={() => setPreviewFile(res)}
                      className="flex-1 border border-gray-200 hover:border-[#1a3a5c] hover:bg-[#1a3a5c]/5 text-gray-600 hover:text-[#1a3a5c] py-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Eye size={14} /> Preview
                    </button>
                    <button
                      onClick={() => handleDownload(res)}
                      className="flex-1 bg-[#1a3a5c] text-white hover:bg-[#15304e] py-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download size={14} /> Download
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* PDF Preview Modal overlay */}
      <AnimatePresence>
        {previewFile && (
          <div className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-4" onClick={() => setPreviewFile(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-[#1a3a5c] px-6 py-4 flex items-center justify-between text-white">
                <h3 className="font-bold text-lg" style={{ fontFamily: 'Rajdhani' }}>{previewFile.name} (Preview)</h3>
                <button onClick={() => setPreviewFile(null)} className="text-white/80 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="p-10 flex-1 overflow-y-auto bg-gray-100 flex items-center justify-center">
                <div className="bg-white shadow-lg p-8 rounded border border-gray-200 w-full max-w-md text-center space-y-4">
                  <FileText size={48} className="mx-auto text-[#e8421a]" />
                  <h4 className="font-bold text-lg text-[#1a3a5c]" style={{ fontFamily: 'Rajdhani' }}>UCOMAX Technical Document</h4>
                  <p className="text-sm text-gray-500">
                    This is a secure preview of the requested document {previewFile.name}. Download the full version below.
                  </p>
                  <button
                    onClick={() => { handleDownload(previewFile); setPreviewFile(null) }}
                    className="bg-[#e8421a] text-white px-6 py-2.5 rounded font-semibold text-sm hover:bg-[#c93614] transition-colors inline-flex items-center gap-2"
                  >
                    <Download size={16} /> Download Full PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
