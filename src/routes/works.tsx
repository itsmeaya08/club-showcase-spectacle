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
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

      <h1 className="works-heading">
        Works I Am Proud Of
      </h1>

      <div className="works-testimonial-wrap">
        <AnimatedTestimonials testimonials={TESTIMONIALS} autoplay />
      </div>

      <button
        className="conclusion-btn"
        onClick={() => navigate({ to: "/conclusion" })}
      >
        <span className="word">CONCLUSION</span>
        <span className="arrow">&rarr;</span>
      </button>
    </section>
  );
}
