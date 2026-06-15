import { useParams, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Package, Layers } from 'lucide-react'
import { useState, useEffect } from 'react'
import { navData } from '../data/catalog'
import { getProductsBySubcategory, getProductsByParentSubcategory, categoryColors, categoryIcons } from '../data/products'


// Recursively search navData for a subcategory/category matching the slug
function findBySlug(slug, data = navData, breadcrumb = []) {
  for (const cat of data) {
    const catSlug = cat.href?.split('/').pop()
    if (catSlug === slug) return { node: cat, breadcrumb: [...breadcrumb, { label: cat.label, href: cat.href }], type: 'category' }

    if (cat.subcategories) {
      for (const sub of cat.subcategories) {
        const subSlug = sub.href?.split('/').pop()
        if (subSlug === slug) {
          return {
            node: sub,
            breadcrumb: [...breadcrumb, { label: cat.label, href: cat.href }, { label: sub.label, href: sub.href }],
            type: sub.items ? 'subcategory-with-items' : 'subcategory-with-products',
            parent: cat,
          }
        }
        // Check nested items
        if (sub.items) {
          for (const item of sub.items) {
            const itemSlug = item.href?.split('/').pop()
            if (itemSlug === slug) {
              return {
                node: item,
                breadcrumb: [
                  ...breadcrumb,
                  { label: cat.label, href: cat.href },
                  { label: sub.label, href: sub.href },
                  { label: item.label, href: item.href },
                ],
                type: 'nested-item',
                parent: cat,
              }
            }
          }
        }
      }
    }
  }
  return null
}

// Generate a slug for a product name (same logic used in Navbar links)
function productSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
}

import { useCompare } from '../components/CompareSystem'

// Product card component with gradient placeholder
function ProductCard({ name, category, index }) {
  const slug = productSlug(name)
  const colors = categoryColors[category] || { from: '#1a3a5c', to: '#2d5f8a' }
  const icon = categoryIcons[category] || '📦'
  const { comparedSlugs, toggleCompare } = useCompare()
  const isCompared = comparedSlugs.includes(slug)

  const [imgSrc, setImgSrc] = useState(`/images/products/${slug}.png`)
  const [imgError, setImgError] = useState(false)

  const handleImageError = () => {
    if (imgSrc.endsWith('.png')) {
      setImgSrc(`/images/products/${slug}.svg`)
    } else {
      imgError || setImgError(true)
    }
  }

  // If slug changes, reset image path
  useEffect(() => {
    setImgSrc(`/images/products/${slug}.png`)
    setImgError(false)
  }, [slug])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-[#e8421a]/30 transition-all group relative"
    >
      <Link
        to={`/product/${slug}`}
        className="block"
      >
        {/* Product image placeholder */}
        <div
          className="h-44 flex items-center justify-center relative overflow-hidden bg-white"
        >
          {!imgError ? (
            <img
              src={imgSrc}
              alt={name}
              onError={handleImageError}
              className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div
              className="h-full w-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-32 h-32 rounded-full border border-white/20" />
                <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full border border-white/20" />
              </div>
              <div className="text-center relative z-10">
                <div className="text-4xl mb-2 opacity-80">{icon}</div>
                <div className="text-white/90 text-xs font-medium tracking-wider uppercase">{category}</div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>


        <div className="p-4 pb-2">
          <h3 className="font-bold text-[#1a3a5c] text-sm mb-1 group-hover:text-[#e8421a] transition-colors" style={{ fontFamily: 'Rajdhani' }}>
            {name}
          </h3>
          <div className="flex items-center gap-1 text-[#e8421a] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View Details <ArrowRight size={12} />
          </div>
        </div>
      </Link>

      <div className="p-4 pt-0 flex items-center justify-between border-t border-gray-50 mt-2">
        <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isCompared}
            onChange={() => toggleCompare(slug)}
            className="rounded border-gray-300 text-[#e8421a] focus:ring-[#e8421a]"
          />
          Compare
        </label>
      </div>
    </motion.div>
  )
}


// Subcategory card (for categories with nested sub-items)
function SubcategoryCard({ item, category, index }) {
  const productCount = item.products?.length || item.items?.reduce((sum, i) => sum + (i.products?.length || 0), 0) || 0
  const colors = categoryColors[category] || { from: '#1a3a5c', to: '#2d5f8a' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
    >
      <Link
        to={item.href}
        className="block bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-[#e8421a]/30 transition-all group"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: `linear-gradient(135deg, ${colors.from}15, ${colors.to}25)` }}
        >
          {item.items ? (
            <Layers size={22} className="text-[#1a3a5c]" />
          ) : (
            <Package size={22} className="text-[#1a3a5c]" />
          )}
        </div>
        <h3 className="font-bold text-[#1a3a5c] text-lg mb-1 group-hover:text-[#e8421a] transition-colors" style={{ fontFamily: 'Rajdhani' }}>
          {item.label}
        </h3>
        {productCount > 0 && (
          <p className="text-gray-400 text-sm mb-3">
            {productCount} {productCount === 1 ? 'product' : 'products'}
          </p>
        )}
        <div className="flex items-center gap-1 text-[#e8421a] text-sm font-medium">
          View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  )
}

export default function CategoryPage() {
  const { slug } = useParams()
  const location = useLocation()

  const result = findBySlug(slug)

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1a3a5c] mb-2">Category not found</h2>
          <p className="text-gray-500 mb-4">The page "{slug}" could not be found.</p>
          <Link to="/" className="text-[#e8421a] hover:underline font-semibold">Go Home</Link>
        </div>
      </div>
    )
  }

  const { node, breadcrumb, type, parent } = result
  const categoryName = parent?.label || node.label

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-[#0d1f33] py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#e8421a] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight size={12} />
                {i === breadcrumb.length - 1 ? (
                  <span className="text-white font-medium">{b.label}</span>
                ) : (
                  <Link to={b.href} className="hover:text-white transition-colors">{b.label}</Link>
                )}
              </span>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[#e8421a] text-xs font-bold tracking-widest uppercase">
              {type === 'category' ? 'Products' : categoryName}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2" style={{ fontFamily: 'Rajdhani' }}>
              {node.label}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Categories with subcategories */}
        {(type === 'category' && node.subcategories?.length > 0) && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {node.subcategories.map((sub, i) => (
              <SubcategoryCard key={sub.label} item={sub} category={categoryName} index={i} />
            ))}
          </div>
        )}

        {/* Categories with direct products (Software, Camera, Services) */}
        {(type === 'category' && (!node.subcategories || node.subcategories.length === 0) && node.products?.length > 0) && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {node.products.map((p, i) => (
              <ProductCard key={p} name={p} category={categoryName} index={i} />
            ))}
          </div>
        )}

        {/* Subcategory with nested items (e.g. MPT Equipment → Electromagnetic Yoke, Light) */}
        {type === 'subcategory-with-items' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {node.items.map((item, i) => (
              <SubcategoryCard key={item.label} item={item} category={categoryName} index={i} />
            ))}
          </div>
        )}

        {/* Subcategory with direct products (e.g. Metallurgical Microscope) */}
        {type === 'subcategory-with-products' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {node.products.map((p, i) => (
              <ProductCard key={p} name={p} category={categoryName} index={i} />
            ))}
          </div>
        )}

        {/* Nested items with products (e.g. Electromagnetic Yoke, Cable) */}
        {type === 'nested-item' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {node.products?.map((p, i) => (
              <ProductCard key={p} name={p} category={categoryName} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
