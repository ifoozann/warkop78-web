'use client'

/**
 * ─── COMPONENT IMPORTS ────────────────────────────────────────────────────
 */
import LocationSection from '../components/LocationSection'
import ContactSection  from '../components/ContactSection'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion'
import {
  Coffee,
  Music,
  Film,
  Clock,
  ChevronRight,
  Camera,
  MessageCircle,
  Globe,
  Star,
  Wifi,
  Users,
  ArrowRight,
  Menu as MenuIcon,
  X,
} from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════════════
   DESIGN TOKENS 
══════════════════════════════════════════════════════════════════════ */
const T = {
  canvas: '#f2f0eb',
  ceramic: '#edebe9',
  accent: '#00754A',
  accentHover: '#005f3b',
  accentMuted: '#E8F5E9',
  houseGreen: '#1E3932',
  textBlack: 'rgba(0,0,0,0.87)',
  textMuted: 'rgba(0,0,0,0.55)',
  textSoft: 'rgba(255,255,255,0.70)',
  textFaint: 'rgba(255,255,255,0.40)',
  shadow: {
    card: '0 0 .5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)',
    cardHover: '0 0 .5px rgba(0,0,0,0.14), 0 6px 18px rgba(0,0,0,0.14)',
    nav: '0 1px 3px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.04), 0 8px 20px rgba(0,0,0,0.03)',
    fab: '0 0 6px rgba(0,0,0,0.24), 0 8px 12px rgba(0,0,0,0.14)',
    hero: '0 24px 60px rgba(0,0,0,0.15)',
  },
} as const

/* ═══════════════════════════════════════════════════════════════════════
   FRAMER MOTION VARIANTS
══════════════════════════════════════════════════════════════════════ */
const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: easeOut } },
}

const stagger = (delay = 0.10, childrenDelay = 0.05): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay, delayChildren: childrenDelay } },
})

/* ═══════════════════════════════════════════════════════════════════════
   STATIC DATA (Ubah Link Foto Disini Nanti)
══════════════════════════════════════════════════════════════════════ */
const EVENTS = [
  {
    id: 1,
    tag: 'NOBAR',
    title: 'Movie Night & Match Day',
    description: 'Layar besar kami selalu siap untuk nobar film seru atau pertandingan bola tim favoritmu.',
    schedule: 'Pantau IG untuk Jadwal Nobar',
    icon: Film,
    chipBg: '#FFF9C4',
    chipColor: '#5D4037',
    imageSrc: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700&q=80',
  },
  {
    id: 2,
    tag: 'BEAT CORNER',
    title: 'Live Music Sessions',
    description: 'Nongkrong makin asik ditemani penampil lokal. Request lagu kesukaanmu dan nyanyi bareng.',
    schedule: 'Setiap Malam Minggu · 20:00 WIB',
    icon: Music,
    chipBg: '#FCE4EC',
    chipColor: '#880E4F',
    imageSrc: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=700&q=80',
  },
]

const MENU_CATEGORIES = ['Semua', 'Signature', 'Coffee', 'Non-Coffee', 'Cemilan']

const MENU_ITEMS = [
  {
    name: 'Kopi Susu 78s',
    price: 'Rp 18.000',
    tag: 'Signature',
    category: 'Signature',
    desc: 'Espresso blend rahasia Warkop 78s dengan susu creamy dan gula aren.',
    imageSrc: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&q=80',
  },
  {
    name: 'Americano Klasik',
    price: 'Rp 15.000',
    tag: 'Coffee',
    category: 'Coffee',
    desc: 'Biji kopi pilihan Nusantara, diseduh sempurna untuk teman melek.',
    imageSrc: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=500&q=80',
  },
  {
    name: 'Matcha Latte',
    price: 'Rp 22.000',
    tag: 'Best Seller',
    category: 'Non-Coffee',
    desc: 'Paduan matcha premium dan susu segar buat kamu yang lagi gak ngopi.',
    imageSrc: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&q=80',
  },
  {
    name: 'Roti Bakar 78s',
    price: 'Rp 16.000',
    tag: 'Cemilan',
    category: 'Cemilan',
    desc: 'Roti bakar tebal dengan pilihan topping coklat, keju, atau matcha lumer.',
    imageSrc: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80',
  },
]

const FOOTER_LINKS = [
  {
    title: 'Layanan Kami',
    links: ['Dine-In & Nongkrong', 'Reservasi Tempat', 'Request Nobar', 'Live Music Corner'],
  },
  {
    title: 'Komunitas 78s',
    links: ['Galeri Acara', 'Merchandise', 'Join Beat Corner', 'Kolaborasi Event'],
  },
  {
    title: 'Informasi',
    links: ['Lokasi Cikampek', 'Jam Operasional', 'Hubungi WhatsApp', 'Tentang Kami'],
  },
]

/* ═══════════════════════════════════════════════════════════════════════
   SMOOTH SCROLL HELPER
══════════════════════════════════════════════════════════════════════ */
const scrollToId = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault()
  const targetId = id.replace('#', '')
  const elem = document.getElementById(targetId)
  if (elem) {
    const topPos = elem.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: topPos, behavior: 'smooth' })
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   SHARED PRIMITIVES
══════════════════════════════════════════════════════════════════════ */
function BtnPrimary({ children, className = '', style = {}, href = '#', onClick }: any) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 font-semibold text-white text-sm cursor-pointer ${className}`}
      style={{ backgroundColor: T.accent, borderRadius: '50px', padding: '14px 28px', ...style }}
    >
      {children}
    </motion.a>
  )
}

function BtnOutline({ children, className = '', style = {}, href = '#', dark = false, onClick }: any) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 font-semibold text-sm cursor-pointer ${className}`}
      style={{
        borderRadius: '50px', padding: '12px 28px',
        border: `2px solid ${dark ? 'rgba(255,255,255,0.30)' : T.houseGreen}`,
        color: dark ? '#fff' : T.houseGreen, ...style
      }}
    >
      {children}
    </motion.a>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.p variants={fadeUp} style={{ color: T.accent, fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
      {children}
    </motion.p>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 1 — GLOBAL NAV
══════════════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'Events', href: '#events' },
    { name: 'Fasilitas', href: '#fasilitas' },
    { name: 'Lokasi', href: '#location' },
  ]

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOut }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: scrolled ? 'rgba(242,240,235,0.94)' : T.canvas,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? T.shadow.nav : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 2.5rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        <a href="#hero" onClick={(e) => scrollToId(e, '#hero')} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: T.houseGreen, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Coffee size={16} color="#fff" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.125rem', color: T.houseGreen }}>
            Warkop <span style={{ color: T.accent }}>78s</span>
          </span>
        </a>

        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="hidden md:flex">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => { setMobileOpen(false); scrollToId(e, item.href); }}
              style={{ fontSize: '0.875rem', fontWeight: 600, color: 'rgba(0,0,0,0.60)', textDecoration: 'none' }}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <BtnPrimary href="#contact" onClick={(e: any) => scrollToId(e, '#contact')} style={{ padding: '10px 22px' }}>
            Reservasi (WA)
          </BtnPrimary>
        </div>

        <button onClick={() => setMobileOpen((v) => !v)} className="md:hidden" style={{ padding: '8px', color: T.houseGreen }}>
          {mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden', backgroundColor: T.canvas, borderTop: '1px solid rgba(0,0,0,0.08)' }}
          >
            <nav style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {navLinks.map((item) => (
                <a key={item.name} href={item.href} onClick={(e) => { setMobileOpen(false); scrollToId(e, item.href); }} style={{ fontSize: '1rem', fontWeight: 700, color: T.houseGreen, textDecoration: 'none' }}>
                  {item.name}
                </a>
              ))}
              <BtnPrimary href="#contact" onClick={(e: any) => { setMobileOpen(false); scrollToId(e, '#contact'); }} style={{ justifyContent: 'center' }}>Reservasi Via WA</BtnPrimary>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 2 — HERO
══════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" style={{ backgroundColor: T.canvas, minHeight: '100svh', display: 'flex', alignItems: 'center', paddingTop: '64px', overflow: 'hidden' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '5rem 2.5rem', width: '100%', display: 'grid', gridTemplateColumns: '1fr', gap: '3.5rem', alignItems: 'center' }} className="lg:grid-cols-hero">
        <motion.div variants={stagger(0.11, 0.05)} initial="hidden" animate="visible" style={{ order: 2 }} className="lg:order-1">
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: T.accent, display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.45} }`}</style>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: T.accent }}>
              Buka Setiap Hari · 11.00 – 24.00 WIB
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.035em', color: T.houseGreen, marginBottom: '24px' }}>
            Tempat Nongkrong
            <br />
            Asik di{' '}
            <span style={{ color: T.accent }}>Warkop 78s</span>.
          </motion.h1>

          <motion.p variants={fadeUp} style={{ fontSize: '1.0625rem', lineHeight: 1.65, color: 'rgba(0,0,0,0.57)', maxWidth: '520px', marginBottom: '40px' }}>
            Warkop 78s adalah tempat di mana kopi yang enak bertemu komunitas yang hangat di Cikampek. 
            Nongkrong santai, nonton film bareng, dengerin musik live — semua di satu tempat yang terasa seperti rumah.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}>
            <BtnPrimary href="#menu" onClick={(e: any) => scrollToId(e, '#menu')}>
              Lihat Menu <ArrowRight size={15} />
            </BtnPrimary>
            <BtnOutline href="#events" onClick={(e: any) => scrollToId(e, '#events')}>
              Lihat Events
            </BtnOutline>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 70, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1.0, ease: easeOut, delay: 0.15 }} style={{ position: 'relative', order: 1 }} className="lg:order-2">
          <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', boxShadow: T.shadow.hero, aspectRatio: '4/5', maxHeight: '640px', zIndex: 1 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80" alt="Suasana Warkop 78s" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,57,50,0.55) 0%, transparent 60%)' }} />
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 1024px) { .lg\\:grid-cols-hero { grid-template-columns: 3fr 2fr !important; } .lg\\:order-1 { order: 1 !important; } .lg\\:order-2 { order: 2 !important; } }
        @media (max-width: 767px) { .hidden.md\\:flex { display: none !important; } }
        @media (min-width: 768px) { .md\\:hidden { display: none !important; } }
      `}</style>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 3 — EVENTS
══════════════════════════════════════════════════════════════════════ */
function EventsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="events" ref={ref} style={{ backgroundColor: T.ceramic, padding: '6rem 0' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 2.5rem' }}>
        <motion.div variants={stagger()} initial="hidden" animate={isInView ? 'visible' : 'hidden'} style={{ marginBottom: '3.5rem' }}>
          <Eyebrow>Komunitas &amp; Acara</Eyebrow>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.1, color: T.houseGreen }}>
            What&apos;s Happening <br /> at <span style={{ color: T.accent }}>78s</span>
          </motion.h2>
        </motion.div>

        <motion.div variants={stagger(0.12)} initial="hidden" animate={isInView ? 'visible' : 'hidden'} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {EVENTS.map((ev) => (
            <motion.div key={ev.id} variants={scaleIn} whileHover={{ y: -8, boxShadow: T.shadow.cardHover }} style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: T.shadow.card, overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img src={ev.imageSrc} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                  <span style={{ fontSize: '0.625rem', fontWeight: 800, padding: '4px 10px', borderRadius: '999px', backgroundColor: ev.chipBg, color: ev.chipColor }}>{ev.tag}</span>
                </div>
              </div>

              <div style={{ padding: '20px 22px 22px' }}>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: T.houseGreen, marginBottom: '8px' }}>{ev.title}</h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.55, color: T.textMuted, marginBottom: '18px' }}>{ev.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: T.textMuted }}>
                    <Clock size={12} color={T.accent} /> {ev.schedule}
                  </span>
                  
                  {/* Tombol Info yang sekarang bisa di-klik mengarah ke Kontak */}
                  <a href="#contact" onClick={(e) => scrollToId(e, '#contact')} style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.8rem', fontWeight: 700, color: T.accent, textDecoration: 'none', cursor: 'pointer' }}>
                    Tanya Info <ChevronRight size={13} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 4 — MENU HIGHLIGHTS (Katalog Interaktif)
══════════════════════════════════════════════════════════════════════ */
function MenuHighlights() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeTab, setActiveTab] = useState('Semua')

  const filteredMenu = activeTab === 'Semua' ? MENU_ITEMS : MENU_ITEMS.filter(item => item.category === activeTab)

  return (
    <section id="menu" ref={ref} style={{ backgroundColor: T.canvas, padding: '6rem 0', minHeight: '80vh' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 2.5rem' }}>

        <motion.div variants={stagger()} initial="hidden" animate={isInView ? 'visible' : 'hidden'} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <Eyebrow>Katalog Menu</Eyebrow>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.1, color: T.houseGreen }}>
            Pilihan Favorit <br /> Warkop <span style={{ color: T.accent }}>78s</span>
          </motion.h2>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? 'visible' : 'hidden'} style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {MENU_CATEGORIES.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 20px', borderRadius: '50px', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s ease',
                border: `2px solid ${activeTab === tab ? T.accent : 'rgba(0,117,74,0.15)'}`,
                backgroundColor: activeTab === tab ? T.accent : 'transparent',
                color: activeTab === tab ? '#fff' : T.houseGreen,
              }}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((item) => (
              <motion.div
                layout key={item.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} whileHover={{ y: -6, boxShadow: T.shadow.cardHover }}
                style={{ backgroundColor: '#fff', borderRadius: '16px', boxShadow: T.shadow.card, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img src={item.imageSrc} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '4px 10px', borderRadius: '50px', fontWeight: 800, fontSize: '0.75rem', color: T.accent }}>
                    {item.price}
                  </div>
                </div>
                <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ display: 'inline-block', fontSize: '0.625rem', fontWeight: 800, padding: '4px 10px', borderRadius: '999px', backgroundColor: T.accentMuted, color: T.accent, marginBottom: '10px', alignSelf: 'flex-start' }}>{item.tag}</span>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: T.houseGreen, marginBottom: '8px' }}>{item.name}</h4>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.5, color: T.textMuted }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 5 — FASILITAS WARKOP
══════════════════════════════════════════════════════════════════════ */
function FeatureBand() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const features = [
    { icon: Wifi,  label: 'Free WiFi Cepat', desc: 'Cocok buat nugas atau mabar bareng teman' },
    { icon: Users, label: 'Community Hub',   desc: 'Sering ada live music & event seru di akhir pekan' },
    { icon: Film,  label: 'Area Nobar',      desc: 'Tersedia layar lebar untuk nonton pertandingan' },
    { icon: Coffee,label: 'Kopi Nusantara',  desc: 'Pilihan biji kopi lokal terbaik dengan harga pelajar' },
  ]

  return (
    <section id="fasilitas" ref={ref} style={{ backgroundColor: T.houseGreen, padding: '6rem 0' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 2.5rem', textAlign: 'center' }}>
        <motion.div variants={stagger(0.10)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <Eyebrow>Fasilitas Kami</Eyebrow>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.08, color: '#fff', marginBottom: '20px' }}>
            Lebih Dari Sekadar <br /> <span style={{ color: 'rgba(255,255,255,0.50)' }}>Tempat Ngopi.</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '1rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.62)', maxWidth: '600px', margin: '0 auto 44px' }}>
            Warkop 78s dirancang buat kamu yang mau nongkrong berjam-jam. Dari nugas bareng teman sampai nonton pertandingan tim favoritmu, kami siapkan tempatnya.
          </motion.p>

          <motion.div variants={stagger(0.09)} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', textAlign: 'left' }}>
            {features.map(({ icon: Icon, label, desc }) => (
              <motion.div key={label} variants={fadeUp} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0,117,74,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Icon size={20} color={T.accent} />
                </div>
                <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{label}</p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   SECTION 7 — FOOTER (Dirombak Total Sesuai Warkop Asli)
══════════════════════════════════════════════════════════════════════ */
function Footer() {
  const socialIcons = [
    { Icon: Camera, label: 'Instagram', link: 'https://instagram.com/warkop78s' },
    { Icon: MessageCircle, label: 'WhatsApp', link: '#contact' },
    { Icon: Globe, label: 'Maps', link: '#location' },
  ]

  return (
    <footer style={{ backgroundColor: '#142621' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '5rem 2.5rem 3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          <div style={{ gridColumn: 'span 2', minWidth: '240px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: T.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Coffee size={16} color="#fff" />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.125rem', color: '#fff' }}>
                Warkop <span style={{ color: T.accent }}>78s</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.52)', maxWidth: '300px', marginBottom: '22px' }}>
              Satu tempat, satu komunitas — di jantung Cikampek, Karawang. Kopi yang enak, suasana hangat, dan selalu ada keseruan setiap minggunya.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socialIcons.map(({ Icon, label, link }) => (
                <a key={label} href={link} aria-label={label} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.15s' }}>
                  <Icon size={16} color="rgba(255,255,255,0.68)" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fff', marginBottom: '16px' }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((link) => (
                  <li key={link} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.52)' }}>{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.09)', paddingTop: '28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.38)' }}>
            © 2026 Warkop 78s — Cikampek, Karawang, Jawa Barat.
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   FLOATING CTA (Diubah menjadi Tombol WhatsApp)
══════════════════════════════════════════════════════════════════════ */
function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="fab"
          href="https://wa.me/6281234567890" // <-- Ganti nomor WA Warkop 78s di sini
          target="_blank"
          rel="noopener noreferrer"
          title="Chat WhatsApp"
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.10 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'fixed', bottom: '24px', right: '24px', zIndex: 200, width: '56px', height: '56px', borderRadius: '50%',
            backgroundColor: '#25D366', // Warna Hijau Khas WhatsApp
            display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: T.shadow.fab, cursor: 'pointer',
          }}
        >
          {/* Menggunakan MessageCircle sebagai representasi Chat */}
          <MessageCircle size={26} color="#fff" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EventsSection />
        <MenuHighlights />
        <FeatureBand />
        <LocationSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}