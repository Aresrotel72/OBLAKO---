'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  Search, User, Menu, ChevronDown,
  Smartphone, Headphones, Zap, Shield,
  Car, Gamepad2, Camera, Watch, HardDrive, Gift, Tag, X,
  Moon, Sun, LogIn
} from 'lucide-react'
import MobileNav from './MobileNav'
import OblakLogo from './OblakLogo'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/components/providers/ThemeProvider'

// ─── Announcement bar ─────────────────────────────────────────────────────────

function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <div className="bg-[#0a0a0a] border-b border-white/5 text-[11px] font-medium py-2 flex items-center">
      <span className="w-7 shrink-0" />
      <span className="flex-1 text-center text-[#a78bfa]">
        📍 г. Полоцк, ул. Богдановича 14, ТЦ Green
        <span className="mx-3 text-white/20">·</span>
        <span className="text-white/50">Каждый день 10:00 — 21:00</span>
      </span>
      <button
        onClick={() => setVisible(false)}
        className="w-7 shrink-0 flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity"
        aria-label="Закрыть"
      >
        <X size={13} />
      </button>
    </div>
  )
}

// ─── Categories config ────────────────────────────────────────────────────────

const IPHONE_GROUPS = [
  {
    series: 'iPhone 17',
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
      { id: 'iphone-15',         label: 'iPhone 15' },
    ],
  },
  {
    series: 'iPhone 14 и старше',
    models: [
      { id: 'iphone-14-pro-max', label: 'iPhone 14 Pro Max' },
      { id: 'iphone-14-pro',     label: 'iPhone 14 Pro' },
      { id: 'iphone-14',         label: 'iPhone 14' },
      { id: 'iphone-13',         label: 'iPhone 13' },
      { id: 'iphone-12',         label: 'iPhone 12' },
    ],
  },
]

const ALL_CATEGORIES = [
  { icon: Shield,     label: 'Защитные стёкла',    href: '/catalog?categoryName=Стекла',       color: '#4ade80' },
  { icon: Headphones, label: 'Наушники',            href: '/catalog?categoryName=Наушники',     color: '#c084fc' },
  { icon: Headphones, label: 'Колонки',             href: '/catalog?categoryName=Колонки',      color: '#818cf8' },
  { icon: Zap,        label: 'Зарядные устройства', href: '/catalog?categoryName=Зарядки',      color: '#facc15' },
  { icon: Zap,        label: 'Кабели',              href: '/catalog?categoryName=Кабели',       color: '#fb923c' },
  { icon: Zap,        label: 'Переходники',         href: '/catalog?categoryName=Переходники',  color: '#f97316' },
  { icon: Car,        label: 'Авто-аксессуары',     href: '/catalog?categoryName=Авто',         color: '#38bdf8' },
  { icon: Gamepad2,   label: 'Геймерам',            href: '/catalog?categoryName=Игровые',      color: '#f87171' },
  { icon: Camera,     label: 'Блогерам',            href: '/catalog?categoryName=Блогерам',     color: '#fb7185' },
  { icon: Watch,      label: 'Смарт-часы',          href: '/catalog?categoryName=Смарт-часы',  color: '#67e8f9' },
  { icon: HardDrive,  label: 'USB-носители',        href: '/catalog?categoryName=USB',          color: '#93c5fd' },
  { icon: HardDrive,  label: 'Проекторы',           href: '/catalog?categoryName=Проекторы',   color: '#a78bfa' },
  { icon: Gift,       label: 'Подарки',             href: '/catalog?categoryName=Подарки',      color: '#4ade80' },
]

// ─── Mega-menu: iPhone models ─────────────────────────────────────────────────

function IphoneMegaMenu() {
  return (
    <div className="bg-[#0e0e10] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 p-5 w-[440px]">
      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
        {IPHONE_GROUPS.map((g) => (
          <div key={g.series}>
            <p className="text-[10px] font-bold text-[#a78bfa] uppercase tracking-widest mb-2 mt-3 first:mt-0">
              {g.series}
            </p>
            {g.models.map((m) => (
              <Link
                key={m.id}
                href={`/cases?model=${m.id}`}
                className="block px-2 py-1.5 rounded-lg text-sm text-[#86868b] hover:text-white hover:bg-white/5 transition-all"
              >
                {m.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-white/8">
        <Link
          href="/cases"
          className="flex items-center justify-between px-2 py-2 rounded-lg text-sm font-semibold text-[#a78bfa] hover:bg-[#8b5cf6]/10 transition-all"
        >
          Все чехлы для iPhone
          <span>→</span>
        </Link>
      </div>
    </div>
  )
}

// ─── Mega-menu: All categories ────────────────────────────────────────────────

function CatalogMegaMenu() {
  return (
    <div className="bg-[#0e0e10] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 p-5 w-[480px]">
      <div className="grid grid-cols-3 gap-1.5">
        {ALL_CATEGORIES.map(({ icon: Icon, label, href, color }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#86868b] hover:text-white hover:bg-white/5 transition-all group"
          >
            <Icon size={14} style={{ color }} className="shrink-0 group-hover:scale-110 transition-transform" />
            <span className="leading-tight text-xs">{label}</span>
          </Link>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-white/8">
        <Link
          href="/catalog"
          className="flex items-center justify-between px-2 py-2 rounded-lg text-sm font-semibold text-[#86868b] hover:text-white hover:bg-white/5 transition-all"
        >
          Весь каталог
          <span>→</span>
        </Link>
      </div>
    </div>
  )
}

// ─── Nav item ────────────────────────────────────────────────────────────────

function NavItem({
  label,
  href,
  isActive,
  mega,
}: {
  label: string
  href: string
  isActive: boolean
  mega?: React.ReactNode
}) {
  return (
    <div className="group/item relative">
      <Link
        href={href}
        className={`relative flex items-center gap-1 text-xs font-semibold uppercase tracking-widest transition-colors duration-150 py-1 ${
          isActive ? 'text-white' : 'text-[#6e6e73] hover:text-white'
        }`}
      >
        {label}
        {mega && (
          <ChevronDown
            size={11}
            className="transition-transform duration-200 group-hover/item:rotate-180"
          />
        )}
        {/* Slide-up underline */}
        <span
          className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${
            isActive
              ? 'w-full bg-[#8b5cf6] shadow-[0_0_6px_rgba(139,92,246,0.8)]'
              : 'w-0 group-hover/item:w-full bg-[#8b5cf6]/60'
          }`}
        />
      </Link>

      {/* Mega-menu */}
      {mega && (
        <div
          className="
            absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2 z-50
            opacity-0 translate-y-3 pointer-events-none
            group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto
            transition-all duration-200 ease-out
          "
        >
          {mega}
        </div>
      )}
    </div>
  )
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      className="relative w-8 h-8 rounded-full flex items-center justify-center text-[#6e6e73] hover:text-white hover:bg-white/8 transition-all duration-200"
      aria-label={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
      title={theme === 'dark' ? 'Включить день' : 'Включить ночь'}
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

// ─── Account Button ───────────────────────────────────────────────────────────

function AccountButton({ user }: { user: { name: string } | null }) {
  if (user) {
    return (
      <Link
        href="/account"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#8b5cf6]/40 bg-[#8b5cf6]/8 hover:bg-[#8b5cf6]/15 hover:border-[#8b5cf6]/60 transition-all text-sm"
      >
        <div className="w-5 h-5 rounded-full bg-[#8b5cf6]/30 flex items-center justify-center">
          <User size={11} className="text-[#a78bfa]" />
        </div>
        <span className="hidden sm:block text-xs font-semibold text-[#a78bfa] max-w-[72px] truncate">
          {user.name.split(' ')[0]}
        </span>
      </Link>
    )
  }

  return (
    <Link
      href="/account"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/12 hover:border-[#8b5cf6]/50 hover:bg-[#8b5cf6]/8 transition-all text-xs font-semibold text-[#86868b] hover:text-white"
      aria-label="Войти"
    >
      <LogIn size={14} />
      <span className="hidden sm:block">Войти</span>
    </Link>
  )
}

// ─── Header ──────────────────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const user = useAuth((s) => s.user)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <AnnouncementBar />

      <header
        className={`header-oblako sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'bg-[#070709]/95 backdrop-blur-md border-[#8b5cf6]/15'
            : 'bg-[#070709] border-white/6'
        }`}
      >
        {/* Thin violet glow line at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="header-grid">

            {/* Logo */}
            <Link href="/" className="shrink-0 justify-self-start">
              <OblakLogo size={36} />
            </Link>

            {/* Desktop nav */}
            <nav className="header-nav gap-6">
              <NavItem
                label="Чехлы"
                href="/cases"
                isActive={pathname.startsWith('/cases')}
                mega={<IphoneMegaMenu />}
              />
              <NavItem
                label="Каталог"
                href="/catalog"
                isActive={pathname === '/catalog'}
                mega={<CatalogMegaMenu />}
              />
              <NavItem
                label="Стёкла"
                href="/catalog?categoryName=Стекла"
                isActive={false}
              />
              <NavItem
                label="Аудио"
                href="/catalog?categoryName=Наушники"
                isActive={false}
              />
              <Link
                href="/sale"
                className="relative flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#f87171] hover:text-red-400 transition-colors py-1 group/sale"
              >
                <Tag size={12} />
                Sale
                <span className="px-1.5 py-0.5 rounded-full bg-[#ff453a]/15 text-[9px] font-black tracking-wide text-[#f87171] animate-pulse">
                  −70%
                </span>
                <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover/sale:w-full bg-[#f87171]/60 transition-all duration-300" />
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 justify-self-end">
              <ThemeToggle />
              <AccountButton user={user} />

              {/* Mobile burger */}
              <button
                className="lg:hidden p-2 text-[#6e6e73] hover:text-white transition-colors rounded-full hover:bg-white/5"
                onClick={() => setMobileOpen(true)}
                aria-label="Открыть меню"
              >
                <Menu size={20} />
              </button>
            </div>

          </div>
        </div>
      </header>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </>
  )
}
