import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Project = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

type AnimatedTestimonialsProps = {
  testimonials: Project[];
  autoplay?: boolean;
  className?: string;
};

export function AnimatedTestimonials({
  testimonials,
  autoplay = false,
  className,
}: AnimatedTestimonialsProps) {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const moveTo = useCallback(
    (next: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActive(next);
      timeoutRef.current = setTimeout(() => setIsAnimating(false), 600);
    },
    [isAnimating],
  );

  const handleNext = useCallback(() => {
    moveTo((active + 1) % testimonials.length);
  }, [active, moveTo, testimonials.length]);

  const handlePrev = useCallback(() => {
    moveTo((active - 1 + testimonials.length) % testimonials.length);
  }, [active, moveTo, testimonials.length]);

  useEffect(() => {
    if (autoplay) {
      const autoplayTimer = setTimeout(handleNext, 6500);
      return () => clearTimeout(autoplayTimer);
    }
  }, [active, autoplay, handleNext]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const project = testimonials[active];

  return (
    <div className={cn("project-archive", className)}>
      <div className="project-index" aria-label="Project index">
        <span className="project-index-label">INDEX</span>
        <div className="project-index-list">
          {testimonials.map((item, index) => (
            <button
              key={item.name}
              className={cn("project-index-item", index === active && "active")}
              onClick={() => moveTo(index)}
              aria-label={`Open project ${index + 1}: ${item.name}`}
              aria-current={index === active ? "true" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="project-main">
        <div className="project-art-label">
          <span>SELECTED WORK</span>
          <span>
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
        <div className="project-image-stage">
          {testimonials.map((item, index) => (
            <div
              key={item.name}
              className={cn(
                "project-image-frame",
                index === active ? "active" : index < active ? "past" : "future",
              )}
            >
              <img src={item.src} alt={item.name} />
              <span className="project-image-corner">
                AYA / {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

        <div className="project-copy">
          <div className="project-copy-meta">
            <span>PROJECT {String(active + 1).padStart(2, "0")}</span>
            <span>{project.designation}</span>
          </div>
          <h2>{project.name}</h2>
          <p>{project.quote}</p>
        </div>

        <div className="project-controls">
          <button
            className="project-arrow"
            onClick={handlePrev}
            disabled={isAnimating}
            aria-label="Previous project"
          >
            <span>←</span> PREV
          </button>
          <div className="project-progress" aria-hidden="true">
            {testimonials.map((_, index) => (
              <span key={index} className={cn(index === active && "active")} />
            ))}
          </div>
          <button
            className="project-arrow"
            onClick={handleNext}
            disabled={isAnimating}
            aria-label="Next project"
          >
            NEXT <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
