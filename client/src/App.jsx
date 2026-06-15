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

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar onQuoteOpen={() => setQuoteOpen(true)} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home onQuoteOpen={() => setQuoteOpen(true)} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/subcategory/:slug" element={<CategoryPage />} />
            <Route path="/product/:slug" element={<ProductPage onQuoteOpen={() => setQuoteOpen(true)} />} />
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
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  )
}
