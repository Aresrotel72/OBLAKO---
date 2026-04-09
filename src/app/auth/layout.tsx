import Link from 'next/link'
import BlobBg from '@/components/ui/BlobBg'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">

      {/* Blob background */}
      <BlobBg
        colors={['#0071e3', '#5ac8fa', '#ae9eff', '#34aadc']}
        count={4}
        blur={90}
        opacity={0.22}
      />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      {/* Logo */}
      <Link
        href="/"
        className="relative z-10 text-2xl font-semibold tracking-widest text-foreground mb-10 hover:opacity-60 transition-opacity"
      >
        OBLAKO
      </Link>

      {/* Glass card */}
      <div className="relative z-10 w-full max-w-sm">
        <div
          className="rounded-3xl border border-white/60 shadow-2xl p-8"
          style={{
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
          }}
        >
          {children}
        </div>
      </div>

      {/* Bottom tagline */}
      <p className="relative z-10 mt-8 text-xs text-foreground-muted">
        Мобильные аксессуары · Полоцк
      </p>
    </div>
  )
}
