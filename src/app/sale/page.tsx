'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Tag, Gift, ArrowRight, Filter, Flame } from 'lucide-react'
import { useState } from 'react'
import { DEMO_ANDROID_SALE } from '@/lib/demo-products'
import { formatPrice } from '@/lib/utils'
import BlobBg from '@/components/ui/BlobBg'

const ease = [0.16, 1, 0.3, 1] as const

const BRANDS = ['Все', 'Samsung', 'Xiaomi', 'Redmi', 'Huawei', 'Honor']

const brandOf = (name: string) => {
  const n = name.toLowerCase()
  if (n.includes('samsung')) return 'Samsung'
  if (n.includes('redmi')) return 'Redmi'
  if (n.includes('xiaomi')) return 'Xiaomi'
  if (n.includes('huawei')) return 'Huawei'
  if (n.includes('honor')) return 'Honor'
  return 'Другие'
}

export default function SalePage() {
  const [activeBrand, setActiveBrand] = useState('Все')

  const filtered = activeBrand === 'Все'
    ? DEMO_ANDROID_SALE
    : DEMO_ANDROID_SALE.filter((p) => brandOf(p.name) === activeBrand)

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-foreground-muted mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
          <span>/</span>
          <span className="text-[#ff453a]">Распродажа</span>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#fff0f0] to-[#ffe8e8] border border-[#ff453a]/15 p-8 sm:p-12 mb-10"
        >
          <BlobBg
            colors={['#ff453a', '#ff6b35', '#ff9f0a']}
            count={3}
            blur={80}
            opacity={0.2}
          />
          <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Flame size={16} className="text-[#ff453a]" />
              <span className="text-xs font-bold text-[#ff453a] uppercase tracking-widest">Горячая распродажа</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3 tracking-tight">
              Чехлы Android<br />
              <span className="text-[#ff453a]">до −70%</span>
            </h1>
            <p className="text-foreground-muted text-base sm:text-lg max-w-lg leading-relaxed mb-6">
              Более 1000 чехлов для Samsung, Xiaomi, Huawei, Honor и Redmi.
              Отличный выбор или в подарок к заказу от 50 BYN.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ff453a]/10 border border-[#ff453a]/15 text-sm text-[#ff453a] font-semibold">
                <Gift size={15} />
                Подарок при заказе от 50 BYN
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/4 border border-border text-sm text-foreground-muted">
                1000+ чехлов в наличии
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gift banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="flex items-start gap-4 bg-[#f0faf0] border border-[#30d158]/20 rounded-2xl p-5 mb-8"
        >
          <div className="w-10 h-10 rounded-xl bg-[#30d158]/15 flex items-center justify-center shrink-0">
            <Gift size={20} className="text-[#30d158]" />
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">Чехол Android — в подарок</p>
            <p className="text-sm text-foreground-secondary">
              При заказе любого товара от <span className="text-foreground font-semibold">50 BYN</span> — выберите
              Android-чехол бесплатно прямо в нашем магазине.
              Скажите продавцу: «хочу чехол в подарок» 🎁
            </p>
          </div>
        </motion.div>

        {/* Brand filter */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Filter size={14} className="text-foreground-muted" />
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => setActiveBrand(b)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeBrand === b
                  ? 'bg-[#ff453a] text-white shadow-lg shadow-[#ff453a]/20'
                  : 'bg-background-card border border-border text-foreground-secondary hover:text-foreground hover:border-[#ff453a]/30'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.04, ease }}
              className="bg-background-card border border-border rounded-2xl overflow-hidden hover:border-[#ff453a]/30 transition-all group hover:-translate-y-1 duration-200 shadow-sm"
              style={{ willChange: 'transform' }}
            >
              {/* Image area */}
              <div className="aspect-square flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${
                    brandOf(product.name) === 'Samsung' ? '#1428a0' :
                    brandOf(product.name) === 'Xiaomi' ? '#ff6900' :
                    brandOf(product.name) === 'Redmi' ? '#e31937' :
                    brandOf(product.name) === 'Huawei' ? '#cf0a2c' :
                    brandOf(product.name) === 'Honor' ? '#000000' : '#555'
                  }18, ${
                    brandOf(product.name) === 'Samsung' ? '#1428a0' :
                    brandOf(product.name) === 'Xiaomi' ? '#ff6900' :
                    brandOf(product.name) === 'Redmi' ? '#e31937' :
                    brandOf(product.name) === 'Huawei' ? '#cf0a2c' :
                    brandOf(product.name) === 'Honor' ? '#333' : '#888'
                  }08)`
                }}
              >
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#ff453a] text-[9px] font-bold text-white shadow-sm">
                  SALE
                </div>
                {/* Phone silhouette */}
                <div className="relative">
                  <svg viewBox="0 0 80 130" width="52" style={{
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))',
                    color: brandOf(product.name) === 'Samsung' ? '#1428a0' :
                           brandOf(product.name) === 'Xiaomi' ? '#ff6900' :
                           brandOf(product.name) === 'Redmi' ? '#e31937' :
                           brandOf(product.name) === 'Huawei' ? '#cf0a2c' :
                           brandOf(product.name) === 'Honor' ? '#222' : '#555'
                  }}>
                    <rect x="6" y="4" width="68" height="122" rx="13" fill="currentColor" opacity="0.25" />
                    <rect x="6" y="4" width="68" height="122" rx="13" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                    <rect x="18" y="10" width="30" height="6" rx="3" fill="currentColor" opacity="0.2" />
                    <circle cx="40" cy="114" r="5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                  </svg>
                </div>
                {/* Brand label */}
                <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-widest"
                  style={{
                    color: brandOf(product.name) === 'Samsung' ? '#1428a0' :
                           brandOf(product.name) === 'Xiaomi' ? '#ff6900' :
                           brandOf(product.name) === 'Redmi' ? '#e31937' :
                           brandOf(product.name) === 'Huawei' ? '#cf0a2c' :
                           brandOf(product.name) === 'Honor' ? '#333' : '#555'
                  }}
                >
                  {brandOf(product.name)}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 mb-1">
                  {product.name}
                </h3>
                <p className="text-[11px] text-foreground-muted mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-[#ff453a]">{formatPrice(product.sellingPrice)}</p>
                  </div>
                  <span className="text-[10px] text-[#30d158] font-semibold">
                    {product.quantity} шт
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-foreground-muted">Нет товаров в этой категории</div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-foreground-muted mb-4">Хотите что-то конкретное? Уточните наличие напрямую.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0071e3] text-white text-sm font-bold hover:bg-[#0077ed] transition-all"
          >
            На главную <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </main>
  )
}
