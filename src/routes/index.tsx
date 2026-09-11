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
  "I am in the Class of 2030.",
  "I am Kazakh.",
  "I was born in Bryan, TX on October 9, 2008.",
  "I am majoring in Business Administration and hope to specialize in Finance.",
];

const ROW_ONE = [
  {
    src: carSelfie.url,
    alt: "Aya selfie",
    description:
      "Random things I would like to acquire or learn: the skill of juggling, a skydiving license, and a master’s degree.",
  },
  {
    src: carHouston.url,
    alt: "Aya arriving in Houston",
    description: "I moved out at 15 to graduate high school in the United States!",
  },
  {
    src: carBeach.url,
    alt: "Aya at the beach at sunset",
    description:
      "I love traveling! I have been to 17 countries and hope to see even more! This is at Da Nang Beach in Vietnam watching the sunrise at 5am while drinking banana milk.",
  },
];

const ROW_TWO = [
  {
    src: carBike.url,
    alt: "Fixing the bike pedal",
    description: "I love exercising but I do not think it likes me back.",
  },
  {
    src: carSki.url,
    alt: "Skiing in the mountains",
    description:
      "I enjoy skiing a lot! We have made it a family tradition to go skiing in different places every winter. Last winter, it was Almaty, Kazakhstan.",
  },
  {
    src: carFriends.url,
    alt: "Night out with friends",
    description:
      "I love going on late night walks while having meaningful and deep conversations with the people I love.",
  },
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
    desc: "1984 by George Orwell is one of the best books I’ve ever read. The writing makes you feel like you’re living alongside the main character—I felt like I was the one walking the streets, constantly feeling watched. It taught me a lot about trust, especially when it comes to media, information, and politicians.",
  },
  {
    label: "Movie",
    src: movieImg.url,
    title: "Movie",
    subtitle: "A Big Bold Beautiful Journey — dir. Kogonada",
    desc: "A film that felt strangely familiar, even though I had never lived its story.",
  },
  {
    label: "Drink",
    src: drinkImg.url,
    title: "Drink",
    subtitle: "빙그레 바나나맛 우유",
    desc: "Banana milk! I first tried it while I was in Seoul, Korea, and immediately understood the hype. Now I really want to figure out how to turn it into a latte.",
  },
  {
    label: "Food",
    src: foodImg.url,
    title: "Food",
    subtitle: "Feijoada with rice & egg",
    desc: "Brazilian rice and beans with a fried egg on top. My godmom is Brazilian and made this for me a lot when I lived with her, so it eventually became my ultimate comfort food. Add a cold Coke and you have perfection.",
  },
  {
    label: "City",
    src: cityImg.url,
    title: "City",
    subtitle: "London",
    desc: "London. I visited in 10th grade, and something about the city just clicked for me. I remember thinking, “I could actually live here.” I still dream of moving there someday.",
  },
  {
    label: "Random Item",
    src: itemImg.url,
    title: "Random Item",
    subtitle: "Sony WH-1000XM4",
    desc: "My Sony WH-1000XM4s. Some of the best sound quality you’ll ever hear, and I have these bad boys on 24/7. If you see me without them, something is probably wrong.",
  },
  {
    label: "Quote",
    src: quoteImg.url,
    title: "Quote",
    subtitle: "Wayne Gretzky",
    desc: "“You miss 100% of the shots you don’t take.” I’ve always related to this because I’d rather try, fail, and learn than wonder what would have happened if I had just gone for it.",
  },
  {
    label: "Life Lesson",
    src: lessonImg.url,
    title: "Life Lesson",
    subtitle: "A reminder to keep perspective",
    desc: "“Sometimes, it’s not that deep. Sometimes, it is.”",
  },
  {
    label: "Feeling",
    src: feelingImg.url,
    title: "Feeling",
    subtitle: "A warm, quiet morning",
    desc: "Waking up well-rested. Unfortunately, feeling energized and ready to conquer the day is usually the exact opposite of how I feel in the mornings",
  },
];

const WHY_ME = [
  {
    number: "01",
    title: "I Love Giving",
    description:
      "I genuinely enjoy creating opportunities, helping people, and making others feel valued.",
  },
  {
    number: "02",
    title: "I Adapt Quickly",
    description: "New environment? New people? New challenge? I figure it out and find my place.",
  },
  {
    number: "03",
    title: "I’m Proactive",
    description:
      "I don’t wait around for someone to tell me what needs to be done. If I see something that could be better, I start.",
  },
  {
    number: "04",
    title: "I Bring People Together",
    description:
      "Some of my favorite things are creating connections, building communities, and giving people a reason to show up.",
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

  const openPhoto = (img: HTMLImageElement, description: string) => {
    activeThumb.current = img;
    const rect = img.getBoundingClientRect();
    setTracksPlayState("paused");
    setOverlayData({ src: img.src, alt: description });

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
  const activeFavIcon = useRef<HTMLElement | null>(null);
  const [activeFav, setActiveFav] = useState<Favorite | null>(null);

  const openFav = (icon: HTMLElement, fav: Favorite) => {
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
                <p className="who-thesis">A question I ask myself every day.</p>
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
            <div className="scroll-hint">CLICK A PHOTO !</div>
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
                      openPhoto(e.currentTarget, a.description);
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
                      openPhoto(e.currentTarget, a.description);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="favorites-section">
            <h2 className="favorites-title">MY FAVORITES</h2>
            <div className="favorites-row">
              {FAVORITES.map((fav, index) => (
                <div className="fav-item" key={fav.label}>
                  <div className="fav-label">{fav.label}</div>
                  <button
                    className={`fav-icon fav-color-${index + 1}`}
                    type="button"
                    aria-label={`Open ${fav.label} favorite`}
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
            <h2 className="why-me-quote">You miss 100% of the shots you don’t take.</h2>
            <p className="why-me-attribution">— Wayne Gretzky</p>

            <div className="why-me-intro">
              <span className="why-me-kicker">WHY ME / FOUR THINGS I BRING</span>
              <p>I care about the people around the work as much as the work itself.</p>
            </div>

            <div className="why-me-profile">
              <figure className="why-me-photo">
                <img src="/why-me/aya-cafe.jpg" alt="Aya smiling in a café" />
                <figcaption>AYA / PEOPLE PERSON</figcaption>
              </figure>
              <div className="why-me-reasons" aria-label="Four reasons to work with Aya">
                {WHY_ME.map((reason, index) => (
                  <button
                    key={reason.number}
                    className={`why-me-reason ${index === activeWhy ? "active" : ""}`}
                    onClick={() => setActiveWhy(index)}
                    aria-pressed={index === activeWhy}
                  >
                    <span className="why-me-reason-number">{reason.number}</span>
                    <span className="why-me-reason-copy">
                      <strong>{reason.title}</strong>
                      <span>{reason.description}</span>
                    </span>
                    <span className="why-me-reason-arrow">↗</span>
                  </button>
                ))}
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
              <div
                className={`morph-color fav-color-${FAVORITES.indexOf(activeFav) + 1}`}
                aria-label={`${activeFav.title} pastel color`}
              />
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
