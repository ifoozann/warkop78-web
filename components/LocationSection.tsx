'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import {
  MapPin,
  Clock,
  Phone,
  Camera,
  ExternalLink,
  Navigation,
  CheckCircle2,
  XCircle,
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────────
   DESIGN TOKENS — mirror of tailwind.config.ts for runtime use
───────────────────────────────────────────────────────────────────────── */
const T = {
  canvas:     '#f2f0eb',
  ceramic:    '#edebe9',
  accent:     '#00754A',
  accentMuted:'#E8F5E9',
  houseGreen: '#1E3932',
  textBlack:  'rgba(0,0,0,0.87)',
  textMuted:  'rgba(0,0,0,0.55)',
  shadow: {
    card:     '0 0 .5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)',
    cardHover:'0 0 .5px rgba(0,0,0,0.14), 0 8px 28px rgba(0,0,0,0.13)',
    map:      '0 12px 40px rgba(0,0,0,0.14)',
  },
} as const

/* ─────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────────────────── */
const easeOut = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.60, ease: easeOut } },
}

const stagger = (delay = 0.10): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren: delay, delayChildren: 0.05 } },
})

const slideRight: Variants = {
  hidden:  { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.80, ease: easeOut } },
}

/* ─────────────────────────────────────────────────────────────────────────
   THE ONE AND ONLY WARKOP 78s LOCATION
   Source: https://share.google/FO30rKGrJd5SbMckA
   All location references in this file point exclusively to Cikampek.
───────────────────────────────────────────────────────────────────────── */
const LOCATION = {
  name:        'Warkop 78s',
  fullName:    'Warkop 78s Cikampek',
  line1:       'Cikampek',
  line2:       'Karawang, Jawa Barat',
  line3:       'Indonesia',
  phone:       '+62 812-3456-7890',
  whatsappUrl: 'https://wa.me/6281234567890?text=Halo+Warkop+78s!',
  instagram:   '@warkop78s',
  instagramUrl:'https://instagram.com/warkop78s',
  email:       'halo@warkop78s.id',

  hours: [
    { label: 'Senin – Jumat', open: '07:00', close: '23:00', display: '07.00 – 23.00 WIB' },
    { label: 'Sabtu',         open: '07:00', close: '24:00', display: '07.00 – 24.00 WIB' },
    { label: 'Minggu',        open: '07:00', close: '24:00', display: '07.00 – 24.00 WIB' },
  ],

  /**
   * Google Maps share: https://share.google/FO30rKGrJd5SbMckA
   *
   * For production:
   *   1. Open Google Maps → search Cikampek, Karawang
   *   2. Click Share → Embed a map → Copy iframe src
   *   3. Replace `mapsEmbedSrc` with that URL.
   *
   * The query-based src below works in development without an API key.
   */
  mapsEmbedSrc:
    'https://maps.google.com/maps?q=Cikampek%2C+Karawang%2C+Jawa+Barat%2C+Indonesia&t=roadmap&z=15&ie=UTF8&iwloc=B&output=embed',

  /** Direct-to-directions link (provided by the client) */
  mapsShareUrl: 'https://share.google/FO30rKGrJd5SbMckA',
} as const

/* ─────────────────────────────────────────────────────────────────────────
   LIVE OPEN/CLOSED INDICATOR
   Determines current status from the browser's local time.
───────────────────────────────────────────────────────────────────────── */
function useIsOpen(): { isOpen: boolean; closingAt: string } {
  const [isOpen, setIsOpen] = useState(false)
  const [closingAt, setClosingAt] = useState('23.00')

  useEffect(() => {
    function check() {
      const now   = new Date()
      const day   = now.getDay()       // 0 = Sun, 6 = Sat
      const hour  = now.getHours()
      const min   = now.getMinutes()
      const total = hour * 60 + min

      const openMin  = 7 * 60          // 07:00
      const closeMin = (day === 0 || day === 6) ? 24 * 60 : 23 * 60
      const closeDisplay = (day === 0 || day === 6) ? '24.00' : '23.00'

      setIsOpen(total >= openMin && total < closeMin)
      setClosingAt(closeDisplay)
    }

    check()
    const id = setInterval(check, 60_000)
    return () => clearInterval(id)
  }, [])

  return { isOpen, closingAt }
}

/* ─────────────────────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────────────────────── */

/** Pill status badge — green (open) or red (closed) */
function OpenStatusBadge() {
  const { isOpen, closingAt } = useIsOpen()

  return (
    <motion.div
      variants={fadeUp}
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        gap:             '8px',
        borderRadius:    '999px',
        padding:         '7px 14px',
        backgroundColor: isOpen ? '#E8F5E9' : 'rgba(239,68,68,0.10)',
        marginTop:       '14px',
      }}
    >
      {isOpen
        ? <CheckCircle2 size={14} color={T.accent} />
        : <XCircle      size={14} color="#DC2626" />
      }
      <span
        style={{
          fontSize:      '0.78rem',
          fontWeight:    700,
          letterSpacing: '-0.01em',
          color:         isOpen ? T.houseGreen : '#991B1B',
        }}
      >
        {isOpen
          ? `Buka Sekarang · Tutup pukul ${closingAt}`
          : 'Sedang Tutup · Buka pukul 07.00'}
      </span>
    </motion.div>
  )
}

/** Single hours row */
function HoursRow({ label, display, isToday }: { label: string; display: string; isToday: boolean }) {
  return (
    <div
      style={{
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'space-between',
        padding:         '9px 0',
        borderBottom:    '1px solid rgba(0,0,0,0.05)',
        backgroundColor: isToday ? 'rgba(0,117,74,0.04)' : 'transparent',
        borderRadius:    isToday ? '6px' : '0',
        paddingLeft:     isToday ? '6px' : '0',
        paddingRight:    isToday ? '6px' : '0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <Clock size={13} color={isToday ? T.accent : 'rgba(0,0,0,0.35)'} />
        <span
          style={{
            fontSize:   '0.875rem',
            color:      isToday ? T.houseGreen : T.textMuted,
            fontWeight: isToday ? 700 : 400,
          }}
        >
          {label}
        </span>
        {isToday && (
          <span
            style={{
              fontSize:        '0.625rem',
              fontWeight:      700,
              textTransform:   'uppercase',
              letterSpacing:   '0.08em',
              color:           T.accent,
              backgroundColor: T.accentMuted,
              padding:         '1px 6px',
              borderRadius:    '999px',
            }}
          >
            Hari ini
          </span>
        )}
      </div>
      <span
        style={{
          fontSize:   '0.875rem',
          fontWeight: isToday ? 700 : 400,
          color:      isToday ? T.houseGreen : T.textMuted,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {display}
      </span>
    </div>
  )
}

/** Contact row (phone / instagram / email) */
function ContactRow({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ComponentType<{ size?: number; color?: string }>
  label: string
  href: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display:        'flex',
        alignItems:     'center',
        gap:            '9px',
        textDecoration: 'none',
        padding:        '7px 0',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.querySelector('span')!.style.color = T.accent
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.querySelector('span')!.style.color = T.textMuted
      }}
    >
      <div
        style={{
          width:           '28px',
          height:          '28px',
          borderRadius:    '50%',
          backgroundColor: T.accentMuted,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          flexShrink:      0,
        }}
      >
        <Icon size={13} color={T.accent} />
      </div>
      <span
        style={{
          fontSize:      '0.875rem',
          color:         T.textMuted,
          letterSpacing: '-0.01em',
          transition:    'color 0.15s',
        }}
      >
        {label}
      </span>
    </a>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────────────── */
export default function LocationSection(): import("react/jsx-runtime").JSX.Element {
  const ref  = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const now     = new Date()
  const dayOfWeek = now.getDay() // 0 Sun, 1-5 Mon-Fri, 6 Sat
  // Map hours array index to today:  0=Sun→index2, 6=Sat→index1, else→index0
  const todayHoursIndex = dayOfWeek === 0 ? 2 : dayOfWeek === 6 ? 1 : 0

  return (
    <section
      ref={ref}
      id="locations"
      style={{ backgroundColor: T.ceramic, padding: '6rem 0' }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 2.5rem' }}>

        {/* ── Section Header ── */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ marginBottom: '3.5rem' }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontSize:      '0.6875rem',
              fontWeight:    700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color:         T.accent,
              marginBottom:  '10px',
            }}
          >
            Temukan Kami
          </motion.p>

          <motion.h2
            variants={fadeUp}
            style={{
              fontSize:      'clamp(2rem, 4vw, 3.2rem)',
              fontWeight:    800,
              lineHeight:    1.1,
              letterSpacing: '-0.03em',
              color:         T.houseGreen,
              marginBottom:  '12px',
            }}
          >
            Satu Tempat,{' '}
            <span style={{ color: T.accent }}>di Jantung</span>
            <br />
            Cikampek.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize:      '1rem',
              lineHeight:    1.6,
              color:         T.textMuted,
              maxWidth:      '480px',
              letterSpacing: '-0.01em',
            }}
          >
            Kami punya satu lokasi — dan kami all-in di sana.
            Datang langsung, atau pesan dari jauh; kami siap.
          </motion.p>
        </motion.div>

        {/* ── Main 2-column grid ── */}
        <div className="loc-main-grid" style={{ display: 'grid', gap: '2rem', alignItems: 'start' }}>

          {/* ─ Left: Info Card ─ */}
          <motion.div
            variants={stagger(0.09)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Address + hours + contact card */}
            <motion.div
              variants={fadeUp}
              style={{
                backgroundColor: '#fff',
                borderRadius:    '20px',
                boxShadow:       T.shadow.card,
                overflow:        'hidden',
                marginBottom:    '14px',
              }}
            >
              {/* Card header strip */}
              <div
                style={{
                  backgroundColor: T.houseGreen,
                  padding:         '20px 24px',
                  display:         'flex',
                  alignItems:      'center',
                  gap:             '14px',
                }}
              >
                <div
                  style={{
                    width:           '44px',
                    height:          '44px',
                    borderRadius:    '50%',
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                    flexShrink:      0,
                  }}
                >
                  <MapPin size={20} color="#fff" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize:      '1rem',
                      fontWeight:    800,
                      color:         '#fff',
                      letterSpacing: '-0.025em',
                      marginBottom:  '2px',
                    }}
                  >
                    {LOCATION.fullName}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.60)' }}>
                    {LOCATION.line1}, {LOCATION.line2}
                  </p>
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '22px 24px' }}>

                {/* Hours */}
                <p
                  style={{
                    fontSize:      '0.6875rem',
                    fontWeight:    700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.10em',
                    color:         T.accent,
                    marginBottom:  '8px',
                  }}
                >
                  Jam Operasional
                </p>

                {LOCATION.hours.map((h, i) => (
                  <HoursRow
                    key={h.label}
                    label={h.label}
                    display={h.display}
                    isToday={i === todayHoursIndex}
                  />
                ))}

                {/* Divider */}
                <div
                  style={{
                    height:        '1px',
                    backgroundColor:'rgba(0,0,0,0.07)',
                    margin:        '18px 0',
                  }}
                />

                {/* Contact */}
                <p
                  style={{
                    fontSize:      '0.6875rem',
                    fontWeight:    700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.10em',
                    color:         T.accent,
                    marginBottom:  '4px',
                  }}
                >
                  Hubungi Kami
                </p>

                <ContactRow
                  icon={Phone}
                  label={LOCATION.phone}
                  href={`tel:${LOCATION.phone.replace(/\D/g, '')}`}
                />
                <ContactRow
                  icon={Camera}
                  label={LOCATION.instagram}
                  href={LOCATION.instagramUrl}
                />

                {/* Divider */}
                <div
                  style={{
                    height:        '1px',
                    backgroundColor:'rgba(0,0,0,0.07)',
                    margin:        '18px 0',
                  }}
                />

                {/* CTA buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <motion.a
                    href={LOCATION.mapsShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      gap:            '8px',
                      padding:        '13px 20px',
                      borderRadius:   '50px',          /* pill — no exceptions */
                      backgroundColor: T.houseGreen,
                      color:           '#fff',
                      fontSize:        '0.875rem',
                      fontWeight:      700,
                      letterSpacing:   '-0.01em',
                      textDecoration:  'none',
                      boxShadow:       '0 4px 12px rgba(30,57,50,0.25)',
                    }}
                  >
                    <Navigation size={15} />
                    Petunjuk Arah
                    <ExternalLink size={12} style={{ opacity: 0.65 }} />
                  </motion.a>

                  <motion.a
                    href={LOCATION.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      gap:            '8px',
                      padding:        '11px 20px',
                      borderRadius:   '50px',          /* pill */
                      border:         `2px solid ${T.accent}`,
                      color:          T.accent,
                      fontSize:       '0.875rem',
                      fontWeight:     700,
                      letterSpacing:  '-0.01em',
                      textDecoration: 'none',
                    }}
                  >
                    {/* WhatsApp icon — inline SVG (not in Lucide) */}
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill={T.accent}
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat via WhatsApp
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Live open/closed badge */}
            <OpenStatusBadge />
          </motion.div>

          {/* ─ Right: Google Maps embed ─ */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{
              borderRadius: '20px',
              overflow:     'hidden',
              boxShadow:    T.shadow.map,
              border:       '1px solid rgba(0,0,0,0.07)',
            }}
          >
            {/* Map iframe */}
            <div style={{ position: 'relative', width: '100%' }}>
              <iframe
                src={LOCATION.mapsEmbedSrc}
                width="100%"
                height="460"
                style={{
                  border:   'none',
                  display:  'block',
                  /**
                   * Slight de-saturation so the map blends with the warm
                   * #f2f0eb design system canvas without clashing colors.
                   */
                  filter:   'saturate(0.88) contrast(1.04) brightness(1.01)',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Peta lokasi ${LOCATION.fullName} di Cikampek, Karawang`}
                aria-label="Google Maps menampilkan lokasi Warkop 78s di Cikampek, Karawang, Jawa Barat"
              />
            </div>

            {/* Map footer strip */}
            <div
              style={{
                backgroundColor: '#fff',
                padding:         '14px 20px',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'space-between',
                gap:             '12px',
                borderTop:       '1px solid rgba(0,0,0,0.07)',
                flexWrap:        'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width:           '32px',
                    height:          '32px',
                    borderRadius:    '50%',
                    backgroundColor: T.houseGreen,
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                    flexShrink:      0,
                  }}
                >
                  <MapPin size={14} color="#fff" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize:      '0.875rem',
                      fontWeight:    800,
                      color:         T.houseGreen,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {LOCATION.fullName}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: T.textMuted }}>
                    Cikampek, Karawang — Jawa Barat
                  </p>
                </div>
              </div>

              <a
                href={LOCATION.mapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '5px',
                  fontSize:       '0.8rem',
                  fontWeight:     700,
                  color:          T.accent,
                  textDecoration: 'none',
                  flexShrink:     0,
                }}
              >
                Buka Google Maps
                <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Responsive grid + pulse keyframe ── */}
      <style>{`
        @keyframes loc-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.45; }
        }
        @media (min-width: 1024px) {
          .loc-main-grid {
            grid-template-columns: 380px 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
