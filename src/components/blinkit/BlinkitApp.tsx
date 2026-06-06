import { useMemo, useState } from "react";
import { HomeScreen } from "./HomeScreen";
import { AskScreen } from "./AskScreen";
import { FridgeScreen } from "./FridgeScreen";
import { WeekScreen } from "./WeekScreen";
import { CartScreen, AccountScreen } from "./CartScreen";
import { BottomNav } from "./BottomNav";
import {
  fridgeReorder,
  orderAgain,
  pastaCart,
  topPicks,
  type Product,
} from "@/lib/blinkit-data";
import type { Screen } from "./types";

const allProducts: Product[] = [
  ...orderAgain,
  ...topPicks,
  ...pastaCart,
  ...fridgeReorder,
];

export function BlinkitApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [prefill, setPrefill] = useState("");

  const handleAdd = (p: Product, qty: number) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[p.id];
      else next[p.id] = qty;
      return next;
    });
  };

  const handleAddItems = (items: Product[]) => {
    setCart((c) => {
      const next = { ...c };
      items.forEach((p) => {
        if (!next[p.id]) next[p.id] = 1;
      });
      return next;
    });
  };

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const product = allProducts.find((p) => p.id === id);
        return product ? { product, qty } : null;
      })
      .filter(Boolean) as { product: Product; qty: number }[];
  }, [cart]);

  const cartTotal = cartItems.reduce((s, { product, qty }) => s + product.price * qty, 0);
  const cartCount = cartItems.reduce((s, { qty }) => s + qty, 0);

  return (
    <div className="w-full h-dvh overflow-hidden flex items-center justify-center px-2 bg-[#E5E7EB]">
      <div
        className="relative w-full max-w-[390px] h-full bg-white rounded-[36px] overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Status notch bar */}
        <div
          className="flex justify-between items-center px-6 py-1.5 text-[11px] font-semibold"
          style={{ background: "var(--blink-yellow)" }}
        >
          <span>9:41</span>
          <span>⚡ 10 min</span>
          <span>100%</span>
        </div>

        <div className="flex-1 min-h-0 flex flex-col">
          {screen === "home" && (
            <HomeScreen
              onNav={setScreen}
              onAddItem={handleAdd}
              cart={cart}
              onPrefillQuery={setPrefill}
            />
          )}
          {screen === "ask" && (
            <AskScreen
              onBack={() => setScreen("home")}
              onAddItems={handleAddItems}
              cart={cart}
              prefill={prefill}
              onClearPrefill={() => setPrefill("")}
              onGoCart={() => setScreen("cart")}
            />
          )}
          {screen === "fridge" && (
            <FridgeScreen
              onBack={() => setScreen("home")}
              onAddAll={() => {
                handleAddItems(fridgeReorder);
                setScreen("cart");
              }}
            />
          )}
          {screen === "week" && <WeekScreen onBack={() => setScreen("home")} />}
          {screen === "cart" && (
            <CartScreen
              onBack={() => setScreen("home")}
              items={cartItems}
              total={cartTotal}
            />
          )}
          {screen === "account" && <AccountScreen onBack={() => setScreen("home")} />}
        </div>

        <BottomNav active={screen} onChange={setScreen} cartCount={cartCount} />
      </div>
    </div>
  );
}
