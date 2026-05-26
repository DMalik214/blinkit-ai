import { useState } from "react";
import { ScreenHeader } from "./Header";
import { weekPlan } from "@/lib/blinkit-data";

export function WeekScreen({ onBack }: { onBack: () => void }) {
  const total = weekPlan.reduce((s, m) => s + m.price, 0);
  const [cuisine, setCuisine] = useState("north");
  const [diet, setDiet] = useState("veg");
  const [budget, setBudget] = useState(300);

  const cuisines = [
    { id: "north", label: "North Indian" },
    { id: "south", label: "South Indian" },
    { id: "cont", label: "Continental" },
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-24 screen-enter bg-secondary no-scrollbar">
      <ScreenHeader
        title="📅 Smart Week"
        subtitle="Plan once, order all week"
        onBack={onBack}
        rightBadge="10 min"
      />

      <div className="p-4 space-y-4">
        <div
          className="rounded-2xl p-4 text-foreground relative overflow-hidden glow-yellow"
          style={{
            background:
              "linear-gradient(135deg, #F8D03B 0%, #FFA53B 60%, #FF6B00 100%)",
          }}
        >
          <div className="text-lg font-extrabold">Your Week is Planned ✨</div>
          <div className="text-[12px] font-semibold opacity-90 mt-1">
            7 meals · ₹{total} total · Saves ~4 hours
          </div>
          <button className="mt-3 w-full bg-foreground text-white font-bold text-sm py-2.5 rounded-xl active:scale-[0.98] transition">
            Confirm & Order All
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          {weekPlan.map((m, i) => (
            <div
              key={m.day}
              className={`flex items-center gap-3 px-3 py-2.5 ${
                i !== weekPlan.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[11px] font-extrabold flex-shrink-0"
                style={{ background: "var(--blink-yellow)" }}
              >
                {m.day}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold truncate">{m.meal}</div>
                <div className="text-[11px] text-muted-foreground">₹{m.price}</div>
              </div>
              <button
                className="text-[11px] font-bold px-2.5 py-1.5 rounded-md border-2"
                style={{ borderColor: "var(--blink-yellow)", color: "#B8860B" }}
              >
                + Cart
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-border p-4 space-y-3">
          <h3 className="font-bold text-sm">Preferences</h3>

          <div>
            <div className="text-[11px] font-semibold text-muted-foreground mb-1.5">
              Cuisine
            </div>
            <div className="flex gap-2 flex-wrap">
              {cuisines.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCuisine(c.id)}
                  className="text-[11px] font-semibold px-3 py-1.5 rounded-full border transition"
                  style={
                    cuisine === c.id
                      ? {
                          background: "var(--blink-yellow)",
                          borderColor: "var(--blink-yellow)",
                        }
                      : { borderColor: "var(--color-border)" }
                  }
                >
                  {c.label} {cuisine === c.id && "✓"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-muted-foreground mb-1.5">Diet</div>
            <div className="flex gap-2">
              {["veg", "nonveg"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDiet(d)}
                  className="text-[11px] font-semibold px-3 py-1.5 rounded-full border"
                  style={
                    diet === d
                      ? {
                          background:
                            d === "veg" ? "var(--blink-green)" : "var(--blink-orange)",
                          borderColor: "transparent",
                          color: "white",
                        }
                      : { borderColor: "var(--color-border)" }
                  }
                >
                  {d === "veg" ? "Veg ✓" : "Non-Veg"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-muted-foreground mb-1.5 flex justify-between">
              <span>Budget per meal</span>
              <span className="text-foreground font-bold">₹{budget}</span>
            </div>
            <input
              type="range"
              min={150}
              max={450}
              step={10}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-[#F8D03B]"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
              <span>₹150</span>
              <span>₹450</span>
            </div>
          </div>

          <button
            className="w-full py-2.5 rounded-xl border-2 font-bold text-sm active:scale-[0.98] transition"
            style={{ borderColor: "var(--blink-yellow)", color: "#B8860B" }}
          >
            🔄 Regenerate Plan
          </button>
        </div>
      </div>
    </div>
  );
}
