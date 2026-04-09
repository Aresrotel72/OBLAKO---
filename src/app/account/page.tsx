import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { logout } from '@/app/actions/auth'
import ReservationCard from '@/components/account/ReservationCard'
import BlobBg from '@/components/ui/BlobBg'
import { Phone, LogOut, ShoppingBag, Clock, CheckCircle2, Package } from 'lucide-react'

export const metadata = { title: 'Личный кабинет — OBLAKO' }

export default async function AccountPage() {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  const reservations = await db.reservation.findMany({
    where: { customerId: session.sub },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      productName: true,
      productPrice: true,
      quantity: true,
      status: true,
      createdAt: true,
      expiresAt: true,
      confirmedAt: true,
      cancelledAt: true,
      cancelReason: true,
      contactPhone: true,
      notes: true,
    },
  })

  const active = reservations.filter((r) =>
    ['PENDING', 'CONFIRMED', 'READY'].includes(r.status)
  )
  const history = reservations.filter((r) =>
    ['COMPLETED', 'CANCELLED', 'EXPIRED'].includes(r.status)
  )
  const completed = reservations.filter((r) => r.status === 'COMPLETED')

  const initials = session.name
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="min-h-screen">

      {/* ── Hero шапка профиля ───────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pt-10 pb-8">
        <BlobBg
          colors={['#0071e3', '#5ac8fa', '#ae9eff']}
          count={3}
          blur={90}
          opacity={0.16}
        />
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Профиль */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#0071e3] flex items-center justify-center shadow-lg shadow-[#0071e3]/20 shrink-0">
              <span className="text-xl font-bold text-white">{initials}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{session.name}</h1>
              <div className="flex items-center gap-1.5 text-sm text-foreground-muted mt-0.5">
                <Phone size={12} />
                <span>{session.phone}</span>
              </div>
            </div>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { icon: ShoppingBag, val: reservations.length, label: 'Всего броней', color: '#0071e3' },
              { icon: Clock,       val: active.length,       label: 'Активных',     color: '#ffd60a' },
              { icon: CheckCircle2,val: completed.length,    label: 'Выкуплено',    color: '#30d158' },
            ].map(({ icon: Icon, val, label, color }) => (
              <div
                key={label}
                className="rounded-2xl bg-white/70 border border-border backdrop-blur-sm p-4 shadow-sm text-center"
              >
                <Icon size={18} style={{ color }} className="mx-auto mb-1.5" />
                <p className="text-2xl font-bold text-foreground">{val}</p>
                <p className="text-[11px] text-foreground-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Контент ─────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 pb-12 space-y-8 mt-2">

        {/* Активные бронирования */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-[#0071e3]" />
            <h2 className="text-base font-semibold text-foreground">Активные бронирования</h2>
            {active.length > 0 && (
              <span className="ml-auto px-2 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold">
                {active.length}
              </span>
            )}
          </div>

          {active.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-background-card px-6 py-10 text-center">
              <ShoppingBag size={28} className="mx-auto mb-3 text-foreground-muted opacity-40" />
              <p className="text-sm text-foreground-muted">Нет активных броней</p>
              <a href="/catalog" className="mt-3 inline-block text-sm text-[#0071e3] hover:underline font-medium">
                Перейти в каталог →
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {active.map((r) => (
                <ReservationCard key={r.id} r={{ ...r, productPrice: Number(r.productPrice) }} />
              ))}
            </div>
          )}
        </section>

        {/* История */}
        {history.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-foreground-muted" />
              <h2 className="text-base font-semibold text-foreground-muted">История</h2>
              <span className="ml-auto text-xs text-foreground-muted">{history.length} шт</span>
            </div>
            <div className="space-y-3">
              {history.map((r) => (
                <ReservationCard key={r.id} r={{ ...r, productPrice: Number(r.productPrice) }} />
              ))}
            </div>
          </section>
        )}

        {/* Выход */}
        <div className="pt-2 border-t border-border">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-2 text-sm text-foreground-muted hover:text-[#ff453a] transition-colors group"
            >
              <LogOut size={14} className="group-hover:text-[#ff453a] transition-colors" />
              Выйти из аккаунта
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
