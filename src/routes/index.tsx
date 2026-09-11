import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import ayaPhoto from "@/assets/aya.webp.asset.json";
import bookImg from "@/assets/book.webp.asset.json";
import movieImg from "@/assets/movie.webp.asset.json";
import drinkImg from "@/assets/drink.webp.asset.json";
import foodImg from "@/assets/food.webp.asset.json";
import cityImg from "@/assets/city.webp.asset.json";
import itemImg from "@/assets/item.webp.asset.json";
import quoteImg from "@/assets/quote.webp.asset.json";
import lessonImg from "@/assets/lesson.webp.asset.json";
import feelingImg from "@/assets/feeling.webp.asset.json";
import carSelfie from "@/assets/car-selfie.jpg.asset.json";
import carHouston from "@/assets/car-houston.jpg.asset.json";
import carBeach from "@/assets/car-beach.jpg.asset.json";
import carBike from "@/assets/car-bike.jpg.asset.json";
import carSki from "@/assets/car-ski.jpg.asset.json";
import carFriends from "@/assets/car-friends.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AYA.SYS — Aya Sarsengaliyeva" },
      {
        name: "description",
        content:
          "AYA.SYS — an interactive introduction to Aya Sarsengaliyeva: Business Administration student at Texas A&M, class of 2030.",
      },
      { property: "og:title", content: "AYA.SYS — Aya Sarsengaliyeva" },
      {
        property: "og:description",
        content:
          "Who is Aya? An interactive profile: facts, music, and favorites from a Texas A&M business student.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const BOOT_STEPS = [8, 22, 41, 63, 84, 100];

const FACTS = [
  "I am class of 2030.",
  "I am Kazakh.",
  "I was born in Bryan, TX on October 9, 2008.",
  "My major is Business Administration, hoping to specialize in Finance.",
];

const ROW_ONE = [
  { src: carSelfie.url, alt: "Aya selfie" },
  { src: carHouston.url, alt: "Aya arriving in Houston" },
  { src: carBeach.url, alt: "Aya at the beach at sunset" },
];

const ROW_TWO = [
  { src: carBike.url, alt: "Fixing the bike pedal" },
  { src: carSki.url, alt: "Skiing in the mountains" },
  { src: carFriends.url, alt: "Night out with friends" },
];

type Favorite = {
  label: string;
  src: string;
  title: string;
  subtitle: string;
  desc: string;
};

const FAVORITES: Favorite[] = [
  {
    label: "Book",
    src: bookImg.url,
    title: "Book",
    subtitle: "1984 — George Orwell",
    desc: "\u201c1984\u201d by George Orwell is one of the best books I've ever read. The language makes you feel like the main character — like I was the one walking the streets feeling watched. It taught me so much about trust, especially in media and politicians.",
  },
  {
    label: "Movie",
    src: movieImg.url,
    title: "Movie",
    subtitle: "A Big Bold Beautiful Journey — dir. Kogonada",
    desc: "A Big Bold Beautiful Journey, directed by Kogonada. A film that made me feel calm — and made me feel seen.",
  },
  {
    label: "Drink",
    src: drinkImg.url,
    title: "Drink",
    subtitle: "빙그레 바나나맛 우유",
    desc: "Banana-flavored milk — a Korean classic I will never get tired of.",
  },
  {
    label: "Food",
    src: foodImg.url,
    title: "Food",
    subtitle: "Feijoada with rice & egg",
    desc: "Feijoada with rice and a fried egg.",
  },
  {
    label: "City",
    src: cityImg.url,
    title: "City",
    subtitle: "London",
    desc: "London.",
  },
  {
    label: "Random Item",
    src: itemImg.url,
    title: "Random Item",
    subtitle: "Sony WH-1000XM4",
    desc: "Sony WH-1000XM4 headphones.",
  },
  {
    label: "Quote",
    src: quoteImg.url,
    title: "Quote",
    subtitle: "Coming soon",
    desc: "Coming soon — send me the quote and I'll drop it in here.",
  },
  {
    label: "Life Lesson",
    src: lessonImg.url,
    title: "Life Lesson",
    subtitle: "Coming soon",
    desc: "Coming soon — send me the lesson and I'll drop it in here.",
  },
  {
    label: "Feeling",
    src: feelingImg.url,
    title: "Feeling",
    subtitle: "Coming soon",
    desc: "Coming soon — send me this one and I'll drop it in here.",
  },
];

const WHY_ME = [
  {
    number: "01",
    title: "Initiative",
    label: "I START THE THING",
    description:
      "I do not wait for perfect conditions. I find the first useful move, make it visible, and give people something to build on.",
    proof:
      "From event concepts to community spaces, I turn an open question into a real next step.",
  },
  {
    number: "02",
    title: "Clarity",
    label: "I MAKE IT MAKE SENSE",
    description:
      "I enjoy taking messy information and making it easier to understand, easier to act on, and more inviting to other people.",
    proof: "Business, finance, storytelling, and design meet in the way I organize ideas.",
  },
  {
    number: "03",
    title: "Momentum",
    label: "I BRING PEOPLE WITH ME",
    description:
      "The best work is rarely a solo performance. I create energy, communicate early, and help a team keep moving when the brief changes.",
    proof: "I care about the room around the work as much as the final result.",
  },
  {
    number: "04",
    title: "Curiosity",
    label: "I KEEP LEARNING",
    description:
      "I ask better questions, test unfamiliar tools, and look for the connection between disciplines that other people might miss.",
    proof:
      "That curiosity is why I am drawn to finance, creative strategy, people, and systems at once.",
  },
];

function Index() {
  const navigate = useNavigate();
  const [page, setPage] = useState<"hero" | "who">("hero");
  const [bootKey, setBootKey] = useState(0);
  const [bootDone, setBootDone] = useState(false);
  const [bootGlitch, setBootGlitch] = useState(false);
  const [bootStep, setBootStep] = useState(-1);
  const [heroExit, setHeroExit] = useState(false);
  const [whoActive, setWhoActive] = useState(false);
  const [activeWhy, setActiveWhy] = useState(0);

  const heroRef = useRef<HTMLElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const whoRef = useRef<HTMLElement | null>(null);

  /* ---------- boot sequence ---------- */
  useEffect(() => {
    setBootDone(false);
    setBootGlitch(false);
    setBootStep(-1);

    const timers: ReturnType<typeof setTimeout>[] = [];
    let i = 0;

    const tick = () => {
      if (i >= BOOT_STEPS.length) {
        timers.push(
          setTimeout(() => {
            setBootGlitch(true);
            timers.push(setTimeout(() => setBootDone(true), 350));
          }, 300),
        );
        return;
      }
      setBootStep(i);
      i += 1;
      timers.push(setTimeout(tick, 120 + Math.random() * 260));
    };

    timers.push(setTimeout(tick, 400));
    return () => timers.forEach(clearTimeout);
  }, [bootKey]);

  /* ---------- spotlight spring follow ---------- */
  useEffect(() => {
    const hero = heroRef.current;
    const spot = spotlightRef.current;
    if (!hero || !spot) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let vx = 0;
    let vy = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      hero.classList.add("spotlight-active");
    };
    const onLeave = () => hero.classList.remove("spotlight-active");

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);

    const loop = () => {
      vx = vx * 0.72 + (targetX - x) * 0.18;
      vy = vy * 0.72 + (targetY - y) * 0.18;
      x += vx;
      y += vy;
      spot.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, [page]);

  /* ---------- page transitions ---------- */
  const goToWho = useCallback(() => {
    setHeroExit(true);
    setTimeout(() => {
      setPage("who");
      requestAnimationFrame(() => {
        if (whoRef.current) whoRef.current.scrollTop = 0;
        requestAnimationFrame(() => setWhoActive(true));
      });
    }, 350);
  }, []);

  const goToHero = useCallback(() => {
    setWhoActive(false);
    setPage("hero");
    setHeroExit(false);
    setBootKey((k) => k + 1);
  }, []);

  const onEnter = () => {
    goToWho();
    window.history.pushState({ page: "who" }, "", "#how-my-brain-works");
  };

  useEffect(() => {
    const onPop = () => {
      if (page === "who") goToHero();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [page, goToHero]);

  /* ---------- photo overlay (carousel) ---------- */
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const overlayImgRef = useRef<HTMLImageElement | null>(null);
  const activeThumb = useRef<HTMLImageElement | null>(null);
  const [overlayData, setOverlayData] = useState<{ src: string; alt: string } | null>(null);

  const setTracksPlayState = (state: string) => {
    document
      .querySelectorAll<HTMLDivElement>(".h-track")
      .forEach((t) => (t.style.animationPlayState = state));
  };

  const openPhoto = (img: HTMLImageElement) => {
    activeThumb.current = img;
    const rect = img.getBoundingClientRect();
    setTracksPlayState("paused");
    setOverlayData({ src: img.src, alt: img.alt });

    requestAnimationFrame(() => {
      const el = overlayImgRef.current;
      const overlay = overlayRef.current;
      if (!el || !overlay) return;
      el.style.transition = "none";
      el.style.top = `${rect.top}px`;
      el.style.left = `${rect.left}px`;
      el.style.width = `${rect.width}px`;
      el.style.height = `${rect.height}px`;
      el.style.borderRadius = "4px";
      overlay.classList.add("active");

      requestAnimationFrame(() => {
        void el.offsetWidth;
        el.style.transition = "";
        const size = Math.min(window.innerWidth * 0.6, window.innerHeight * 0.6, 560);
        el.style.top = `${(window.innerHeight - size) / 2}px`;
        el.style.left = `${(window.innerWidth - size) / 2}px`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.borderRadius = "6px";
      });
    });
  };

  const closePhoto = () => {
    const thumb = activeThumb.current;
    const el = overlayImgRef.current;
    if (!thumb || !el) return;
    const rect = thumb.getBoundingClientRect();
    el.style.top = `${rect.top}px`;
    el.style.left = `${rect.left}px`;
    el.style.width = `${rect.width}px`;
    el.style.height = `${rect.height}px`;
    el.style.borderRadius = "4px";
    overlayRef.current?.classList.remove("active");
    setTimeout(() => {
      setTracksPlayState("running");
      activeThumb.current = null;
      setOverlayData(null);
    }, 450);
  };

  /* ---------- morphing favorites dialog ---------- */
  const morphOverlayRef = useRef<HTMLDivElement | null>(null);
  const morphCardRef = useRef<HTMLDivElement | null>(null);
  const activeFavIcon = useRef<HTMLImageElement | null>(null);
  const [activeFav, setActiveFav] = useState<Favorite | null>(null);

  const openFav = (icon: HTMLImageElement, fav: Favorite) => {
    activeFavIcon.current = icon;
    const rect = icon.getBoundingClientRect();
    setActiveFav(fav);

    requestAnimationFrame(() => {
      const card = morphCardRef.current;
      const overlay = morphOverlayRef.current;
      if (!card || !overlay) return;
      card.classList.remove("animating");
      card.style.top = `${rect.top}px`;
      card.style.left = `${rect.left}px`;
      card.style.width = `${rect.width}px`;
      card.style.height = `${rect.height}px`;
      card.style.borderRadius = "14px";
      overlay.classList.add("active");

      requestAnimationFrame(() => {
        void card.offsetWidth;
        card.classList.add("animating");
        const width = Math.min(window.innerWidth * 0.86, 420);
        const height = Math.min(window.innerHeight * 0.8, 520);
        card.style.top = `${(window.innerHeight - height) / 2}px`;
        card.style.left = `${(window.innerWidth - width) / 2}px`;
        card.style.width = `${width}px`;
        card.style.height = `${height}px`;
        card.style.borderRadius = "20px";
      });
    });
  };

  const closeFav = () => {
    const icon = activeFavIcon.current;
    const card = morphCardRef.current;
    if (!icon || !card) return;
    const rect = icon.getBoundingClientRect();
    morphOverlayRef.current?.classList.remove("active");
    card.style.top = `${rect.top}px`;
    card.style.left = `${rect.left}px`;
    card.style.width = `${rect.width}px`;
    card.style.height = `${rect.height}px`;
    card.style.borderRadius = "14px";
    setTimeout(() => {
      activeFavIcon.current = null;
      setActiveFav(null);
    }, 420);
  };

  const pct = bootStep >= 0 ? (BOOT_STEPS[bootStep] ?? 0) : 0;
  const bootStatus = bootStep === BOOT_STEPS.length - 1 ? "WELCOME" : "INITIALIZING";

  return (
    <>
      <div id="boot" className={`${bootDone ? "hide" : ""} ${bootGlitch ? "glitch" : ""}`.trim()}>
        <div className="boot-corner tl">
          AYA.SYS
          <br />
          <span>v1.0.26</span>
        </div>
        <div className="boot-corner br">
          TEXAS A&amp;M UNIVERSITY
          <br />
          <span>COLLEGE STATION, TX</span>
        </div>

        <div id="boot-status">{bootStatus}</div>
        <div className="bar-track">
          <div className="bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <div id="boot-pct">{pct}%</div>
      </div>

      {page === "hero" && (
        <>
          <div className="hero-corner tl">
            AYA.SYS
            <br />
            <span>ONLINE</span>
          </div>
          <div className="hero-corner br">
            FIELD
            <br />
            <span>Business Administration</span>
          </div>

          <section id="hero" ref={heroRef} className={heroExit ? "page-exit" : ""}>
            <div className="spotlight" ref={spotlightRef} />

            <div className="name-block">
              <h1 className="given">AYA</h1>
            </div>
            <h2 className="family">SARSENGALIYEVA</h2>

            <div className="tag">
              LEADER <span>/</span> STUDENT <span>/</span> BUILDER
            </div>

            <p className="hero-intro">
              A personal archive of people, ideas, and the work I am learning to build.
            </p>

            <div className="hero-index" aria-hidden="true">
              <span>01 / 04</span>
              <span>OPENING COVER</span>
            </div>

            <button className="enter" onClick={onEnter}>
              <span className="word">ENTER</span>
              <span className="arrow">&rarr;</span>
            </button>
          </section>
        </>
      )}

      {page === "who" && (
        <section id="who" ref={whoRef} className={whoActive ? "page-active" : ""}>
          <div className="who-hero-block">
            <div className="who-bg-words">
              <span>CURIOUS</span>
              <span>ADAPTIVE</span>
              <span>BUILDER</span>
              <span>PEOPLE</span>
            </div>
            <div className="who-layout">
              <div className="who-inner">
                <h2 className="who-title">WHO IS AYA?</h2>
                <p className="who-thesis">A question I ask myself everyday.</p>
              </div>

              <div className="who-photo-wrap">
                <div className="qmarks">
                  {FACTS.map((fact) => (
                    <Fragmentish key={fact} fact={fact} />
                  ))}
                </div>
                <img src={ayaPhoto.url} alt="Aya Sarsengaliyeva" />
              </div>
            </div>
            <div className="scroll-hint">SCROLL &darr;</div>
          </div>

          <div className="carousel-section">
            <div className="h-row">
              <div className="h-track">
                {[...ROW_ONE, ...ROW_ONE].map((a, i) => (
                  <img
                    key={`${a.alt}-${i}`}
                    src={a.src}
                    alt={a.alt}
                    onClick={(e) => {
                      e.stopPropagation();
                      openPhoto(e.currentTarget);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="h-row">
              <div className="h-track reverse">
                {[...ROW_TWO, ...ROW_TWO].map((a, i) => (
                  <img
                    key={`${a.alt}-${i}`}
                    src={a.src}
                    alt={a.alt}
                    onClick={(e) => {
                      e.stopPropagation();
                      openPhoto(e.currentTarget);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="favorites-section">
            <h2 className="favorites-title">MY FAVORITES</h2>
            <div className="favorites-row">
              {FAVORITES.map((fav) => (
                <div className="fav-item" key={fav.label}>
                  <div className="fav-label">{fav.label}</div>
                  <img
                    className="fav-icon"
                    src={fav.src}
                    alt={fav.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      openFav(e.currentTarget, fav);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="why-me-section">
            <div className="why-me-quote-mark">“</div>
            <h2 className="why-me-quote">You miss 100% of the applications you don’t submit.</h2>
            <p className="why-me-attribution">— Wayne Gretzky</p>

            <div className="why-me-intro">
              <span className="why-me-kicker">WHY ME / A WORKING PROFILE</span>
              <p>
                I bring a builder’s energy to the room: I notice what is missing, make the idea
                clearer, and help people move from intention to action.
              </p>
            </div>

            <div className="why-me-stage">
              <div className="why-me-orbit" aria-label="Interactive qualities">
                <div className="orbit-ring orbit-ring-one" />
                <div className="orbit-ring orbit-ring-two" />
                <div className="orbit-core">
                  <span>{WHY_ME[activeWhy].number}</span>
                  <small>AYA / FIT</small>
                </div>
                {WHY_ME.map((skill, index) => (
                  <button
                    key={skill.number}
                    className={`orbit-node orbit-node-${index + 1} ${index === activeWhy ? "active" : ""}`}
                    onClick={() => setActiveWhy(index)}
                    aria-label={`Show ${skill.title}`}
                    aria-pressed={index === activeWhy}
                  >
                    <span>{skill.number}</span>
                    <b>{skill.title}</b>
                  </button>
                ))}
              </div>
              <div className="why-me-textbox">
                <div className="why-me-textbox-top">
                  <span>{WHY_ME[activeWhy].label}</span>
                  <span>{WHY_ME[activeWhy].number} / 04</span>
                </div>
                <h3>{WHY_ME[activeWhy].title}</h3>
                <p>{WHY_ME[activeWhy].description}</p>
                <div className="why-me-proof">
                  <span>PROOF OF VALUE</span>
                  <p>{WHY_ME[activeWhy].proof}</p>
                </div>
                <div className="why-me-tabs">
                  {WHY_ME.map((skill, index) => (
                    <button
                      key={skill.number}
                      onClick={() => setActiveWhy(index)}
                      className={index === activeWhy ? "active" : ""}
                    >
                      {skill.number}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button className="view-works-btn" onClick={() => navigate({ to: "/works" })}>
              <span className="word">VIEW MY WORKS</span>
              <span className="arrow">&rarr;</span>
            </button>
          </div>
        </section>
      )}

      <div className="photo-overlay" ref={overlayRef} onClick={closePhoto}>
        {overlayData && (
          <>
            <img ref={overlayImgRef} src={overlayData.src} alt={overlayData.alt} />
            <div className="photo-desc">{overlayData.alt}</div>
          </>
        )}
      </div>

      <div
        className="morph-overlay"
        ref={morphOverlayRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeFav();
        }}
      >
        <div className="morph-card" ref={morphCardRef}>
          {activeFav && (
            <>
              <button
                className="morph-close"
                aria-label="Close"
                onClick={(e) => {
                  e.stopPropagation();
                  closeFav();
                }}
              >
                &times;
              </button>
              <img src={activeFav.src} alt={activeFav.title} style={{ height: 220 }} />
              <div className="morph-body">
                <div className="morph-title">{activeFav.title}</div>
                <div className="morph-subtitle">{activeFav.subtitle}</div>
                <p className="morph-desc">{activeFav.desc}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

/** A question mark + its hover fact card, kept as siblings so the CSS
 *  adjacency and nth-of-type rules from the prototype still apply. */
function Fragmentish({ fact }: { fact: string }) {
  return (
    <>
      <span className="qmark">?</span>
      <div className="qmark-fact">{fact}</div>
    </>
  );
}
