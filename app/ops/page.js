import Panel from "@/components/Panel";
import AssistantChat from "@/components/AssistantChat";
import { opsProtocols } from "@/lib/mockData";

export default function OpsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-amber">OPS</span>
        <h1 className="font-display text-2xl md:text-3xl text-floodlight mt-1">Ops Intelligence</h1>
        <p className="text-mist text-sm mt-2 max-w-2xl">
          Built for volunteers and venue staff mid-shift: fast protocol lookups and an AI assistant that
          answers "what do I do if…" in seconds.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel eyebrow="Protocols" title="Quick reference">
          <div className="space-y-4">
            {opsProtocols.map((p) => (
              <details key={p.title} className="group border border-steelLine rounded-lg px-4 py-3 open:bg-pitch/40">
                <summary className="cursor-pointer text-sm font-medium text-floodlight flex justify-between items-center">
                  {p.title}
                  <span className="text-mist font-mono text-xs group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <ol className="list-decimal list-inside text-xs text-mist mt-2 space-y-1">
                  {p.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </details>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="AI Assistant" title="Ask on-shift" className="h-fit">
          <AssistantChat
            mode="ops"
            placeholder="e.g. A fan collapsed near Section 110, what do I do?"
            starter="I'm your shift assistant. Ask me any protocol question, or describe a situation and I'll give you the steps."
            quickPrompts={[
              "Fan collapsed near Section 110",
              "Found an unattended bag",
              "How do I log a lost child?",
            ]}
          />
        </Panel>
      </div>
    </div>
  );
}
