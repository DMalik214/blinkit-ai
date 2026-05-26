import type { Screen } from "./types";

export function BottomNav({
  active,
  onChange,
  cartCount,
}: {
  active: Screen;
  onChange: (s: Screen) => void;
  cartCount: number;
}) {
  const tabs: { id: Screen; icon: string; label: string }[] = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "ask", icon: "✨", label: "Ask AI" },
    { id: "cart", icon: "🛒", label: "Cart" },
    { id: "account", icon: "👤", label: "Account" },
  ];

  return (
    <div className="flex-shrink-0 bg-white border-t border-border px-2 pt-2 pb-3 flex items-center justify-around z-30">
      {tabs.map((t) => {
        const isActive = active === t.id;
        const isAsk = t.id === "ask";
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`relative flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-full transition ${
              isAsk && isActive ? "" : ""
            }`}
            style={
              isAsk
                ? {
                    background: isActive ? "var(--blink-yellow)" : "rgba(248,208,59,0.15)",
                  }
                : {}
            }
          >
            <span className="text-xl leading-none">{t.icon}</span>
            <span
              className={`text-[10px] font-semibold ${
                isActive && !isAsk ? "text-foreground" : "text-muted-foreground"
              }`}
              style={isAsk ? { color: "#1C1C1C" } : {}}
            >
              {t.label}
            </span>
            {t.id === "cart" && cartCount > 0 && (
              <span className="absolute -top-0.5 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {cartCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
