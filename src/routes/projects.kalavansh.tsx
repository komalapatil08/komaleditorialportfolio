import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";

import meenakariImg from "@/assets/kv-product-meenakari.jpg.asset.json";
import sareeImg from "@/assets/kv-product-saree.jpg.asset.json";
import chikankariImg from "@/assets/kv-product-chikankari.jpg.asset.json";
import painterImg from "@/assets/kv-artisan-painter.jpg.asset.json";
import weaverImg from "@/assets/kv-artisan-weaver.jpg.asset.json";
import embroideryImg from "@/assets/kv-artisan-embroidery.jpg.asset.json";

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

const PRODUCTS = [
  {
    product: meenakariImg.url,
    productAlt: "A hand-painted Meenakari glass vessel on a museum pedestal",
    artisan: painterImg.url,
    artisanAlt: "A Meenakari glass painter at work",
    label: "Meenakari",
  },
  {
    product: sareeImg.url,
    productAlt: "A folded silk Banarasi saree on a museum pedestal",
    artisan: weaverImg.url,
    artisanAlt: "A weaver at a traditional handloom",
    label: "Banarasi Silk",
  },
  {
    product: chikankariImg.url,
    productAlt: "A white Chikankari kurti on a wooden hanger",
    artisan: embroideryImg.url,
    artisanAlt: "A Chikankari embroidery artisan at work",
    label: "Chikankari",
  },
];

function KalaVanshPage() {
  // 0 = curtain fully closed, 1 = fully open (from center outward)
  const [openness, setOpenness] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [breezePlayed, setBreezePlayed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showHeadline, setShowHeadline] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; openness: number } | null>(null);
  const breezeOffset = useRef(0);
  const [breezeTick, setBreezeTick] = useState(0);

  // Breeze after ~2s of inactivity
  useEffect(() => {
    if (breezePlayed || openness > 0.02) return;
    const t = setTimeout(() => {
      setBreezePlayed(true);
      // animate a small breeze: brief open to 0.08 then settle
      const start = performance.now();
      const duration = 2600;
      const peak = 0.09;
      let raf = 0;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // ease: rise then fall
        const wave = Math.sin(t * Math.PI);
        breezeOffset.current = wave * peak;
        setBreezeTick((n) => n + 1);
        if (t < 1) {
          raf = requestAnimationFrame(step);
        } else {
          breezeOffset.current = 0;
          setBreezeTick((n) => n + 1);
          setTooltipVisible(true);
        }
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, 2000);
    return () => clearTimeout(t);
  }, [breezePlayed, openness]);

  // Once revealed >= 0.92, run the final choreography
  useEffect(() => {
    if (revealed || openness < 0.92) return;
    setRevealed(true);
    const t1 = setTimeout(() => setShowHeadline(true), 900);
    const t2 = setTimeout(() => setShowSub(true), 2200);
    const t3 = setTimeout(() => setShowScroll(true), 3300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [openness, revealed]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      setTooltipVisible(false);
      setDragging(true);
      dragStart.current = { x: e.clientX, openness };
      (e.target as Element).setPointerCapture?.(e.pointerId);
    },
    [openness],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging || !dragStart.current || !stageRef.current) return;
      const width = stageRef.current.clientWidth;
      const dx = e.clientX - dragStart.current.x;
      // Full open at ~40% of stage width dragged from center
      const delta = (Math.abs(dx) / (width * 0.4));
      const next = Math.max(0, Math.min(1, dragStart.current.openness + delta));
      setOpenness(next);
    },
    [dragging],
  );

  const onPointerUp = useCallback(() => {
    setDragging(false);
    dragStart.current = null;
    // Snap open if past threshold, snap closed if very early
    setOpenness((v) => {
      if (v > 0.55) return 1;
      if (v < 0.06) return 0;
      return v;
    });
  }, []);

  const effectiveOpen = Math.max(0, Math.min(1, openness + breezeOffset.current));
  // Each panel translates outward by (effectiveOpen * 55%)
  const panelShift = effectiveOpen * 55;
  const transition = dragging ? "none" : "transform 1600ms cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <main
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#F8F5EF", color: "var(--charcoal)" }}
    >
      {/* Opening viewport */}
      <section
        className="relative w-full"
        style={{ height: "100vh", minHeight: "640px" }}
        aria-label="KalaVansh opening exhibition"
      >
        {/* Ambient museum vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 40%, rgba(255,247,232,0.55) 0%, rgba(248,245,239,0) 55%), radial-gradient(80% 60% at 50% 100%, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0) 60%)",
          }}
        />

        {/* Stage */}
        <div
          ref={stageRef}
          className="relative mx-auto flex h-full w-full max-w-[1400px] items-center justify-center px-6"
        >
          {/* Pedestals + Products + Artisans behind */}
          <div className="relative z-10 flex w-full items-end justify-center gap-6 sm:gap-10 md:gap-16 lg:gap-24">
            {PRODUCTS.map((p, i) => (
              <Pedestal
                key={i}
                product={p.product}
                productAlt={p.productAlt}
                artisan={p.artisan}
                artisanAlt={p.artisanAlt}
                label={p.label}
                revealed={effectiveOpen}
              />
            ))}
          </div>

          {/* Curtain — sits above products, split from center */}
          <div
            aria-hidden={revealed}
            className="absolute inset-0 z-20 select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{
              cursor: dragging ? "grabbing" : effectiveOpen < 0.98 ? "grab" : "default",
              touchAction: "none",
            }}
          >
            <CurtainPanel side="left" shift={panelShift} transition={transition} />
            <CurtainPanel side="right" shift={panelShift} transition={transition} />

            {/* Tooltip */}
            <div
              className="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 text-center"
              style={{
                opacity: tooltipVisible && effectiveOpen < 0.15 ? 1 : 0,
                transition: "opacity 900ms ease",
              }}
            >
              <p
                className="font-serif text-[15px] tracking-wide"
                style={{ color: "rgba(31,31,31,0.55)", fontStyle: "italic" }}
              >
                Pull gently&nbsp;→
              </p>
            </div>
          </div>

          {/* Final headline */}
          <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
            <h1
              className="font-editorial text-[clamp(2.4rem,6vw,5.25rem)] leading-[1.02] tracking-[-0.01em]"
              style={{
                opacity: showHeadline ? 1 : 0,
                transform: showHeadline ? "translateY(0)" : "translateY(14px)",
                transition:
                  "opacity 1400ms cubic-bezier(0.22,1,0.36,1), transform 1400ms cubic-bezier(0.22,1,0.36,1)",
                color: "var(--charcoal)",
                textShadow: "0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              Every masterpiece has a maker.
            </h1>
            <p
              className="mt-6 font-serif text-[clamp(1.05rem,1.6vw,1.375rem)]"
              style={{
                opacity: showSub ? 1 : 0,
                transform: showSub ? "translateY(0)" : "translateY(10px)",
                transition:
                  "opacity 1200ms cubic-bezier(0.22,1,0.36,1) 120ms, transform 1200ms cubic-bezier(0.22,1,0.36,1) 120ms",
                color: "rgba(31,31,31,0.62)",
                fontStyle: "italic",
              }}
            >
              Yet we rarely meet them.
            </p>
          </div>

          {/* Scroll indicator */}
          <div
            className="pointer-events-none absolute bottom-8 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{
              opacity: showScroll ? 1 : 0,
              transition: "opacity 1200ms ease",
            }}
          >
            <span
              className="font-serif text-[11px] uppercase tracking-[0.28em]"
              style={{ color: "rgba(31,31,31,0.4)" }}
            >
              Scroll
            </span>
            <span
              aria-hidden
              className="block h-8 w-px animate-arrow-pulse"
              style={{ background: "rgba(31,31,31,0.35)" }}
            />
          </div>
        </div>
      </section>
      {/* Rest of the case study will be built in following prompts. */}
      {/* referenced to avoid unused warning */}
      <span hidden aria-hidden>{breezeTick}</span>
    </main>
  );
}

function Pedestal({
  product,
  productAlt,
  artisan,
  artisanAlt,
  label,
  revealed,
}: {
  product: string;
  productAlt: string;
  artisan: string;
  artisanAlt: string;
  label: string;
  revealed: number;
}) {
  // Artisan opacity ramps in as the curtain opens past ~15%
  const artisanOpacity = Math.max(0, Math.min(1, (revealed - 0.12) / 0.7));
  return (
    <div className="relative flex flex-col items-center" style={{ width: "min(28vw, 320px)" }}>
      {/* Artisan (behind) */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 overflow-hidden"
        style={{
          width: "min(24vw, 280px)",
          height: "min(34vw, 380px)",
          opacity: artisanOpacity * 0.9,
          transition: "opacity 900ms ease",
          filter: "saturate(0.9) contrast(0.98)",
          borderRadius: "2px",
          boxShadow: "0 20px 40px -30px rgba(0,0,0,0.35)",
        }}
      >
        <img
          src={artisan}
          alt={artisanAlt}
          className="h-full w-full object-cover"
          loading="lazy"
          width={1024}
          height={1024}
        />
      </div>

      {/* Product */}
      <div
        className="relative z-10 flex items-end justify-center"
        style={{
          width: "min(22vw, 240px)",
          height: "min(30vw, 320px)",
          marginTop: "min(4vw, 40px)",
        }}
      >
        <img
          src={product}
          alt={productAlt}
          className="max-h-full max-w-full object-contain"
          style={{
            filter: "drop-shadow(0 30px 22px rgba(31,31,31,0.18))",
          }}
          loading="eager"
          width={1024}
          height={1024}
        />
      </div>

      {/* Pedestal */}
      <div className="relative z-10 mt-2 flex flex-col items-center" style={{ width: "100%" }}>
        <div
          style={{
            width: "min(18vw, 200px)",
            height: "min(9vw, 90px)",
            background:
              "linear-gradient(180deg, #EFEAE0 0%, #E4DDD0 60%, #D9D0BE 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.7), 0 18px 30px -22px rgba(31,31,31,0.35)",
          }}
        />
        <div
          className="mt-3 font-serif text-[11px] uppercase tracking-[0.32em]"
          style={{ color: "rgba(31,31,31,0.45)" }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

function CurtainPanel({
  side,
  shift,
  transition,
}: {
  side: "left" | "right";
  shift: number; // percentage
  transition: string;
}) {
  const isLeft = side === "left";
  return (
    <div
      className="absolute top-0 h-full"
      style={{
        left: isLeft ? 0 : "50%",
        width: "50%",
        transform: `translateX(${isLeft ? -shift : shift}%)`,
        transition,
        willChange: "transform",
      }}
    >
      {/* Linen fabric with vertical folds */}
      <div
        className="relative h-full w-full"
        style={{
          background:
            "linear-gradient(180deg, #E9DFC9 0%, #E2D6BC 50%, #D8C9AA 100%)",
          boxShadow: isLeft
            ? "inset -30px 0 40px -20px rgba(31,31,31,0.18)"
            : "inset 30px 0 40px -20px rgba(31,31,31,0.18)",
        }}
      >
        {/* Vertical folds */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(31,31,31,0.06) 0px, rgba(31,31,31,0.06) 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 46px, rgba(31,31,31,0.10) 47px, rgba(31,31,31,0.10) 48px, rgba(255,255,255,0.02) 48px, rgba(255,255,255,0.02) 92px)",
            mixBlendMode: "multiply",
          }}
        />
        {/* Linen weave noise */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(31,31,31,0.05) 0px, rgba(31,31,31,0.05) 1px, transparent 1px, transparent 3px), repeating-linear-gradient(90deg, rgba(31,31,31,0.04) 0px, rgba(31,31,31,0.04) 1px, transparent 1px, transparent 3px)",
          }}
        />
        {/* Inner edge accent */}
        <div
          aria-hidden
          className="absolute top-0 h-full"
          style={{
            [isLeft ? "right" : "left"]: 0,
            width: "12px",
            background: isLeft
              ? "linear-gradient(90deg, rgba(31,31,31,0) 0%, rgba(31,31,31,0.22) 100%)"
              : "linear-gradient(270deg, rgba(31,31,31,0) 0%, rgba(31,31,31,0.22) 100%)",
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
