import { motion } from 'framer-motion'
import { useAnalytics } from '../hooks/useAnalytics'

export default function WhatsAppWidget() {
  const analytics = useAnalytics()

  const handleWhatsAppClick = () => {
    analytics.trackWhatsAppClick('floating_widget')
    const phoneNumber = '916358833112'
    const templateMessage = encodeURIComponent('Hello UCOMAX Team, I would like technical assistance regarding your products.')
    window.open(`https://wa.me/${phoneNumber}?text=${templateMessage}`, '_blank', 'noreferrer')
  }

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[160] bg-[#25D366] text-white shadow-2xl rounded-full p-4 flex items-center justify-center border border-white/20 hover:bg-[#1da851] transition-all cursor-pointer w-14 h-14"
      aria-label="WhatsApp Technical Support"
    >
      <div className="relative flex items-center justify-center w-full h-full">
        <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" className="text-white">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.338 5.395 0 11.95 0c3.178.001 6.165 1.24 8.413 3.488 2.247 2.247 3.486 5.233 3.487 8.412-.003 6.557-5.338 11.892-11.893 11.892-2.01-.001-3.982-.511-5.725-1.488L0 24zm6.49-4.22c1.7.994 3.435 1.503 5.4 1.504 5.454 0 9.894-4.44 9.897-9.893.002-2.64-1.026-5.123-2.895-6.993C17.07 2.528 14.587 1.5 11.95 1.5c-5.46 0-9.897 4.437-9.9 9.893 0 2.046.533 4.02 1.547 5.765l-.995 3.635 3.72-.975zM17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#e8421a]"></span>
        </span>
      </div>
    </motion.button>
  )
}

