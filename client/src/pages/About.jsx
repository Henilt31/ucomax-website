import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'

const sections = [
  { id: 'welcome', label: 'Welcome to Ucomax Group' },
  { id: 'vision-mission-goals', label: 'Vision, Mission & Corporate Goals' },
  { id: 'adherence-to-quality', label: 'Adherence to Quality' },
  { id: 'infrastructure-rd', label: 'Infrastructure & R&D Centre' },
  { id: 'our-team', label: 'Our Team' },
  { id: 'distributor', label: 'Become Our Distributor' },
]

export default function About() {
  return (
    <div>
      {/* Hero */}
      <div className="relative bg-[#0d1f33] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://www.ucomax.com/assets/img/about-us.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f33] to-[#0d1f33]/70" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[#e8421a] text-xs font-bold tracking-widest uppercase">About Us</span>
            <h1 className="text-5xl font-bold text-white mt-2" style={{ fontFamily: 'Rajdhani' }}>
              Welcome to Ucomax Group
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-4 gap-10">
        {/* Sidebar nav */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 bg-[#f4f7fb] rounded-xl overflow-hidden">
            <div className="bg-[#1a3a5c] px-4 py-3">
              <p className="text-white font-semibold text-sm">Navigation</p>
            </div>
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block px-4 py-3 text-sm text-[#1a3a5c] hover:bg-[#1a3a5c] hover:text-white transition-colors border-b border-gray-100 last:border-0"
              >
                {s.label}
              </a>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="lg:col-span-3 space-y-14">
          {/* Welcome */}
          <AnimatedSection id="welcome">
            <h2 className="text-3xl font-bold text-[#1a3a5c] mb-4" style={{ fontFamily: 'Rajdhani' }}>
              Welcome to Ucomax Group
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Ucomax Pvt. Ltd. is a venture brought together by a team of experts having a collective experience of about a decade. Ucomax leads the way in today's product innovation, customer service and quality product manufacturing. We commit ourselves to seek continuous improvement in everything we do.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our success will be measured by our positive contribution to our customers, employees and communities, and by our recognition as a leading manufacturer and supplier of quality engineering products.
            </p>
          </AnimatedSection>

          {/* Vision Mission Goals */}
          <AnimatedSection id="vision-mission-goals">
            <h2 className="text-3xl font-bold text-[#1a3a5c] mb-6" style={{ fontFamily: 'Rajdhani' }}>
              Vision, Mission & Corporate Goals
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#1a3a5c] text-white rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3 text-[#e8421a]" style={{ fontFamily: 'Rajdhani' }}>Vision</h3>
                <p className="text-gray-300 text-sm">
                  To be a Global Engineering company, most admired for its Affordability, Quality and Accessibility of products.
                </p>
              </div>
              <div className="bg-[#f4f7fb] rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3 text-[#1a3a5c]" style={{ fontFamily: 'Rajdhani' }}>Mission</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {[
                    'Identify and exceed customer expectations through highest quality and service',
                    'Constantly innovate and strive to beat our own standards',
                    'Provide a safe workplace with open communication and teamwork',
                    'Comply with requirements and maintain effectiveness of our QMS',
                  ].map((m, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle size={14} className="text-[#e8421a] flex-shrink-0 mt-0.5" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#e8421a]/5 border border-[#e8421a]/20 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3 text-[#1a3a5c]" style={{ fontFamily: 'Rajdhani' }}>Corporate Goals</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {[
                    'Make technology affordable to all',
                    'Employ well researched modern technology',
                    'Seamless delivery of products',
                    'Treat customers, suppliers, and employees with honesty and respect',
                  ].map((g, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle size={14} className="text-[#e8421a] flex-shrink-0 mt-0.5" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* Quality */}
          <AnimatedSection id="adherence-to-quality">
            <h2 className="text-3xl font-bold text-[#1a3a5c] mb-4" style={{ fontFamily: 'Rajdhani' }}>
              Adherence to Quality
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At Ucomax, we ensure that every product meets the highest quality standards. Our products are ISO certified and backed by all the necessary approvals, compliances, and certifications relevant to our industry. We take pride in delivering consistent quality across our entire product range. Each unit undergoes stringent quality checks and rigorous assessments before leaving our facility, ensuring reliability and peace of mind for our customers.
            </p>
          </AnimatedSection>

          {/* Infrastructure */}
          <AnimatedSection id="infrastructure-rd">
            <h2 className="text-3xl font-bold text-[#1a3a5c] mb-4" style={{ fontFamily: 'Rajdhani' }}>
              Infrastructure & R&D Centre
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Meticulously planned and built to modern construction standards, our production facility is located in Vadodara, Gujarat. The infrastructure is equipped with advanced assembly lines and is backed by a fully integrated in-house R&D center, which allows us to perform multiple functions in one cycle at an efficient speed while ensuring the safety of our multi-skilled personnel and state-of-the-art equipment.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our R&D Department is for the most complex and challenging conditions. Our approach to innovation with a passion to solve unmet needs, inspiring hope and new possibility in people all over the world.
            </p>
          </AnimatedSection>

          {/* Team */}
          <AnimatedSection id="our-team">
            <h2 className="text-3xl font-bold text-[#1a3a5c] mb-4" style={{ fontFamily: 'Rajdhani' }}>
              Our Team
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Ucomax has a team of highly dedicated and skilled people from engineers, innovators to designers. Forging a right combination of youth and experience in our team, we manufacture engineering equipments that are of highest standards with unmatched pricing. Our Co-members are experts in their respective fields, who share their expert in depth subject knowledge & extend their support services as well. Our team is for the most complex and challenging conditions. Inspiring hope and new possibility in people all over the world.
            </p>
          </AnimatedSection>

          {/* Distributor */}
          <AnimatedSection id="distributor">
            <div className="bg-[#0d1f33] rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Rajdhani' }}>
                    We want to serve more than 100 countries within 5 years.
                  </h2>
                  <p className="text-gray-400 mb-6">Want to be our distributor?</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-[#e8421a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#c93614] transition-colors"
                  >
                    Contact Us <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="p-8 flex items-center">
                  <img
                    src="https://www.ucomax.com/assets/img/map_img.png"
                    alt="World Map"
                    className="w-full object-contain opacity-60"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </main>
      </div>
    </div>
  )
}
