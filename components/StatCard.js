export default function StatCard({ label, value, unit, tone = "amber", sub }) {
  return (
    <div className="bg-steel border border-steelLine rounded-lg p-5 flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-widest text-mist font-mono">{label}</span>
      <div className="flex items-baseline gap-1.5">
        <span className={`led-number ${tone === "amber" ? "" : tone} text-3xl md:text-4xl`}>
          {value}
        </span>
        {unit && <span className="text-mist text-sm font-mono">{unit}</span>}
      </div>
      {sub && <span className="text-xs text-mist">{sub}</span>}
    </div>
  );
}
