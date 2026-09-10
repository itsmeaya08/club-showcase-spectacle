import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "AYA.SYS — Works I Am Proud Of" },
      {
        name: "description",
        content:
          "Portfolio of works by Aya Sarsengaliyeva — projects, presentations, and creative endeavors.",
      },
      { property: "og:title", content: "AYA.SYS — Works I Am Proud Of" },
      {
        property: "og:description",
        content:
          "A portfolio of works by Aya Sarsengaliyeva — projects, presentations, and creative endeavors.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Works,
});

type Work = {
  src: string;
  title: string;
  desc: string;
};

const WORKS: Work[] = [
  {
    src: "https://images.pexels.com/photos/4990545/pexels-photo-4990545.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "Data Analysis Project",
    desc: "Collaborative data analysis examining market trends and business performance metrics.",
  },
  {
    src: "https://images.pexels.com/photos/6476782/pexels-photo-6476782.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "Business Presentation",
    desc: "A comprehensive presentation on data-driven decision making in a corporate environment.",
  },
  {
    src: "https://images.pexels.com/photos/8424452/pexels-photo-8424452.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "Strategy Whiteboard",
    desc: "Team strategy session mapping out productivity initiatives and growth plans.",
  },
  {
    src: "https://images.pexels.com/photos/4872033/pexels-photo-4872033.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "Team Collaboration",
    desc: "Leading a productive office meeting with cross-functional team discussions.",
  },
  {
    src: "https://images.pexels.com/photos/7693148/pexels-photo-7693148.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "Growth Strategy",
    desc: "Presenting growth graphs and strategic insights for business development.",
  },
  {
    src: "https://images.pexels.com/photos/8279051/pexels-photo-8279051.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "Design Portfolio",
    desc: "Analyzing and curating a creative design portfolio in a modern office setting.",
  },
  {
    src: "https://images.pexels.com/photos/6593364/pexels-photo-6593364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "Creative Studio",
    desc: "Engaging in digital creative work using modern tools in a studio environment.",
  },
  {
    src: "https://images.pexels.com/photos/16313659/pexels-photo-16313659.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "Photo Editing",
    desc: "Professional photo editing and visual content creation for media projects.",
  },
];

function Works() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [zoomActive, setZoomActive] = useState(false);
  const [activeWork, setActiveWork] = useState<Work | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const overlayImgRef = useRef<HTMLImageElement | null>(null);
  const activeThumb = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setZoomActive(true), 100);
    return () => clearTimeout(t);
  }, []);

  const openWork = (img: HTMLImageElement, work: Work) => {
    activeThumb.current = img;
    const rect = img.getBoundingClientRect();
    setActiveWork(work);

    requestAnimationFrame(() => {
      const el = overlayImgRef.current;
      const overlay = overlayRef.current;
      if (!el || !overlay) return;
      el.style.transition = "none";
      el.style.top = `${rect.top}px`;
      el.style.left = `${rect.left}px`;
      el.style.width = `${rect.width}px`;
      el.style.height = `${rect.height}px`;
      el.style.borderRadius = "8px";
      overlay.classList.add("active");

      requestAnimationFrame(() => {
        void el.offsetWidth;
        el.style.transition = "";
        const size = Math.min(window.innerWidth * 0.5, window.innerHeight * 0.55, 480);
        el.style.top = `${(window.innerHeight - size) / 2}px`;
        el.style.left = `${(window.innerWidth - size) / 2}px`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.borderRadius = "12px";
      });
    });
  };

  const closeWork = () => {
    const thumb = activeThumb.current;
    const el = overlayImgRef.current;
    if (!thumb || !el) return;
    const rect = thumb.getBoundingClientRect();
    el.style.top = `${rect.top}px`;
    el.style.left = `${rect.left}px`;
    el.style.width = `${rect.width}px`;
    el.style.height = `${rect.height}px`;
    el.style.borderRadius = "8px";
    overlayRef.current?.classList.remove("active");
    setTimeout(() => {
      activeThumb.current = null;
      setActiveWork(null);
    }, 450);
  };

  return (
    <section
      id="works"
      ref={sectionRef}
      className={zoomActive ? "zoom-active" : ""}
    >
      <div className="works-corner tl">
        <Link to="/">AYA.SYS</Link>
        <br />
        <span>PORTFOLIO</span>
      </div>
      <div className="works-corner br">
        <Link to="/">&larr; BACK</Link>
      </div>

      <div className="works-orbit">
        {WORKS.map((work, i) => {
          const angle = (i / WORKS.length) * 360;
          return (
            <div
              className="works-orbit-item"
              key={work.title}
              style={{ "--orbit-angle": `${angle}deg` } as React.CSSProperties}
            >
              <img
                src={work.src}
                alt={work.title}
                onClick={(e) => {
                  e.stopPropagation();
                  openWork(e.currentTarget, work);
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="works-center-circle">
        <span>Works I Am Proud Of</span>
      </div>

      <div
        className="works-overlay"
        ref={overlayRef}
        onClick={closeWork}
      >
        {activeWork && (
          <>
            <img ref={overlayImgRef} src={activeWork.src} alt={activeWork.title} />
            <div className="works-overlay-info">
              <div className="works-overlay-title">{activeWork.title}</div>
              <p className="works-overlay-desc">{activeWork.desc}</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
