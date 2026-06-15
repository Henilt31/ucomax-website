import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-[160] bg-[#25D366] text-white shadow-2xl rounded-full px-4 py-3 flex items-center gap-2 border border-white/20 hover:bg-[#1da851] transition-colors group cursor-pointer"
    >
      <div className="relative flex items-center justify-center">
        <MessageSquare size={20} className="fill-white" />
        <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#e8421a]"></span>
        </span>
      </div>
      <span className="text-sm font-bold tracking-wide select-none" style={{ fontFamily: 'Rajdhani' }}>
        Technical Support
      </span>
    </motion.button>
  )
}
