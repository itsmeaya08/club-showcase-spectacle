import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

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

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "A student-led Model United Nations experience built around confidence, preparation, and meaningful collaboration.",
    name: "AWSD & Riviera MUN",
    designation: "Event leadership / community building",
    src: "/works/work-1.png",
  },
  {
    quote:
      "The kind of shared win that makes the long hours, teamwork, and competitive spirit worth it.",
    name: "Business Competition",
    designation: "Teamwork / achievement",
    src: "/works/work-2.png",
  },
  {
    quote:
      "Creating spaces where a whole team can show up, stay connected, and make something together.",
    name: "Connected Community",
    designation: "Youth collaboration / communication",
    src: "/works/work-3.png",
  },
  {
    quote: "A digital home for young people to find updates, opportunities, and one another.",
    name: "Youth Bridge",
    designation: "Digital community / outreach",
    src: "/works/work-4.png",
  },
  {
    quote:
      "Staying close to the people who matter, even when distance turns a simple conversation into a screen.",
    name: "Always Connected",
    designation: "Family / perspective",
    src: "/works/work-5.png",
  },
];

function Works() {
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="works" className={entered ? "entered" : ""}>
      <div className="works-corner tl">
        <Link to="/">AYA.SYS</Link>
        <br />
        <span>PORTFOLIO</span>
      </div>
      <div className="works-corner br">
        <Link to="/">&larr; BACK</Link>
      </div>

      <div className="works-heading-block">
        <h1 className="works-heading">Works I Am Proud Of</h1>
        <p className="works-intro">
          A record of the rooms I helped build, the people I learned from, and the moments that
          stayed with me.
        </p>
      </div>

      <div className="works-testimonial-wrap">
        <AnimatedTestimonials testimonials={TESTIMONIALS} autoplay />
      </div>

      <button className="conclusion-btn" onClick={() => navigate({ to: "/conclusion" })}>
        <span className="word">CONCLUSION</span>
        <span className="arrow">&rarr;</span>
      </button>
    </section>
  );
}
