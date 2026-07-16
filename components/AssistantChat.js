"use client";
import { useState, useRef, useEffect } from "react";

export default function AssistantChat({ mode, placeholder, starter, quickPrompts = [] }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: starter },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text) {
    const value = (text ?? input).trim();
    if (!value || loading) return;
    const next = [...messages, { role: "user", text: value }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          history: next.slice(-8).map((m) => ({ role: m.role, text: m.text })),
        }),
      });
      const data = await res.json();
      setMessages((cur) => [
        ...cur,
        { role: "assistant", text: data.reply || "I couldn't reach the AI service just now — please try again." },
      ]);
    } catch (e) {
      setMessages((cur) => [
        ...cur,
        { role: "assistant", text: "Connection issue reaching the assistant. Check your GEMINI_API_KEY setup." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-3 max-h-[420px]">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
              m.role === "user"
                ? "ml-auto bg-amber text-pitch font-medium"
                : "bg-pitch border border-steelLine text-floodlight"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="bg-pitch border border-steelLine text-mist rounded-lg px-3.5 py-2.5 text-sm w-fit">
            <span className="animate-pulse">Thinking…</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {quickPrompts.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {quickPrompts.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="text-xs font-mono px-2.5 py-1.5 rounded-full border border-steelLine text-mist hover:text-floodlight hover:border-amber transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-pitch border border-steelLine rounded-md px-3.5 py-2.5 text-sm text-floodlight placeholder:text-mist/60 focus:border-amber outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-amber text-pitch font-semibold text-sm px-4 py-2.5 rounded-md hover:brightness-110 disabled:opacity-50 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
