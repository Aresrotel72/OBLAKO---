"use client";

import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  images: string[];
  colors: { hex: string; name: string }[];
  badge?: "new" | "hit" | "sale";
  inStock: boolean;
  category: string;
};

type Props = {
  product: Product;
  onReserve?: (product: Product) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
  onToggleCompare?: (productId: string) => void;
  isInCompare?: boolean;
};

const BADGE_LABELS = { new: "Новинка", hit: "Хит", sale: "Скидка" };
const BADGE_STYLES: Record<string, string> = {
  new: "bg-blue-50 text-blue-600",
  hit: "bg-green-50 text-green-700",
  sale: "bg-red-50 text-red-600",
};

export function ProductCard({
  product,
  onReserve,
  onToggleFavorite,
  isFavorite = false,
  onToggleCompare,
  isInCompare = false,
}: Props) {
  const [activeColor, setActiveColor] = useState(0);
  const [imgError, setImgError] = useState(false);

  const formatted = (product.price ?? 0).toLocaleString("ru-RU");

  return (
    <div className="group relative flex flex-col bg-white border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:border-[var(--border-hover)]">
      {/* Image */}
      <div className="relative aspect-square bg-[var(--background-secondary)] flex items-center justify-center overflow-hidden">
        {product.images[0] && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <PhonePlaceholder color={product.colors[activeColor]?.hex ?? "#86868b"} />
        )}

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-2.5 left-2.5 text-[10px] font-medium px-2 py-1 rounded-md ${BADGE_STYLES[product.badge]}`}>
            {BADGE_LABELS[product.badge]}
          </span>
        )}

        {/* Favorite */}
        <button
          onClick={() => onToggleFavorite?.(product.id)}
          className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-150 ${
            isFavorite
              ? "bg-red-500 border-red-500"
              : "bg-white border-[var(--border)] hover:border-red-300"
          }`}
          aria-label={isFavorite ? "Убрать из избранного" : "В избранное"}
        >
          <Heart
            size={13}
            className={isFavorite ? "fill-white stroke-white" : "stroke-[var(--foreground-muted)]"}
          />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3">
        <p className="text-[11px] text-[var(--foreground-muted)] mb-0.5">{product.brand}</p>
        <p className="text-[13px] font-medium text-[var(--foreground)] leading-snug mb-1">{product.name}</p>
        <p className="text-[11px] text-[var(--foreground-muted)] mb-2">{product.model}</p>

        {/* Color swatches */}
        {product.colors.length > 1 && (
          <div className="flex gap-1.5 mb-3">
            {product.colors.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveColor(i)}
                title={c.name}
                style={{ background: c.hex }}
                className={`w-3.5 h-3.5 rounded-full border-[1.5px] transition-all ${
                  activeColor === i ? "border-[var(--accent)] scale-110" : "border-transparent"
                }`}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--foreground)]">{formatted} ₽</span>
            {onToggleCompare && (
              <button
                onClick={() => onToggleCompare(product.id)}
                className={`text-[11px] px-2 py-0.5 rounded-md border transition-colors ${
                  isInCompare
                    ? "border-[var(--accent)] text-[var(--accent)] bg-blue-50"
                    : "border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--border-hover)]"
                }`}
              >
                {isInCompare ? "✓ Сравн." : "Сравнить"}
              </button>
            )}
          </div>

          <button
            onClick={() => onReserve?.(product)}
            disabled={!product.inStock}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] active:scale-[0.98]"
          >
            <ShoppingBag size={13} />
            {product.inStock ? "Забронировать" : "Нет в наличии"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PhonePlaceholder({ color }: { color: string }) {
  return (
    <svg width="80" height="130" viewBox="0 0 80 130" fill="none">
      <rect x="8" y="4" width="64" height="122" rx="16" fill={color} opacity="0.12" />
      <rect x="12" y="8" width="56" height="114" rx="13" fill={color} opacity="0.2" />
      <rect x="28" y="11" width="24" height="6" rx="3" fill={color} opacity="0.4" />
    </svg>
  );
}
