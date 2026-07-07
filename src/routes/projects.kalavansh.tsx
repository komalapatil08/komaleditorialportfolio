import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import vaseAsset from "@/assets/kv-vase.jpg.asset.json";
import artisanAsset from "@/assets/kv-artisan.jpg.asset.json";

export const Route = createFileRoute("/projects/kalavansh")({
  head: () => ({
    meta: [
      { title: "KalaVansh — Every Masterpiece Has a Maker · Komal Patil" },
      {
        name: "description",
        content:
          "An editorial case study on Indian craft — remembering the artisans behind the objects we cherish.",
      },
      { property: "og:title", content: "KalaVansh — Every Masterpiece Has a Maker" },
      {
        property: "og:description",
        content:
          "The product is remembered. The maker is forgotten. A project about restoring the maker to the masterpiece.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: vaseAsset.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: vaseAsset.url },
    ],
  }),
  component: KalaVanshPage,
});

function KalaVanshPage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0); // 0 = artisan, 1 = vase

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const p = Math.min(1, scrolled / Math.max(total, 1));
      setProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Ease progress into three phases: image crossfade first half, text crossfade second half
  const imageP = Math.min(1, progress / 0.6);
  const textP = Math.max(0, (progress - 0.4) / 0.5);
  const cueOpacity = Math.max(0, 1 - progress * 2);

  return (
    <main className="bg-[color:var(--ivory)] text-[color:var(--charcoal)]">
      {/* Opening section — sticky visual, scroll drives crossfade */}
      <section ref={sectionRef} className="relative" style={{ height: "220vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Brand mark */}
          <div className="absolute left-6 top-6 z-20 md:left-12 md:top-10">
            <BrandMark />
          </div>

          <div className="grid h-full w-full grid-cols-1 md:grid-cols-2">
            {/* Left — image stack */}
            <div className="relative h-[55vh] w-full md:h-full">
              <img
                src={artisanAsset.url}
                alt="An Indian artisan hand-painting a Meenakari vase in his workshop"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ opacity: 1 - imageP, transition: "opacity 120ms linear" }}
              />
              <img
                src={vaseAsset.url}
                alt="The finished Meenakari vase, richly enamelled in cobalt and gold"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ opacity: imageP, transition: "opacity 120ms linear" }}
              />
            </div>

            {/* Right — editorial copy */}
            <div className="relative flex items-center justify-start px-8 py-16 md:px-20 md:py-0">
              <div className="relative max-w-md">
                <p
                  className="font-[family-name:var(--font-editorial)] text-3xl leading-[1.15] tracking-tight text-[color:var(--charcoal)] md:text-5xl"
                  style={{ opacity: 1 - textP, transition: "opacity 200ms linear" }}
                >
                  This is what usually happens.
                </p>
                <div
                  className="absolute inset-0"
                  style={{ opacity: textP, transition: "opacity 200ms linear" }}
                >
                  <p className="font-[family-name:var(--font-editorial)] text-3xl leading-[1.15] tracking-tight text-[color:var(--charcoal)] md:text-5xl">
                    The product is remembered.
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-editorial)] text-3xl leading-[1.15] tracking-tight text-[color:var(--warm-gray)] md:text-5xl">
                    The maker is forgotten.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div
            className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
            style={{ opacity: cueOpacity, transition: "opacity 200ms linear" }}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[color:var(--warm-gray)]">
                Scroll
              </span>
              <span className="block h-10 w-px bg-[color:var(--charcoal)]/40" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function BrandMark() {
  // Inspired by the uploaded "india" reference — serif lowercase with a
  // single horizontal rule and small devanagari-like tick marks above.
  return (
    <div className="relative inline-block select-none">
      <span aria-hidden className="absolute -top-1 left-[18%] h-2 w-px rotate-[-18deg] bg-[color:var(--charcoal)]" />
      <span aria-hidden className="absolute -top-1 left-[58%] h-2 w-px rotate-[-18deg] bg-[color:var(--charcoal)]" />
      <h1 className="font-[family-name:var(--font-editorial)] text-2xl font-normal lowercase tracking-tight text-[color:var(--charcoal)] md:text-[28px]">
        kalavansh
      </h1>
      <span aria-hidden className="mt-1 block h-px w-full bg-[color:var(--charcoal)]" />
    </div>
  );
}
