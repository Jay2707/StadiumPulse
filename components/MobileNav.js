"use client";
import { useRouter, usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Overview" },
  { href: "/navigate", label: "Wayfinding & Chat" },
  { href: "/crowd", label: "Crowd Management" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/transport", label: "Transportation" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/ops", label: "Ops Intelligence" },
];

export default function MobileNav() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="md:hidden flex items-center justify-between px-5 py-3 border-b border-steelLine">
      <div className="font-display text-lg text-floodlight">
        STADIUM<span className="text-amber">PULSE</span>
      </div>
      <select
        value={pathname}
        onChange={(e) => router.push(e.target.value)}
        className="bg-steel border border-steelLine text-floodlight text-sm rounded-md px-2 py-1.5"
        aria-label="Navigate to section"
      >
        {links.map((l) => (
          <option key={l.href} value={l.href}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
