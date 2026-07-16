import Panel from "@/components/Panel";
import AssistantChat from "@/components/AssistantChat";

export default function NavigatePage() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-amber">NAV</span>
        <h1 className="font-display text-2xl md:text-3xl text-floodlight mt-1">Wayfinding & Multilingual Chat</h1>
        <p className="text-mist text-sm mt-2 max-w-2xl">
          Fans type in any language — Spanish, French, Portuguese, Hindi, Arabic, and more. The assistant
          replies in kind, with concrete directions using stadium landmarks.
        </p>
      </div>

      <Panel eyebrow="Live" title="Ask the wayfinding assistant">
        <AssistantChat
          mode="navigate"
          placeholder="e.g. ¿Dónde está la puerta C? / Where's the nearest restroom?"
          starter="Hi! Ask me for directions to any gate, seat section, restroom, food stall, or first aid post — in your own language."
          quickPrompts={[
            "Where is Gate C4?",
            "¿Dónde puedo comprar comida vegana?",
            "Nearest first aid station?",
            "Comment aller au parking D?",
          ]}
        />
      </Panel>
    </div>
  );
}
