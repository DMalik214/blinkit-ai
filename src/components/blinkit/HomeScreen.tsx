import { BlinkitHeader } from "./Header";
import { ProductCard } from "./ProductCard";
import { orderAgain, topPicks, type Product } from "@/lib/blinkit-data";
import type { Screen } from "./types";

export function HomeScreen({
  onNav,
  onAddItem,
  cart,
  onPrefillQuery,
}: {
  onNav: (s: Screen) => void;
  onAddItem: (p: Product, qty: number) => void;
  cart: Record<string, number>;
  onPrefillQuery: (q: string) => void;
}) {
  const chips = [
    { emoji: "🍝", text: "Pasta dinner for 2" },
    { emoji: "🥗", text: "Quick healthy lunch" },
    { emoji: "☕", text: "Breakfast ideas under ₹200" },
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-24 no-scrollbar screen-enter">
      <BlinkitHeader />

      {/* Search */}
      <div className="px-4 py-3 bg-white sticky top-0 z-10 border-b border-border">
        <div className="bg-secondary rounded-xl px-3 py-2.5 flex items-center gap-2">
          <span className="text-base">🔍</span>
          <span className="text-sm text-muted-foreground flex-1 truncate">
            Search for "atta", "eggs", "bread"...
          </span>
          <span className="text-base">🎤</span>
        </div>
      </div>

      {/* Ask Blinkit hero */}
      <div className="px-4 pt-4">
        <div
          className="rounded-2xl p-4 relative overflow-hidden glow-yellow"
          style={{
            background:
              "linear-gradient(135deg, #F8D03B 0%, #FFA53B 60%, #FF6B00 100%)",
          }}
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/20 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">✨</span>
              <h2 className="text-xl font-extrabold text-foreground">Ask Blinkit</h2>
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/80 text-foreground"
              >
                AI
              </span>
            </div>
            <p className="text-[12px] font-medium text-foreground/80 mb-3">
              Tell us what you want to cook or order
            </p>
            <div className="flex flex-col gap-1.5 mb-3">
              {chips.map((c) => (
                <button
                  key={c.text}
                  onClick={() => {
                    onPrefillQuery(c.text);
                    onNav("ask");
                  }}
                  className="bg-white/90 hover:bg-white text-foreground text-[12px] font-semibold rounded-lg px-3 py-2 text-left flex items-center gap-2 active:scale-[0.98] transition"
                >
                  <span>{c.emoji}</span>
                  <span>{c.text}</span>
                  <span className="ml-auto text-muted-foreground">→</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => onNav("ask")}
              className="w-full bg-foreground text-white font-bold text-sm py-2.5 rounded-xl active:scale-[0.98] transition"
            >
              Ask Now →
            </button>
          </div>
        </div>
      </div>

      {/* AI feature tiles */}
      <div className="px-4 pt-4 grid grid-cols-2 gap-3">
        <button
          onClick={() => onNav("fridge")}
          className="bg-white rounded-2xl p-3 border border-border text-left active:scale-[0.98] transition"
          style={{ borderLeftWidth: 4, borderLeftColor: "var(--blink-yellow)" }}
        >
          <div className="text-2xl mb-1">🔍</div>
          <div className="text-sm font-bold">Fridge Scan</div>
          <div className="text-[10px] text-muted-foreground">AI sees what you have</div>
        </button>
        <button
          onClick={() => onNav("week")}
          className="bg-white rounded-2xl p-3 border border-border text-left active:scale-[0.98] transition"
          style={{ borderLeftWidth: 4, borderLeftColor: "var(--blink-yellow)" }}
        >
          <div className="text-2xl mb-1">📅</div>
          <div className="text-sm font-bold">Smart Week</div>
          <div className="text-[10px] text-muted-foreground">Plan once, order all week</div>
        </button>
      </div>

      {/* Order Again */}
      <div className="pt-5">
        <div className="px-4 flex items-center justify-between mb-2">
          <h3 className="font-bold text-[15px]">Order Again</h3>
          <span className="text-[11px] font-semibold" style={{ color: "var(--blink-orange)" }}>
            See all
          </span>
        </div>
        <div className="px-4 flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {orderAgain.map((p) => (
            <div key={p.id} className="w-[140px] flex-shrink-0">
              <ProductCard product={p} onAdd={onAddItem} inCart={cart[p.id]} />
            </div>
          ))}
        </div>
      </div>

      {/* Top Picks */}
      <div className="pt-5">
        <div className="px-4 flex items-center justify-between mb-2">
          <h3 className="font-bold text-[15px]">Top Picks for You</h3>
          <span className="text-[11px] text-muted-foreground">✨ AI curated</span>
        </div>
        <div className="px-4 grid grid-cols-2 gap-3">
          {topPicks.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={onAddItem}
              inCart={cart[p.id]}
              aiPick
            />
          ))}
        </div>
      </div>

      {/* Floating FAB */}
      <button
        onClick={() => onNav("ask")}
        className="absolute bottom-24 right-4 w-14 h-14 rounded-full flex items-center justify-center text-2xl glow-yellow active:scale-95 transition z-20"
        style={{ background: "var(--blink-yellow)" }}
        aria-label="Ask Blinkit"
      >
        ✨
      </button>
    </div>
  );
}
