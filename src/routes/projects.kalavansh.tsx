import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import vaseAsset from "@/assets/kv-vase.jpg.asset.json";
import artisanAsset from "@/assets/kv-artisan.jpg.asset.json";
import titleAsset from "@/assets/kv-title-hires.png.asset.json";
import meenakariAsset from "@/assets/kv-meenakari.jpeg.asset.json";
import sareeAsset from "@/assets/kv-saree.jpeg.asset.json";
import kurtiAsset from "@/assets/kv-kurti.png.asset.json";
import ch3Girl from "@/assets/kv-ch3-girl.jpeg.asset.json";
import ch3Foot from "@/assets/kv-ch3-foot.jpeg.asset.json";
import ch3Hand from "@/assets/kv-ch3-hand.jpeg.asset.json";
import ch3Chikan from "@/assets/kv-ch3-chikankari.jpeg.asset.json";
import ch3Man from "@/assets/kv-ch3-man.jpeg.asset.json";
import ch3Elderly from "@/assets/kv-ch3-elderly.png.asset.json";
import ch4Fold1 from "@/assets/kv-ch4-fold-1.png";
import ch4Fold2 from "@/assets/kv-ch4-fold-2.png";
import ch4Fold3 from "@/assets/kv-ch4-fold-3.png";
import kvLogo from "@/assets/kv-logo.png.asset.json";
import ch6MeenakariQR from "@/assets/kv-ch6-meenakari-qr.jpeg.asset.json";
import ch6Pottery from "@/assets/kv-ch6-pottery.png.asset.json";
import ch6Custom from "@/assets/kv-ch6-custom.png.asset.json";
import ch6SiteQR from "@/assets/kv-ch6-site-qr.jpeg.asset.json";


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
      <Chapter3 />
      <Chapter4 />
      <Chapter5 />


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

            {/* Saree — bottom-right of the Meenakari glasses */}
            <div
              className="absolute right-0 top-[40%] z-20 w-[46%] md:top-[42%] md:right-[2%] md:w-[42%]"
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

function Chapter3() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [introVisible, setIntroVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(Math.min(1, scrolled / Math.max(total, 1)));
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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setIntroVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 7 panels total: 1 intro + 5 story + 1 final. Horizontal scroll across N-1 viewports.
  const PANELS = 7;
  // Add a small hold at the start so the intro reads before scrolling sideways.
  const holdStart = 0.06;
  const p = Math.max(0, Math.min(1, (progress - holdStart) / (1 - holdStart)));
  const translate = -p * (100 * (PANELS - 1));

  const panelActive = (i: number) => {
    const start = i / PANELS;
    const end = (i + 1) / PANELS;
    return p >= start - 0.04 && p < end + 0.02;
  };

  const fadeIn = (active: boolean, delay = 0) => ({
    opacity: active ? 1 : 0,
    transform: active ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 800ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 800ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  const introFade = (delay = 0) => ({
    opacity: introVisible ? 1 : 0,
    transform: introVisible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[color:var(--ivory)]"
      style={{ height: `${PANELS * 100}vh` }}
      aria-labelledby="kv-chapter-3"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          className="flex h-full"
          style={{
            width: `${PANELS * 100}vw`,
            transform: `translate3d(${translate}vw, 0, 0)`,
            transition: "transform 120ms linear",
            willChange: "transform",
          }}
        >
          {/* Panel 0 — Intro */}
          <Panel>
            <div className="mx-auto flex h-full max-w-3xl flex-col justify-center px-8 text-center">
              <p
                className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--warm-gray)]"
                style={introFade(0)}
              >
                Chapter 3
              </p>
              <h2
                id="kv-chapter-3"
                className="mt-6 font-[family-name:var(--font-editorial)] text-5xl leading-[1.05] tracking-tight text-[color:var(--charcoal)] md:text-7xl"
                style={introFade(120)}
              >
                The Cost of Craftsmanship
              </h2>
              <p
                className="mx-auto mt-10 max-w-xl font-[family-name:var(--font-editorial)] text-xl leading-[1.55] text-[color:var(--charcoal)] md:text-[22px]"
                style={introFade(280)}
              >
                The deeper I looked, the more I realized these weren&rsquo;t
                isolated stories. They were different faces of the same system.
              </p>
              <p
                className="mt-16 text-[10px] uppercase tracking-[0.4em] text-[color:var(--warm-gray)]"
                style={introFade(440)}
              >
                Keep scrolling
              </p>
            </div>
          </Panel>

          {/* Panel 1 */}
          <StoryPanel
            image={ch3Girl.url}
            alt="A young Meenakari artisan girl sorting enamelled boxes in her workshop"
            headline="She left school."
            body="So her younger siblings could continue theirs."
            active={panelActive(1)}
          />

          {/* Panel 2 — dual image */}
          <Panel>
            <div className="grid h-full grid-cols-1 items-center gap-10 px-8 py-16 md:grid-cols-12 md:gap-16 md:px-20">
              <div className="relative md:col-span-7">
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden"
                  style={fadeIn(panelActive(2), 100)}
                >
                  <img
                    src={ch3Foot.url}
                    alt="Chemical burn on an artisan's foot"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div
                  className="absolute -bottom-8 -right-4 aspect-[4/3] w-[58%] overflow-hidden md:-bottom-14 md:-right-10"
                  style={fadeIn(panelActive(2), 260)}
                >
                  <img
                    src={ch3Hand.url}
                    alt="An artisan's arm scarred from chemical exposure despite gloves"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-5">
                <h3
                  className="font-[family-name:var(--font-editorial)] text-4xl leading-[1.05] tracking-tight text-[color:var(--charcoal)] md:text-6xl"
                  style={fadeIn(panelActive(2), 180)}
                >
                  These burns never make it onto the price tag.
                </h3>
                <p
                  className="mt-8 max-w-md font-[family-name:var(--font-editorial)] text-xl leading-[1.55] text-[color:var(--charcoal)] md:text-[22px]"
                  style={fadeIn(panelActive(2), 340)}
                >
                  Years of chemical exposure, cuts, burns and repetitive work
                  become invisible once the product reaches the customer.
                </p>
              </div>
            </div>
          </Panel>

          {/* Panel 3 */}
          <StoryPanel
            image={ch3Chikan.url}
            alt="A Chikankari artisan being interviewed while embroidering white fabric"
            headline="Someone else decides what their work is worth."
            body="The artisans create every stitch by hand, but retailers and intermediaries often decide the final selling price."
            active={panelActive(3)}
          />

          {/* Panel 4 — price disparity centerpiece */}
          <Panel>
            <div className="grid h-full grid-cols-1 items-center gap-12 px-8 py-16 md:grid-cols-12 md:gap-16 md:px-20">
              <div
                className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden md:col-span-5"
                style={fadeIn(panelActive(4), 100)}
              >
                <img
                  src={ch3Elderly.url}
                  alt="An elderly woman artisan at her loom"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="md:col-span-7">
                <div
                  className="flex flex-col items-start gap-3"
                  style={fadeIn(panelActive(4), 200)}
                >
                  <span className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--warm-gray)]">
                    Luxury Silk Saree
                  </span>
                  <span className="font-[family-name:var(--font-editorial)] text-6xl leading-none tracking-tight text-[color:var(--charcoal)] md:text-[112px]">
                    ₹20,000
                  </span>
                </div>
                <div
                  className="my-6 h-16 w-px bg-[color:var(--charcoal)]/30 md:my-8 md:h-20"
                  style={fadeIn(panelActive(4), 340)}
                />
                <div
                  className="flex flex-col items-start gap-3"
                  style={fadeIn(panelActive(4), 420)}
                >
                  <span className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--warm-gray)]">
                    Artisan&rsquo;s Earnings
                  </span>
                  <span className="font-[family-name:var(--font-editorial)] text-5xl leading-none tracking-tight text-[color:var(--warm-gray)] md:text-[88px]">
                    ₹200
                  </span>
                </div>
                <p
                  className="mt-10 max-w-md font-[family-name:var(--font-editorial)] text-xl leading-[1.55] text-[color:var(--charcoal)] md:text-[22px]"
                  style={fadeIn(panelActive(4), 560)}
                >
                  A handcrafted silk saree may sell for ₹20,000, while the
                  artisan who spent days creating it earns around ₹200.
                </p>
              </div>
            </div>
          </Panel>

          {/* Panel 5 */}
          <StoryPanel
            image={ch3Man.url}
            alt="An artisan speaking about his craft"
            headline="Will the craft end with him?"
            body="Many artisans don't want their children to continue the craft. They dream of becoming doctors, engineers, or teachers instead. If the next generation walks away, centuries of heritage disappear with them."
            active={panelActive(5)}
          />

          {/* Panel 6 — Final */}
          <Panel>
            <div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-8 text-center">
              <p
                className="font-[family-name:var(--font-editorial)] text-4xl leading-[1.1] tracking-tight text-[color:var(--charcoal)] md:text-7xl"
                style={fadeIn(panelActive(6), 100)}
              >
                If the artisans disappear&hellip;
              </p>
              <p
                className="mt-10 font-[family-name:var(--font-editorial)] text-4xl leading-[1.1] tracking-tight text-[color:var(--warm-gray)] md:text-7xl"
                style={fadeIn(panelActive(6), 400)}
              >
                Who preserves the culture?
              </p>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen w-screen shrink-0 bg-[color:var(--ivory)]">
      {children}
    </div>
  );
}

function StoryPanel({
  image,
  alt,
  headline,
  body,
  active,
}: {
  image: string;
  alt: string;
  headline: string;
  body: string;
  active: boolean;
}) {
  const fade = (delay = 0) => ({
    opacity: active ? 1 : 0,
    transform: active ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 800ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 800ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });
  return (
    <Panel>
      <div className="grid h-full grid-cols-1 items-center gap-10 px-8 py-16 md:grid-cols-12 md:gap-16 md:px-20">
        <div
          className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden md:col-span-6 md:aspect-[4/5] md:max-w-none"
          style={fade(100)}
        >
          <img
            src={image}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="md:col-span-6">
          <h3
            className="font-[family-name:var(--font-editorial)] text-4xl leading-[1.05] tracking-tight text-[color:var(--charcoal)] md:text-6xl"
            style={fade(220)}
          >
            {headline}
          </h3>
          <p
            className="mt-8 max-w-md font-[family-name:var(--font-editorial)] text-xl leading-[1.55] text-[color:var(--charcoal)] md:text-[22px]"
            style={fade(360)}
          >
            {body}
          </p>
        </div>
      </div>
    </Panel>
  );
}


function Chapter4() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [introVisible, setIntroVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(Math.min(1, scrolled / Math.max(total, 1)));
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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setIntroVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const p = progress;

  // Smooth easing
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);

  // Phase ranges — tight so a single scroll notch advances the story
  const phases = [
    { start: 0.00, end: 0.06, key: "intro" },
    { start: 0.06, end: 0.22, key: "identity" },
    { start: 0.22, end: 0.38, key: "dignity" },
    { start: 0.38, end: 0.54, key: "recognition" },
    { start: 0.54, end: 0.70, key: "selfworth" },
    { start: 0.70, end: 0.88, key: "legacy" },
    { start: 0.88, end: 1.00, key: "final" },
  ];

  const phaseP = (key: string) => {
    const ph = phases.find((x) => x.key === key)!;
    const t = (p - ph.start) / (ph.end - ph.start);
    return Math.max(0, Math.min(1, t));
  };

  // Fast fade in, long hold, fast fade out
  const keywordOpacity = (key: string) => {
    const t = phaseP(key);
    if (t <= 0 || t >= 1) return 0;
    if (t < 0.1) return t / 0.1;
    if (t > 0.9) return (1 - t) / 0.1;
    return 1;
  };


  // Unfold progression: 0 (folded) -> 1 (fully unfolded)
  const unfoldStages = ["identity", "dignity", "recognition", "selfworth", "legacy"];
  // Per-fold openness (0 closed → 1 fully open)
  const foldOpen = unfoldStages.map((k) => ease(phaseP(k)));

  // Saree opacity — fades out in final phase
  const finalP = phaseP("final");
  const sareeOpacity = 1 - ease(Math.min(1, finalP * 1.3));

  // Legacy word fades out as the saree fades in the final phase
  const legacyPreOp = keywordOpacity("legacy");


  const introFade = (delay = 0) => ({
    opacity: introVisible ? 1 : 0,
    transform: introVisible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  const introOp = 1 - ease(Math.min(1, phaseP("intro")));

  const Word = ({ label, body, opacity, compact = false }: { label: string; body: React.ReactNode; opacity: number; compact?: boolean }) => (
    <div
      className="absolute inset-0 flex flex-col items-start justify-center"
      style={{ opacity, transition: "opacity 400ms ease-out", pointerEvents: opacity > 0 ? "auto" : "none" }}
    >
      <p className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--warm-gray)]">
        What was lost
      </p>

      <h3 className={`mt-6 max-w-[10ch] font-[family-name:var(--font-editorial)] ${compact ? "text-[clamp(3.35rem,5.6vw,5.8rem)] md:text-[clamp(4.25rem,5.8vw,6rem)]" : "text-[clamp(3.8rem,7vw,7rem)] md:text-[clamp(5.25rem,8vw,7.8rem)]"} font-medium leading-[0.92] tracking-tight text-[color:var(--charcoal)] md:max-w-none`}>
        {label}
      </h3>
      <div className="mt-8 max-w-md font-[family-name:var(--font-editorial)] text-xl leading-[1.55] text-[color:var(--charcoal)] md:text-[22px]">
        {body}
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[color:var(--ivory)]"
      style={{ height: "180vh" }}
      aria-labelledby="kv-chapter-4"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Intro overlay */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-30 px-6 pt-12 md:px-20 md:pt-18"
          style={{ opacity: introOp, transition: "opacity 500ms ease-out" }}
        >
          <div className="mx-auto max-w-6xl">
            <p
              className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--warm-gray)]"
              style={introFade(0)}
            >
              Chapter 4
            </p>
            <h2
              id="kv-chapter-4"
              className="mt-5 max-w-4xl font-[family-name:var(--font-editorial)] text-4xl leading-[1.02] tracking-tight text-[color:var(--charcoal)] md:text-[72px]"
              style={introFade(120)}
            >
              What Was Really Lost?
            </h2>
            <div className="max-w-2xl" style={introFade(260)}>
              <p className="mt-6 font-[family-name:var(--font-editorial)] text-lg leading-[1.55] text-[color:var(--charcoal)] md:text-[30px]">
                The more I understood the artisans, the more I realized they
                hadn&rsquo;t just lost income.
              </p>
              <p className="mt-3 font-[family-name:var(--font-editorial)] text-lg leading-[1.55] text-[color:var(--warm-gray)] md:text-[30px]">
                They had lost something far more fundamental.
              </p>
            </div>
          </div>
        </div>

        {/* Main stage */}
        <div className="grid h-full grid-cols-1 items-end gap-10 px-6 pb-10 pt-[24rem] md:grid-cols-12 md:items-center md:gap-12 md:px-20 md:pb-16 md:pt-[20rem]">
          {/* Saree — transparent cutouts cross-fading cleanly */}
          <div className="relative flex h-full items-center justify-center md:col-span-6 md:justify-start">
            {(() => {
              const unfold = foldOpen.reduce((a, b) => a + b, 0) / foldOpen.length;
              const op1 = unfold <= 0.5 ? 1 - unfold * 2 : 0;
              const op2 = unfold <= 0.5 ? unfold * 2 : Math.max(0, 1 - (unfold - 0.5) * 2);
              const op3 = unfold > 0.5 ? (unfold - 0.5) * 2 : 0;
              const scale = 0.9 + 0.1 * unfold;
              return (
                <div
                  className="relative w-full max-w-[42rem]"
                  style={{
                    opacity: sareeOpacity,
                    transform: `scale(${scale})`,
                    transition:
                      "opacity 700ms ease-out, transform 800ms cubic-bezier(0.22,1,0.36,1)",
                    willChange: "opacity, transform",
                  }}
                >
                  <div className="relative aspect-[16/10] w-full">
                    {[
                      { src: ch4Fold1, op: op1, alt: "A silk saree neatly folded" },
                      { src: ch4Fold2, op: op2, alt: "The saree partially unfolded" },
                      { src: ch4Fold3, op: op3, alt: "The saree fully unfolded" },
                    ].map((img, i) => (
                      <img
                        key={i}
                        src={img.src}
                        alt={img.alt}
                        className="absolute inset-0 h-full w-full object-contain"
                        style={{
                          opacity: img.op,
                          transition: "opacity 900ms cubic-bezier(0.22,1,0.36,1)",
                          filter: "drop-shadow(0 24px 36px rgba(59, 42, 26, 0.12))",
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Keywords */}
          <div className="relative h-[38vh] min-h-[18rem] md:col-span-6 md:h-[58vh] md:min-h-[30rem]">
            <Word
              label="IDENTITY"
              opacity={keywordOpacity("identity")}
              body={
                <>
                  <p>Their craft travelled.</p>
                  <p className="text-[color:var(--warm-gray)]">Their identity didn&rsquo;t.</p>
                </>
              }
            />
            <Word
              label="DIGNITY"
              opacity={keywordOpacity("dignity")}
              body={
                <>
                  <p>Their work was admired.</p>
                  <p className="text-[color:var(--warm-gray)]">They rarely were.</p>
                </>
              }
            />
            <Word
              label="RECOGNITION"
              compact
              opacity={keywordOpacity("recognition")}
              body={
                <>
                  <p>Customers remembered the product,</p>
                  <p className="text-[color:var(--warm-gray)]">but forgot the person behind it.</p>
                </>
              }
            />
            <Word
              label="SELF-WORTH"
              opacity={keywordOpacity("selfworth")}
              body={
                <>
                  <p>When someone else decides the value of your work,</p>
                  <p className="text-[color:var(--warm-gray)]">it&rsquo;s difficult to feel valued yourself.</p>
                </>
              }
            />
            <Word
              label="LEGACY"
              opacity={legacyPreOp}
              body={
                <>
                  <p>
                    Many artisans no longer want their children to continue the
                    craft.
                  </p>
                  <p className="text-[color:var(--warm-gray)]">
                    If the next generation walks away, centuries of heritage
                    disappear with them.
                  </p>
                </>
              }
            />
          </div>
        </div>


      </div>
    </section>
  );
}

function Chapter5() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(Math.min(1, scrolled / Math.max(total, 1)));
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

  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  const p = progress;

  // Phase ranges within the sticky stage
  // 0.00-0.18 statement A visible
  // 0.18-0.30 fade A out, fade B in
  // 0.30-0.48 statement B visible
  // 0.48-0.75 logo scale reveal + name + tagline
  // 0.75-1.00 hold
  const phaseP = (start: number, end: number) => {
    const t = (p - start) / (end - start);
    return Math.max(0, Math.min(1, t));
  };

  const aOp = 1 - ease(phaseP(0.14, 0.24));
  const bIn = ease(phaseP(0.22, 0.34));
  const bOut = ease(phaseP(0.44, 0.52));
  const bOp = bIn * (1 - bOut);

  const logoIn = ease(phaseP(0.5, 0.85));
  const logoScale = 0.35 + 0.65 * logoIn;
  const logoOp = ease(phaseP(0.5, 0.62));
  const nameOp = ease(phaseP(0.72, 0.82));
  const taglineOp = ease(phaseP(0.82, 0.92));

  return (
    <>
      {/* Sticky reveal stage */}
      <section
        ref={sectionRef}
        className="relative bg-[color:var(--ivory)]"
        style={{ height: "320vh" }}
        aria-labelledby="kv-chapter-5"
      >
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-6 md:px-20">
          {/* Chapter marker */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 px-6 pt-12 md:px-20 md:pt-16">
            <div className="mx-auto max-w-6xl">
              <p className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--warm-gray)]">
                Chapter 5
              </p>
              <p
                id="kv-chapter-5"
                className="mt-3 font-[family-name:var(--font-editorial)] text-lg italic text-[color:var(--warm-gray)] md:text-[22px]"
              >
                Reframing the Problem
              </p>
            </div>
          </div>

          {/* Statement A */}
          <div
            className="absolute inset-0 flex items-center justify-center px-6 md:px-20"
            style={{ opacity: aOp, transition: "opacity 300ms ease-out", pointerEvents: aOp > 0.05 ? "auto" : "none" }}
          >
            <div className="mx-auto max-w-4xl text-center">
              <p className="font-[family-name:var(--font-editorial)] text-3xl leading-[1.15] tracking-tight text-[color:var(--charcoal)] md:text-[56px]">
                I wasn&rsquo;t trying to build another marketplace.
              </p>
              <p className="mt-6 font-[family-name:var(--font-editorial)] text-3xl leading-[1.15] tracking-tight text-[color:var(--warm-gray)] md:text-[56px]">
                I was trying to restore what had been lost.
              </p>
            </div>
          </div>

          {/* Statement B */}
          <div
            className="absolute inset-0 flex items-center justify-center px-6 md:px-20"
            style={{ opacity: bOp, transition: "opacity 300ms ease-out", pointerEvents: bOp > 0.05 ? "auto" : "none" }}
          >
            <div className="mx-auto max-w-4xl text-center">
              <p className="font-[family-name:var(--font-editorial)] text-sm uppercase tracking-[0.4em] text-[color:var(--warm-gray)] md:text-lg">
                How might we
              </p>
              <p className="mt-6 font-[family-name:var(--font-editorial)] text-xl leading-[1.25] tracking-tight text-[color:var(--charcoal)] md:text-[36px]">
                reconnect every handcrafted product with the person who created it?
              </p>

            </div>
          </div>

          {/* Logo reveal */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ opacity: logoOp, transition: "opacity 400ms ease-out", pointerEvents: logoOp > 0.05 ? "auto" : "none" }}
          >
            <img
              src={kvLogo.url}
              alt="KalaVansh — Making the Invisible Visible"
              className="h-auto w-[clamp(14rem,52vw,36rem)] select-none"
              style={{
                transform: `scale(${logoScale})`,
                transformOrigin: "center",
                transition: "transform 600ms cubic-bezier(0.22,1,0.36,1)",
                willChange: "transform",
              }}
              draggable={false}
            />
          </div>
        </div>
      </section>

      <PromiseSection />


      {/* Core Experience flow */}
      <section className="bg-[color:var(--ivory)] px-6 py-32 md:px-20 md:py-48">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--warm-gray)]">
            The Core Experience
          </p>
          <h3 className="mt-5 font-[family-name:var(--font-editorial)] text-3xl leading-[1.1] tracking-tight text-[color:var(--charcoal)] md:text-[52px]">
            A single thread, from hand to heart.
          </h3>

          <ol className="mt-20 flex flex-col items-center gap-0">
            {[
              "Handcrafted Product",
              "QR Code",
              "Meet the Artisan",
              "Watch their Story",
              "Understand the Craft",
              "Purchase with Purpose",
            ].map((step, i, arr) => (
              <li key={step} className="flex flex-col items-center">
                <span className="font-[family-name:var(--font-editorial)] text-xl tracking-tight text-[color:var(--charcoal)] md:text-[26px]">
                  {step}
                </span>
                {i < arr.length - 1 && (
                  <span className="my-6 block h-16 w-px bg-[color:var(--charcoal)]/25 md:my-8 md:h-20" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing statement */}
      <section className="bg-[color:var(--ivory)] px-6 py-40 md:px-20 md:py-56">
        <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center text-center">
          <p className="font-[family-name:var(--font-editorial)] text-3xl leading-[1.15] tracking-tight text-[color:var(--charcoal)] md:text-[56px]">
            Technology wasn&rsquo;t replacing the artisan.
          </p>
          <p className="mt-6 font-[family-name:var(--font-editorial)] text-3xl leading-[1.15] tracking-tight text-[color:var(--warm-gray)] md:text-[56px]">
            It was giving them back their identity.
          </p>
          <span className="mt-16 block h-16 w-px bg-[color:var(--charcoal)]/30" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* CHAPTER 6 — How KalaVansh Works                              */}
      {/* Structure only. Animations will be added in a later pass.    */}
      {/* ============================================================ */}

      {/* Chapter header */}
      <section
        aria-labelledby="kv-chapter-6"
        className="bg-[color:var(--ivory)] px-6 pt-40 pb-24 md:px-20 md:pt-56 md:pb-32"
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--warm-gray)]">
            Chapter 6
          </p>
          <h2
            id="kv-chapter-6"
            className="mt-8 font-[family-name:var(--font-editorial)] text-4xl leading-[1.05] tracking-tight text-[color:var(--charcoal)] md:text-[80px]"
          >
            How KalaVansh Works
          </h2>
          <p className="mx-auto mt-12 max-w-3xl font-[family-name:var(--font-editorial)] text-xl leading-[1.4] tracking-tight text-[color:var(--warm-gray)] md:text-[28px]">
            KalaVansh transforms every handcrafted product into the beginning of a
            story—not the end of one.
          </p>
        </div>
      </section>

      {/* Main experience — three sections in the DOM, only DISCOVER visible */}
      <section
        aria-label="How KalaVansh works — Discover, Experience, Create"
        className="relative bg-[color:var(--ivory)] px-6 py-24 md:px-20 md:py-32"
      >
        <div className="relative mx-auto min-h-screen max-w-6xl">
          {/* DISCOVER — visible */}
          <div
            id="kv-ch6-discover"
            className="flex min-h-screen flex-col items-center justify-center text-center"
          >
            {/* Premium phone mockup */}
            <div
              className="relative"
              style={{
                width: "clamp(240px, 26vw, 320px)",
                aspectRatio: "9 / 19",
              }}
            >
              <div
                className="absolute inset-0 rounded-[44px] border border-[color:var(--charcoal)]/15 bg-[color:var(--charcoal)] p-[10px] shadow-[0_40px_80px_-30px_rgba(31,31,31,0.35)]"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-[color:var(--ivory)]">
                  {/* Notch */}
                  <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[color:var(--charcoal)]" />
                  {/* QR */}
                  <div className="flex h-full w-full items-center justify-center px-6">
                    <img
                      src={ch6MeenakariQR.url}
                      alt="Scan to meet the artisan — Meenakari craft"
                      className="w-full max-w-[220px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-14 text-[11px] uppercase tracking-[0.4em] text-[color:var(--warm-gray)]">
              Discover
            </p>
            <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-editorial)] text-xl leading-[1.4] tracking-tight text-[color:var(--charcoal)] md:text-[26px]">
              Every handcrafted product carries a unique QR code. Scan it to meet
              the artisan and discover the story behind the craft.
            </p>
            <p className="mt-8 font-serif text-base italic text-[color:var(--warm-gray)] md:text-lg">
              Scan to Meet the Artisan
            </p>
          </div>

          {/* EXPERIENCE — in DOM, hidden for now */}
          <div
            id="kv-ch6-experience"
            aria-hidden="true"
            className="invisible opacity-0 mt-40 flex flex-col items-center text-center"
          >
            <div className="w-full max-w-4xl overflow-hidden">
              <img
                src={ch6Pottery.url}
                alt="A young visitor learns pottery from a master artisan in a village courtyard"
                className="h-auto w-full"
              />
            </div>
            <p className="mt-14 text-[11px] uppercase tracking-[0.4em] text-[color:var(--warm-gray)]">
              Experience
            </p>
            <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-editorial)] text-xl leading-[1.4] tracking-tight text-[color:var(--charcoal)] md:text-[26px]">
              Move beyond buying handcrafted products. Visit artisan clusters,
              participate in workshops, and learn directly from artisans
              preserving generations of craftsmanship.
            </p>
          </div>

          {/* CREATE — in DOM, hidden for now */}
          <div
            id="kv-ch6-create"
            aria-hidden="true"
            className="invisible opacity-0 mt-40 flex flex-col items-center text-center"
          >
            <div className="w-full max-w-4xl overflow-hidden">
              <img
                src={ch6Custom.url}
                alt="An artisan hand-painting a personalized Meenakari jewellery box"
                className="h-auto w-full"
              />
            </div>
            <p className="mt-14 text-[11px] uppercase tracking-[0.4em] text-[color:var(--warm-gray)]">
              Create
            </p>
            <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-editorial)] text-xl leading-[1.4] tracking-tight text-[color:var(--charcoal)] md:text-[26px]">
              Collaborate directly with artisans to commission personalized
              handcrafted pieces while celebrating traditional craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Final triangle placeholder — reserved space, no content yet */}
      <section
        aria-label="Triangle layout placeholder"
        className="bg-[color:var(--ivory)] px-6 py-24 md:px-20 md:py-32"
      >
        <div
          id="kv-ch6-triangle"
          className="relative mx-auto w-full max-w-5xl"
          style={{ minHeight: "clamp(520px, 80vh, 900px)" }}
        >
          {/* Reserved slots — Create (top center), Discover (bottom left), Experience (bottom right) */}
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2" data-slot="create" />
          <div className="pointer-events-none absolute bottom-0 left-0" data-slot="discover" />
          <div className="pointer-events-none absolute bottom-0 right-0" data-slot="experience" />
        </div>
      </section>

      {/* Final CTA */}
      <section
        aria-labelledby="kv-ch6-cta"
        className="bg-[color:var(--ivory)] px-6 py-40 md:px-20 md:py-56"
      >
        <div className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center text-center">
          <h2
            id="kv-ch6-cta"
            className="font-[family-name:var(--font-editorial)] text-4xl leading-[1.05] tracking-tight text-[color:var(--charcoal)] md:text-[72px]"
          >
            Experience KalaVansh Yourself
          </h2>
          <p className="mt-10 font-[family-name:var(--font-editorial)] text-xl leading-[1.4] tracking-tight text-[color:var(--warm-gray)] md:text-[26px]">
            Don&rsquo;t just read about the journey.
          </p>
          <p className="mt-2 font-[family-name:var(--font-editorial)] text-xl leading-[1.4] tracking-tight text-[color:var(--warm-gray)] md:text-[26px]">
            Explore the complete KalaVansh platform.
          </p>

          <div className="mt-20 w-full max-w-[320px]">
            <img
              src={ch6SiteQR.url}
              alt="Scan to open the KalaVansh website"
              className="h-auto w-full"
            />
          </div>

          <p className="mt-10 font-serif text-base italic text-[color:var(--warm-gray)] md:text-lg">
            Scan with your phone or click below to explore KalaVansh.
          </p>

          <a
            href="https://kalavansh.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block border border-[color:var(--charcoal)] px-10 py-4 text-[11px] uppercase tracking-[0.4em] text-[color:var(--charcoal)]"
          >
            Open Live Website
          </a>
        </div>
      </section>
    </>
  );
}

function ValueColumn({ eyebrow, items }: { eyebrow: string; items: string[] }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--warm-gray)]">
        {eyebrow}
      </p>
      <ul className="mt-8 flex flex-col">
        {items.map((it, i) => (
          <li
            key={it}
            className={`py-5 font-[family-name:var(--font-editorial)] text-2xl leading-[1.25] tracking-tight text-[color:var(--charcoal)] md:text-[30px] ${i === 0 ? "" : "border-t border-[color:var(--hairline)]"}`}
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
