"use client";

const items = [
  "GATE C4 · 82% capacity — reroute suggested",
  "SHUTTLE LINE 3 · arriving in 4 min",
  "ACCESSIBILITY · 2 wheelchair escorts en route to Section 114",
  "AIR QUALITY · Good — 41 AQI",
  "MULTILINGUAL DESK · 12 languages active this hour",
  "LOST & FOUND · 3 items reunited today",
  "WASTE DIVERSION · 76% recycled this match day",
  "NEXT KICKOFF · 3h 12m",
];

export default function TickerBar() {
  const loop = [...items, ...items];
  return (
    <div className="h-10 w-full bg-steel border-b border-steelLine overflow-hidden flex items-center">
      <div className="flex whitespace-nowrap ticker-track">
        {loop.map((t, i) => (
          <span key={i} className="mx-6 text-xs md:text-sm text-mist font-mono tracking-wide">
            <span className="text-amber">●</span> {t}
          </span>
        ))}
      </div>
    </div>
  );
}
