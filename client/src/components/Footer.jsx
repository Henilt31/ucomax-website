import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0d1f33] text-white">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Logo + description */}
        <div className="lg:col-span-1">
          <Link to="/">
            <img src="https://www.ucomax.com/assets/img/logo-footer.png" alt="UCOMAX" className="h-10 mb-4 brightness-0 invert" />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Leading manufacturer and supplier of quality engineering products – NDT, Microscopes, Software & more.
          </p>
          <div className="flex gap-3 mt-4">
            {[
              { href: 'https://x.com/ucomax', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
              { href: 'https://www.facebook.com/Ucomax.India/', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
              { href: 'https://www.instagram.com/ucomax.india/', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path fill="#0d1f33" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><circle cx="17.5" cy="6.5" r="1" fill="#0d1f33"/></svg> },
              { href: 'https://www.linkedin.com/company/ucomax/', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> }
            ].map(({ href, icon }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#e8421a] transition-colors">
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* NDT Products */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-[#e8421a]">NDT Products</h4>
          <ul className="space-y-2">
            {['MPT Equipment', 'Ultrasonics', 'Blocks and Tubes', 'Scanners', 'Electromagnetic Testing Probes'].map(item => (
              <li key={item}>
                <Link to={`/subcategory/${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="text-gray-400 text-sm hover:text-white transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Microscope */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-[#e8421a]">Microscope</h4>
          <ul className="space-y-2">
            {['Metallurgical Microscope', 'Mono Zoom Microscope', 'Stereo Zoom Microscope', 'Portable Microscope', 'Vision Measuring System'].map(item => (
              <li key={item}>
                <Link to={`/subcategory/${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="text-gray-400 text-sm hover:text-white transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services + Camera */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-[#e8421a]">Services</h4>
          <ul className="space-y-2">
            {['Customized Solution', 'Research & Development', 'Repairing of Equipment & Accessories', '3D Scan, Design & Printing'].map(item => (
              <li key={item}>
                <Link to={`/product/${item.toLowerCase().replace(/[^a-z0-9&]+/g, '-').replace(/-+/g, '-')}`}
                  className="text-gray-400 text-sm hover:text-white transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
          <h4 className="font-semibold text-sm uppercase tracking-wider mt-6 mb-4 text-[#e8421a]">Software</h4>
          <ul className="space-y-2">
            {['Measurement Prime', 'Aluminium Prime', 'Foundry Prime', 'Copper Prime', 'Hardness Prime'].map(item => (
              <li key={item}>
                <Link to={`/product/${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="text-gray-400 text-sm hover:text-white transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-[#e8421a]">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex gap-2 text-sm text-gray-400">
              <MapPin size={14} className="flex-shrink-0 mt-0.5 text-[#e8421a]" />
              <span>989/16/2, First Floor Near Gayatri Krupa Ice Industries, Makarpura, Vadodara, Gujarat – 390010</span>
            </li>
            <li>
              <a href="tel:+916358833112" className="flex gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone size={14} className="flex-shrink-0 mt-0.5 text-[#e8421a]" /> +91 63588 33112
              </a>
            </li>
            <li>
              <a href="mailto:sales@ucomax.com" className="flex gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail size={14} className="flex-shrink-0 mt-0.5 text-[#e8421a]" /> sales@ucomax.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-sm">© 2025 Ucomax Private Limited. All Rights Reserved.</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* WhatsApp bubble */}
      <a
        href="https://wa.me/916358833112?text=Hello%20UCOMAX%2C%20I%20have%20a%20query!"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        title="Chat on WhatsApp"
      >
        <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </footer>
  )
}
