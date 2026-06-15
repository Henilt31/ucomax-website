import axios from 'axios'

export function useAnalytics() {
  const trackEvent = async (eventType, eventData = {}) => {
    try {
      // client-side event tracking
      await axios.post('/api/analytics', { eventType, eventData })
    } catch (err) {
      console.warn('Analytics logging failed:', err.message)
    }
  }

  return {
    trackProductView: (productSlug, productName) =>
      trackEvent('product_view', { slug: productSlug, name: productName }),
    trackRFQSubmit: (rfqData) =>
      trackEvent('rfq_submit', rfqData),
    trackResourceDownload: (resourceName, productCategory) =>
      trackEvent('download', { resourceName, category: productCategory }),
    trackWhatsAppClick: (location) =>
      trackEvent('whatsapp_click', { location }),
  }
}
