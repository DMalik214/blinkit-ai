export function BlinkitHeader() {
  return (
    <div style={{ background: "var(--blink-yellow)" }} className="px-4 pt-3 pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-lg">
            ⚡
          </div>
          <div>
            <div className="text-[10px] font-bold leading-none" style={{ color: "#7a5d00" }}>
              blinkit
            </div>
            <div
              className="text-[11px] font-bold mt-0.5 px-1.5 py-0.5 rounded inline-block"
              style={{ background: "var(--blink-green)", color: "white" }}
            >
              Delivery in 10 mins
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
          <span>📍</span>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] opacity-70">HOME</span>
            <span className="text-[12px] font-bold">Sector 7, Rohini ▾</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  rightBadge,
  extra,
}: {
  title: string;
  subtitle?: string;
  onBack: () => void;
  rightBadge?: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="bg-white border-b border-border px-4 py-3 flex items-center gap-3">
      <button
        onClick={onBack}
        className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-lg font-bold"
      >
        ←
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-bold truncate">{title}</h1>
          {extra}
        </div>
        {subtitle && <p className="text-[11px] text-muted-foreground">{subtitle}</p>}
      </div>
      {rightBadge && (
        <span
          className="text-[10px] font-bold px-2 py-1 rounded"
          style={{ background: "var(--blink-green)", color: "white" }}
        >
          {rightBadge}
        </span>
      )}
    </div>
  );
}
