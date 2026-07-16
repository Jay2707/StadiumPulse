import Panel from "@/components/Panel";
import AssistantChat from "@/components/AssistantChat";

const services = [
  { title: "Accessible Entrances", detail: "Gates A2, C1, D3 have step-free access with dedicated lifts." },
  { title: "Sensory-Friendly Room", detail: "Quiet room near Section 108 — reduced light and sound." },
  { title: "Hearing Loop Sections", detail: "Sections 104–112 broadcast commentary via induction loop." },
  { title: "Escort Requests", detail: "Request a volunteer escort from any Fan Services desk or via chat." },
];

export default function AccessibilityPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-amber">ACC</span>
        <h1 className="font-display text-2xl md:text-3xl text-floodlight mt-1">Accessibility Concierge</h1>
        <p className="text-mist text-sm mt-2 max-w-2xl">
          Clear information plus a conversational assistant for anything that doesn't fit a static FAQ.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel eyebrow="Reference" title="Accessibility services">
          <div className="space-y-4">
            {services.map((s) => (
              <div key={s.title} className="border-b border-steelLine last:border-0 pb-3 last:pb-0">
                <h3 className="text-sm font-medium text-floodlight">{s.title}</h3>
                <p className="text-xs text-mist mt-1">{s.detail}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="AI Concierge" title="Ask for help" className="h-fit">
          <AssistantChat
            mode="accessibility"
            placeholder="e.g. I need a wheelchair route to Section 114"
            starter="I can help with accessible routes, seating, sensory rooms, or arranging an escort. What do you need?"
            quickPrompts={[
              "Wheelchair route to Section 114",
              "Is there a quiet room nearby?",
              "Request an escort to Gate A2",
            ]}
          />
        </Panel>
      </div>
    </div>
  );
}
