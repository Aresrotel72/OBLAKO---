"use client";

import { X, ArrowRight } from "lucide-react";
import { Product } from "./ProductCard";

type Props = {
  items: Product[];
  onRemove: (id: string) => void;
  onCompare: () => void;
  maxItems?: number;
};

export function CompareStrip({ items, onRemove, onCompare, maxItems = 3 }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4">
      <div className="flex items-center gap-3 px-4 py-3 bg-white border border-[var(--border-hover)] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
        <span className="text-[13px] text-[var(--foreground-muted)] shrink-0">Сравнить:</span>

        <div className="flex gap-2 flex-1">
          {items.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <span className="text-[12px] text-[var(--foreground)] truncate max-w-[80px]">{p.name}</span>
              <button
                onClick={() => onRemove(p.id)}
                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <X size={10} />
              </button>
            </div>
          ))}
          {Array.from({ length: maxItems - items.length }).map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 border border-dashed border-[var(--border-hover)] rounded-lg flex items-center justify-center text-[var(--foreground-muted)] text-sm"
            >
              +
            </div>
          ))}
        </div>

        <button
          onClick={onCompare}
          disabled={items.length < 2}
          className="flex items-center gap-1.5 px-4 py-2 bg-[var(--accent)] text-white text-[13px] font-medium rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--accent-hover)] active:scale-[0.98] shrink-0"
        >
          Сравнить ({items.length})
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
