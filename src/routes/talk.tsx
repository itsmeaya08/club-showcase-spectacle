import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/talk")({
  head: () => ({
    meta: [
      { title: "AYA.SYS — Let's Talk" },
      {
        name: "description",
        content:
          "Let's talk with Aya Sarsengaliyeva about ideas, opportunities, and what comes next.",
      },
      { property: "og:title", content: "AYA.SYS — Let's Talk" },
      {
        property: "og:description",
        content: "A short line to Aya Sarsengaliyeva.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Talk,
});

function Talk() {
  return (
    <main id="talk-page">
      <div className="talk-corner talk-corner-tl">
        <Link to="/">AYA.SYS</Link>
        <br />
        <span>CONTACT / 04</span>
      </div>
      <div className="talk-corner talk-corner-br">
        <Link to="/conclusion">&larr; BACK</Link>
      </div>

      <div className="talk-layout">
        <section className="talk-copy">
          <p className="talk-kicker">NO FORMALITIES REQUIRED</p>
          <h1>
            Let&apos;s
            <br />
            <em>talk.</em>
          </h1>
          <div className="talk-links">
            <a href="mailto:hi-its-aya@tamu.edu" className="talk-link talk-link-primary">
              <span>EMAIL</span>
              <strong>hi-its-aya@tamu.edu</strong>
              <span className="talk-arrow">↗</span>
            </a>
            <a href="tel:+19794227220" className="talk-link">
              <span>CALL / TEXT</span>
              <strong>979 422 7220</strong>
              <span className="talk-arrow">↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/asarse"
              target="_blank"
              rel="noreferrer"
              className="talk-link"
            >
              <span>LINKEDIN</span>
              <strong>linkedin.com/in/asarse</strong>
              <span className="talk-arrow">↗</span>
            </a>
          </div>
        </section>

        <section className="talk-portrait" aria-label="Portrait of Aya Sarsengaliyeva">
          <div className="talk-portrait-backdrop" />
          <div className="talk-portrait-sticker">
            AVAILABLE
            <br />
            FOR GOOD
            <br />
            CONVERSATIONS
          </div>
          <img src="/talk/aya-contact.jpg" alt="Aya Sarsengaliyeva" />
          <div className="talk-portrait-caption">
            AYA / 2026
            <br />
            BRYAN → COLLEGE STATION
          </div>
        </section>
      </div>

      <footer className="talk-footer">
        <span>IF IT&apos;S WORTH BUILDING, IT&apos;S WORTH TALKING ABOUT.</span>
        <span>↘ SAY HELLO</span>
      </footer>
    </main>
  );
}
