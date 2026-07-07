import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import vaseAsset from "@/assets/kv-vase.jpg.asset.json";
import artisanAsset from "@/assets/kv-artisan.jpg.asset.json";
import titleAsset from "@/assets/kv-title-indigo.png.asset.json";


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
        <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden px-6 py-6 md:px-12 md:py-8">
          {/* Brand mark */}
          <div className="relative z-20 mb-4 self-start">
            <BrandMark />
          </div>

          <div className="grid flex-1 grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            {/* Left — image stack */}
            <div className="relative mx-auto aspect-[4/5] h-[45vh] w-full max-w-md md:aspect-auto md:h-[65vh] md:max-w-lg">
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
            <div className="relative flex items-center justify-start px-0 md:px-12">
              <div className="relative max-w-md">
                <p
                  className="font-[family-name:var(--font-editorial)] text-3xl leading-[1.15] tracking-tight text-[color:var(--charcoal)] md:text-[42px]"
                  style={{ opacity: 1 - textP, transition: "opacity 200ms linear" }}
                >
                  This is what usually happens.
                </p>
                <div
                  className="absolute inset-0"
                  style={{ opacity: textP, transition: "opacity 200ms linear" }}
                >
                  <p className="font-[family-name:var(--font-editorial)] text-3xl leading-[1.15] tracking-tight text-[color:var(--charcoal)] md:text-[42px]">
                    The product is remembered.
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-editorial)] text-3xl leading-[1.15] tracking-tight text-[color:var(--warm-gray)] md:text-[42px]">
                    The maker is forgotten.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div
            className="pointer-events-none relative z-20 mx-auto mt-4"
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
  // Indigo wordmark matching the uploaded lettering reference.
  return (
    <h1 className="m-0 inline-block p-0">
      <img
        src={titleAsset.url}
        alt="KalaVansh"
        className="block h-8 w-auto md:h-10"
      />
    </h1>
  );
}
