import { NextResponse } from "next/server";
import { getModel } from "@/lib/gemini";

const PERSONAS = {
  navigate: `You are StadiumPulse's multilingual wayfinding assistant inside a FIFA World Cup 2026 stadium.
You help fans find gates, seats, restrooms, food stalls, first aid, and exits, and you detect and reply
fluently in whatever language the fan writes in. Keep answers short (2-4 sentences), concrete, and
give step-by-step directions using landmarks (concourse level, section numbers, gate letters) when relevant.
If asked something outside stadium navigation/fan services, gently redirect to what you can help with.`,

  accessibility: `You are StadiumPulse's accessibility concierge for a FIFA World Cup 2026 stadium.
You assist fans and staff with wheelchair routes, accessible seating, sensory-friendly quiet rooms,
service animal relief areas, hearing-loop assisted sections, and companion/escort requests.
Be warm, precise, and proactive: mention the nearest accessible entrance or lift when relevant,
and offer to notify a volunteer escort. Keep responses concise and actionable.`,

  crowd: `You are StadiumPulse's crowd management AI advising tournament organizers and control-room staff.
Given live-style stadium context (gate density, concourse flow, weather, kickoff timing), you produce
short operational recommendations: which gates to open/close, where to reroute flow, whether to trigger
a hold-and-release at a gate, and staffing reallocation. Be decisive, use bullet-style short sentences,
and always name a specific gate/zone. This is decision support for staff, not for the public.`,

  transport: `You are StadiumPulse's transportation and logistics AI for fans and organizers at a
FIFA World Cup 2026 host city. You give guidance on shuttle timing, ride-share pickup zones, parking
availability, last-mile walking routes, and how to time departure to avoid post-match congestion.
Be specific with realistic timing windows and always mention at least one alternative mode of transport.`,

  sustainability: `You are StadiumPulse's sustainability advisor for fans, volunteers, and organizers.
You give practical, specific tips on waste sorting/recycling at stadium bins, reducing single-use plastic,
low-carbon travel choices, and highlight the stadium's live sustainability stats when relevant.
Keep it encouraging and specific, never preachy, 2-4 sentences.`,

  ops: `You are StadiumPulse's operational intelligence assistant, briefing volunteers and venue staff.
You help staff quickly look up protocols (medical emergency escalation, lost child procedure, severe
weather hold, security incident reporting), summarize shift handover notes, and answer "what do I do if..."
questions with clear numbered steps. Assume the user is on shift right now and needs speed and clarity.`,
};

const FALLBACKS = {
  navigate:
    "Head to the main concourse and follow the gold signage toward Gate C — it's the shortest route from most upper-tier sections. (Live AI is offline: add a GEMINI_API_KEY to enable real-time multilingual answers.)",
  accessibility:
    "The nearest accessible entrance is Gate A2, with a lift to all accessible seating blocks. A volunteer escort can meet you there. (Live AI is offline: add a GEMINI_API_KEY to enable personalized answers.)",
  crowd:
    "Recommend opening auxiliary Gate C4 and holding entry at B2 for 6 minutes to relieve concourse density. (Live AI is offline: add a GEMINI_API_KEY for real-time recommendations.)",
  transport:
    "Shuttle Line 3 departs every 8 minutes from the North Transit Hub; ride-share pickup is at Lot D to avoid post-match backup. (Live AI is offline: add a GEMINI_API_KEY for live guidance.)",
  sustainability:
    "Sort recyclables at the blue bins near every concourse — the stadium is diverting over 70% of match-day waste today. (Live AI is offline: add a GEMINI_API_KEY for tailored tips.)",
  ops:
    "Standard protocol: 1) Alert control room via radio channel 2, 2) Stay with the individual, 3) Log the incident in the shift app. (Live AI is offline: add a GEMINI_API_KEY for full assistant support.)",
};

export async function POST(req) {
  try {
    const { mode, history } = await req.json();
    const persona = PERSONAS[mode] || PERSONAS.navigate;
    const model = getModel();

    if (!model) {
      return NextResponse.json({ reply: FALLBACKS[mode] || FALLBACKS.navigate, offline: true });
    }

    const convo = (history || [])
      .map((m) => `${m.role === "user" ? "Fan/Staff" : "Assistant"}: ${m.text}`)
      .join("\n");

    const prompt = `${persona}\n\nConversation so far:\n${convo}\n\nAssistant:`;

    // The `@google/generative-ai` client surface has changed across versions and
    // various wrappers return slightly different shapes. Try several common
    // method names and response shapes so the route works with multiple installs.
    const genMethods = [
      "generateContent",
      "generate",
      "generateText",
      "generateMessage",
    ];

    let result = null;
    for (const m of genMethods) {
      if (typeof model[m] === "function") {
        try {
          if (m === "generate") {
            result = await model[m]({ input: prompt });
          } else {
            result = await model[m](prompt);
          }
          break;
        } catch (e) {
          console.warn(`Gemini method ${m} failed, trying next:`, e?.message || e);
        }
      }
    }

    let reply;
    if (!result) {
      reply = FALLBACKS[mode] || FALLBACKS.navigate;
    } else if (result?.response && typeof result.response.text === "function") {
      reply = result.response.text().trim();
    } else if (Array.isArray(result.output) && result.output[0]?.content) {
      // Newer responses place content in output[0].content which can be an array
      const content = result.output[0].content;
      if (Array.isArray(content)) {
        const textPart = content.find((c) => c?.text || c?.type === "output_text");
        reply = (textPart?.text || (typeof textPart === "string" ? textPart : "")).trim();
      } else {
        reply = (content[0]?.text || "").trim();
      }
    } else if (typeof result.text === "string") {
      reply = result.text.trim();
    } else {
      // Fallback: stringify a short summary so the client sees something helpful
      try {
        reply = JSON.stringify(result).slice(0, 1000);
      } catch (e) {
        reply = FALLBACKS[mode] || FALLBACKS.navigate;
      }
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Assistant route error:", err);
    return NextResponse.json(
      { reply: "Something went wrong reaching the AI service. Please try again in a moment." },
      { status: 200 }
    );
  }
}
