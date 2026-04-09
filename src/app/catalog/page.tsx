import { Suspense } from 'react'
import { getProducts } from '@/lib/ca-api'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import type { Product } from '@/components/catalog/ProductCard'
import type { CaProduct } from '@/types/product'
import { DEMO_IPHONE_CASES } from '@/lib/demo-products'

export const metadata = {
  title: 'Каталог — OBLAKO',
  description: 'Мобильные аксессуары: чехлы, стекла, зарядки и кабели для iPhone',
}

function mapProduct(p: CaProduct): Product {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = p as any
  const price = Number(p.sellingPrice ?? raw.price ?? raw.sellingPrice ?? 0)
  return {
    id: p.id,
    name: p.name,
    brand: raw.brand ?? '',
    model: raw.model ?? '',
    price,
    images: raw.images ?? [],
    colors: raw.colors ?? [],
    badge: undefined,
    inStock: p.stockStatus !== 'out',
    category: p.category?.name ?? raw.category ?? '',
  }
}

async function CatalogContent() {
  let products: Product[]

  try {
    const data = await getProducts({ limit: 60 })
    products = data.data.length > 0
      ? data.data.map(mapProduct)
      : DEMO_IPHONE_CASES.map(mapProduct)
  } catch {
    products = DEMO_IPHONE_CASES.map(mapProduct)
  }

  return <ProductGrid products={products} />
}

export default function CatalogPage() {
  return (
    <main className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[var(--foreground)] mb-2">
            Каталог
          </h1>
          <p className="text-[var(--foreground-muted)]">
            Мобильные аксессуары: чехлы, стекла, зарядки и многое другое
          </p>
        </div>

        <Suspense fallback={
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl skeleton" />
            ))}
          </div>
        }>
          <CatalogContent />
        </Suspense>
      </div>
    </main>
  )
}
