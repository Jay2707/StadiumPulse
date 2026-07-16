/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        pitch: "#0F1B2D",      // night pitch — main background
        steel: "#1B2A40",      // card / surface
        steelLine: "#2C3E58",  // borders / dividers
        floodlight: "#F5F7EA", // warm off-white text
        turf: "#2F9E5C",       // pitch green — positive status
        amber: "#FFB627",      // scoreboard amber — primary accent
        alert: "#E4483A",      // alert red — warnings
        mist: "#93A4BD",       // muted secondary text
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(255,182,39,0.25)",
        glowGreen: "0 0 24px rgba(47,158,92,0.25)",
        glowRed: "0 0 24px rgba(228,72,58,0.25)",
      },
      backgroundImage: {
        floodgrid: "radial-gradient(circle at 50% -10%, rgba(255,182,39,0.08), transparent 60%)",
      },
    },
  },
  plugins: [],
};
