'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Clock, Navigation } from 'lucide-react'

export default function LocationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section 
      id="location" // <-- Ini kuncinya agar menu bar Lokasi merespon
      ref={ref} 
      style={{ backgroundColor: '#f2f0eb', padding: '6rem 0' }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 2.5rem' }}>
        
        {/* ── Judul ── */}
        <motion.div 
          initial="hidden" 
          animate={isInView ? 'visible' : 'hidden'} 
          variants={fadeUp} 
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p style={{ color: '#00754A', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
            Lokasi Kami
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#1E3932', letterSpacing: '-0.03em' }}>
            Mampir ke Warkop <span style={{ color: '#00754A' }}>78s</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* ── Teks Info Lokasi ── */}
          <motion.div 
            initial="hidden" 
            animate={isInView ? 'visible' : 'hidden'} 
            variants={fadeUp} 
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(0,117,74,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={24} color="#00754A" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E3932', marginBottom: '8px' }}>Alamat Lengkap</h3>
                <p style={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.65, fontSize: '0.95rem' }}>
                  Cikampek, Karawang, <br/>
                  Jawa Barat, Indonesia
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(0,117,74,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={24} color="#00754A" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E3932', marginBottom: '8px' }}>Jam Operasional</h3>
                <p style={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.65, fontSize: '0.95rem' }}>
                  Senin - Minggu <br/>
                  11.00 - 24.00 WIB
                </p>
              </div>
            </div>

            <a 
              href="https://share.google/FO30rKGrJd5SbMckA" // <-- Link asli dari kamu
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
                backgroundColor: '#00754A', color: '#fff', padding: '16px 28px', borderRadius: '50px', 
                fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', width: 'fit-content', 
                marginTop: '1rem', boxShadow: '0 4px 14px rgba(0,117,74,0.35)', transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Navigation size={18} /> Buka di Google Maps
            </a>
          </motion.div>

          {/* ── Map Embed Interaktif ── */}
          <motion.div 
            initial="hidden" 
            animate={isInView ? 'visible' : 'hidden'} 
            variants={fadeUp} 
            style={{ 
              width: '100%', height: '450px', borderRadius: '24px', overflow: 'hidden', 
              boxShadow: '0 24px 60px rgba(0,0,0,0.12)', position: 'relative' 
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.458925!3d-6.402484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6975a5e30c33ef%3A0xc3b7a5a8f4c3a3!2sCikampek%2C%20Karawang!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', inset: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  )
}