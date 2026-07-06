import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import meenakariImg from "@/assets/kv-opening-vase.jpg.asset.json";
import painterImg from "@/assets/kv-opening-artisan.jpg.asset.json";

export const Route = createFileRoute("/projects/kalavansh")({
  component: KalaVanshPage,
  head: () => ({
    meta: [
      { title: "KalaVansh — Every masterpiece has a maker" },
      {
        name: "description",
        content:
          "An interactive editorial case study reconnecting handcrafted products with the artisans who make them.",
      },
      { property: "og:title", content: "KalaVansh — Every masterpiece has a maker" },
      {
        property: "og:description",
        content:
          "An interactive editorial case study reconnecting handcrafted products with the artisans who make them.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function KalaVanshPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollable = rect.height - viewportH;
      const scrolled = -rect.top;
      const p = scrollable <= 0 ? 0 : Math.max(0, Math.min(1, scrolled / scrollable));

      // Vase rises throughout the section.
      // Artisan fades in over the first 70% of the scroll.
      // Copy fades in only once the artisan is fully visible.
      const artisanOpacity = Math.min(1, p / 0.7);
      const textOpacity = p > 0.7 ? Math.min(1, (p - 0.7) / 0.3) : 0;

      section.style.setProperty("--kv-progress", p.toFixed(4));
      section.style.setProperty("--kv-artisan-opacity", artisanOpacity.toFixed(4));
      section.style.setProperty("--kv-text-opacity", textOpacity.toFixed(4));
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <main className="bg-[var(--ivory)]">
      <section
        ref={sectionRef}
        className="relative min-h-[175vh]"
        aria-label="KalaVansh opening"
      >
        {/* Subtle warmth and depth, no decorative shapes */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 40%, rgba(255,248,236,0.7) 0%, rgba(248,245,239,0) 65%), radial-gradient(85% 35% at 50% 100%, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 60%)",
          }}
        />

        <div className="sticky top-0 flex h-screen w-full items-center justify-center px-6">
          <div className="relative flex flex-col items-center">
            {/* Vase + pedestal: floats upward as the visitor scrolls */}
            <div
              className="relative z-10 flex flex-col items-center"
              style={{
                transform: "translateY(calc(-80px * var(--kv-progress, 0)))",
                willChange: "transform",
              }}
            >
              <div
                className="relative"
                style={{ width: "min(260px, 52vw)", height: "min(360px, 48vh)" }}
              >
                <img
                  src={meenakariImg.url}
                  alt="Hand-painted Meenakari vase on a museum pedestal"
                  className="h-full w-full object-contain"
                  style={{
                    filter: "drop-shadow(0 22px 16px rgba(31,31,31,0.16))",
                  }}
                  width={1024}
                  height={1024}
                />
              </div>

              {/* Simple museum pedestal */}
              <div
                className="-mt-1"
                style={{
                  width: "min(210px, 44vw)",
                  height: "min(84px, 11vh)",
                  background:
                    "linear-gradient(180deg, #F1ECE1 0%, #E8E2D5 55%, #DDD5C4 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.7), 0 22px 34px -22px rgba(31,31,31,0.35)",
                }}
              />
            </div>

            {/* Revealed below the vase: artisan, then copy */}
            <div
              className="absolute left-1/2 top-full flex flex-col items-center gap-10 pt-10"
              style={{
                opacity: "var(--kv-artisan-opacity, 0)",
                transform:
                  "translateX(-50%) translateY(calc(18px * (1 - var(--kv-artisan-opacity, 0))))",
                willChange: "opacity, transform",
                pointerEvents: "none",
              }}
            >
              <div
                className="overflow-hidden"
                style={{
                  width: "min(280px, 58vw)",
                  height: "min(280px, 34vh)",
                  borderRadius: "2px",
                  boxShadow: "0 28px 56px -38px rgba(31,31,31,0.35)",
                }}
              >
                <img
                  src={painterImg.url}
                  alt="A Meenakari artisan painting a vase by hand"
                  className="h-full w-full object-cover"
                  style={{ filter: "saturate(0.94) contrast(0.98)" }}
                  width={1024}
                  height={1024}
                />
              </div>

              <div
                className="max-w-[40ch] text-center"
                style={{
                  opacity: "var(--kv-text-opacity, 0)",
                  transform:
                    "translateY(calc(16px * (1 - var(--kv-text-opacity, 0))))",
                  willChange: "opacity, transform",
                }}
              >
                <h1
                  className="font-editorial"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 4.25rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.012em",
                    color: "var(--charcoal)",
                  }}
                >
                  Every masterpiece has a maker.
                </h1>
                <p
                  className="mt-5 font-serif"
                  style={{
                    fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
                    color: "rgba(31,31,31,0.55)",
                  }}
                >
                  This project began when I decided to meet them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
