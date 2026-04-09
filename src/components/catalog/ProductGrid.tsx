"use client";

import { useState } from "react";
import { ProductCard, Product } from "./ProductCard";
import { CatalogFilters, CatalogFiltersState } from "./CatalogFilters";
import { CompareStrip } from "./CompareStrip";
import { LayoutGrid, List } from "lucide-react";

type Props = {
  products: Product[];
};

export function ProductGrid({ products }: Props) {
  const [filters, setFilters] = useState<CatalogFiltersState>({
    models: [],
    types: [],
    inStockOnly: false,
    priceMin: 0,
    priceMax: 10000,
    sortBy: "popular",
  });
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [compareItems, setCompareItems] = useState<Product[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");

  function toggleFavorite(id: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleCompare(id: string) {
    setCompareItems((prev) => {
      if (prev.find((p) => p.id === id)) return prev.filter((p) => p.id !== id);
      if (prev.length >= 3) return prev;
      const product = products.find((p) => p.id === id);
      return product ? [...prev, product] : prev;
    });
  }

  let filtered = products.filter((p) => {
    if (filters.inStockOnly && !p.inStock) return false;
    if (filters.models.length > 0 && !filters.models.includes(p.model)) return false;
    if (filters.types.length > 0 && !filters.types.includes(p.category)) return false;
    if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
    return true;
  });

  if (filters.sortBy === "price_asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (filters.sortBy === "price_desc") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div className="space-y-6">
      <CatalogFilters onChange={setFilters} totalCount={filtered.length} />

      {/* View toggle */}
      <div className="flex justify-end gap-1">
        {(["grid", "list"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${
              view === v
                ? "bg-[var(--background-elevated)] border-[var(--border-hover)] text-[var(--foreground)]"
                : "bg-white border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--border-hover)]"
            }`}
          >
            {v === "grid" ? <LayoutGrid size={14} /> : <List size={14} />}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[var(--foreground-secondary)]">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-base font-medium text-[var(--foreground)]">Ничего не найдено</p>
          <p className="text-sm mt-1">Попробуйте изменить фильтры</p>
        </div>
      ) : (
        <div className={
          view === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
            : "flex flex-col gap-3"
        }>
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.has(product.id)}
              onToggleFavorite={toggleFavorite}
              isInCompare={compareItems.some((p) => p.id === product.id)}
              onToggleCompare={toggleCompare}
            />
          ))}
        </div>
      )}

      <CompareStrip
        items={compareItems}
        onRemove={(id) => setCompareItems((prev) => prev.filter((p) => p.id !== id))}
        onCompare={() => console.log("Compare:", compareItems)}
      />
    </div>
  );
}
