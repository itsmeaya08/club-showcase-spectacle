import { createFileRoute } from "@tanstack/react-router";
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
  {
    src: "https://i.scdn.co/image/ab67616d00001e02ad24c5e36ddcd1957ad35677",
    alt: "Dean Blunt - Black Metal 2",
  },
  {
    src: "https://i.scdn.co/image/ab67616d00001e02af73f776b92d4614152fb141",
    alt: "Jungle Jack - Jungle des Illusions Vol 2",
  },
  {
    src: "https://i.scdn.co/image/ab67616d00001e02ecdb8f824367a53468100faf",
    alt: "Yung Lean - Stardust",
  },
  {
    src: "https://i.scdn.co/image/ab67616d00001e021624590458126fc8b8c64c2f",
    alt: "Lana Del Rey - Ultraviolence",
  },
  {
    src: "https://i.scdn.co/image/ab67616d00001e020dcf0f3680cff56fe5ff2288",
    alt: "A$AP Rocky - Tailor Swif",
  },
  {
    src: "https://i.scdn.co/image/ab67616d00001e02bc1028b7e9cd2b17c770a520",
    alt: "Nino Paid, Konvy - Midnight Miami",
  },
];

const ROW_TWO = [
  {
    src: "https://i.scdn.co/image/ab67616d00001e020fc93fe41791c5aa51ae9645",
    alt: "Travis Scott - Days Before Rodeo",
  },
  {
    src: "https://i.scdn.co/image/ab67616d00001e02d3e668d0c74720c8c23978e3",
    alt: "TORYONTHEBEAT - You're in My System",
  },
  {
    src: "https://i.scdn.co/image/ab67616d00001e0234537499b159b0e6d18e5655",
    alt: "People Make the World Go Round - You Can't Tell Me",
  },
  {
    src: "https://i.scdn.co/image/ab67616d00001e020cd942c1a864afa4e92d04f2",
    alt: "Kanye West - Ye",
  },
  {
    src: "https://i.scdn.co/image/ab67616d00001e02a875c3ec944b4f164ab5c350",
    alt: "Young Thug - Slime Season 3",
  },
  {
    src: "https://i.scdn.co/image/ab67616d00001e026376f0d88bbbc8cd051e3401",
    alt: "8ruki - SWAG",
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

function Index() {
  const [page, setPage] = useState<"hero" | "who">("hero");
  const [bootKey, setBootKey] = useState(0);
  const [bootDone, setBootDone] = useState(false);
  const [bootGlitch, setBootGlitch] = useState(false);
  const [bootStep, setBootStep] = useState(-1);
  const [heroExit, setHeroExit] = useState(false);
  const [whoActive, setWhoActive] = useState(false);

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
      <div
        id="boot"
        className={`${bootDone ? "hide" : ""} ${bootGlitch ? "glitch" : ""}`.trim()}
      >
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
