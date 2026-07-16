"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Overview", eyebrow: "CMD" },
  { href: "/navigate", label: "Wayfinding & Chat", eyebrow: "NAV" },
  { href: "/crowd", label: "Crowd Management", eyebrow: "CRW" },
  { href: "/accessibility", label: "Accessibility", eyebrow: "ACC" },
  { href: "/transport", label: "Transportation", eyebrow: "TRN" },
  { href: "/sustainability", label: "Sustainability", eyebrow: "SUS" },
  { href: "/ops", label: "Ops Intelligence", eyebrow: "OPS" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-steelLine px-5 py-8 gap-8">
      <div>
        <div className="font-display text-2xl leading-none text-floodlight tracking-tight">
          STADIUM<span className="text-amber">PULSE</span>
        </div>
        <p className="text-xs text-mist mt-2 font-mono">FIFA WORLD CUP 2026 · OPS AI</p>
      </div>
      <nav className="flex flex-col gap-1">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-steel text-floodlight border border-steelLine"
                  : "text-mist hover:text-floodlight hover:bg-steel/60"
              }`}
            >
              <span className={`font-mono text-[10px] w-8 ${active ? "text-amber" : "text-mist/60"}`}>
                {l.eyebrow}
              </span>
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto text-[11px] text-mist/70 font-mono leading-relaxed">
        Built for the Google × Hack2Skill GenAI Challenge.
        <br />
        Powered by Gemini.
      </div>
    </aside>
  );
}
