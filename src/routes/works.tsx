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
      "Organized MUN conferences, debate competitions, project competitions, and countless other events all over Astana. I met what felt like half of the city through AWSD and genuinely loved it. My favorite part would be sitting down with the team after an event and realizing how well it went.",
    name: "AWSD: Event Organizer",
    designation: "01 / EVENT ORGANIZER",
    src: `${import.meta.env.BASE_URL}works/work-1.png`,
  },
  {
    quote:
      "Built a prototype of a protective bracelet for women with my classmates. I loved watching an idea become something tangible and also watching my teammates and me work relentlessly toward the same goal. Winning was exciting, but seeing our hard work pay off together was the best part.",
    name: "1st Place Business Innovation Competition",
    designation: "02 / BUSINESS INNOVATION",
    src: `${import.meta.env.BASE_URL}works/work-2.png`,
  },
  {
    quote:
      "I had just moved to a new school, and it was a brand-new class. As class president, I had the opportunity to bring us together. Watching classmates who barely knew each other become close friends, and eventually being known as one of the closest classes in our grade, was incredibly rewarding.",
    name: "Class President",
    designation: "03 / COMMUNITY BUILDING",
    src: `${import.meta.env.BASE_URL}works/work-3.png`,
  },
  {
    quote:
      "Led the AWSD Telegram chat by sharing weekly opportunities for students in Kazakhstan, from competitions and clubs to projects and programs. I loved the idea that one message could put an opportunity in front of someone who might never have found it otherwise.",
    name: "YouthBridge",
    designation: "04 / STUDENT OUTREACH",
    src: `${import.meta.env.BASE_URL}works/work-4.png`,
  },
  {
    quote:
      "Moving out at 15 was one of the most life-changing things I’ve ever done. It taught me independence, adaptability, and how to build a sense of home wherever I am.",
    name: "Moving Out at 15",
    designation: "05 / INDEPENDENCE",
    src: `${import.meta.env.BASE_URL}works/work-5.png`,
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
