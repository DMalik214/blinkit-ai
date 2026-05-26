import { useEffect, useRef, useState } from "react";
import { ScreenHeader } from "./Header";
import {
  pastaCart,
  vegHealthyCart,
  breakfastCart,
  budgetCart,
  defaultCart,
  type Product,
} from "@/lib/blinkit-data";
import type { Screen } from "./types";

type Msg =
  | { role: "ai"; text: string; cart?: Product[]; budget?: number }
  | { role: "user"; text: string }
  | { role: "typing" };

function aiResponseFor(text: string): { reply: string; cart: Product[]; budget?: number } {
  const t = text.toLowerCase();
  if (/veg|healthy|salad/.test(t))
    return { reply: "Going healthy! 🥗 Here's a balanced veg cart for you", cart: vegHealthyCart };
  if (/breakfast|morning/.test(t))
    return { reply: "Quick breakfast coming up ☕ Ready in 2 minutes", cart: breakfastCart };
  if (/budget|cheap|₹|under|rs/.test(t))
    return { reply: "Budget mode on! 💰 Here's the best value cart", cart: budgetCart };
  if (/pasta/.test(t))
    return { reply: "Perfect! 🍝 Here's your pasta dinner cart for 2 — total ₹374", cart: pastaCart, budget: 400 };
  return { reply: "Got it! Here's your cart based on what you asked", cart: defaultCart };
}

export function AskScreen({
  onBack,
  onAddItems,
  cart,
  prefill,
  onClearPrefill,
  onGoCart,
}: {
  onBack: () => void;
  onAddItems: (items: Product[]) => void;
  cart: Record<string, number>;
  prefill: string;
  onClearPrefill: () => void;
  onGoCart: () => void;
}) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text:
        "Hi! I'm Blinkit AI 👋 Tell me what you'd like to cook or order — in Hindi, English, or whatever mix feels natural. I'll build your cart instantly.",
    },
    { role: "user", text: "pasta dinner for 2 under ₹400" },
    {
      role: "ai",
      text: "Perfect! 🍝 Here's your pasta dinner cart for 2 — total ₹374",
      cart: pastaCart,
      budget: 400,
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-add pasta cart on load
  useEffect(() => {
    onAddItems(pastaCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (prefill) {
      setInput(prefill);
      onClearPrefill();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }, { role: "typing" }]);
    setTimeout(() => {
      const { reply, cart: items, budget } = aiResponseFor(q);
      setMessages((m) => {
        const out = m.filter((x) => x.role !== "typing");
        return [...out, { role: "ai", text: reply, cart: items, budget }];
      });
      onAddItems(items);
    }, 1500);
  };

  const suggestions = ["Make it vegan", "Add dessert", "Under ₹300 instead"];

  return (
    <div className="flex-1 flex flex-col screen-enter bg-secondary">
      <ScreenHeader
        title="✨ Ask Blinkit"
        subtitle="Powered by Blinkit AI"
        onBack={onBack}
        extra={
          <span className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
            <span
              className="inline-block w-2 h-2 rounded-full pulse-dot"
              style={{ background: "var(--blink-yellow)" }}
            />
            AI Ready
          </span>
        }
        rightBadge="10 min"
      />

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3 no-scrollbar">
        {messages.map((m, i) => {
          if (m.role === "typing")
            return (
              <div key={i} className="flex">
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 shadow-sm">
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                </div>
              </div>
            );
          if (m.role === "user")
            return (
              <div key={i} className="flex justify-end">
                <div
                  className="rounded-2xl rounded-tr-sm px-3.5 py-2.5 max-w-[80%] text-[13px] font-medium text-foreground"
                  style={{ background: "var(--blink-yellow)" }}
                >
                  {m.text}
                </div>
              </div>
            );
          // ai
          const total = m.cart?.reduce((s, p) => s + p.price, 0) ?? 0;
          return (
            <div key={i} className="flex flex-col items-start max-w-[88%]">
              <div className="text-[10px] font-bold text-muted-foreground mb-1 ml-1 flex items-center gap-1">
                <span>✨</span>Blinkit AI
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-3.5 py-3 shadow-sm w-full">
                <p className="text-[13px] font-medium text-foreground">{m.text}</p>
                {m.cart && (
                  <div className="mt-3 space-y-2">
                    {m.cart.map((p) => (
                      <div
                        key={p.id}
                        className="bg-secondary rounded-xl p-2.5 flex items-center gap-2.5"
                        style={{ borderLeft: "3px solid var(--blink-yellow)" }}
                      >
                        <div
                          className="w-11 h-11 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                          style={{ background: p.bg }}
                        >
                          {p.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-bold leading-tight truncate">
                            {p.name} {p.weight}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            ₹{p.price} · Added because: {p.reason ?? "AI pick"}
                          </div>
                        </div>
                        <div
                          className="text-[10px] font-bold px-2 py-1 rounded"
                          style={{ background: "var(--blink-green)", color: "white" }}
                        >
                          Added ✓
                        </div>
                      </div>
                    ))}
                    <div
                      className="rounded-xl p-2.5 mt-2 text-[12px] font-semibold flex flex-col gap-2"
                      style={{ background: "rgba(248,208,59,0.18)" }}
                    >
                      <div>
                        💛 All {m.cart.length} items added to cart · Total: ₹{total}
                        {m.budget ? ` (under your ₹${m.budget} budget)` : ""}
                      </div>
                      <button
                        onClick={onGoCart}
                        className="w-full font-bold text-sm py-2 rounded-lg active:scale-[0.98] transition"
                        style={{ background: "var(--blink-yellow)", color: "#1C1C1C" }}
                      >
                        View Cart →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggestions + input */}
      <div className="border-t border-border bg-white px-3 pt-2 pb-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-[11px] font-semibold whitespace-nowrap px-3 py-1.5 rounded-full bg-secondary border border-border active:scale-95 transition"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-secondary rounded-2xl px-3 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask anything... e.g. 'dal chawal for 3'"
            className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-muted-foreground"
          />
          <button className="text-lg">🎤</button>
          <button
            onClick={() => send()}
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold active:scale-95 transition"
            style={{ background: "var(--blink-yellow)" }}
          >
            →
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-1.5">
          Supports Hindi, English & Hinglish
        </p>
      </div>
      {/* Note: cart prop reserved to scope qty if needed */}
      <span className="hidden">{Object.keys(cart).length}</span>
    </div>
  );
}
