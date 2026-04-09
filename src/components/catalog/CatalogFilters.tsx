"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

const IPHONE_MODELS = [
  "iPhone 16 Pro Max",
  "iPhone 16 Pro",
  "iPhone 16",
  "iPhone 15 Pro Max",
  "iPhone 15 Pro",
  "iPhone 15",
  "iPhone 14 Pro Max",
  "iPhone 14",
  "iPhone 13",
];

const CASE_TYPES = [
  { id: "silicone", label: "Силикон" },
  { id: "leather", label: "Кожа" },
  { id: "magsafe", label: "MagSafe" },
  { id: "clear", label: "Прозрачный" },
  { id: "tpu", label: "TPU" },
];

export type CatalogFiltersState = {
  models: string[];
  types: string[];
  inStockOnly: boolean;
  priceMin: number;
  priceMax: number;
  sortBy: "popular" | "price_asc" | "price_desc" | "newest";
};

const DEFAULT_FILTERS: CatalogFiltersState = {
  models: [],
  types: [],
  inStockOnly: false,
  priceMin: 0,
  priceMax: 10000,
  sortBy: "popular",
};

type Props = {
  onChange: (filters: CatalogFiltersState) => void;
  totalCount: number;
};

export function CatalogFilters({ onChange, totalCount }: Props) {
  const [filters, setFilters] = useState<CatalogFiltersState>(DEFAULT_FILTERS);
  const [expanded, setExpanded] = useState(false);

  function update(patch: Partial<CatalogFiltersState>) {
    const next = { ...filters, ...patch };
    setFilters(next);
    onChange(next);
  }

  function toggleModel(m: string) {
    const models = filters.models.includes(m)
      ? filters.models.filter((x) => x !== m)
      : [...filters.models, m];
    update({ models });
  }

  function toggleType(t: string) {
    const types = filters.types.includes(t)
      ? filters.types.filter((x) => x !== t)
      : [...filters.types, t];
    update({ types });
  }

  const activeCount =
    filters.models.length +
    filters.types.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.sortBy !== "popular" ? 1 : 0);

  return (
    <div className="space-y-3">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">

          <button
            onClick={() => update({ inStockOnly: !filters.inStockOnly })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[13px] transition-all ${
              filters.inStockOnly
                ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                : "bg-white border-[var(--border)] text-[var(--foreground-secondary)] hover:border-[var(--border-hover)]"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${filters.inStockOnly ? "bg-white" : "bg-[var(--success)]"}`} />
            В наличии
          </button>

          {CASE_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => toggleType(t.id)}
              className={`px-3 py-1.5 rounded-full border text-[13px] transition-all ${
                filters.types.includes(t.id)
                  ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                  : "bg-white border-[var(--border)] text-[var(--foreground-secondary)] hover:border-[var(--border-hover)]"
              }`}
            >
              {t.label}
            </button>
          ))}

          <button
            onClick={() => setExpanded(!expanded)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[13px] transition-all bg-white hover:border-[var(--border-hover)] ${
              expanded ? "border-[var(--border-hover)] text-[var(--foreground)]" : "border-[var(--border)] text-[var(--foreground-secondary)]"
            }`}
          >
            <SlidersHorizontal size={12} />
            Ещё
            {activeCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[var(--accent)] text-white text-[10px] flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>

          {activeCount > 0 && (
            <button
              onClick={() => { setFilters(DEFAULT_FILTERS); onChange(DEFAULT_FILTERS); }}
              className="flex items-center gap-1 text-[13px] text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              <X size={12} />
              Сбросить
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[13px] text-[var(--foreground-muted)]">{totalCount} товаров</span>
          <select
            value={filters.sortBy}
            onChange={(e) => update({ sortBy: e.target.value as CatalogFiltersState["sortBy"] })}
            className="appearance-none bg-white border border-[var(--border)] text-[var(--foreground)] text-[13px] px-3 py-1.5 rounded-full focus:outline-none focus:border-[var(--accent)] cursor-pointer"
          >
            <option value="popular">По популярности</option>
            <option value="price_asc">Сначала дешёвые</option>
            <option value="price_desc">Сначала дорогие</option>
            <option value="newest">Новинки</option>
          </select>
        </div>
      </div>

      {/* Model pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => update({ models: [] })}
          className={`px-3 py-1 rounded-full border text-[12px] transition-all ${
            filters.models.length === 0
              ? "bg-[var(--background-elevated)] border-[var(--border-hover)] text-[var(--foreground)]"
              : "bg-white border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--border-hover)]"
          }`}
        >
          Все модели
        </button>
        {IPHONE_MODELS.map((m) => (
          <button
            key={m}
            onClick={() => toggleModel(m)}
            className={`px-3 py-1 rounded-full border text-[12px] transition-all ${
              filters.models.includes(m)
                ? "bg-[var(--background-elevated)] border-[var(--border-hover)] text-[var(--foreground)]"
                : "bg-white border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--border-hover)]"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Expanded price */}
      {expanded && (
        <div className="p-4 bg-[var(--background-secondary)] border border-[var(--border)] rounded-2xl">
          <label className="block text-[12px] text-[var(--foreground-secondary)] mb-2">
            Цена: {filters.priceMin.toLocaleString("ru-RU")} — {filters.priceMax.toLocaleString("ru-RU")} ₽
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="От"
              value={filters.priceMin || ""}
              onChange={(e) => update({ priceMin: Number(e.target.value) || 0 })}
              className="flex-1 bg-white border border-[var(--border)] text-[var(--foreground)] text-[13px] px-3 py-1.5 rounded-xl focus:outline-none focus:border-[var(--accent)]"
            />
            <input
              type="number"
              placeholder="До"
              value={filters.priceMax || ""}
              onChange={(e) => update({ priceMax: Number(e.target.value) || 10000 })}
              className="flex-1 bg-white border border-[var(--border)] text-[var(--foreground)] text-[13px] px-3 py-1.5 rounded-xl focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
