import { useState } from "react";
import type { Product } from "@/lib/blinkit-data";

export function ProductCard({
  product,
  onAdd,
  inCart,
  aiPick,
  compact,
}: {
  product: Product;
  onAdd?: (p: Product, qty: number) => void;
  inCart?: number;
  aiPick?: boolean;
  compact?: boolean;
}) {
  const [qty, setQty] = useState(inCart ?? 0);

  const change = (next: number) => {
    const n = Math.max(0, next);
    setQty(n);
    onAdd?.(product, n);
  };

  return (
    <div
      className={`relative bg-white rounded-xl p-2.5 border border-border ${
        aiPick ? "border-l-4" : ""
      }`}
      style={aiPick ? { borderLeftColor: "var(--blink-yellow)" } : {}}
    >
      <div
        className="w-full aspect-square rounded-lg flex items-center justify-center text-4xl mb-2"
        style={{ background: product.bg }}
      >
        {product.emoji}
      </div>
      <div className="text-[13px] font-semibold leading-tight line-clamp-2 min-h-[34px]">
        {product.name}
      </div>
      <div className="text-[11px] text-muted-foreground mb-1.5">{product.weight}</div>
      <div className="flex items-center justify-between gap-1">
        <div className="text-sm font-bold">₹{product.price}</div>
        {qty === 0 ? (
          <button
            onClick={() => change(1)}
            className="text-[12px] font-bold px-3 py-1 rounded-md border-2"
            style={{ borderColor: "var(--blink-yellow)", color: "#B8860B" }}
          >
            + ADD
          </button>
        ) : (
          <div
            className="flex items-center gap-2 rounded-md px-1.5 py-0.5"
            style={{ background: "var(--blink-yellow)" }}
          >
            <button onClick={() => change(qty - 1)} className="text-sm font-bold w-4 text-foreground">
              −
            </button>
            <span className="text-xs font-bold text-foreground">{qty}</span>
            <button onClick={() => change(qty + 1)} className="text-sm font-bold w-4 text-foreground">
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
