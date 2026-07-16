import Link from "next/link";
import StatCard from "@/components/StatCard";
import Panel from "@/components/Panel";
import { gates, shuttleLines, sustainabilityStats } from "@/lib/mockData";

const modules = [
  {
    href: "/navigate",
    eyebrow: "NAV",
    title: "Wayfinding & Multilingual Chat",
    desc: "Fans ask in any language — get gate directions, seat finding, and stadium services instantly.",
  },
  {
    href: "/crowd",
    eyebrow: "CRW",
    title: "Crowd Management",
    desc: "Live gate density feeds a GenAI advisor that recommends reroutes before bottlenecks form.",
  },
  {
    href: "/accessibility",
    eyebrow: "ACC",
    title: "Accessibility Concierge",
    desc: "Wheelchair routes, sensory rooms, and escort requests — answered with context, not scripts.",
  },
  {
    href: "/transport",
    eyebrow: "TRN",
    title: "Transportation",
    desc: "Shuttle ETAs, ride-share zones, and AI-timed departure advice to beat post-match gridlock.",
  },
  {
    href: "/sustainability",
    eyebrow: "SUS",
    title: "Sustainability Tracker",
    desc: "Live diversion stats plus an AI coach nudging fans toward greener match-day choices.",
  },
  {
    href: "/ops",
    eyebrow: "OPS",
    title: "Ops Intelligence",
    desc: "Volunteers and staff get instant protocol lookups and shift-ready guidance under pressure.",
  },
];

export default function Overview() {
  const avgLoad = Math.round(gates.reduce((a, g) => a + g.capacity, 0) / gates.length);
  return (
    <div className="flex flex-col gap-10">
      <section>
        <span className="text-[11px] font-mono uppercase tracking-widest text-amber">
          Command Center · Match Day
        </span>
        <h1 className="font-display text-3xl md:text-5xl mt-2 leading-tight text-floodlight max-w-3xl">
          One AI layer running under the whole stadium.
        </h1>
        <p className="text-mist mt-4 max-w-2xl text-sm md:text-base">
          StadiumPulse gives fans, volunteers, and organizers a shared GenAI copilot — for finding a gate,
          clearing a bottleneck, requesting an escort, or catching the last shuttle out. Built for the scale
          of FIFA World Cup 2026.
        </p>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Avg. Gate Load" value={avgLoad} unit="%" tone="amber" sub="Across 6 monitored gates" />
        <StatCard label="Shuttle ETA" value={shuttleLines[2].eta} unit="min" tone="green" sub="Line 3 · North Hub" />
        <StatCard
          label="Waste Diverted"
          value={sustainabilityStats.wasteDiverted}
          unit="%"
          tone="green"
          sub="This match day"
        />
        <StatCard label="Languages Active" value="12" tone="amber" sub="Wayfinding desk, last hour" />
      </section>

      <section>
        <h2 className="font-display text-xl text-floodlight mb-4">Modules</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="group bg-steel/60 border border-steelLine rounded-xl p-5 hover:border-amber hover:shadow-glow transition-all"
            >
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber">{m.eyebrow}</span>
              <h3 className="font-display text-base text-floodlight mt-2 mb-1.5 group-hover:text-amber transition-colors">
                {m.title}
              </h3>
              <p className="text-xs text-mist leading-relaxed">{m.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <Panel eyebrow="Architecture" title="How the GenAI layer works">
        <ol className="text-sm text-mist space-y-2 list-decimal list-inside">
          <li>Each module sends live-style stadium context (gate density, shuttle load, protocol type) into a mode-specific prompt.</li>
          <li>Google Gemini generates grounded, role-appropriate guidance — fan-facing or staff-facing tone shifts per module.</li>
          <li>If no API key is configured, every module degrades gracefully to a realistic offline response, so the demo never breaks.</li>
        </ol>
      </Panel>
    </div>
  );
}
