'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion'
import { Send, CheckCheck, Camera, MessageCircle, Mail } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────────────────────────────────── */
const T = {
  canvas:     '#f2f0eb',
  accent:     '#00754A',
  accentHover:'#005f3b',
  houseGreen: '#1E3932',
  textSoft:   'rgba(255,255,255,0.68)',
  textFaint:  'rgba(255,255,255,0.40)',
  shadow: {
    card: '0 0 .5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)',
    btn:  '0 4px 14px rgba(0,117,74,0.35)',
  },
} as const

const easeOut = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.60, ease: easeOut } },
}

const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.52, ease: easeOut } },
}

const stagger = (delay = 0.11): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren: delay, delayChildren: 0.06 } },
})

/* ─────────────────────────────────────────────────────────────────────────
   CONTACT CHANNEL DATA
   All references are for a single location: Cikampek, West Java.
───────────────────────────────────────────────────────────────────────── */
const CHANNELS = [
  {
    id:      'wa',
    label:   'WhatsApp',
    handle:  '+62 812-3456-7890',
    desc:    'Pesan, tanya menu, atau reservasi. Kami balas dengan cepat.',
    cta:     'Chat Sekarang',
    href:    'https://wa.me/6281234567890?text=Halo+Warkop+78s%2C+saya+mau+tanya...',
    iconPath:'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
    iconFill: true,
    bgLight: 'rgba(37,211,102,0.10)',
    iconColor:'#25D366',
  },
  {
    id:      'ig',
    label:   'Instagram',
    handle:  '@warkop78s',
    desc:    'Foto-foto kopi, behind the scenes events, dan update harian.',
    cta:     'Follow Kami',
    href:    'https://instagram.com/warkop78s',
    iconComponent: Camera,
    bgLight: 'rgba(228,64,95,0.10)',
    iconColor:'#E4405F',
  },
  {
    id:      'email',
    label:   'Email',
    handle:  'halo@warkop78s.id',
    desc:    'Partnership, kolaborasi, atau sekadar mau say hello.',
    cta:     'Kirim Email',
    href:    'mailto:halo@warkop78s.id',
    iconComponent: Mail,
    bgLight: 'rgba(0,117,74,0.12)',
    iconColor: T.accent,
  },
] as const

/* ─────────────────────────────────────────────────────────────────────────
   NEWSLETTER FORM
   Renders an email capture with a pill input + pill send button.
   State: idle → submitting → success.
───────────────────────────────────────────────────────────────────────── */
function NewsletterForm() {
  const [email, setEmail]     = useState('')
  const [status, setStatus]   = useState<'idle' | 'busy' | 'done'>('idle')
  const [error,  setError]    = useState('')

  function validate(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate(email)) {
      setError('Masukkan alamat email yang valid.')
      return
    }
    setError('')
    setStatus('busy')

    /**
     * TODO: Wire this to your preferred email service.
     * e.g. Mailchimp, Klaviyo, Resend, etc.
     * Replace the timeout below with your actual API call.
     */
    await new Promise((r) => setTimeout(r, 900))
    setStatus('done')
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: '100%', maxWidth: '440px' }}
      noValidate
    >
      <AnimatePresence mode="wait">
        {status === 'done' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display:         'flex',
              alignItems:      'center',
              gap:             '10px',
              backgroundColor: 'rgba(0,117,74,0.18)',
              borderRadius:    '50px',
              padding:         '14px 22px',
            }}
          >
            <CheckCheck size={18} color={T.accent} />
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff' }}>
              Kamu sudah terdaftar! Nantikan kejutan dari kami. ☕
            </span>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div
              style={{
                display:         'flex',
                gap:             '0',
                borderRadius:    '50px',       /* outer pill shell */
                overflow:        'hidden',
                backgroundColor: 'rgba(255,255,255,0.10)',
                border:          '1.5px solid rgba(255,255,255,0.18)',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                placeholder="emailkamu@contoh.com"
                disabled={status === 'busy'}
                aria-label="Alamat email untuk notifikasi acara"
                style={{
                  flex:            1,
                  minWidth:        0,
                  border:          'none',
                  outline:         'none',
                  backgroundColor: 'transparent',
                  color:           '#fff',
                  fontSize:        '0.875rem',
                  fontFamily:      'inherit',
                  letterSpacing:   '-0.01em',
                  padding:         '12px 20px',
                }}
              />
              <motion.button
                type="submit"
                disabled={status === 'busy'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display:         'flex',
                  alignItems:      'center',
                  gap:             '6px',
                  padding:         '12px 22px',
                  backgroundColor: T.accent,
                  color:           '#fff',
                  border:          'none',
                  borderRadius:    '50px',     /* inner pill CTA */
                  fontSize:        '0.875rem',
                  fontWeight:      700,
                  fontFamily:      'inherit',
                  letterSpacing:   '-0.01em',
                  cursor:          status === 'busy' ? 'not-allowed' : 'pointer',
                  flexShrink:      0,
                  opacity:         status === 'busy' ? 0.7 : 1,
                  transition:      'opacity 0.2s',
                  boxShadow:       T.shadow.btn,
                  margin:          '-1px',     /* compensate border */
                }}
              >
                {status === 'busy' ? (
                  <span
                    style={{
                      width:        '14px',
                      height:       '14px',
                      borderRadius: '50%',
                      border:       '2px solid rgba(255,255,255,0.4)',
                      borderTopColor:'#fff',
                      animation:    'spin 0.7s linear infinite',
                      display:      'block',
                    }}
                  />
                ) : (
                  <Send size={14} />
                )}
                {status === 'busy' ? 'Mendaftar...' : 'Daftar'}
              </motion.button>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontSize:   '0.78rem',
                  color:      '#FCA5A5',
                  marginTop:  '8px',
                  paddingLeft:'16px',
                }}
              >
                {error}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   CHANNEL CARD
───────────────────────────────────────────────────────────────────────── */
function ChannelCard({
  channel,
}: {
  channel: (typeof CHANNELS)[number]
}) {
  const isWA = channel.id === 'wa'

  return (
    <motion.a
      variants={scaleIn}
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -6, transition: { duration: 0.28, ease: 'easeOut' } }}
      whileTap={{ scale: 0.97 }}
      style={{
        display:        'flex',
        flexDirection:  'column',
        gap:            '12px',
        backgroundColor:'rgba(255,255,255,0.07)',
        border:         '1px solid rgba(255,255,255,0.10)',
        borderRadius:   '16px',
        padding:        '22px',
        textDecoration: 'none',
        cursor:         'pointer',
        transition:     'background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.12)'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.07)'
      }}
    >
      {/* Icon */}
      <div
        style={{
          width:           '44px',
          height:          '44px',
          borderRadius:    '50%',
          backgroundColor: channel.bgLight,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          flexShrink:      0,
        }}
      >
        {isWA ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill={channel.iconColor} aria-hidden="true">
            <path d={(channel as { iconPath: string }).iconPath} />
          </svg>
        ) : (
          (() => {
            const Icon = (channel as { iconComponent: React.ComponentType<{ size?: number; color?: string }> }).iconComponent
            return <Icon size={20} color={channel.iconColor} />
          })()
        )}
      </div>

      {/* Label + handle */}
      <div>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'rgba(255,255,255,0.45)', marginBottom: '3px' }}>
          {channel.label}
        </p>
        <p style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
          {channel.handle}
        </p>
      </div>

      {/* Description */}
      <p style={{ fontSize: '0.875rem', lineHeight: 1.55, color: T.textSoft, flexGrow: 1 }}>
        {channel.desc}
      </p>

      {/* CTA arrow */}
      <div
        style={{
          display:    'flex',
          alignItems: 'center',
          gap:        '5px',
          fontSize:   '0.825rem',
          fontWeight: 700,
          color:      T.accent,
        }}
      >
        {channel.cta}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
    </motion.a>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────────────── */
export default function ContactSection() {
  const ref    = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="contact"
      style={{ backgroundColor: T.houseGreen, padding: '6rem 0' }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 2.5rem' }}>

        {/* ── Header ── */}
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
            Tetap Terhubung
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{
              display:       'flex',
              flexWrap:      'wrap',
              alignItems:    'flex-end',
              justifyContent:'space-between',
              gap:           '2rem',
            }}
          >
            <h2
              style={{
                fontSize:      'clamp(2rem, 4vw, 3.2rem)',
                fontWeight:    800,
                lineHeight:    1.1,
                letterSpacing: '-0.03em',
                color:         '#fff',
              }}
            >
              Satu komunitas.
              <br />
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>Banyak cara</span>{' '}
              <span style={{ color: T.accent }}>terhubung.</span>
            </h2>

            {/* Newsletter sign-up — right side on desktop */}
            <motion.div
              variants={fadeUp}
              style={{ maxWidth: '440px', width: '100%' }}
            >
              <p
                style={{
                  fontSize:      '0.875rem',
                  lineHeight:    1.6,
                  color:         T.textSoft,
                  marginBottom:  '14px',
                  letterSpacing: '-0.01em',
                }}
              >
                Daftar dan dapatkan notifikasi event, menu baru,
                dan promo eksklusif langsung ke inbox kamu.
              </p>
              <NewsletterForm />
              <p style={{ fontSize: '0.72rem', color: T.textFaint, marginTop: '10px', paddingLeft: '4px' }}>
                Tidak ada spam. Unsubscribe kapan saja. Janji.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Channel Cards ── */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap:                 '1.25rem',
          }}
        >
          {CHANNELS.map((ch) => (
            <ChannelCard key={ch.id} channel={ch} />
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Placeholder color override for dark background */
        input::placeholder {
          color: rgba(255, 255, 255, 0.35) !important;
        }
      `}</style>
    </section>
  )
}
