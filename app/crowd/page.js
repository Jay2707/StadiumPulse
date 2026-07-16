import Panel from "@/components/Panel";
import AssistantChat from "@/components/AssistantChat";
import { gates } from "@/lib/mockData";

function loadTone(capacity) {
  if (capacity >= 85) return { label: "Critical", cls: "text-alert", bar: "bg-alert" };
  if (capacity >= 70) return { label: "Elevated", cls: "text-amber", bar: "bg-amber" };
  return { label: "Normal", cls: "text-turf", bar: "bg-turf" };
}

export default function CrowdPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-amber">CRW</span>
        <h1 className="font-display text-2xl md:text-3xl text-floodlight mt-1">Crowd Management</h1>
        <p className="text-mist text-sm mt-2 max-w-2xl">
          Live gate density feeds directly into the GenAI advisor below, so control-room staff get
          decisions, not just dashboards.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel eyebrow="Live Feed" title="Gate density">
          <div className="space-y-4">
            {gates.map((g) => {
              const t = loadTone(g.capacity);
              return (
                <div key={g.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-floodlight font-medium">
                      Gate {g.id} <span className="text-mist font-normal">· {g.zone}</span>
                    </span>
                    <span className={`font-mono ${t.cls}`}>{g.capacity}% · {t.label}</span>
                  </div>
                  <div className="h-2 w-full bg-pitch rounded-full overflow-hidden border border-steelLine">
                    <div className={`h-full ${t.bar}`} style={{ width: `${g.capacity}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel eyebrow="AI Advisor" title="Ask for a recommendation" className="h-fit">
          <AssistantChat
            mode="crowd"
            placeholder="e.g. Gate B2 is at 91% — what should we do?"
            starter="I'm watching all 6 gates live. Ask me what to do about any bottleneck, or paste a density number and I'll recommend an action."
            quickPrompts={[
              "Gate B2 is at 91%, kickoff in 20 min",
              "Should we open an auxiliary gate?",
              "Post-match egress plan for South Upper",
            ]}
          />
        </Panel>
      </div>
    </div>
  );
}
