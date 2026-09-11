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

const LINES = [
  "You've seen what I've built.",
  "You've seen what I care about.",
  "You've seen a little bit of who I am.",
  "Now I'd love the chance to show you what I can build with BSS.",
];

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
        <span className="end-label">END OF PRESENTATION</span>
      </div>

      {/* Phase 2: pause / glitch transition */}
      <div className={`conclusion-pause ${phase === "pause" ? "visible" : ""}`} />

      {/* Phase 3+4: BEGINNING OF THE STORY + body text */}
      <div className={`conclusion-beginning ${phase === "beginning" ? "visible" : ""}`}>
        <h1 className="beginning-title">BEGINNING OF THE STORY</h1>
      </div>

      <div className={`conclusion-story ${phase === "story" ? "visible" : ""}`}>
        <div className="story-lines">
          {LINES.map((line, i) => (
            <p key={i} className="story-line" style={{ animationDelay: `${i * 0.4}s` }}>
              {line}
            </p>
          ))}
        </div>

        <div className="story-name-block">
          <h2 className="story-name">AYA SARSENGALIYEVA</h2>
          <p className="story-tags">Business &bull; Finance &bull; Creativity &bull; Curiosity</p>
        </div>

        <a href="mailto:aya@example.com" className="lets-talk-btn">
          <span className="word">LET'S TALK</span>
          <span className="arrow">&rarr;</span>
        </a>
      </div>
    </section>
  );
}
