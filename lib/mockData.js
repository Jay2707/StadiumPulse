export const gates = [
  { id: "A1", zone: "North Lower", capacity: 62 },
  { id: "A2", zone: "North Accessible", capacity: 38 },
  { id: "B2", zone: "East Concourse", capacity: 91 },
  { id: "C4", zone: "South Upper", capacity: 74 },
  { id: "D1", zone: "West Lower", capacity: 55 },
  { id: "D3", zone: "West Upper", capacity: 68 },
];

export const shuttleLines = [
  { line: "Line 1 — Downtown Hub", eta: 6, load: 70 },
  { line: "Line 2 — Airport Express", eta: 14, load: 45 },
  { line: "Line 3 — North Transit Hub", eta: 4, load: 88 },
  { line: "Line 4 — Park & Ride West", eta: 9, load: 33 },
];

export const sustainabilityStats = {
  wasteDiverted: 76,
  reusableCupsUsed: 18400,
  co2SavedKg: 2340,
  waterRefillStations: 24,
};

export const opsProtocols = [
  {
    title: "Medical Emergency",
    steps: [
      "Radio control room on Channel 2 immediately.",
      "Do not move the individual unless in immediate danger.",
      "Send your zone code and nearest gate letter.",
      "Wait for medical team; keep the area clear.",
    ],
  },
  {
    title: "Lost Child",
    steps: [
      "Take the child to the nearest Fan Services desk.",
      "Log description + last known location in the shift app.",
      "Announce a coded page (never the child's name) via PA.",
      "Stay with the child until a guardian is verified.",
    ],
  },
  {
    title: "Severe Weather Hold",
    steps: [
      "Await control-room hold announcement before acting.",
      "Direct fans to nearest concourse, not open seating.",
      "Suspend concession gas equipment per safety protocol.",
      "Resume only after all-clear broadcast.",
    ],
  },
  {
    title: "Security Incident",
    steps: [
      "Do not intervene physically — observe and report.",
      "Radio security channel with location and description.",
      "Guide nearby fans away calmly, without alarming language.",
      "File incident report within 30 minutes of resolution.",
    ],
  },
];

// simple deterministic pseudo-random so server/client render match on first paint
export function seededVariance(seed, range = 6) {
  const x = Math.sin(seed * 999) * 10000;
  return Math.floor((x - Math.floor(x)) * range) - range / 2;
}
