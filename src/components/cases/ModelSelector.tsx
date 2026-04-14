'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

const MODEL_GROUPS = [
  {
    series: 'iPhone 17',
    badge: 'NEW',
    models: [
      { id: 'iphone-17-pro-max', label: 'iPhone 17 Pro Max' },
      { id: 'iphone-17-pro',     label: 'iPhone 17 Pro' },
      { id: 'iphone-17-air',     label: 'iPhone 17 Air' },
      { id: 'iphone-17',         label: 'iPhone 17' },
    ],
  },
  {
    series: 'iPhone 16',
    models: [
      { id: 'iphone-16-pro-max', label: 'iPhone 16 Pro Max' },
      { id: 'iphone-16-pro',     label: 'iPhone 16 Pro' },
      { id: 'iphone-16-plus',    label: 'iPhone 16 Plus' },
      { id: 'iphone-16',         label: 'iPhone 16' },
    ],
  },
  {
    series: 'iPhone 15',
    models: [
      { id: 'iphone-15-pro-max', label: 'iPhone 15 Pro Max' },
      { id: 'iphone-15-pro',     label: 'iPhone 15 Pro' },
      { id: 'iphone-15-plus',    label: 'iPhone 15 Plus' },
      { id: 'iphone-15',         label: 'iPhone 15' },
    ],
  },
  {
    series: 'iPhone 14',
    models: [
      { id: 'iphone-14-pro-max', label: 'iPhone 14 Pro Max' },
      { id: 'iphone-14-pro',     label: 'iPhone 14 Pro' },
      { id: 'iphone-14',         label: 'iPhone 14' },
    ],
  },
  {
    series: 'Старше',
    models: [
      { id: 'iphone-13-pro-max', label: 'iPhone 13 Pro Max' },
      { id: 'iphone-13-pro',     label: 'iPhone 13 Pro' },
      { id: 'iphone-13',         label: 'iPhone 13' },
      { id: 'iphone-12',         label: 'iPhone 12' },
    ],
  },
]

export default function ModelSelector() {
  const router = useRouter()
  const [activeSeries, setActiveSeries] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)

  function handleSelect(id: string) {
    setSelected(id)
    router.push(`/cases?model=${id}`)
  }

  const group = MODEL_GROUPS[activeSeries]

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Заголовок */}
        <div className="text-center mb-12">
          <p className="text-eyebrow mb-3">Чехлы для iPhone</p>
          <h2 className="text-display text-foreground mb-3">
            Выбери свою модель
          </h2>
          <p className="text-foreground-muted text-sm">
            Показываем только чехлы, которые подходят именно к твоему iPhone
          </p>
        </div>

        {/* Стеклянные вкладки серий */}
        <div className="glass rounded-2xl p-1.5 flex gap-1 mb-8 shadow-sm">
          {MODEL_GROUPS.map((g, i) => (
            <button
              key={g.series}
              onClick={() => setActiveSeries(i)}
              className="relative flex-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all duration-200 text-center"
            >
              {activeSeries === i && (
                <motion.span
                  layoutId="series-active"
                  className="absolute inset-0 rounded-xl bg-white shadow-sm"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
              <span className={`relative z-10 flex items-center justify-center gap-1 ${
                activeSeries === i ? 'text-foreground' : 'text-foreground-muted'
              }`}>
                {g.series}
                {'badge' in g && g.badge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-[#0071e3]/12 text-[#0071e3] tracking-wide">
                    {g.badge}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Модели активной серии */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeries}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {group.models.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleSelect(id)}
                className={`group glass-subtle relative flex items-center justify-between px-4 py-3.5 rounded-xl
                  text-sm font-medium text-left transition-all duration-200 hover:shadow-md
                  ${selected === id
                    ? 'ring-1 ring-[#0071e3]/40 bg-white/80 text-foreground'
                    : 'text-foreground-secondary hover:text-foreground hover:bg-white/70'
                  }`}
              >
                <span>{label}</span>
                <ChevronRight
                  size={14}
                  className={`shrink-0 transition-all duration-200 ${
                    selected === id
                      ? 'text-[#0071e3]'
                      : 'text-foreground-muted group-hover:translate-x-0.5 group-hover:text-foreground'
                  }`}
                />
              </button>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
