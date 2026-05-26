import { ScreenHeader } from "./Header";
import type { Product } from "@/lib/blinkit-data";

export function CartScreen({
  onBack,
  items,
  total,
}: {
  onBack: () => void;
  items: { product: Product; qty: number }[];
  total: number;
}) {
  return (
    <div className="flex-1 overflow-y-auto pb-24 screen-enter bg-secondary no-scrollbar">
      <ScreenHeader title="🛒 Your Cart" subtitle={`${items.length} items`} onBack={onBack} rightBadge="10 min" />
      <div className="p-4 space-y-2">
        {items.length === 0 && (
          <div className="text-center text-muted-foreground py-20 text-sm">
            Your cart is empty
          </div>
        )}
        {items.map(({ product: p, qty }) => (
          <div
            key={p.id}
            className="bg-white rounded-xl p-3 flex items-center gap-3 border border-border"
          >
            <div
              className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: p.bg }}
            >
              {p.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold truncate">{p.name}</div>
              <div className="text-[11px] text-muted-foreground">{p.weight}</div>
              <div className="text-sm font-bold mt-0.5">₹{p.price * qty}</div>
            </div>
            <div
              className="flex items-center gap-2 rounded-md px-2 py-1"
              style={{ background: "var(--blink-yellow)" }}
            >
              <span className="text-xs font-bold">−</span>
              <span className="text-xs font-bold">{qty}</span>
              <span className="text-xs font-bold">+</span>
            </div>
          </div>
        ))}

        {items.length > 0 && (
          <div className="bg-white rounded-2xl p-4 mt-4 border border-border">
            <div className="flex justify-between text-sm font-semibold mb-1">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mb-3">
              <span>Delivery</span>
              <span style={{ color: "var(--blink-green)" }} className="font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-base font-extrabold border-t border-border pt-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button
              className="w-full mt-3 py-3 rounded-xl font-bold text-sm"
              style={{ background: "var(--blink-yellow)" }}
            >
              Proceed to Pay · 10 min delivery
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function AccountScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex-1 overflow-y-auto pb-24 screen-enter bg-secondary no-scrollbar">
      <ScreenHeader title="👤 Account" onBack={onBack} rightBadge="10 min" />
      <div className="p-4">
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3 border border-border">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold"
            style={{ background: "var(--blink-yellow)" }}
          >
            A
          </div>
          <div>
            <div className="font-bold">Aarav Sharma</div>
            <div className="text-[12px] text-muted-foreground">+91 98••• ••420</div>
          </div>
        </div>
        <div className="mt-4 bg-white rounded-2xl border border-border divide-y divide-border">
          {["My Orders", "Saved Addresses", "Payment Methods", "Blinkit AI Settings", "Help & Support"].map((x) => (
            <div key={x} className="px-4 py-3 text-sm font-medium flex justify-between">
              <span>{x}</span>
              <span className="text-muted-foreground">›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
