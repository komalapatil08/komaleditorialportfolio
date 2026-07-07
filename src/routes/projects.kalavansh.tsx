import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import vaseAsset from "@/assets/kv-vase.jpg.asset.json";
import artisanAsset from "@/assets/kv-artisan.jpg.asset.json";
import titleAsset from "@/assets/kv-title-hires.png.asset.json";
import meenakariAsset from "@/assets/kv-meenakari.jpeg.asset.json";
import sareeAsset from "@/assets/kv-saree.jpeg.asset.json";
import kurtiAsset from "@/assets/kv-kurti.png.asset.json";


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

  // Scroll progress drives the image and editorial text crossfades in unison.
  const imageP = Math.min(1, progress / 0.6);
  const cueOpacity = Math.max(0, 1 - progress * 2);

  return (
    <main className="bg-[color:var(--ivory)] text-[color:var(--charcoal)]">
      {/* Opening section — sticky visual, scroll drives crossfade */}
      <section ref={sectionRef} className="relative" style={{ height: "220vh" }}>
        <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden px-6 py-6 md:px-12 md:py-8">
          {/* Brand mark */}
          <div className="relative z-20 mb-6 self-center">
            <BrandMark />
          </div>

          <div className="grid flex-1 grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            {/* Left — image stack */}
            <div className="relative mx-auto aspect-[4/5] h-[45vh] w-full max-w-md md:aspect-auto md:h-[65vh] md:max-w-lg">
              <img
                src={artisanAsset.url}
                alt="An Indian artisan hand-painting a Meenakari vase in his workshop"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ opacity: 1 - imageP, transition: "opacity 200ms linear" }}
              />
              <img
                src={vaseAsset.url}
                alt="The finished Meenakari vase, richly enamelled in cobalt and gold"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ opacity: imageP, transition: "opacity 200ms linear" }}
              />
            </div>

            {/* Right — editorial copy */}
            <div className="relative flex items-center justify-start px-0 md:px-12">
              <div className="relative max-w-md">
                <p
                  className="font-[family-name:var(--font-editorial)] text-3xl leading-[1.15] tracking-tight text-[color:var(--charcoal)] md:text-[42px]"
                  style={{ opacity: 1 - imageP, transition: "opacity 200ms linear" }}
                >
                  This is what usually happens.
                </p>
                <div
                  className="absolute inset-0"
                  style={{ opacity: imageP, transition: "opacity 200ms linear" }}
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

      <Chapter1 />
    </main>
  );
}

function Chapter1() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fadeUp = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <section
      ref={ref}
      className="relative px-6 py-24 md:px-12 md:py-32"
      aria-labelledby="kv-chapter-1"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-5 md:gap-20">
        {/* Left — 40% */}
        <div className="md:col-span-2 md:pr-8">
          <div className="md:sticky md:top-24">
            <p
              className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--warm-gray)]"
              style={fadeUp(0)}
            >
              Chapter 1
            </p>
            <h2
              id="kv-chapter-1"
              className="mt-6 font-[family-name:var(--font-editorial)] text-4xl leading-[1.05] tracking-tight text-[color:var(--charcoal)] md:text-6xl"
              style={fadeUp(120)}
            >
              Beyond the Beauty
            </h2>

            <div className="mt-10 space-y-5 font-[family-name:var(--font-editorial)] text-xl leading-[1.55] text-[color:var(--charcoal)] md:text-[22px]">
              <p style={fadeUp(240)}>
                The first thing I noticed was the craftsmanship.
              </p>
              <p style={fadeUp(320)}>
                Each piece carried generations of craftsmanship, shaped by countless hours of patience and skill.
              </p>
              <p style={fadeUp(400)}>I found myself admiring the products.</p>
              <p style={fadeUp(480)}>Then I realized something unexpected.</p>
              <p style={fadeUp(560)}>I could describe every detail of each piece.</p>
              <p
                className="pt-2 text-2xl font-medium leading-[1.4] text-[color:var(--charcoal)] md:text-[28px]"
                style={fadeUp(640)}
              >
                Yet the people behind them remained invisible.
              </p>
            </div>
          </div>
        </div>

        {/* Right — curated product composition */}
        <div className="relative md:col-span-3">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-2xl md:aspect-[5/6]">
            {/* Meenakari — largest, top-left anchor */}
            <div
              className="absolute left-[2%] top-[2%] z-10 w-[66%] md:left-[4%] md:top-[4%] md:w-[62%]"
              style={fadeUp(200)}
            >
              <img
                src={meenakariAsset.url}
                alt="Meenakari enamelled brass glasses with peacock motifs"
                className="block h-auto w-full object-cover"
              />
            </div>

            {/* Saree — mid-right, overlapping the glasses */}
            <div
              className="absolute right-0 top-[26%] z-20 w-[50%] md:top-[28%] md:w-[46%]"
              style={fadeUp(360)}
            >
              <img
                src={sareeAsset.url}
                alt="Handwoven Banarasi silk saree draped over antique boxes"
                className="block h-auto w-full object-cover"
              />
            </div>

            {/* Kurti — bottom-center, overlapping into the composition */}
            <div
              className="absolute bottom-[2%] left-[18%] z-30 w-[42%] md:bottom-[4%] md:left-[22%] md:w-[38%]"
              style={fadeUp(520)}
            >
              <img
                src={kurtiAsset.url}
                alt="White Chikankari hand-embroidered kurti"
                className="block h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandMark() {
  // Large, centered black wordmark matching the uploaded lettering reference.
  return (
    <h1 className="m-0 inline-block p-0">
      <img
        src={titleAsset.url}
        alt="KalaVansh"
        className="block h-16 w-auto md:h-24"
      />
    </h1>
  );
}
