import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";

import meenakariImg from "@/assets/kv-product-meenakari.jpg.asset.json";
import painterImg from "@/assets/kv-artisan-painter.jpg.asset.json";

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
  // 0 = muslin fully covering, 1 = fully drawn aside (to the right)
  const [openness, setOpenness] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [breezePlayed, setBreezePlayed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showHeadline, setShowHeadline] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; openness: number; velocity: number; time: number } | null>(null);
  const lastMove = useRef<{ x: number; time: number } | null>(null);
  const breezeOffset = useRef(0);
  const inertia = useRef<number | null>(null);
  const [, forceTick] = useState(0);

  // Gentle one-time breeze after ~2s
  useEffect(() => {
    if (breezePlayed) return;
    const t = setTimeout(() => {
      setBreezePlayed(true);
      const start = performance.now();
      const duration = 1100;
      const peak = 0.11;
      let raf = 0;
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const wave = Math.sin(p * Math.PI); // 0 → 1 → 0
        breezeOffset.current = wave * peak;
        forceTick((n) => n + 1);
        if (p < 1) raf = requestAnimationFrame(step);
        else {
          breezeOffset.current = 0;
          forceTick((n) => n + 1);
        }
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, 2000);
    return () => clearTimeout(t);
  }, [breezePlayed]);

  // Final choreography when fully open
  useEffect(() => {
    if (revealed || openness < 0.94) return;
    setRevealed(true);
    const t1 = setTimeout(() => setShowHeadline(true), 1000);
    const t2 = setTimeout(() => setShowSub(true), 2400);
    const t3 = setTimeout(() => setShowScroll(true), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [openness, revealed]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (revealed) return;
      if (inertia.current) cancelAnimationFrame(inertia.current);
      setDragging(true);
      const now = performance.now();
      dragStart.current = { x: e.clientX, openness, velocity: 0, time: now };
      lastMove.current = { x: e.clientX, time: now };
      (e.target as Element).setPointerCapture?.(e.pointerId);
    },
    [openness, revealed],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging || !dragStart.current || !stageRef.current) return;
      const width = stageRef.current.clientWidth;
      const dx = e.clientX - dragStart.current.x;
      // Only rightward drag reveals; allow either direction, use magnitude
      const delta = Math.abs(dx) / (width * 0.5);
      const next = Math.max(0, Math.min(1, dragStart.current.openness + delta));
      const now = performance.now();
      if (lastMove.current) {
        const dt = Math.max(1, now - lastMove.current.time);
        dragStart.current.velocity = (e.clientX - lastMove.current.x) / dt; // px/ms
      }
      lastMove.current = { x: e.clientX, time: now };
      setOpenness(next);
    },
    [dragging],
  );

  const onPointerUp = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    const v = dragStart.current?.velocity ?? 0;
    dragStart.current = null;
    lastMove.current = null;

    // Natural inertia — no bounce, no snap back once past threshold
    const width = stageRef.current?.clientWidth ?? 1000;
    let velocity = Math.abs(v) / (width * 0.5) * 16; // per frame at 60fps
    const friction = 0.94;
    const tick = () => {
      velocity *= friction;
      setOpenness((cur) => {
        const next = Math.min(1, cur + velocity);
        if (next >= 1) {
          inertia.current = null;
          return 1;
        }
        if (velocity < 0.0008) {
          // If we're already past commit point, glide to fully open
          if (cur > 0.42) {
            inertia.current = requestAnimationFrame(() => {
              setOpenness((c) => Math.min(1, c + 0.012));
              if (openness < 1) inertia.current = requestAnimationFrame(tick);
            });
          }
          inertia.current = null;
          return next;
        }
        inertia.current = requestAnimationFrame(tick);
        return next;
      });
    };
    inertia.current = requestAnimationFrame(tick);
  }, [dragging, openness]);

  const effectiveOpen = Math.max(0, Math.min(1, openness + breezeOffset.current));
  // Muslin slides to the right; slight rise + skew for cloth feel
  const muslinShift = effectiveOpen * 108; // % of muslin width
  const muslinSkew = (1 - Math.min(1, effectiveOpen * 2)) * -1.5; // subtle
  const muslinLift = effectiveOpen * -6; // small vertical rise (px)

  return (
    <main
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#F8F5EF", color: "var(--charcoal)" }}
    >
      <section
        className="relative w-full"
        style={{ height: "100vh", minHeight: "680px" }}
        aria-label="KalaVansh opening exhibition"
      >
        {/* Ambient museum lighting */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 38%, rgba(255,247,232,0.75) 0%, rgba(248,245,239,0) 60%), radial-gradient(90% 40% at 50% 100%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 65%)",
          }}
        />

        <div
          ref={stageRef}
          className="relative mx-auto flex h-full w-full max-w-[1200px] flex-col items-center justify-center px-6"
        >
          {/* Installation */}
          <div
            className="relative flex items-end justify-center"
            style={{ width: "min(560px, 78vw)", height: "min(560px, 62vh)" }}
          >
            {/* Artisan (behind, hidden by muslin) */}
            <div
              className="absolute left-1/2 top-0 -translate-x-1/2 overflow-hidden"
              style={{
                width: "min(440px, 68vw)",
                height: "min(500px, 58vh)",
                borderRadius: "2px",
                filter: "saturate(0.92) contrast(0.98)",
                boxShadow: "0 30px 60px -40px rgba(31,31,31,0.35)",
                opacity: Math.min(1, Math.max(0, (effectiveOpen - 0.08) / 0.65)),
                transition: "opacity 700ms ease",
              }}
            >
              <img
                src={painterImg.url}
                alt="A Meenakari artisan painting a vase by hand"
                className="h-full w-full object-cover"
                width={1024}
                height={1024}
              />
            </div>

            {/* Muslin — single hanging panel */}
            <div
              className="absolute left-1/2 top-0 z-10 -translate-x-1/2 select-none"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              style={{
                width: "min(520px, 76vw)",
                height: "min(560px, 62vh)",
                cursor: revealed ? "default" : dragging ? "grabbing" : "grab",
                touchAction: "none",
                transform: `translate(calc(-50% + ${muslinShift}%), ${muslinLift}px) skewX(${muslinSkew}deg)`,
                transformOrigin: "top left",
                transition: dragging
                  ? "none"
                  : "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)",
                willChange: "transform",
                pointerEvents: revealed ? "none" : "auto",
              }}
              aria-label="Handwoven muslin covering the artisan. Drag to reveal."
              role="button"
              tabIndex={0}
            >
              <Muslin />
            </div>

            {/* Pedestal */}
            <div
              className="relative z-20 flex flex-col items-center"
              style={{ marginBottom: "0" }}
            >
              {/* Vase */}
              <div
                className="relative flex items-end justify-center"
                style={{
                  width: "min(220px, 34vw)",
                  height: "min(300px, 40vh)",
                }}
              >
                <img
                  src={meenakariImg.url}
                  alt="Hand-painted Meenakari vase on a museum pedestal"
                  className="max-h-full max-w-full object-contain"
                  style={{
                    filter: "drop-shadow(0 28px 22px rgba(31,31,31,0.22))",
                  }}
                  width={1024}
                  height={1024}
                />
              </div>
              {/* Pedestal block */}
              <div
                style={{
                  width: "min(240px, 38vw)",
                  height: "min(84px, 11vh)",
                  background:
                    "linear-gradient(180deg, #F1ECE1 0%, #E6DFD0 60%, #DAD0BC 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.7), 0 22px 34px -22px rgba(31,31,31,0.35)",
                }}
              />
              {/* Museum floor shadow */}
              <div
                aria-hidden
                className="mt-1"
                style={{
                  width: "min(300px, 46vw)",
                  height: "18px",
                  background:
                    "radial-gradient(50% 100% at 50% 0%, rgba(31,31,31,0.18) 0%, rgba(31,31,31,0) 70%)",
                }}
              />
            </div>
          </div>

          {/* Museum guidance */}
          <div
            className="pointer-events-none mt-10 flex flex-col items-center text-center"
            style={{
              opacity: revealed ? 0 : 1,
              transition: "opacity 900ms ease",
            }}
          >
            <p
              className="font-editorial"
              style={{
                fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                color: "var(--charcoal)",
              }}
            >
              Discover the maker
            </p>
            <p
              className="mt-3 font-serif"
              style={{
                fontSize: "clamp(0.9rem, 1.05vw, 1rem)",
                color: "rgba(31,31,31,0.5)",
                fontStyle: "italic",
                letterSpacing: "0.02em",
              }}
            >
              Drag the fabric to reveal the story
            </p>
          </div>

          {/* Final editorial reveal */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h1
              className="font-editorial"
              style={{
                fontSize: "clamp(2.25rem, 5.5vw, 4.75rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.012em",
                opacity: showHeadline ? 1 : 0,
                transform: showHeadline ? "translateY(0)" : "translateY(14px)",
                transition:
                  "opacity 1500ms cubic-bezier(0.22,1,0.36,1), transform 1500ms cubic-bezier(0.22,1,0.36,1)",
                color: "var(--charcoal)",
                textShadow: "0 1px 0 rgba(255,255,255,0.55)",
                maxWidth: "18ch",
              }}
            >
              Every masterpiece has a maker.
            </h1>
            <p
              className="mt-6 font-serif"
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                opacity: showSub ? 1 : 0,
                transform: showSub ? "translateY(0)" : "translateY(10px)",
                transition:
                  "opacity 1200ms cubic-bezier(0.22,1,0.36,1) 140ms, transform 1200ms cubic-bezier(0.22,1,0.36,1) 140ms",
                color: "rgba(31,31,31,0.6)",
                fontStyle: "italic",
              }}
            >
              Yet most of us only meet the masterpiece.
            </p>
          </div>

          {/* Scroll indicator */}
          <div
            className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{
              opacity: showScroll ? 1 : 0,
              transition: "opacity 1200ms ease",
            }}
          >
            <span
              className="font-serif text-[11px] uppercase tracking-[0.3em]"
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
    </main>
  );
}

function Muslin() {
  return (
    <div className="relative h-full w-full">
      {/* Base fabric — soft off-white, semi-transparent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(250,246,236,0.94) 0%, rgba(244,238,224,0.92) 55%, rgba(236,228,210,0.9) 100%)",
          boxShadow:
            "inset 0 -30px 60px -30px rgba(31,31,31,0.18), inset 0 4px 0 rgba(255,255,255,0.6)",
        }}
      />
      {/* Natural folds */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(92deg, rgba(31,31,31,0.055) 0px, rgba(31,31,31,0.055) 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 34px, rgba(31,31,31,0.09) 35px, rgba(31,31,31,0.09) 36px, rgba(255,255,255,0.015) 36px, rgba(255,255,255,0.015) 72px)",
          mixBlendMode: "multiply",
          opacity: 0.8,
        }}
      />
      {/* Fine linen weave */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(31,31,31,0.04) 0px, rgba(31,31,31,0.04) 1px, transparent 1px, transparent 3px), repeating-linear-gradient(90deg, rgba(31,31,31,0.035) 0px, rgba(31,31,31,0.035) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* Top hem / hanging line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: "rgba(31,31,31,0.22)" }}
      />
      {/* Natural bottom edge (irregular) */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-3"
        style={{
          background:
            "linear-gradient(180deg, rgba(31,31,31,0) 0%, rgba(31,31,31,0.12) 100%)",
          maskImage:
            "radial-gradient(6px 6px at 8% 0, transparent 99%, black 100%), radial-gradient(6px 6px at 22% 0, transparent 99%, black 100%), linear-gradient(black,black)",
        }}
      />
      {/* Right edge shadow for depth when drawn aside */}
      <div
        aria-hidden
        className="absolute right-0 top-0 h-full w-3"
        style={{
          background:
            "linear-gradient(270deg, rgba(31,31,31,0.25) 0%, rgba(31,31,31,0) 100%)",
        }}
      />
    </div>
  );
}
