import { useState } from "react";
import { ScreenHeader } from "./Header";

type Kit = {
  day: string;
  name: string;
  items: number;
  price: number;
  ingredients: string[];
};

const kits: Kit[] = [
  {
    day: "MON",
    name: "Aloo Paratha Kit",
    items: 6,
    price: 178,
    ingredients: ["Aloo (Potatoes)", "Atta", "Makhan (Butter)", "Dahi (Curd)", "Green Chutney", "Pickle"],
  },
  {
    day: "TUE",
    name: "Dal Chawal Kit",
    items: 5,
    price: 215,
    ingredients: ["Toor Dal", "Rice (Basmati)", "Ghee", "Jeera", "Haldi"],
  },
  {
    day: "WED",
    name: "Pasta Night Kit",
    items: 4,
    price: 374,
    ingredients: ["Barilla Penne", "Pasta Sauce", "Cheese Slices", "Olive Oil"],
  },
  {
    day: "THU",
    name: "Paneer Bhurji Kit",
    items: 5,
    price: 285,
    ingredients: ["Paneer", "Onions", "Tomatoes", "Capsicum", "Masala Mix"],
  },
  {
    day: "FRI",
    name: "Rajma Chawal Kit",
    items: 4,
    price: 190,
    ingredients: ["Rajma (Kidney Beans)", "Rice", "Ghee", "Masala"],
  },
  {
    day: "SAT",
    name: "Chole Bhature Kit",
    items: 5,
    price: 275,
    ingredients: ["Chole (Chickpeas)", "Atta", "Soda", "Chole Masala", "Pickle"],
  },
  {
    day: "SUN",
    name: "Biryani Kit",
    items: 7,
    price: 398,
    ingredients: ["Basmati Rice", "Onions", "Saffron", "Biryani Masala", "Yogurt", "Fried Onions", "Raita Mix"],
  },
];

export function WeekScreen({ onBack }: { onBack: () => void }) {
  const total = kits.reduce((s, k) => s + k.price, 0);
  const [cuisine, setCuisine] = useState("north");
  const [diet, setDiet] = useState("veg");
  const [budget, setBudget] = useState(300);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const cuisines = [
    { id: "north", label: "North Indian" },
    { id: "south", label: "South Indian" },
    { id: "cont", label: "Continental" },
  ];

  const toggle = (day: string) =>
    setExpanded((prev) => ({ ...prev, [day]: !prev[day] }));

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
            7 kits · ₹{total} total · You save ₹340 vs ordering daily
          </div>
          <button className="mt-3 w-full bg-foreground text-white font-bold text-sm py-2.5 rounded-xl active:scale-[0.98] transition">
            Confirm & Order All
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          {kits.map((k, i) => (
            <div
              key={k.day}
              className={`${i !== kits.length - 1 ? "border-b border-border" : ""}`}
            >
              <button
                onClick={() => toggle(k.day)}
                className="flex items-center gap-3 px-3 py-3 w-full text-left"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[11px] font-extrabold flex-shrink-0"
                  style={{ background: "var(--blink-yellow)" }}
                >
                  {k.day}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold truncate">{k.name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {k.items} items · ₹{k.price}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground">
                    {expanded[k.day] ? "▲" : "▼"}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="text-[11px] font-bold px-2.5 py-1.5 rounded-md border-2"
                    style={{ borderColor: "var(--blink-yellow)", color: "#B8860B" }}
                  >
                    + Cart
                  </button>
                </div>
              </button>

              {expanded[k.day] && (
                <div className="px-3 pb-3 pt-0">
                  <div
                    className="rounded-xl p-3 text-[12px] text-muted-foreground space-y-1.5"
                    style={{ background: "#F9FAFB" }}
                  >
                    <div className="font-semibold text-[11px] text-foreground mb-1">
                      🛒 What's inside:
                    </div>
                    {k.ingredients.map((ing) => (
                      <div key={ing} className="flex items-center gap-2">
                        <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground" />
                        {ing}
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
