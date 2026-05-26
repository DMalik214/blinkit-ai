import { ScreenHeader } from "./Header";
import { fridgeDetected, fridgeReorder } from "@/lib/blinkit-data";

export function FridgeScreen({
  onBack,
  onAddAll,
}: {
  onBack: () => void;
  onAddAll: () => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto pb-24 screen-enter bg-white no-scrollbar">
      <ScreenHeader
        title="🔍 Fridge Scan"
        subtitle="AI sees what you have"
        onBack={onBack}
        rightBadge="10 min"
      />

      <div className="p-4">
        <div
          className="rounded-2xl border-2 border-dashed p-6 flex flex-col items-center justify-center text-center"
          style={{
            borderColor: "var(--blink-yellow)",
            background: "linear-gradient(180deg, #FFFBEB 0%, #FFFFFF 100%)",
            minHeight: 200,
          }}
        >
          <div className="text-5xl mb-2">📷</div>
          <p className="text-sm font-semibold">Tap to scan your fridge or pantry</p>
          <p className="text-[11px] text-muted-foreground mt-1">
            AI will detect items in real-time
          </p>
          <button
            className="mt-4 px-5 py-2 rounded-xl font-bold text-sm active:scale-95 transition"
            style={{ background: "var(--blink-yellow)" }}
          >
            ⚡ Open Camera
          </button>
        </div>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[11px] font-semibold text-muted-foreground">OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <button className="w-full py-2.5 rounded-xl bg-secondary text-sm font-semibold active:scale-[0.98] transition">
          📁 Upload a photo
        </button>

        <div className="mt-6">
          <h3 className="font-bold text-sm mb-3">✅ Scan Complete — Here's what we found</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary rounded-xl p-3">
              <div className="text-[11px] font-bold text-muted-foreground mb-2">
                Items detected
              </div>
              <div className="space-y-2">
                {fridgeDetected.map((d) => (
                  <div key={d.name} className="flex items-start gap-1.5">
                    <span style={{ color: "var(--blink-green)" }} className="font-bold">
                      ✓
                    </span>
                    <div className="text-[12px] leading-tight">
                      <div className="font-semibold">{d.name}</div>
                      <div className="text-[10px] text-muted-foreground">{d.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="rounded-xl p-3"
              style={{ background: "rgba(248,208,59,0.15)" }}
            >
              <div className="text-[11px] font-bold text-muted-foreground mb-2">
                Suggested reorder
              </div>
              <div className="space-y-2">
                {fridgeReorder.map((p) => (
                  <button
                    key={p.id}
                    className="w-full flex items-center gap-1.5 text-left active:scale-[0.98] transition"
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                      style={{ background: "var(--blink-yellow)" }}
                    >
                      +
                    </span>
                    <div className="text-[11px] leading-tight flex-1 min-w-0">
                      <div className="font-semibold truncate">
                        {p.name} {p.weight}
                      </div>
                      <div className="text-[10px] text-muted-foreground">₹{p.price}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onAddAll}
          className="w-full mt-5 py-3.5 rounded-2xl font-bold text-sm active:scale-[0.98] transition"
          style={{ background: "var(--blink-yellow)" }}
        >
          Add All to Cart · ₹252
        </button>
        <p className="text-[11px] text-muted-foreground text-center mt-2">
          Based on your scan · Delivered in 10 mins
        </p>
      </div>
    </div>
  );
}
