import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TickerBar from "@/components/TickerBar";
import MobileNav from "@/components/MobileNav";

export const metadata = {
  title: "StadiumPulse — AI Stadium Operations Command Center",
  description:
    "GenAI-powered navigation, crowd management, accessibility, transport, sustainability and operational intelligence for World Cup 2026 stadiums.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-pitch bg-floodgrid min-h-screen">
        <TickerBar />
        <MobileNav />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-h-[calc(100vh-40px)] px-5 md:px-10 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
