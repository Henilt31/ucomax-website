import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import QuoteModal from './components/QuoteModal'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'

// Enhancement Layer Imports
import { CompareProvider } from './components/CompareSystem'
import ProductFinder from './components/ProductFinder'
import RFQModal from './components/RFQModal'
import WhatsAppWidget from './components/WhatsAppWidget'
import ResourceCenter from './pages/ResourceCenter'

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [rfqOpen, setRfqOpen] = useState(false)
  const [rfqProducts, setRfqProducts] = useState([])
  const [finderOpen, setFinderOpen] = useState(false)

  const handleOpenRFQ = (products = []) => {
    setRfqProducts(products)
    setRfqOpen(true)
  }

  return (
    <CompareProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar
            onQuoteOpen={() => setQuoteOpen(true)}
            onRFQOpen={() => handleOpenRFQ()}
            onFinderOpen={() => setFinderOpen(true)}
          />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={
                <Home
                  onQuoteOpen={() => setQuoteOpen(true)}
                  onRFQOpen={() => handleOpenRFQ()}
                  onFinderOpen={() => setFinderOpen(true)}
                />
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/category/:slug" element={<CategoryPage onOpenRFQ={handleOpenRFQ} />} />
              <Route path="/subcategory/:slug" element={<CategoryPage onOpenRFQ={handleOpenRFQ} />} />
              <Route path="/product/:slug" element={
                <ProductPage
                  onQuoteOpen={() => setQuoteOpen(true)}
                  onOpenRFQ={handleOpenRFQ}
                />
              } />
              <Route path="/resources" element={<ResourceCenter />} />
              <Route path="*" element={
                <div className="min-h-[60vh] flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#1a3a5c] mb-2">Page Not Found</h2>
                    <a href="/" className="text-[#e8421a] hover:underline">Go Home</a>
                  </div>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
          <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
          <RFQModal isOpen={rfqOpen} onClose={() => setRfqOpen(false)} initialProducts={rfqProducts} />
          <ProductFinder
            isOpen={finderOpen}
            onClose={() => setFinderOpen(false)}
            onOpenRFQ={handleOpenRFQ}
            onProductSelect={(slug) => window.location.assign(`/product/${slug}`)}
          />
          <WhatsAppWidget />
          <Toaster position="top-right" />
        </div>
      </BrowserRouter>
    </CompareProvider>
  )
}

