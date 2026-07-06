import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import vaseImg from "@/assets/kv-opening-vase.jpg.asset.json";
import painterImg from "@/assets/kv-opening-artisan.jpg.asset.json";
import weaverImg from "@/assets/kv-artisan-weaver.jpg.asset.json";
import embroideryImg from "@/assets/kv-artisan-embroidery.jpg.asset.json";
import sareeImg from "@/assets/kv-product-saree.jpg.asset.json";
import chikanImg from "@/assets/kv-product-chikankari.jpg.asset.json";
import meenakariImg from "@/assets/kv-product-meenakari.jpg.asset.json";

export const Route = createFileRoute("/projects/kalavansh")({
  component: KalaVanshPage,
  head: () => ({
    meta: [
      { title: "KalaVansh — Every masterpiece has a maker" },
      {
        name: "description",
        content:
          "A Product Management case study reconnecting handcrafted products with the artisans who create them.",
      },
      { property: "og:title", content: "KalaVansh — Every masterpiece has a maker" },
      {
        property: "og:description",
        content:
          "A Product Management case study reconnecting handcrafted products with the artisans who create them.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

/* ---------------- Reveal helper ---------------- */
function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "figure";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref as any}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 900ms ease ${delay}ms, transform 900ms cubic-bezier(0.2,0.7,0.2,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Comp>
  );
}

/* ---------------- Section label ---------------- */
function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[color:var(--warm-gray)]">
      <span className="font-sans">{index}</span>
      <span className="h-px w-8 bg-[color:var(--hairline)]" />
      <span className="font-sans">{label}</span>
    </div>
  );
}

/* ---------------- Page ---------------- */
function KalaVanshPage() {
  return (
    <main className="bg-[color:var(--ivory)] text-[color:var(--charcoal)]">
      <Opening />
      <Problem />
      <BrokenSystem />
      <TurningPoint />
      <Reframing />
      <WhyKalaVansh />
      <Experience />
      <BusinessThinking />
      <Cause2026 />
      <Exhibition />
      <Pitch />
      <Reflection />
      <Closing />
    </main>
  );
}

/* ============= 1. Opening ============= */
function Opening() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      const p = scrollable <= 0 ? 0 : Math.max(0, Math.min(1, -rect.top / scrollable));
      const artisan = Math.min(1, p / 0.7);
      const text = p > 0.7 ? Math.min(1, (p - 0.7) / 0.3) : 0;
      section.style.setProperty("--p", p.toFixed(4));
      section.style.setProperty("--a", artisan.toFixed(4));
      section.style.setProperty("--t", text.toFixed(4));
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
    <section ref={sectionRef} className="relative min-h-[180vh]" aria-label="Opening">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 40%, rgba(255,248,236,0.7) 0%, rgba(248,245,239,0) 65%)",
        }}
      />
      <div className="sticky top-0 flex h-screen items-center justify-center px-6">
        <div className="relative flex flex-col items-center">
          <div
            className="relative z-10 flex flex-col items-center"
            style={{ transform: "translateY(calc(-80px * var(--p, 0)))" }}
          >
            <div style={{ width: "min(260px, 52vw)", height: "min(360px, 48vh)" }}>
              <img
                src={vaseImg.url}
                alt="Hand-painted Meenakari vase"
                className="h-full w-full object-contain"
                style={{ filter: "drop-shadow(0 22px 16px rgba(31,31,31,0.16))" }}
              />
            </div>
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
          <div
            className="absolute left-1/2 top-full flex flex-col items-center gap-10 pt-12"
            style={{
              opacity: "var(--a, 0)",
              transform:
                "translateX(-50%) translateY(calc(18px * (1 - var(--a, 0))))",
              pointerEvents: "none",
            }}
          >
            <div
              className="overflow-hidden"
              style={{
                width: "min(280px, 58vw)",
                height: "min(280px, 34vh)",
                boxShadow: "0 28px 56px -38px rgba(31,31,31,0.35)",
              }}
            >
              <img
                src={painterImg.url}
                alt="A Meenakari artisan painting a vase"
                className="h-full w-full object-cover"
                style={{ filter: "saturate(0.94)" }}
              />
            </div>
            <div
              className="max-w-[42ch] text-center"
              style={{
                opacity: "var(--t, 0)",
                transform: "translateY(calc(14px * (1 - var(--t, 0))))",
              }}
            >
              <h1
                className="font-editorial"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4.25rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.012em",
                }}
              >
                Every masterpiece has a maker.
              </h1>
              <p
                className="mt-5 font-serif"
                style={{
                  fontSize: "clamp(1rem, 1.35vw, 1.2rem)",
                  color: "rgba(31,31,31,0.6)",
                }}
              >
                This project began when I chose to look beyond the product.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============= Section wrapper ============= */
function Section({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index={index} label={label} />
          {title ? (
            <h2
              className="mt-6 font-editorial"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.012em",
                maxWidth: "22ch",
              }}
            >
              {title}
            </h2>
          ) : null}
        </Reveal>
        <div className="mt-16">{children}</div>
      </div>
    </section>
  );
}

/* ============= 2. Problem ============= */
function Problem() {
  const cards = [
    {
      body: "Beautiful handcrafted products are admired.",
      insight: "People remember the product. Not the creator.",
    },
    {
      body: "Artisans spend years mastering their craft.",
      insight: "Yet they rarely receive recognition.",
    },
    {
      body:
        "Many artisans hope their children become doctors or engineers instead of continuing the craft.",
      insight:
        "When a generation leaves, centuries of heritage disappear with them.",
    },
  ];
  return (
    <Section index="02" label="The Problem" title="Three quiet truths about handmade India.">
      <div className="grid gap-8 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={i} delay={i * 120} as="article">
            <div className="flex h-full flex-col border-t border-[color:var(--hairline)] pt-8">
              <p
                className="font-editorial"
                style={{ fontSize: "clamp(1.25rem, 1.6vw, 1.6rem)", lineHeight: 1.3 }}
              >
                {c.body}
              </p>
              <div className="mt-8 flex items-start gap-3">
                <span className="mt-2 h-px w-6 flex-none bg-[color:var(--gold)]" />
                <p
                  className="font-serif italic"
                  style={{
                    fontSize: "1rem",
                    color: "rgba(31,31,31,0.65)",
                    lineHeight: 1.55,
                  }}
                >
                  {c.insight}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ============= 3. Broken System ============= */
function BrokenSystem() {
  const chain = ["Artisan", "Middlemen", "Retail", "Customer"];
  return (
    <Section index="03" label="The Broken System" title="Who creates the value. Who captures it.">
      <div className="grid gap-16 md:grid-cols-2 md:items-center">
        <Reveal>
          <ol className="flex flex-col items-start gap-6">
            {chain.map((node, i) => (
              <li key={node} className="flex flex-col items-start gap-6">
                <div
                  className="font-editorial"
                  style={{
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    letterSpacing: "-0.01em",
                    color: i === 0 ? "var(--charcoal)" : "rgba(31,31,31,0.75)",
                  }}
                >
                  {node}
                </div>
                {i < chain.length - 1 && (
                  <span
                    aria-hidden
                    className="ml-1 block"
                    style={{
                      width: 1,
                      height: 42,
                      background:
                        "linear-gradient(180deg, rgba(31,31,31,0.35), rgba(31,31,31,0.08))",
                    }}
                  />
                )}
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={150}>
          <ul className="space-y-6 border-l border-[color:var(--hairline)] pl-8">
            {[
              "The artisan creates the value.",
              "Someone else captures the value.",
              "The artisan rarely decides the final price.",
            ].map((line, i) => (
              <li
                key={i}
                className="font-editorial"
                style={{
                  fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)",
                  lineHeight: 1.4,
                }}
              >
                {line}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

/* ============= 4. Turning Point ============= */
function TurningPoint() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const update = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const end = vh * 0.1;
      const scrolled = start - rect.top;
      const range = start - end;
      setP(Math.max(0, Math.min(1, scrolled / range)));
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
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scale = 0.55 + p * 0.55; // 0.55 → 1.10
  const highlight = Math.max(0, (p - 0.7) / 0.3);

  return (
    <Section index="04" label="My Turning Point" title="The moment a saree stopped being a saree.">
      <div ref={ref} className="grid gap-12 md:grid-cols-[1.1fr,1fr] md:items-center">
        <div className="relative flex aspect-square items-center justify-center overflow-hidden">
          <div
            className="relative"
            style={{
              width: "88%",
              transform: `scale(${scale})`,
              transition: "transform 120ms linear",
            }}
          >
            <img
              src={sareeImg.url}
              alt="Handwoven Ramayana saree unfolding"
              className="h-full w-full object-cover"
              style={{ filter: `saturate(${0.85 + p * 0.2})` }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                boxShadow: `inset 0 0 0 1px rgba(201,162,39,${highlight * 0.55})`,
                background: `radial-gradient(60% 40% at 50% 55%, rgba(201,162,39,${highlight * 0.14}) 0%, transparent 70%)`,
                transition: "box-shadow 400ms ease, background 400ms ease",
              }}
            />
          </div>
        </div>
        <Reveal>
          <p
            className="font-editorial"
            style={{
              fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
              lineHeight: 1.25,
              maxWidth: "24ch",
            }}
          >
            I thought I was looking at a saree.
          </p>
          <p
            className="mt-6 font-editorial"
            style={{
              fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
              lineHeight: 1.25,
              color: "var(--gold)",
              maxWidth: "24ch",
            }}
          >
            I realised I was looking at living heritage.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/* ============= 5. Reframing ============= */
function Reframing() {
  const left = ["Helping artisans sell more.", "Pricing.", "Marketplace."];
  const right = ["Recognition.", "Identity.", "Visibility.", "Connection."];
  return (
    <Section index="05" label="Reframing the Problem" title="What I thought. What I learned.">
      <div className="grid gap-12 md:grid-cols-2">
        <Reveal>
          <div className="border-t border-[color:var(--hairline)] pt-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--warm-gray)]">
              What I thought
            </p>
            <ul className="mt-8 space-y-5">
              {left.map((item) => (
                <li
                  key={item}
                  className="font-editorial"
                  style={{
                    fontSize: "clamp(1.35rem, 2vw, 1.85rem)",
                    color: "rgba(31,31,31,0.5)",
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(31,31,31,0.25)",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="border-t border-[color:var(--gold)] pt-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--gold)]">
              What I learned
            </p>
            <ul className="mt-8 space-y-5">
              {right.map((item) => (
                <li
                  key={item}
                  className="font-editorial"
                  style={{
                    fontSize: "clamp(1.35rem, 2vw, 1.85rem)",
                    lineHeight: 1.2,
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ============= 6. Why KalaVansh ============= */
function WhyKalaVansh() {
  const nodes = ["Artisan", "Story", "Culture", "Customer", "Community", "Tourism"];
  return (
    <Section index="06" label="Why KalaVansh" title="Not another marketplace. An ecosystem of memory.">
      <Reveal>
        <p
          className="font-serif"
          style={{
            fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)",
            lineHeight: 1.6,
            color: "rgba(31,31,31,0.7)",
            maxWidth: "60ch",
          }}
        >
          KalaVansh reconnects handcrafted products with the people who make them —
          returning the artisan to the story a customer takes home.
        </p>
      </Reveal>
      <div className="mt-20">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-8 md:gap-x-10">
          {nodes.map((n, i) => (
            <Reveal key={n} delay={i * 100} as="li">
              <div className="flex items-center gap-6 md:gap-10">
                <span
                  className="font-editorial"
                  style={{
                    fontSize: "clamp(1.35rem, 2.2vw, 2rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {n}
                </span>
                {i < nodes.length - 1 && (
                  <span
                    aria-hidden
                    className="text-[color:var(--gold)]"
                    style={{ fontSize: "1.25rem" }}
                  >
                    →
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ============= 7. Experience (QR modal) ============= */
function Experience() {
  const items = [
    {
      title: "Meenakari Glass",
      caption: "Scan to meet the painter.",
      img: meenakariImg.url,
      body: "A short film introduces the master painter behind the enamel work — the pigments, the fire, the family that has carried this craft for four generations.",
    },
    {
      title: "Ramayana Saree",
      caption: "Scan to unfold the story.",
      img: sareeImg.url,
      body: "Every panel of the saree tells a chapter of the Ramayana. The QR reveals the weaver's voice narrating each motif she wove by hand.",
    },
    {
      title: "KalaVansh Website",
      caption: "Scan to enter the world.",
      img: chikanImg.url,
      body: "The full KalaVansh directory: artisans, clusters, workshops, and the stories that live behind each object.",
    },
  ];
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const active = openIdx !== null ? items[openIdx] : null;

  return (
    <Section index="07" label="The Experience" title="A QR is a doorway, not a link.">
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 120}>
            <button
              type="button"
              onClick={() => setOpenIdx(i)}
              className="group block w-full text-left"
            >
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "4 / 5",
                  boxShadow: "0 30px 60px -40px rgba(31,31,31,0.35)",
                }}
              >
                <img
                  src={it.img}
                  alt={it.title}
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-6 flex items-baseline justify-between border-t border-[color:var(--hairline)] pt-4">
                <h3
                  className="font-editorial"
                  style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.5rem)" }}
                >
                  {it.title}
                </h3>
                <span className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--warm-gray)]">
                  {it.caption}
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Dialog open={openIdx !== null} onOpenChange={(o) => !o && setOpenIdx(null)}>
        <DialogContent
          className="max-w-3xl overflow-hidden border-none bg-[color:var(--ivory)] p-0"
        >
          {active && (
            <div className="grid gap-0 md:grid-cols-2">
              <div className="aspect-square md:aspect-auto">
                <img
                  src={active.img}
                  alt={active.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-6 p-10">
                <span className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--warm-gray)]">
                  QR Experience
                </span>
                <DialogTitle
                  className="font-editorial"
                  style={{ fontSize: "clamp(1.75rem, 2.4vw, 2.25rem)", lineHeight: 1.15 }}
                >
                  {active.title}
                </DialogTitle>
                <p
                  className="font-serif"
                  style={{
                    fontSize: "1.05rem",
                    lineHeight: 1.6,
                    color: "rgba(31,31,31,0.7)",
                  }}
                >
                  {active.body}
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <div
                    aria-hidden
                    className="grid h-24 w-24 flex-none grid-cols-6 grid-rows-6 gap-[2px] border border-[color:var(--hairline)] p-2"
                  >
                    {Array.from({ length: 36 }).map((_, k) => (
                      <span
                        key={k}
                        style={{
                          background:
                            (k * 7 + (active.title.length % 5)) % 3 === 0
                              ? "var(--charcoal)"
                              : "transparent",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-[color:var(--warm-gray)]">
                    Point your camera at the mark to open the story.
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}

/* ============= 8. Business Thinking ============= */
function BusinessThinking() {
  return (
    <Section index="08" label="Business Thinking" title="Why not Amazon?">
      <div className="grid gap-12 md:grid-cols-2">
        <Reveal>
          <div className="space-y-6">
            <p
              className="font-editorial"
              style={{ fontSize: "clamp(1.4rem, 2vw, 1.85rem)", lineHeight: 1.3 }}
            >
              Amazon sells products.
              <br />
              <span className="text-[color:var(--gold)]">
                KalaVansh builds emotional connection.
              </span>
            </p>
            <p
              className="font-serif"
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.65,
                color: "rgba(31,31,31,0.7)",
                maxWidth: "48ch",
              }}
            >
              The moat isn't logistics. It's meaning — the reason a buyer chooses to
              know the maker of the object they're bringing home.
            </p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--warm-gray)]">
              Revenue Streams
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Workshops",
                "Corporate gifting",
                "Brand collaborations",
                "Marketplace commissions",
              ].map((r) => (
                <li
                  key={r}
                  className="flex items-baseline gap-4 border-b border-[color:var(--hairline)] pb-3 font-editorial"
                  style={{ fontSize: "1.15rem" }}
                >
                  <span className="text-[color:var(--gold)]">◆</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <div className="mt-20 grid gap-6 border-t border-[color:var(--hairline)] pt-10 md:grid-cols-3">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--warm-gray)]">
            Scalability
          </p>
          {[
            "One cluster coordinator.",
            "Many artisans.",
            "Low technology barrier.",
          ].map((s) => (
            <p
              key={s}
              className="font-editorial"
              style={{ fontSize: "clamp(1.15rem, 1.5vw, 1.45rem)", lineHeight: 1.35 }}
            >
              {s}
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ============= 9. CAUSE 2026 ============= */
function Cause2026() {
  const steps = [
    { label: "Problem Statement", body: "Understanding artisan invisibility." },
    { label: "Prototype", body: "The QR-linked object experience." },
    { label: "Exhibition", body: "A curated booth of stories and objects." },
    { label: "Pitch", body: "Presenting KalaVansh to the CAUSE jury." },
  ];
  return (
    <Section index="09" label="CAUSE 2026" title="The competition that gave the idea a stage.">
      <ol className="relative border-l border-[color:var(--hairline)] pl-10">
        {steps.map((s, i) => (
          <Reveal key={s.label} delay={i * 120} as="li">
            <div className="relative pb-14 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[46px] top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[color:var(--ivory)]"
                style={{ boxShadow: "0 0 0 1px var(--gold)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
              </span>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--warm-gray)]">
                Stage 0{i + 1}
              </p>
              <h3
                className="mt-2 font-editorial"
                style={{ fontSize: "clamp(1.35rem, 2vw, 1.75rem)" }}
              >
                {s.label}
              </h3>
              <p
                className="mt-2 font-serif"
                style={{
                  fontSize: "1.05rem",
                  color: "rgba(31,31,31,0.65)",
                  lineHeight: 1.55,
                }}
              >
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/* ============= 10. Exhibition ============= */
function Exhibition() {
  const shots = [
    { src: meenakariImg.url, label: "Meenakari Glass" },
    { src: sareeImg.url, label: "Ramayana Saree" },
    { src: chikanImg.url, label: "Chikankari Detail" },
    { src: painterImg.url, label: "The Painter" },
    { src: weaverImg.url, label: "The Weaver" },
    { src: embroideryImg.url, label: "The Embroiderer" },
  ];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section index="10" label="The Exhibition" title="The booth. The objects. The people.">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {shots.map((s, i) => (
          <Reveal key={i} delay={(i % 3) * 100}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full overflow-hidden"
              style={{ aspectRatio: i % 4 === 0 ? "3 / 4" : "1 / 1" }}
            >
              <img
                src={s.src}
                alt={s.label}
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
            </button>
          </Reveal>
        ))}
      </div>
      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-4xl border-none bg-[color:var(--ivory)] p-0">
          {open !== null && (
            <div>
              <img
                src={shots[open].src}
                alt={shots[open].label}
                className="h-auto max-h-[80vh] w-full object-contain"
              />
              <DialogTitle className="p-6 text-center font-editorial text-lg">
                {shots[open].label}
              </DialogTitle>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}

/* ============= 11. Pitch ============= */
function Pitch() {
  const bts = [weaverImg.url, embroideryImg.url, painterImg.url];
  return (
    <Section index="11" label="The Pitch" title="Presenting KalaVansh, in six minutes.">
      <Reveal>
        <div
          className="relative w-full overflow-hidden bg-[color:var(--charcoal)]"
          style={{ aspectRatio: "16 / 9" }}
        >
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center text-[color:var(--ivory)]">
              <div
                aria-hidden
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[color:var(--ivory)]/40"
              >
                <span className="ml-1 border-y-[10px] border-l-[16px] border-y-transparent border-l-[color:var(--ivory)]" />
              </div>
              <p className="mt-6 font-serif text-sm opacity-70">
                Pitch video — upload to replace this placeholder.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
      <div className="mt-12 grid grid-cols-3 gap-4 md:gap-6">
        {bts.map((src, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="overflow-hidden" style={{ aspectRatio: "4 / 5" }}>
              <img src={src} alt="Behind the scenes" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ============= 12. Reflection ============= */
function Reflection() {
  const cards = [
    {
      label: "What worked",
      body:
        "The object-first storytelling. Judges lingered on the QR because it felt like a museum, not a marketing pitch.",
    },
    {
      label: "Why we were shortlisted",
      body:
        "The pitch framed artisans as founders of culture — not vendors — and mapped a business that respected them.",
    },
    {
      label: "What I would improve",
      body:
        "More primary research. Fewer assumptions. Test with one cluster before designing the whole ecosystem.",
    },
  ];
  return (
    <Section index="12" label="Reflection" title="If I built KalaVansh today.">
      <div className="grid gap-8 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.label} delay={i * 120}>
            <div className="flex h-full flex-col border-t border-[color:var(--hairline)] pt-8">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--warm-gray)]">
                {c.label}
              </p>
              <p
                className="mt-5 font-editorial"
                style={{ fontSize: "clamp(1.15rem, 1.5vw, 1.4rem)", lineHeight: 1.4 }}
              >
                {c.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={200}>
        <div className="mt-20 border-l border-[color:var(--gold)] pl-8">
          <p
            className="font-editorial"
            style={{
              fontSize: "clamp(1.35rem, 2vw, 1.85rem)",
              lineHeight: 1.4,
              maxWidth: "48ch",
            }}
          >
            I would validate assumptions with real artisans, measure QR engagement,
            test willingness to scan, and pilot with one craft cluster before scaling.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

/* ============= 13. Closing ============= */
function Closing() {
  return (
    <section className="relative overflow-hidden px-6 py-40 md:py-56">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr,1.1fr] md:items-center">
        <Reveal>
          <div className="overflow-hidden" style={{ aspectRatio: "4 / 5" }}>
            <img
              src={weaverImg.url}
              alt="A weaver at her loom"
              className="h-full w-full object-cover"
              style={{ filter: "saturate(0.92)" }}
            />
          </div>
        </Reveal>
        <Reveal delay={200}>
          <p
            className="font-editorial"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.012em",
              maxWidth: "22ch",
            }}
          >
            KalaVansh didn't just change how I think about products.
            <br />
            <span className="text-[color:var(--gold)]">
              It changed how I see the people every product begins with.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
