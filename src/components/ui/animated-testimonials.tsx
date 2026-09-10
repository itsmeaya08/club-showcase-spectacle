import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

type AnimatedTestimonialsProps = {
  testimonials: Testimonial[];
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

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    if (autoplay) {
      timeoutRef.current = setTimeout(handleNext, 5000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [active, autoplay]);

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative mx-auto max-w-3xl px-4">
        {/* Image stack */}
        <div className="relative h-[320px] w-full sm:h-[380px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out",
                index === active
                  ? "z-10 scale-100 opacity-100"
                  : index < active
                    ? "z-0 -translate-x-40 scale-75 opacity-0"
                    : "z-0 translate-x-40 scale-75 opacity-0",
              )}
            >
              <img
                src={testimonial.src}
                alt={testimonial.name}
                className="h-full w-full rounded-2xl object-cover shadow-2xl"
              />
            </div>
          ))}
        </div>

        {/* Text content */}
        <div className="relative mt-6 min-h-[140px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-all duration-500 ease-out",
                index === active
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-4 opacity-0",
              )}
            >
              <p className="text-center text-base leading-relaxed text-current sm:text-lg">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-4 text-center">
                <div className="font-semibold text-current">{testimonial.name}</div>
                <div className="text-sm opacity-60">{testimonial.designation}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-4 flex items-center justify-center gap-6">
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20 text-current/60 transition-colors hover:text-current disabled:opacity-30"
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setActive(index);
                    setTimeout(() => setIsAnimating(false), 600);
                  }
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === active ? "w-8 bg-current" : "w-2 bg-current/30",
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20 text-current/60 transition-colors hover:text-current disabled:opacity-30"
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
