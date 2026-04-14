'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return
    gsap.to(contentRef.current, {
      y: -80, ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center text-center px-4 py-32 sm:py-44 overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 0%, rgba(0,113,227,0.07) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-3xl mx-auto">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-8"
        >
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-foreground-muted">
            Аксессуары · Полоцк · 2026
          </span>
        </motion.div>

        {/* Заголовок — двустрочный, крупный */}
        <h1 className="font-display font-bold tracking-tight leading-[0.9] text-foreground mb-6 select-none">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[clamp(3rem,9vw,7rem)]"
          >
            iPhone 17 Pro.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="text-[clamp(3rem,9vw,7rem)] text-foreground-muted"
          >
            Чехол к нему.
          </motion.div>
        </h1>

        {/* Подзаголовок */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
          className="text-base sm:text-lg text-foreground-secondary leading-relaxed max-w-md mx-auto mb-10 font-light"
        >
          Оригинальные чехлы Apple и топовые бренды.<br />
          Бронируй онлайн — забирай сегодня в Полоцке.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/cases"
              data-magnetic
              data-cursor="cta"
              className="btn-primary inline-flex items-center justify-center gap-2 text-sm font-semibold group"
            >
              Смотреть каталог
              <span className="arrow-bounce inline-block"><ArrowRight size={16} /></span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/actions"
              data-magnetic
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-foreground border border-border bg-white/70 backdrop-blur-sm hover:border-[#0071e3]/40 hover:text-[#0071e3] hover:bg-white transition-all duration-200 shadow-sm"
            >
              Забронировать
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade to section-warm (matches first bridge) */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f5f5f7] to-transparent pointer-events-none" />
    </section>
  )
}
