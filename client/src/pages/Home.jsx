import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, Play } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { heroSlides, homeProducts, services } from '../data/catalog'

const ThreeBackground = lazy(() => import('../components/ThreeBackground'))

const stats = [
  { value: '10+', label: 'Years of Excellence' },
  { value: '100+', label: 'Countries Served' },
  { value: '500+', label: 'Products' },
  { value: '1000+', label: 'Happy Clients' },
]

const pillars = [
  { icon: '🏭', title: 'Manufacturing', desc: 'End-to-end engineering and production solutions' },
  { icon: '🤝', title: 'OEM Business', desc: 'Your brand, powered by our engineering expertise' },
  { icon: '✅', title: 'Quality Assurance', desc: 'Engineering excellence with rigorous quality control' },
  { icon: '🔬', title: 'R&D Department', desc: 'Engineering tomorrow\'s breakthroughs today' },
]

export default function Home({ onQuoteOpen }) {
  const [slide, setSlide] = useState(0)
  const [activeTab, setActiveTab] = useState('NDT Products')
  const intervalRef = useRef()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSlide(s => (s + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const nextSlide = () => {
    clearInterval(intervalRef.current)
    setSlide(s => (s + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    clearInterval(intervalRef.current)
    setSlide(s => (s - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative h-[90vh] min-h-[560px] overflow-hidden bg-[#0d1f33]">
        <Suspense fallback={null}>
          <ThreeBackground />
        </Suspense>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f33]/90 via-[#0d1f33]/60 to-transparent z-10" />

        {/* Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 flex items-center z-20"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-block text-[#e8421a] text-xs font-bold tracking-[0.3em] uppercase mb-4"
              >
                {heroSlides[slide].category}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-2xl leading-tight"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                {heroSlides[slide].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-300 text-lg max-w-xl mb-8 leading-relaxed"
              >
                {heroSlides[slide].subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to={heroSlides[slide].link}
                  className="bg-[#e8421a] text-white px-7 py-3.5 rounded font-semibold flex items-center gap-2 hover:bg-[#c93614] transition-colors"
                >
                  Explore More <ArrowRight size={18} />
                </Link>
                <button
                  onClick={onQuoteOpen}
                  className="border border-white/40 text-white px-7 py-3.5 rounded font-semibold hover:bg-white/10 transition-colors"
                >
                  Get Quote
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`transition-all duration-300 rounded-full ${i === slide ? 'w-8 h-2 bg-[#e8421a]' : 'w-2 h-2 bg-white/40'}`}
            />
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </section>

      {/* Stats bar */}
      <div className="bg-[#e8421a] py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold" style={{ fontFamily: 'Rajdhani' }}>{s.value}</div>
              <div className="text-sm text-white/80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pillars */}
      <AnimatedSection className="py-16 bg-[#f4f7fb]">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-b-4 border-transparent hover:border-[#e8421a] group"
            >
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="font-bold text-[#1a3a5c] text-lg mb-2" style={{ fontFamily: 'Rajdhani' }}>{p.title}</h3>
              <p className="text-gray-500 text-sm">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Virtual Tour + About strip */}
      <AnimatedSection className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {/* Virtual Tour */}
          <div className="md:col-span-1 bg-[#0d1f33] rounded-2xl overflow-hidden relative group">
            <div className="p-8 h-full flex flex-col justify-between min-h-[260px]">
              <div>
                <span className="text-[#e8421a] text-xs font-bold tracking-widest uppercase">Virtual Tour</span>
                <h2 className="text-white text-2xl font-bold mt-2 mb-3" style={{ fontFamily: 'Rajdhani' }}>
                  360° Virtual Tour
                </h2>
                <p className="text-gray-400 text-sm">
                  Take a virtual tour of our state-of-the-art facilities and see how we bring innovation to life.
                </p>
              </div>
              <a
                href="https://www.youtube.com/watch?v=lIu1sfnV90k"
                target="_blank"
                rel="noreferrer"
                className="mt-6 self-start flex items-center gap-2 bg-[#e8421a] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#c93614] transition-colors"
              >
                <Play size={16} /> View Now
              </a>
            </div>
          </div>

          {/* Who we are */}
          <div className="bg-[#f4f7fb] rounded-2xl p-8 flex flex-col justify-between min-h-[260px]">
            <div>
              <img src="https://www.ucomax.com/assets/img/logo-1.png" alt="UCOMAX" className="h-10 mb-4" />
              <span className="text-[#e8421a] text-xs font-bold tracking-widest uppercase">Who We Are</span>
              <h2 className="text-[#1a3a5c] text-2xl font-bold mt-2 mb-3" style={{ fontFamily: 'Rajdhani' }}>
                Our Story
              </h2>
              <p className="text-gray-600 text-sm">
                Discover our mission, values, and commitment to providing cutting-edge solutions for your business needs.
              </p>
            </div>
            <Link
              to="/about"
              className="mt-6 self-start flex items-center gap-2 text-[#1a3a5c] font-semibold text-sm hover:text-[#e8421a] transition-colors"
            >
              About Us <ArrowRight size={16} />
            </Link>
          </div>

          {/* Innovative solutions */}
          <div className="bg-[#1a3a5c] rounded-2xl p-8 flex flex-col justify-between min-h-[260px]">
            <div>
              <span className="text-[#e8421a] text-xs font-bold tracking-widest uppercase">Solutions</span>
              <h2 className="text-white text-2xl font-bold mt-2 mb-3" style={{ fontFamily: 'Rajdhani' }}>
                Innovative Solutions for Every Need
              </h2>
              <p className="text-gray-300 text-sm">
                Explore our wide range of high-quality products and services designed to optimize performance and efficiency.
              </p>
            </div>
            <Link
              to="/category/services"
              className="mt-6 self-start flex items-center gap-2 bg-white text-[#1a3a5c] px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              Our Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Products section with tabs */}
      <AnimatedSection className="py-16 bg-[#f4f7fb]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-[#e8421a] text-xs font-bold tracking-widest uppercase">Catalog</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mt-2" style={{ fontFamily: 'Rajdhani' }}>
              Our Products
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {Object.keys(homeProducts).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-[#1a3a5c] text-white shadow-md'
                    : 'bg-white text-[#1a3a5c] hover:bg-[#1a3a5c]/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {homeProducts[activeTab].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.href}
                    className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md hover:border-[#e8421a] border border-transparent transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#1a3a5c]/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-[#e8421a]" />
                    </div>
                    <span className="text-[#1a3a5c] font-medium text-sm group-hover:text-[#e8421a] transition-colors">
                      {item.name}
                    </span>
                    <ChevronRight size={16} className="ml-auto text-gray-300 group-hover:text-[#e8421a] transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </AnimatedSection>

      {/* Services section */}
      <AnimatedSection className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-[#e8421a] text-xs font-bold tracking-widest uppercase">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a5c] mt-2" style={{ fontFamily: 'Rajdhani' }}>
              Our Services
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={s.href}
                  className="block bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group"
                >
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <h3 className="font-bold text-[#1a3a5c] mb-2 group-hover:text-[#e8421a] transition-colors" style={{ fontFamily: 'Rajdhani' }}>
                    {s.name}
                  </h3>
                  <div className="mt-3 text-[#e8421a] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-sm font-medium">
                    Learn More <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Speak to expert CTA */}
      <section className="py-20 bg-[#1a3a5c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#e8421a] blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-white blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#e8421a] text-xs font-bold tracking-widest uppercase">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4" style={{ fontFamily: 'Rajdhani' }}>
              Speak to an Expert
            </h2>
            <p className="text-gray-300 mb-8">
              Have questions? Our team of experts is ready to help you find the right solution for your industry.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#e8421a] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#c93614] transition-colors"
            >
              Contact Us <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
