import Panel from "@/components/Panel";
import AssistantChat from "@/components/AssistantChat";
import { shuttleLines } from "@/lib/mockData";

export default function TransportPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-amber">TRN</span>
        <h1 className="font-display text-2xl md:text-3xl text-floodlight mt-1">Transportation</h1>
        <p className="text-mist text-sm mt-2 max-w-2xl">
          Live shuttle ETAs and load, plus an AI planner that times your departure to dodge post-match crowds.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel eyebrow="Live Feed" title="Shuttle lines">
          <div className="space-y-4">
            {shuttleLines.map((s) => (
              <div key={s.line} className="flex items-center justify-between border-b border-steelLine last:border-0 pb-3 last:pb-0">
                <div>
                  <p className="text-sm text-floodlight font-medium">{s.line}</p>
                  <p className="text-xs text-mist mt-0.5">Load: {s.load}%</p>
                </div>
                <div className="led-number text-xl">{s.eta}<span className="text-xs text-mist font-mono ml-1">min</span></div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="AI Planner" title="Plan your trip" className="h-fit">
          <AssistantChat
            mode="transport"
            placeholder="e.g. Best way back to downtown after the match?"
            starter="Tell me where you're headed and when the match ends — I'll suggest the fastest, least-congested option."
            quickPrompts={[
              "Best way to downtown after full time?",
              "Is parking Lot D still open?",
              "Ride-share pickup point?",
            ]}
          />
        </Panel>
      </div>
    </div>
  );
}
