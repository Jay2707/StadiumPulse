import Panel from "@/components/Panel";
import AssistantChat from "@/components/AssistantChat";
import StatCard from "@/components/StatCard";
import { sustainabilityStats } from "@/lib/mockData";

export default function SustainabilityPage() {
  const s = sustainabilityStats;
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-amber">SUS</span>
        <h1 className="font-display text-2xl md:text-3xl text-floodlight mt-1">Sustainability Tracker</h1>
        <p className="text-mist text-sm mt-2 max-w-2xl">
          Live match-day sustainability metrics, plus an AI coach with specific, judgment-free tips.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Waste Diverted" value={s.wasteDiverted} unit="%" tone="green" />
        <StatCard label="Reusable Cups Used" value={s.reusableCupsUsed.toLocaleString()} tone="green" />
        <StatCard label="CO₂ Saved" value={s.co2SavedKg.toLocaleString()} unit="kg" tone="green" />
        <StatCard label="Refill Stations" value={s.waterRefillStations} tone="amber" />
      </div>

      <Panel eyebrow="AI Coach" title="Ask for a greener option" className="max-w-2xl">
        <AssistantChat
          mode="sustainability"
          placeholder="e.g. Where do I recycle my cup?"
          starter="Ask me anything about recycling here, cutting plastic use, or the greenest way to get to the stadium."
          quickPrompts={[
            "Where's the nearest refill station?",
            "How do I sort recyclables here?",
            "Greenest way to reach the stadium?",
          ]}
        />
      </Panel>
    </div>
  );
}
