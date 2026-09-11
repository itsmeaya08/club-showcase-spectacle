import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/conclusion")({
  head: () => ({
    meta: [
      { title: "AYA.SYS — The Story Begins" },
      {
        name: "description",
        content: "AYA SARSENGALIYEVA — Business, Finance, Creativity, Curiosity. Let's talk.",
      },
      { property: "og:title", content: "AYA.SYS — The Story Begins" },
      {
        property: "og:description",
        content: "AYA SARSENGALIYEVA — Business, Finance, Creativity, Curiosity. Let's talk.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Conclusion,
});

function Conclusion() {
  const [phase, setPhase] = useState<"end" | "pause" | "beginning" | "story">("end");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("pause"), 1800));
    timers.push(setTimeout(() => setPhase("beginning"), 3200));
    timers.push(setTimeout(() => setPhase("story"), 4800));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section id="conclusion" data-phase={phase}>
      <div className="conclusion-corner tl">
        <Link to="/">AYA.SYS</Link>
        <br />
        <span>END</span>
      </div>
      <div className="conclusion-corner br">
        <Link to="/works">&larr; BACK</Link>
      </div>

      {/* Phase 1: END OF PRESENTATION */}
      <div className={`conclusion-end ${phase === "end" ? "visible" : ""}`}>
        <span className="end-label">THAT&apos;S THE STORY SO FAR.</span>
      </div>

      {/* Phase 2: pause / glitch transition */}
      <div className={`conclusion-pause ${phase === "pause" ? "visible" : ""}`} />

      {/* Phase 3+4: closing message and name */}
      <div className={`conclusion-beginning ${phase === "beginning" ? "visible" : ""}`}>
        <h1 className="beginning-title">THE REST IS UP TO YOU.</h1>
      </div>

      <div className={`conclusion-story ${phase === "story" ? "visible" : ""}`}>
        <div className="story-name-block">
          <p className="story-tags">THE REST IS UP TO YOU.</p>
          <h2 className="story-name">AYA SARSENGALIYEVA</h2>
        </div>
      </div>
    </section>
  );
}
