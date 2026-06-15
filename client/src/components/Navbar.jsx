import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Phone, Mail, ChevronDown, ChevronRight, Menu } from 'lucide-react'
import { navData } from '../data/catalog'

export default function Navbar({ onQuoteOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeMenu, setActiveMenu] = useState(null)
  const [activeSub, setActiveSub] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState({})
  const navigate = useNavigate()
  const searchRef = useRef()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  const toggleMobileExpand = (key) => {
    setMobileExpanded(p => ({ ...p, [key]: !p[key] }))
  }

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#0d1f33] text-white text-sm py-2 px-4 hidden md:flex justify-between items-center">
        <div className="flex items-center gap-6">
          <a href="tel:+916358833112" className="flex items-center gap-2 hover:text-[#e8421a] transition-colors">
            <Phone size={13} /> +91 63588 33112
          </a>
          <a href="mailto:sales@ucomax.com" className="flex items-center gap-2 hover:text-[#e8421a] transition-colors">
            <Mail size={13} /> sales@ucomax.com
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/about" className="hover:text-[#e8421a] transition-colors">About us</Link>
          <div className="flex gap-3">
            <a href="https://www.facebook.com/Ucomax.India/" target="_blank" rel="noreferrer" className="hover:text-[#e8421a] transition-colors">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://x.com/ucomax" target="_blank" rel="noreferrer" className="hover:text-[#e8421a] transition-colors">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/ucomax/" target="_blank" rel="noreferrer" className="hover:text-[#e8421a] transition-colors">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://www.instagram.com/ucomax.india/" target="_blank" rel="noreferrer" className="hover:text-[#e8421a] transition-colors">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path fill="#0d1f33" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#0d1f33" strokeWidth="2"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://www.ucomax.com/assets/img/logo-header.png"
              alt="UCOMAX"
              className="h-10 object-contain"
            />
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navData.map((item) => (
              <div
                key={item.label}
                className="relative nav-item group"
                onMouseEnter={() => setActiveMenu(item.label)}
                onMouseLeave={() => { setActiveMenu(null); setActiveSub(null) }}
              >
                <Link
                  to={item.href}
                  className="flex items-center gap-1 px-3 py-5 text-sm font-medium text-[#1a3a5c] hover:text-[#e8421a] transition-colors"
                >
                  {item.label}
                  {(item.subcategories?.length > 0 || item.products?.length > 0) && (
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </Link>

                {/* Dropdown */}
                {activeMenu === item.label && (item.subcategories?.length > 0 || item.products?.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 bg-white shadow-2xl border-t-3 border-[#e8421a] min-w-[220px] z-50"
                    style={{ borderTop: '3px solid #e8421a' }}
                  >
                    {item.subcategories?.length > 0 ? (
                      item.subcategories.map((sub) => (
                        <div
                          key={sub.label}
                          className="relative group/sub"
                          onMouseEnter={() => setActiveSub(sub.label)}
                          onMouseLeave={() => setActiveSub(null)}
                        >
                          <Link
                            to={sub.href}
                            className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f4f7fb] hover:text-[#1a3a5c] transition-colors"
                          >
                            {sub.label}
                            {(sub.items?.length > 0 || sub.products?.length > 0) && <ChevronRight size={14} />}
                          </Link>
                          {/* Level 2 */}
                          {activeSub === sub.label && (sub.items?.length > 0 || sub.products?.length > 0) && (
                            <motion.div
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="absolute top-0 left-full bg-white shadow-2xl min-w-[260px] z-50"
                              style={{ borderTop: '3px solid #e8421a' }}
                            >
                              {sub.items?.map((item2) => (
                                <div key={item2.label}>
                                  <div className="px-4 pt-3 pb-1 text-xs font-semibold text-[#e8421a] uppercase tracking-wide">
                                    {item2.label}
                                  </div>
                                  {item2.products?.map((p) => (
                                    <Link
                                      key={p}
                                      to={`/product/${p.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                      className="block px-6 py-1.5 text-sm text-gray-600 hover:bg-[#f4f7fb] hover:text-[#1a3a5c] transition-colors"
                                    >
                                      {p}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                              {sub.products?.map((p) => (
                                <Link
                                  key={p}
                                  to={`/product/${p.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-[#f4f7fb] hover:text-[#1a3a5c] transition-colors"
                                >
                                  {p}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      ))
                    ) : (
                      item.products?.map((p) => (
                        <Link
                          key={p}
                          to={`/product/${p.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f4f7fb] hover:text-[#1a3a5c] transition-colors"
                        >
                          {p}
                        </Link>
                      ))
                    )}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-[#1a3a5c] hover:text-[#e8421a] transition-colors"
            >
              <Search size={20} />
            </button>
            <button
              onClick={onQuoteOpen}
              className="hidden sm:block bg-[#e8421a] text-white px-4 py-2 text-sm font-semibold rounded hover:bg-[#c93614] transition-colors"
            >
              Get Quote
            </button>
            <button
              className="lg:hidden p-2 text-[#1a3a5c]"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100] flex items-start justify-center pt-24"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 p-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <Search size={20} className="text-gray-400" />
                <input
                  ref={searchRef}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { navigate(`/search?q=${searchQuery}`); setSearchOpen(false) } }}
                  placeholder="Search products, categories..."
                  className="flex-1 text-lg outline-none"
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X size={20} className="text-gray-400 hover:text-gray-700" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[90]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-[95] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <img src="https://www.ucomax.com/assets/img/logo-header.png" alt="UCOMAX" className="h-8" />
                <button onClick={() => setMobileOpen(false)}>
                  <X size={22} className="text-[#1a3a5c]" />
                </button>
              </div>
              <div className="p-4">
                {navData.map((item) => (
                  <div key={item.label} className="border-b border-gray-100">
                    <button
                      className="w-full flex items-center justify-between py-3 text-[#1a3a5c] font-medium"
                      onClick={() => toggleMobileExpand(item.label)}
                    >
                      {item.label}
                      <ChevronDown size={16} className={`transition-transform ${mobileExpanded[item.label] ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileExpanded[item.label] && (
                      <div className="pl-4 pb-3">
                        {item.subcategories?.map(sub => (
                          <Link
                            key={sub.label}
                            to={sub.href}
                            className="block py-1.5 text-sm text-gray-600"
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                        {item.products?.map(p => (
                          <Link
                            key={p}
                            to={`/product/${p.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                            className="block py-1.5 text-sm text-gray-600"
                            onClick={() => setMobileOpen(false)}
                          >
                            {p}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-4 space-y-2">
                  <a href="tel:+916358833112" className="flex items-center gap-2 text-sm text-[#1a3a5c]">
                    <Phone size={14} /> +91 63588 33112
                  </a>
                  <a href="mailto:sales@ucomax.com" className="flex items-center gap-2 text-sm text-[#1a3a5c]">
                    <Mail size={14} /> sales@ucomax.com
                  </a>
                  <button
                    onClick={() => { onQuoteOpen(); setMobileOpen(false) }}
                    className="w-full bg-[#e8421a] text-white py-2 rounded font-semibold mt-3"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
