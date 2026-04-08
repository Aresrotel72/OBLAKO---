'use client'

import ScrollVelocity from '@/components/ScrollVelocity'

const BRANDS_ROW1 = 'Apple · mophie · Tech21 · Beats · Baseus · Anker · Spigen · UAG'
const BRANDS_ROW2 = 'Belkin · Samsung · JBL · Marshall · Xiaomi · Huawei · Honor · Redmi'

export default function BrandMarquee() {
  return (
    <section className="relative py-8 overflow-hidden border-y border-black/8">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <ScrollVelocity
        texts={[BRANDS_ROW1]}
        velocity={2}
        scrollerClassName="text-lg sm:text-xl font-display font-bold text-black/20 uppercase tracking-[0.2em] select-none"
        numCopies={4}
      />

      <ScrollVelocity
        texts={[BRANDS_ROW2]}
        velocity={-2}
        scrollerClassName="text-lg sm:text-xl font-display font-bold text-black/15 uppercase tracking-[0.2em] select-none"
        numCopies={4}
      />
    </section>
  )
}
