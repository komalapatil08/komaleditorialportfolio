import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
const chapter1Room = { url: "/images/22ef9c32-meetcraft-chapter1-room.png" };
const interviewKomal = { url: "/images/46196a15-mc-interview-komal.png" };
const interviewShristy = { url: "/images/8086e6a5-mc-interview-shristy.png" };
const interviewPrashant = { url: "/images/359bbe6c-mc-interview-prashant.png" };
const surveyEvidence = { url: "/images/14745063-mc-survey.png" };
const chapter3Insight = { url: "/images/4991d803-mc-chapter3-insight.png" };
const ch7Presentation = { url: "/images/d2f58057-mc-ch7-presentation-v4.jpeg" };
const ch7Judges = { url: "/images/510b4741-mc-ch7-judges-v2.jpeg" };
const ch7Award = { url: "/images/6b02f97b-mc-ch7-award.jpeg" };
const ch7Certificate = { url: "/images/088b0425-mc-ch7-certificate.png" };
const meetcraftCoverHero = { url: "/images/cf0fbf75-meetcraft-cover-hero.png" };
const meetcraftDemo = { url: "https://komaleditorialportfolio.lovable.app/__l5e/assets-v1/d9f2db0e-ff32-4320-8a04-7ae36c2d6f26/meetcraft-demo.mp4" };
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";




export const Route = createFileRoute("/projects/meetcraft")({
  head: () => ({
    meta: [
      { title: "MeetCraft — From Conversation to Connection · Komal Patil" },
      {
        name: "description",
        content:
          "A documentary on rethinking networking — the research, the trade-offs, and the product that came from asking better questions.",
      },
      {
        property: "og:title",
        content: "MeetCraft — From Conversation to Connection",
      },
      {
        property: "og:description",
        content:
          "An editorial case study on intent-based networking, by Komal Patil.",
      },
      { property: "og:type", content: "article" },
    ],
  }),
  component: MeetCraftPage,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-hero]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (e.target.hasAttribute("data-reveal-hero")) {
              e.target.classList.add("reveal-hero-visible");
            } else {
              e.target.classList.add("reveal-visible");
            }
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ————————————————————————————————————————————————————————
   Shared editorial primitives — reused across all chapters.
   ———————————————————————————————————————————————————————— */

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
        <Link
          to="/"
          className="font-serif text-[1.35rem] tracking-tight text-foreground"
          aria-label="Komal Patil — home"
        >
          Komal Patil
        </Link>
        <nav className="flex items-center gap-7 md:gap-10">
          <Link
            to="/projects"
            className="story-link text-[13px] tracking-wide text-foreground/80"
          >
            All Projects
          </Link>
          <Link
            to="/"
            hash="connect"
            className="story-link text-[13px] tracking-wide text-foreground/80"
          >
            Let's Connect
          </Link>
          <Link
            to="/"
            className="story-link text-[13px] tracking-wide text-foreground/80"
          >
            ← Home
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-28 border-t border-border">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-10 text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:px-12">
        <span>© {new Date().getFullYear()} Komal Patil</span>
        <Link to="/" className="story-link normal-case tracking-wide">
          Back to home
        </Link>
      </div>
    </footer>
  );
}

/* Documentary-style image placeholder — no cropping, just breathing room. */
function ImagePlaceholder({
  ratio = "aspect-[3/2]",
  caption,
  label = "Photograph",
}: {
  ratio?: string;
  caption?: string;
  label?: string;
}) {
  return (
    <figure data-reveal className="reveal">
      <div
        className={`${ratio} w-full border border-border bg-[oklch(0.955_0.012_82)] flex items-center justify-center`}
      >
        <span className="text-[10.5px] uppercase tracking-[0.3em] text-muted-foreground">
          {label}
        </span>
      </div>
      {caption && (
        <figcaption className="mt-4 max-w-[52ch] text-[12px] leading-[1.6] tracking-wide text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function ChapterHeader({
  number,
  eyebrow,
  title,
}: {
  number: string;
  eyebrow?: string;
  title: string;
}) {
  return (
    <div data-reveal className="reveal mb-14 md:mb-20">
      <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        Chapter {number}
        {eyebrow ? ` · ${eyebrow}` : ""}
      </p>
      <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
        {title}
      </h2>
      <div className="mt-8 h-px w-16 bg-[var(--gold)]" />
    </div>
  );
}

function PullQuote({ children, attribution }: { children: React.ReactNode; attribution?: string }) {
  return (
    <blockquote
      data-reveal
      className="reveal mx-auto max-w-[26ch] py-8 text-center md:py-12"
    >
      <p className="font-editorial text-3xl italic leading-[1.2] tracking-tight text-charcoal md:text-[2.75rem]">
        "{children}"
      </p>
      {attribution && (
        <footer className="mt-6 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          — {attribution}
        </footer>
      )}
    </blockquote>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p
      data-reveal
      className="reveal max-w-[58ch] font-editorial text-[1.15rem] leading-[1.7] tracking-[-0.003em] text-foreground/80 md:text-[1.25rem]"
    >
      {children}
    </p>
  );
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto max-w-[1400px] px-6 md:px-12 ${className}`}>
      {children}
    </div>
  );
}

function DonutChart({ value }: { value: number }) {
  const size = 132;
  const stroke = 16;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="oklch(0.42 0.05 155)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--gold)"
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${c - dash}`}
        strokeLinecap="butt"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />

      <text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="font-serif"
        style={{ fontSize: 24, fill: "currentColor", fontWeight: 500 }}
      >
        {value}%
      </text>
    </svg>
  );
}

/* ————————————————————————————————————————————————————————
   Chapter 6 — Journey visualisation
   ———————————————————————————————————————————————————————— */

type Tone = "neutral" | "warn" | "danger" | "accent" | "success";

const toneStyles: Record<Tone, string> = {
  neutral:
    "border-border bg-white text-foreground/80",
  warn:
    "border-[#EED9C4] bg-[#FBF3E9] text-[#8A5A2B]",
  danger:
    "border-[#E4B4B4] bg-[#FBEDED] text-[#B54848]",
  accent:
    "border-[#B8D8E4] bg-white text-[#1F3A48] shadow-[0_0_0_1px_rgba(76,175,203,0.15),0_14px_36px_-14px_rgba(42,107,130,0.45)]",
  success:
    "border-[#B4DCC4] bg-[#EDF7F1] text-[#2F7A4F]",
};

function JourneyStep({
  icon,
  label,
  tone = "neutral",
  size = "md",
  emphasis = false,
  step,
}: {
  icon: string;
  label: string;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  emphasis?: boolean;
  step?: number;
}) {
  const pad =
    size === "lg" ? "px-5 py-4" : size === "sm" ? "px-3.5 py-2.5" : "px-4 py-3";
  const text =
    size === "lg" ? "text-[14px]" : size === "sm" ? "text-[12px]" : "text-[13px]";
  return (
    <div className="relative w-full">
      {step !== undefined && (
        <span
          className="absolute -left-3 top-1/2 hidden -translate-y-1/2 select-none font-serif text-[11px] italic text-foreground/30 md:block"
          aria-hidden
        >
          {String(step).padStart(2, "0")}
        </span>
      )}
      <div
        className={`flex w-full items-center justify-center gap-2.5 rounded-xl border ${pad} ${text} ${toneStyles[tone]} ${
          emphasis ? "font-medium" : ""
        }`}
      >
        <span className="text-[16px] leading-none" aria-hidden>
          {icon}
        </span>
        <span className="leading-tight">{label}</span>
      </div>
    </div>
  );
}

function Connector({
  variant = "solid",
  tone = "neutral",
  flow = false,
}: {
  variant?: "solid" | "dotted";
  tone?: "neutral" | "danger" | "success" | "accent";
  flow?: boolean;
}) {
  const color =
    tone === "danger"
      ? "#D96A6A"
      : tone === "success"
      ? "#4CAF7A"
      : tone === "accent"
      ? "#4CA5C3"
      : "#C9C4BB";
  const dotColor =
    tone === "danger"
      ? "#D96A6A"
      : tone === "success"
      ? "#4CAF7A"
      : tone === "accent"
      ? "#4CA5C3"
      : "#B8B2A6";
  return (
    <div className="relative flex h-9 items-center justify-center" aria-hidden>
      <svg width="14" height="36" viewBox="0 0 14 36" className="overflow-visible">
        <line
          x1="7"
          y1="0"
          x2="7"
          y2="28"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={variant === "dotted" ? "3 4" : undefined}
          opacity={tone === "neutral" ? 0.45 : 0.8}
        >
          {flow && variant === "dotted" && (
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-14"
              dur="1.1s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <circle
          cx="7"
          cy="14"
          r="2"
          fill={dotColor}
          opacity={tone === "neutral" ? 0.35 : 0.9}
        />
        <path
          d="M 3 25 L 7 31 L 11 25"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={tone === "neutral" ? 0.55 : 0.9}
        />
      </svg>
    </div>
  );
}


function JourneyDecor({ tone }: { tone: "danger" | "success" }) {
  const c = tone === "danger" ? "#D96A6A" : "#4CAF7A";
  return (
    <>
      {/* Dotted grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[24px] opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(31,31,31,0.08) 1px, transparent 1px)`,
          backgroundSize: "14px 14px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, black 40%, transparent 85%)",
        }}
      />
      {/* Corner accent glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-[0.14]"
        style={{
          background: `radial-gradient(closest-side, ${c}, transparent 70%)`,
        }}
      />
      {/* Vertical hairline spine */}
      <div
        className="pointer-events-none absolute inset-y-24 left-1/2 hidden w-px -translate-x-1/2 md:block"
        style={{
          background: `linear-gradient(to bottom, transparent, ${c}22 12%, ${c}22 88%, transparent)`,
        }}
      />
    </>
  );
}

function OutcomeBar({
  tone,
  icon,
  label,
}: {
  tone: "danger" | "success";
  icon: string;
  label: string;
}) {
  const cls =
    tone === "danger"
      ? "border-[#E4B4B4] bg-gradient-to-br from-[#FBEDED] to-[#F7DADA] text-[#B54848]"
      : "border-[#B4DCC4] bg-gradient-to-br from-[#EDF7F1] to-[#D7EEE0] text-[#2F7A4F]";
  return (
    <div
      className={`relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl border px-5 py-4 text-[14px] font-medium ${cls}`}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            tone === "danger"
              ? "radial-gradient(circle at 20% 50%, rgba(217,106,106,0.18), transparent 60%)"
              : "radial-gradient(circle at 20% 50%, rgba(76,175,122,0.2), transparent 60%)",
        }}
        aria-hidden
      />
      <span className="relative text-[18px]" aria-hidden>
        {icon}
      </span>
      <span className="relative leading-tight">{label}</span>
    </div>
  );
}

function JourneyBefore() {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-border bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_10px_30px_-14px_rgba(0,0,0,0.08)] md:p-9">
      <JourneyDecor tone="danger" />
      <div className="relative flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E4B4B4] bg-[#FBEDED]/60 px-3 py-1 text-[10.5px] uppercase tracking-[0.3em] text-[#B54848]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D96A6A]" />
          Before · Without constraints
        </div>
      </div>
      <h3 className="relative mt-4 text-center font-serif text-2xl leading-[1.2] text-foreground md:text-[26px]">
        Unlimited networking before the event
      </h3>

      <div className="relative mt-8 flex flex-col items-stretch">
        <JourneyStep icon="👀" label="Browse Attendees" step={1} />
        <Connector />
        <JourneyStep icon="❤️" label="Match" step={2} />
        <Connector />
        <JourneyStep icon="🤝" label="Connect" step={3} />
        <Connector />
        <JourneyStep icon="💬" label="Unlimited Chat" tone="warn" step={4} />
        <Connector tone="danger" />
        <JourneyStep icon="🏠" label="Skip the Event" tone="danger" emphasis step={5} />
        <Connector tone="danger" />
        <OutcomeBar tone="danger" icon="📉" label="Lower Event Value" />
      </div>
    </div>
  );
}

function QRCheckpoint() {
  return (
    <div className="relative my-3 flex justify-center">
      {/* Outer halo */}
      <div
        className="animate-qr-halo pointer-events-none absolute inset-0 -m-8 rounded-[36px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(76,165,195,0.5), rgba(76,165,195,0) 70%)",
          filter: "blur(14px)",
        }}
      />
      {/* Corner brackets */}
      <div className="pointer-events-none absolute inset-0 -m-1.5">
        {[
          "left-0 top-0 border-l border-t rounded-tl-lg",
          "right-0 top-0 border-r border-t rounded-tr-lg",
          "left-0 bottom-0 border-l border-b rounded-bl-lg",
          "right-0 bottom-0 border-r border-b rounded-br-lg",
        ].map((p, i) => (
          <span
            key={i}
            className={`absolute h-3 w-3 border-[#4CA5C3]/70 ${p}`}
          />
        ))}
      </div>
      <div
        className={`relative w-full max-w-[320px] overflow-hidden rounded-2xl border p-5 ${toneStyles.accent}`}
      >
        {/* Scan line */}
        <div className="pointer-events-none absolute inset-x-4 top-0 h-full overflow-hidden">
          <div
            className="animate-qr-scan h-[2px] w-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(76,165,195,0) 0%, rgba(76,165,195,0.9) 50%, rgba(76,165,195,0) 100%)",
              boxShadow: "0 0 12px 2px rgba(76,165,195,0.55)",
            }}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#B8D8E4] bg-[#F4FAFC]">
            <svg
              width="34"
              height="34"
              viewBox="0 0 42 42"
              className="text-[#2A6B82]"
              aria-hidden
            >
              <g fill="currentColor">
                <rect x="3" y="3" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="7" y="7" width="4" height="4" />
                <rect x="27" y="3" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="31" y="7" width="4" height="4" />
                <rect x="3" y="27" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="7" y="31" width="4" height="4" />
                <rect x="20" y="20" width="3" height="3" />
                <rect x="26" y="20" width="3" height="3" />
                <rect x="32" y="20" width="3" height="3" />
                <rect x="20" y="26" width="3" height="3" />
                <rect x="26" y="32" width="3" height="3" />
                <rect x="32" y="20" width="3" height="3" />
                <rect x="32" y="32" width="3" height="3" />
              </g>
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#2A6B82]/80">
              Checkpoint
            </div>
            <div className="mt-1 font-serif text-[18px] leading-[1.15] text-[#1F3A48]">
              QR Unlock
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.22em] text-[#2F7A4F]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#4CAF7A]" />
              Unlocked at the event
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function JourneyAfter() {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-border bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_40px_-16px_rgba(42,107,130,0.18)] md:p-9">
      <JourneyDecor tone="success" />
      <div className="relative flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#B4DCC4] bg-[#EDF7F1]/70 px-3 py-1 text-[10.5px] uppercase tracking-[0.3em] text-[#2F7A4F]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#4CAF7A]" />
          After · MeetCraft's Solution
        </div>
      </div>
      <h3 className="relative mt-4 text-center font-serif text-2xl leading-[1.2] text-foreground md:text-[26px]">
        Network with purpose
      </h3>

      <div className="relative mt-8 flex flex-col items-stretch">
        <JourneyStep icon="👀" label="Browse Attendees" step={1} />
        <Connector />
        <JourneyStep icon="❤️" label="Match" step={2} />
        <Connector />
        <JourneyStep icon="🤝" label="Connect" step={3} />
        <Connector variant="dotted" flow />
        <JourneyStep icon="💬" label="10-Minute Chat" step={4} />
        <Connector variant="dotted" tone="accent" flow />

        <QRCheckpoint />

        <Connector tone="success" />
        <JourneyStep icon="💬" label="Continue Conversation" tone="success" step={5} />
        <Connector tone="success" />
        <JourneyStep icon="🤝" label="Meet at the Event" tone="success" emphasis step={6} />
        <Connector tone="success" />
        <OutcomeBar tone="success" icon="📈" label="Higher Event Value" />
      </div>
    </div>
  );
}


/* ————————————————————————————————————————————————————————
   Chapter 7 — From Concept to Recognition
   ———————————————————————————————————————————————————————— */

function ChapterSeven() {
  const [open, setOpen] = useState(false);

  return (
    <section className="pt-32 md:pt-40">
      <Container>
        {/* Block 1 — Heading */}
        <div data-reveal className="reveal mx-auto max-w-[820px] text-center">
          <p className="text-[10.5px] uppercase tracking-[0.32em] text-muted-foreground">
            Chapter Seven · Recognition
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl">
            From Concept to Recognition.
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-[15px] leading-[1.7] text-foreground/65 md:text-base">
            Every interview, insight, product decision, and trade-off led to one
            defining moment — presenting MeetCraft at the VPD Skillathon.
          </p>
        </div>

        {/* Block 2 — Editorial Story Gallery */}
        <div className="mx-auto mt-16 grid max-w-[1120px] grid-cols-6 items-start gap-4 md:mt-20 md:gap-6">
          <figure
            data-reveal
            className="reveal group col-span-6 overflow-hidden rounded-[20px] border border-black/[0.08] bg-white shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-out md:hover:-translate-y-1"
            style={{ transitionDelay: "0ms" }}
          >
            <div className="w-full overflow-hidden bg-[#F5F3EE]" style={{ aspectRatio: "867 / 567" }}>
              <img
                src={ch7Presentation.url}
                alt="Komal presenting the MeetCraft value proposition on stage at the VPD Skillathon"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>

          </figure>


          <figure
            data-reveal
            className="reveal group col-span-6 overflow-hidden rounded-[20px] border border-black/[0.08] bg-[#F5F3EE] shadow-[0_16px_40px_-25px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-out md:col-span-3 md:hover:-translate-y-1"
            style={{ transitionDelay: "120ms" }}
          >
            <div className="aspect-[4/3] w-full overflow-hidden">

              <img
                src={ch7Judges.url}
                alt="Defending product decisions during the judge Q&A"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"

                loading="lazy"
              />
            </div>
            <figcaption className="border-t border-black/[0.06] bg-white px-5 py-3 text-[10.5px] uppercase tracking-[0.28em] text-muted-foreground">
              Judge Q&amp;A
            </figcaption>
          </figure>

          <figure
            data-reveal
            className="reveal group col-span-6 overflow-hidden rounded-[20px] border border-black/[0.08] bg-[#F5F3EE] shadow-[0_16px_40px_-25px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-out md:col-span-3 md:hover:-translate-y-1"
            style={{ transitionDelay: "220ms" }}
          >
            <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden">
              <img
                src={ch7Award.url}
                alt="Receiving the Skillathon Winner recognition"
                className="h-full w-full object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <figcaption className="border-t border-black/[0.06] bg-white px-5 py-3 text-[10.5px] uppercase tracking-[0.28em] text-muted-foreground">
              Award Ceremony
            </figcaption>
          </figure>

        </div>

        {/* Block 3 — Recognition Proof */}
        <div
          data-reveal
          className="reveal mx-auto mt-14 max-w-[720px] md:mt-20"
        >
          <div className="overflow-hidden rounded-[20px] border border-black/[0.08] bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.22)]">
            <div className="flex items-center gap-3 border-b border-black/[0.06] px-6 py-4">
              <span aria-hidden className="text-lg">🏆</span>
              <p className="text-[10.5px] uppercase tracking-[0.3em] text-muted-foreground">
                Recognition
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-5 md:gap-10 md:p-8">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="group md:col-span-3 overflow-hidden rounded-[12px] border border-black/[0.08] bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    aria-label="View full certificate"
                  >
                    <img
                      src={ch7Certificate.url}
                      alt="Certificate of Recognition — Skillathon Winner for Value Proposition and Digital Business Models"
                      className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                      loading="lazy"
                    />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl border-none bg-white p-2 sm:p-4">
                  <img
                    src={ch7Certificate.url}
                    alt="Certificate of Recognition — Skillathon Winner for Value Proposition and Digital Business Models"
                    className="h-auto w-full rounded-md"
                  />
                </DialogContent>
              </Dialog>

              <div className="md:col-span-2 flex flex-col justify-center">
                <p className="font-serif text-2xl not-italic leading-[1.15] text-foreground md:text-3xl" style={{ fontStyle: "normal" }}>
                  Winner
                </p>
                <p className="mt-1 text-[13px] uppercase tracking-[0.22em] text-foreground/70">
                  VPD Skillathon
                </p>
                <p className="mt-5 max-w-[32ch] text-[14px] leading-[1.65] text-foreground/65">
                  Recognized for product thinking, business strategy, and
                  execution.
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-foreground/15 px-5 py-2.5 text-[12px] uppercase tracking-[0.22em] text-foreground transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  View Certificate
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Block 4 — Closing Statement */}
        <div
          data-reveal
          className="reveal mx-auto mt-20 max-w-[680px] text-center md:mt-28"
        >
          <p className="font-serif text-2xl leading-[1.4] text-foreground/70 md:text-3xl" style={{ fontStyle: "normal" }}>
            Winning wasn't just recognition.
          </p>
          <p className="mt-3 font-serif text-2xl font-medium leading-[1.4] text-foreground md:text-3xl" style={{ fontStyle: "normal" }}>
            It validated the way we approached product thinking.
          </p>
          <div className="mt-14 flex justify-center" aria-hidden>
            <svg
              className="animate-arrow-pulse text-foreground/40"
              width="22"
              height="34"
              viewBox="0 0 22 34"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 2 V30" />
              <path d="M3 22 L11 30 L19 22" />
            </svg>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ————————————————————————————————————————————————————————
   Page
   ———————————————————————————————————————————————————————— */





function MeetCraftPage() {
  useReveal();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* HERO ————————————————————————————————————————————————— */}
      <section id="top" className="relative pt-40 md:pt-48 pb-16">
        <Container>
          <div data-reveal className="reveal">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Case Study · Product Strategy · 2025
            </p>
            <h1 className="mt-8 font-serif text-6xl leading-[0.98] tracking-[-0.02em] md:text-[9rem]">
              MeetCraft
            </h1>
            <p className="mt-8 font-editorial text-2xl italic leading-[1.2] tracking-tight text-foreground/80 md:text-4xl">
              From Conversation to Connection.
            </p>
            <p className="mt-6 text-[13px] tracking-wide text-foreground/50">
              Product Strategy · 12 Weeks · Four PMs
            </p>
            <a
              href="https://meet-craft.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open MeetCraft Live Prototype in a new tab"
              className="mt-8 inline-flex items-center gap-1.5 text-[16px] font-medium text-[var(--gold)] transition-all duration-200 hover:underline hover:-translate-y-0.5"
            >
              🔗 Try the Live Prototype <span aria-hidden className="text-[12px]">↗</span>
            </a>
          </div>

          {/* Cover hero image */}
          <div data-reveal-hero className="reveal-hero mt-8 md:mt-10">
            <div className="mx-auto max-w-[1200px]">
              <img
                src={meetcraftCoverHero.url}
                alt="MeetCraft — a cinematic view of professionals networking through an intelligent connection app"
                className="w-full h-auto rounded-[22px] shadow-[0_12px_40px_-16px_rgba(0,0,0,0.18)]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* CHAPTER 1 ——————————————————————————————————————————— */}
      <section className="pt-0 pb-16 md:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-14 md:grid-cols-[5fr_8fr] md:gap-16 lg:gap-20 items-center">
            {/* Left column — text (~38%) */}
            <div>
              <div data-reveal className="reveal">
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Chapter One · Beginnings
                </p>
                <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                  We Walked Into the Room.
                </h2>
                <div className="mt-8 h-px w-12 bg-[var(--gold)]" />
                <p className="mt-10 max-w-[32ch] font-editorial text-[1.05rem] leading-[1.58] tracking-[-0.003em] text-foreground/75 md:text-[1.1rem]">
                  <span className="font-medium text-foreground/95">We came expecting conversations.</span><br />
                  Instead, we noticed hesitation.<br />
                  We weren't the only ones wondering who to approach.<br />
                  <span className="italic font-semibold text-foreground/90">That's where the story began.</span>
                </p>
              </div>
            </div>

            {/* Right column — image (~62%) */}
            <div>
              <div
                data-reveal
                className="reveal"
                style={{ transitionDelay: "160ms" }}
              >
                <img
                  src={chapter1Room.url}
                  alt="A room of attendees standing in quiet hesitation at the start of a networking event."
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>


      {/* CHAPTER 2 — DISCOVERY ————————————————————————————————— */}
      <section className="pt-40 md:pt-56 pb-16 md:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-x-16 lg:gap-x-20">
            {/* LEFT — Research collage */}
            <div className="md:col-span-5">
              <div data-reveal className="reveal">
                <img
                  src={interviewKomal.url}
                  alt="Komal conducting an in-depth attendee interview"
                  className="w-full aspect-[4/3] rounded-2xl object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div data-reveal className="reveal" style={{ transitionDelay: "80ms" }}>
                  <img
                    src={interviewShristy.url}
                    alt="Shristy interviewing an attendee"
                    className="w-full h-auto rounded-2xl object-cover aspect-[4/5]"
                    loading="lazy"
                  />
                </div>
                <div data-reveal className="reveal" style={{ transitionDelay: "140ms" }}>
                  <img
                    src={interviewPrashant.url}
                    alt="Prashant interviewing organizers on the floor"
                    className="w-full h-auto rounded-2xl object-cover aspect-[4/5]"
                    loading="lazy"
                  />
                </div>
              </div>

              <div
                data-reveal
                className="reveal mt-8 rounded-2xl border border-border/70 bg-[oklch(0.975_0.008_82)] p-3"
                style={{ transitionDelay: "200ms" }}
              >
                <img
                  src={surveyEvidence.url}
                  alt="Snippet of the raw survey response spreadsheet used to validate interview findings"
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
              </div>

              <div
                data-reveal
                className="reveal mt-6 flex items-start gap-4"
                style={{ transitionDelay: "260ms" }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/40">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-[var(--gold)]">
                    <rect x="6" y="4" width="12" height="16" rx="2" />
                    <path d="M9 4v-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
                    <path d="M9 10h6M9 14h6M9 18h4" />
                  </svg>
                </div>
                <p className="text-[12.5px] leading-[1.7] text-foreground/70">
                  <span className="font-semibold text-foreground">10+ In-depth Interviews</span> ·{" "}
                  <span className="font-semibold text-foreground">20+ Survey Responses</span>
                  <br />
                  We combined qualitative interviews with quantitative survey data to validate our observations.
                </p>
              </div>
            </div>

            {/* RIGHT — Heading + body */}
            <div className="md:col-span-7">
              <div data-reveal className="reveal">
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Chapter Two · Discovery
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[1.15fr_1fr] md:gap-12">
                <div data-reveal className="reveal" style={{ transitionDelay: "80ms" }}>
                  <h2 className="font-serif text-5xl leading-[1.02] tracking-[-0.015em] md:text-[4.25rem]">
                    We Stopped<br />Guessing.
                  </h2>
                </div>
                <div
                  data-reveal
                  className="reveal border-l border-border/70 pl-6 md:pl-8"
                  style={{ transitionDelay: "160ms" }}
                >
                  <p className="text-[1rem] leading-[1.7] text-foreground/80 md:text-[1.05rem]">
                    Observation wasn't enough.
                  </p>
                  <p className="mt-3 text-[1.05rem] font-semibold leading-[1.6] text-[var(--gold)] md:text-[1.1rem]">
                    So we started listening.
                  </p>
                  <p className="mt-5 text-[1rem] leading-[1.7] text-foreground/75 md:text-[1.05rem]">
                    We spoke to attendees, organizers, and speakers—not about solutions, but about their experiences.
                  </p>
                  <p className="mt-5 text-[1rem] font-semibold leading-[1.7] text-foreground md:text-[1.05rem]">
                    The same patterns kept resurfacing.
                  </p>
                </div>
              </div>

              {/* Research Dashboard */}
              <div
                data-reveal
                className="reveal mt-14 rounded-3xl border border-border/70 bg-[oklch(0.975_0.008_82)] p-6 md:p-10 shadow-[0_20px_50px_-30px_rgba(31,31,31,0.18)]"
                style={{ transitionDelay: "200ms" }}
              >
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 md:divide-x md:divide-border/60">
                  {/* Card 1 — Donut */}
                  <div className="md:pr-6">
                    <h3 className="text-center font-serif text-[1.05rem] leading-[1.3] text-foreground md:text-[1.1rem]">
                      Only 23% Met<br />the Right People
                    </h3>
                    <div className="mt-6 flex items-center justify-center">
                      <DonutChart value={23} />
                    </div>
                    <p className="mt-6 text-center text-[12.5px] leading-[1.6] text-foreground/70">
                      <span className="font-semibold text-[var(--gold)]">77%</span> left without meeting someone valuable.
                    </p>
                  </div>

                  {/* Card 2 — Bars */}
                  <div className="md:px-6">
                    <h3 className="text-center font-serif text-[1.05rem] text-foreground md:text-[1.1rem]">
                      Top Challenges Faced
                    </h3>
                    <ul className="mt-6 space-y-5">
                      {[
                        {
                          label: "Didn't know who to approach",
                          value: 82,
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                              <circle cx="9" cy="8" r="3" />
                              <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                              <circle cx="17" cy="7" r="2" />
                              <path d="M15 13c2.5 0 4 1.8 4 4" />
                            </svg>
                          ),
                        },
                        {
                          label: "Conversations felt random",
                          value: 74,
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                              <path d="M4 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
                            </svg>
                          ),
                        },
                        {
                          label: "Couldn't find relevant people",
                          value: 65,
                          icon: (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                              <circle cx="11" cy="11" r="6" />
                              <path d="m20 20-4.5-4.5" />
                            </svg>
                          ),
                        },
                      ].map((row) => (
                        <li key={row.label}>
                          <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background text-foreground/70 border border-border/60">
                              {row.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-baseline justify-between gap-3">
                                <p className="text-[12.5px] leading-[1.35] text-foreground/85">
                                  {row.label}
                                </p>
                                <span className="text-[12px] font-semibold text-foreground tabular-nums">
                                  {row.value}%
                                </span>
                              </div>
                              <div className="mt-2 h-[6px] w-full overflow-hidden rounded-full bg-border/50">
                                <div
                                  className="h-full rounded-full bg-[var(--gold)]"
                                  style={{ width: `${row.value}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card 3 — Organizers */}
                  <div className="md:pl-6">
                    <h3 className="text-center font-serif text-[1.05rem] leading-[1.3] text-foreground md:text-[1.1rem]">
                      Organizers Saw<br />the Same Pattern
                    </h3>
                    <div className="mt-6 flex flex-col items-center rounded-2xl border border-border/60 bg-background/60 px-4 py-6">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7 text-foreground/70">
                        <circle cx="9" cy="8" r="3" />
                        <circle cx="17" cy="9" r="2.4" />
                        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                        <path d="M15 14c2.6 0 4.5 1.8 4.5 4" />
                      </svg>
                      <p className="mt-4 font-serif text-3xl leading-none tracking-tight text-[var(--gold)] md:text-[2rem]">
                        7 <span className="text-foreground/80 text-[1rem] font-sans font-normal">out of</span> 10
                      </p>
                      <p className="mt-4 text-center text-[12.5px] leading-[1.6] text-foreground/70">
                        organizers felt attendees weren't making meaningful connections.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom insight card */}
              <div
                data-reveal
                className="reveal mt-6 flex items-center gap-5 rounded-3xl border border-border/70 bg-[oklch(0.965_0.012_82)] p-6 md:gap-8 md:p-8"
                style={{ transitionDelay: "260ms" }}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-foreground text-background md:h-16 md:w-16">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6 md:h-7 md:w-7">
                    <path d="M9 18h6M10 21h4" />
                    <path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1.2 1.5 1.4 2.5h5.2c.2-1 .6-1.7 1.4-2.5A6 6 0 0 0 12 3z" />
                  </svg>
                </div>
                <p className="font-serif text-2xl leading-[1.2] tracking-tight text-foreground md:text-[1.9rem]">
                  Every conversation pointed in the{" "}
                  <span className="text-[var(--gold)]">same direction.</span>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>


      {/* CHAPTER 3 — INSIGHT ————————————————————————————————— */}
      <section className="pt-40 md:pt-56 pb-16 md:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-14 md:grid-cols-[5fr_7fr] md:gap-16 lg:gap-20 items-start">
            {/* Left column — text (~42%) */}
            <div>
              <div data-reveal className="reveal">
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Chapter Three · Insight
                </p>
                <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                  The Moment Everything Changed
                </h2>
                <div className="mt-8 h-px w-12 bg-[var(--gold)]" />
                <p className="mt-10 max-w-[32ch] font-editorial text-[1.05rem] leading-[1.58] tracking-[-0.003em] text-foreground/75 md:text-[1.1rem]">
                  <span className="font-medium text-foreground/95">One conversation changed everything.</span><br />
                  We met a student searching for mentors to build his sustainability startup.<br />
                  He knew what he was looking for.<br />
                  He just didn't know who to approach.<br />
                  That single conversation made us realize—<br />
                  <span className="italic font-semibold text-foreground/90">Networking wasn't broken. Finding the right people was.</span>
                </p>
              </div>
            </div>

            {/* Right column — image (~58%) */}
            <div>
              <div
                data-reveal
                className="reveal"
                style={{ transitionDelay: "160ms" }}
              >
                <img
                  src={chapter3Insight.url}
                  alt="A student with a notebook, pausing at the edge of a networking event, searching for someone to approach while others converse around him."
                  className="w-full h-auto rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CHAPTER 4 — The Product We Chose to Build ————————————— */}
      <section className="overflow-hidden bg-background">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">

          {/* Block 1 — Hero */}
          <div className="grid grid-cols-1 items-center gap-10 pt-20 md:grid-cols-2 md:gap-12 md:pt-24">
            {/* Left — Text */}
            <div data-reveal className="reveal">
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                Chapter Four · Product
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight md:text-[2.75rem] lg:text-5xl">
                The Product We Chose to Build
              </h2>
              <div className="mt-5 max-w-[480px] space-y-1">
                <p className="text-[0.95rem] leading-[1.65] text-foreground/75 md:text-[1rem]">
                  The insight was clear.
                </p>
                <p className="text-[0.95rem] leading-[1.65] text-foreground/75 md:text-[1rem]">
                  People didn't need more networking opportunities.
                </p>
                <p className="text-[0.95rem] leading-[1.65] text-foreground/75 md:text-[1rem]">
                  They needed a better way to discover the right people.
                </p>
                <p className="text-[0.95rem] leading-[1.65] text-foreground/75 md:text-[1rem]">
                  That's how MeetCraft was born.
                </p>
              </div>
            </div>

            {/* Right — Phone Mockup */}
            <div data-reveal className="reveal flex justify-center md:justify-end" style={{ transitionDelay: "120ms" }}>
              <div className="animate-float-gentle">
                <div className="relative mx-auto w-[200px] rounded-[30px] border border-border/60 bg-charcoal p-1.5 shadow-[0_24px_64px_-20px_rgba(31,31,31,0.3)] md:w-[240px]">
                  <div className="absolute left-1/2 top-1.5 h-[18px] w-[70px] -translate-x-1/2 rounded-full bg-charcoal" />
                  <div className="aspect-[9/19] w-full overflow-hidden rounded-[22px] bg-charcoal">
                    <video
                      src={meetcraftDemo.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 2 — Product Introduction */}
          <div className="mx-auto max-w-[600px] pt-10 text-center md:pt-12">
            <div data-reveal className="reveal">
              <h3 className="font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl">
                MeetCraft
              </h3>
              <p className="mx-auto mt-4 max-w-[540px] text-[0.95rem] leading-[1.65] text-foreground/75 md:text-[1rem]">
                MeetCraft helps attendees discover relevant people before and during professional events based on their networking intent.
              </p>
              <a
                href="https://meet-craft.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open MeetCraft Live Prototype in a new tab"
                className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--gold)] transition-all duration-200 hover:underline hover:-translate-y-0.5"
              >
                🔗 Try the Live Prototype <span aria-hidden className="text-[12px]">↗</span>
              </a>
            </div>
          </div>

          {/* Block 3 — How MeetCraft Works */}
          <div className="mx-auto w-full max-w-[1080px] pt-3 md:pt-5">
            <div data-reveal className="reveal text-center">
              <h3 className="font-serif text-[1.85rem] leading-[1.1] tracking-tight md:text-[2.15rem]">
                How MeetCraft Works
              </h3>
            </div>

            <div className="mt-7 md:mt-9">
              {/* Desktop — horizontal workflow */}
              <div className="hidden md:flex items-start justify-between">
                {/* Step 1 — Define Intent */}
                <div data-reveal className="reveal group flex shrink-0 flex-col items-center text-center" style={{ transitionDelay: "0ms" }}>
                  <div className="relative">
                    <div className="pointer-events-none absolute -inset-5 rounded-full blur-2xl opacity-30 transition-opacity duration-200 group-hover:opacity-50" style={{ background: "radial-gradient(circle, rgba(200,154,75,0.16), transparent 70%)" }} aria-hidden />
                    <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full border border-[#D8D3CA] transition-all duration-200 group-hover:-translate-y-[2px] group-hover:border-[#A9A39A] group-hover:shadow-[0_8px_24px_-8px_rgba(31,31,31,0.12)]" style={{ background: "rgba(200,154,75,0.13)" }}>
                      <div className="transition-[filter] duration-200 group-hover:brightness-110" style={{ color: "#C89A4B" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="4" />
                          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 max-w-[14ch] text-[1.05rem] font-medium leading-[1.35] text-foreground">
                    Define Intent
                  </p>
                </div>

                {/* Arrow 1 */}
                <div data-reveal className="reveal flex flex-1 items-start justify-center pt-[34px]" style={{ transitionDelay: "180ms" }}>
                  <svg width="44" height="20" viewBox="0 0 44 20" fill="none" className="text-[#7A756C]">
                    <path d="M0 10H38M34 4L40 10L34 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Step 2 — Discover Relevant People */}
                <div data-reveal className="reveal group flex shrink-0 flex-col items-center text-center" style={{ transitionDelay: "360ms" }}>
                  <div className="relative">
                    <div className="pointer-events-none absolute -inset-5 rounded-full blur-2xl opacity-30 transition-opacity duration-200 group-hover:opacity-50" style={{ background: "radial-gradient(circle, rgba(127,175,139,0.16), transparent 70%)" }} aria-hidden />
                    <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full border border-[#D8D3CA] transition-all duration-200 group-hover:-translate-y-[2px] group-hover:border-[#A9A39A] group-hover:shadow-[0_8px_24px_-8px_rgba(31,31,31,0.12)]" style={{ background: "rgba(127,175,139,0.13)" }}>
                      <div className="transition-[filter] duration-200 group-hover:brightness-110" style={{ color: "#7FAF8B" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9">
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.5-4.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 max-w-[18ch] text-[1.05rem] font-medium leading-[1.35] text-foreground">
                    Discover Relevant People
                  </p>
                </div>

                {/* Arrow 2 */}
                <div data-reveal className="reveal flex flex-1 items-start justify-center pt-[34px]" style={{ transitionDelay: "540ms" }}>
                  <svg width="44" height="20" viewBox="0 0 44 20" fill="none" className="text-[#7A756C]">
                    <path d="M0 10H38M34 4L40 10L34 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Step 3 — Connect at the Event */}
                <div data-reveal className="reveal group flex shrink-0 flex-col items-center text-center" style={{ transitionDelay: "720ms" }}>
                  <div className="relative">
                    <div className="pointer-events-none absolute -inset-5 rounded-full blur-2xl opacity-30 transition-opacity duration-200 group-hover:opacity-50" style={{ background: "radial-gradient(circle, rgba(126,152,200,0.16), transparent 70%)" }} aria-hidden />
                    <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full border border-[#D8D3CA] transition-all duration-200 group-hover:-translate-y-[2px] group-hover:border-[#A9A39A] group-hover:shadow-[0_8px_24px_-8px_rgba(31,31,31,0.12)]" style={{ background: "rgba(126,152,200,0.13)" }}>
                      <div className="transition-[filter] duration-200 group-hover:brightness-110" style={{ color: "#7E98C8" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 max-w-[16ch] text-[1.05rem] font-medium leading-[1.35] text-foreground">
                    Connect at the Event
                  </p>
                </div>

                {/* Arrow 3 */}
                <div data-reveal className="reveal flex flex-1 items-start justify-center pt-[34px]" style={{ transitionDelay: "900ms" }}>
                  <svg width="44" height="20" viewBox="0 0 44 20" fill="none" className="text-[#7A756C]">
                    <path d="M0 10H38M34 4L40 10L34 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Step 4 — Build Meaningful Relationships */}
                <div data-reveal className="reveal group flex shrink-0 flex-col items-center text-center" style={{ transitionDelay: "1080ms" }}>
                  <div className="relative">
                    <div className="pointer-events-none absolute -inset-5 rounded-full blur-2xl opacity-30 transition-opacity duration-200 group-hover:opacity-50" style={{ background: "radial-gradient(circle, rgba(201,138,115,0.16), transparent 70%)" }} aria-hidden />
                    <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full border border-[#D8D3CA] transition-all duration-200 group-hover:-translate-y-[2px] group-hover:border-[#A9A39A] group-hover:shadow-[0_8px_24px_-8px_rgba(31,31,31,0.12)]" style={{ background: "rgba(201,138,115,0.13)" }}>
                      <div className="transition-[filter] duration-200 group-hover:brightness-110" style={{ color: "#C98A73" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 max-w-[20ch] text-[1.05rem] font-medium leading-[1.35] text-foreground">
                    Build Meaningful Relationships
                  </p>
                </div>
              </div>

              {/* Mobile — vertical workflow */}
              <div className="flex md:hidden flex-col items-center gap-2">
                {/* Step 1 */}
                <div data-reveal className="reveal group flex flex-col items-center text-center" style={{ transitionDelay: "0ms" }}>
                  <div className="relative">
                    <div className="pointer-events-none absolute -inset-5 rounded-full blur-2xl opacity-30 transition-opacity duration-200 group-hover:opacity-50" style={{ background: "radial-gradient(circle, rgba(200,154,75,0.16), transparent 70%)" }} aria-hidden />
                    <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full border border-[#D8D3CA] transition-all duration-200 group-hover:-translate-y-[2px] group-hover:border-[#A9A39A] group-hover:shadow-[0_8px_24px_-8px_rgba(31,31,31,0.12)]" style={{ background: "rgba(200,154,75,0.13)" }}>
                      <div className="transition-[filter] duration-200 group-hover:brightness-110" style={{ color: "#C89A4B" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="4" />
                          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 text-[1.05rem] font-medium leading-[1.35] text-foreground">Define Intent</p>
                </div>

                {/* Arrow 1 */}
                <div data-reveal className="reveal flex justify-center py-3" style={{ transitionDelay: "180ms" }}>
                  <svg width="20" height="32" viewBox="0 0 20 32" fill="none" className="text-[#7A756C]">
                    <path d="M10 4V26M4 20L10 26L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Step 2 */}
                <div data-reveal className="reveal group flex flex-col items-center text-center" style={{ transitionDelay: "360ms" }}>
                  <div className="relative">
                    <div className="pointer-events-none absolute -inset-5 rounded-full blur-2xl opacity-30 transition-opacity duration-200 group-hover:opacity-50" style={{ background: "radial-gradient(circle, rgba(127,175,139,0.16), transparent 70%)" }} aria-hidden />
                    <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full border border-[#D8D3CA] transition-all duration-200 group-hover:-translate-y-[2px] group-hover:border-[#A9A39A] group-hover:shadow-[0_8px_24px_-8px_rgba(31,31,31,0.12)]" style={{ background: "rgba(127,175,139,0.13)" }}>
                      <div className="transition-[filter] duration-200 group-hover:brightness-110" style={{ color: "#7FAF8B" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9">
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.5-4.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 text-[1.05rem] font-medium leading-[1.35] text-foreground">Discover Relevant People</p>
                </div>

                {/* Arrow 2 */}
                <div data-reveal className="reveal flex justify-center py-3" style={{ transitionDelay: "540ms" }}>
                  <svg width="20" height="32" viewBox="0 0 20 32" fill="none" className="text-[#7A756C]">
                    <path d="M10 4V26M4 20L10 26L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Step 3 */}
                <div data-reveal className="reveal group flex flex-col items-center text-center" style={{ transitionDelay: "720ms" }}>
                  <div className="relative">
                    <div className="pointer-events-none absolute -inset-5 rounded-full blur-2xl opacity-30 transition-opacity duration-200 group-hover:opacity-50" style={{ background: "radial-gradient(circle, rgba(126,152,200,0.16), transparent 70%)" }} aria-hidden />
                    <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full border border-[#D8D3CA] transition-all duration-200 group-hover:-translate-y-[2px] group-hover:border-[#A9A39A] group-hover:shadow-[0_8px_24px_-8px_rgba(31,31,31,0.12)]" style={{ background: "rgba(126,152,200,0.13)" }}>
                      <div className="transition-[filter] duration-200 group-hover:brightness-110" style={{ color: "#7E98C8" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 text-[1.05rem] font-medium leading-[1.35] text-foreground">Connect at the Event</p>
                </div>

                {/* Arrow 3 */}
                <div data-reveal className="reveal flex justify-center py-3" style={{ transitionDelay: "900ms" }}>
                  <svg width="20" height="32" viewBox="0 0 20 32" fill="none" className="text-[#7A756C]">
                    <path d="M10 4V26M4 20L10 26L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Step 4 */}
                <div data-reveal className="reveal group flex flex-col items-center text-center" style={{ transitionDelay: "1080ms" }}>
                  <div className="relative">
                    <div className="pointer-events-none absolute -inset-5 rounded-full blur-2xl opacity-30 transition-opacity duration-200 group-hover:opacity-50" style={{ background: "radial-gradient(circle, rgba(201,138,115,0.16), transparent 70%)" }} aria-hidden />
                    <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full border border-[#D8D3CA] transition-all duration-200 group-hover:-translate-y-[2px] group-hover:border-[#A9A39A] group-hover:shadow-[0_8px_24px_-8px_rgba(31,31,31,0.12)]" style={{ background: "rgba(201,138,115,0.13)" }}>
                      <div className="transition-[filter] duration-200 group-hover:brightness-110" style={{ color: "#C98A73" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 text-[1.05rem] font-medium leading-[1.35] text-foreground">Build Meaningful Relationships</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transition */}
          <div className="pb-8 pt-6 text-center md:pb-10 md:pt-8">
            <div data-reveal className="reveal">
              <div className="flex justify-center">
                <svg
                  className="animate-arrow-pulse h-5 w-5 text-muted-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CHAPTER 5 ——————————————————————————————————————————— */}
      <section className="pt-40 md:pt-56 pb-16 md:pb-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">

          {/* Heading */}
          <div data-reveal className="reveal">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Chapter Five · Strategy
            </p>
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              The Customer Wasn't the User
            </h2>
            <div className="mt-8 h-px w-12 bg-[var(--gold)]" />
          </div>

          {/* Two-column layout */}
          <div className="mt-16 grid grid-cols-1 gap-16 md:mt-20 md:grid-cols-2 md:gap-20">
            {/* Left — Text */}
            <div data-reveal className="reveal" style={{ transitionDelay: "80ms" }}>
              <p className="max-w-[48ch] text-[1.05rem] leading-[1.7] text-foreground/75 md:text-[1.15rem]">
                We started by designing MeetCraft for attendees.
              </p>
              <p className="mt-5 max-w-[48ch] text-[1.05rem] leading-[1.7] text-foreground/75 md:text-[1.15rem]">
                But as we refined the product, we realized something important.
              </p>
              <p className="mt-5 max-w-[48ch] text-[1.05rem] leading-[1.7] text-foreground md:text-[1.15rem]">
                <span className="font-semibold">Attendees use MeetCraft. Event organizers pay for it.</span>
              </p>
            </div>

            {/* Right — Comparison card */}
            <div data-reveal className="reveal" style={{ transitionDelay: "160ms" }}>
              <div className="rounded-2xl border border-border bg-background p-8 shadow-[0_4px_24px_-12px_rgba(31,31,31,0.12)] md:p-10">
                <p className="text-center font-serif text-xl tracking-tight text-foreground md:text-2xl">
                  MeetCraft
                </p>
                <div className="mt-8 grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl">👥</p>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                      Users
                    </p>
                    <p className="mt-2 font-serif text-lg text-foreground md:text-xl">
                      Attendees
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl">🏢</p>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                      Customers
                    </p>
                    <p className="mt-2 font-serif text-lg text-foreground md:text-xl">
                      Organizers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom insight */}
          <div className="mt-20 text-center md:mt-24">
            <p data-reveal className="reveal mx-auto max-w-[52ch] text-[1.15rem] leading-[1.6] text-foreground/85 md:text-[1.35rem]">
              Better networking creates more valuable events—making organizers the real customer.
            </p>
          </div>

          {/* Transition */}
          <div className="mt-28 pb-8 text-center md:mt-36">
            <div data-reveal className="reveal">
              <p className="font-serif text-2xl leading-[1.2] tracking-tight text-foreground/70 md:text-3xl">
                But solving for organizers introduced a new challenge...
              </p>
              <div className="mt-10 flex justify-center">
                <svg
                  className="animate-arrow-pulse h-6 w-6 text-muted-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CHAPTER 6 ——————————————————————————————————————————— */}
      <section className="pt-40 md:pt-56">
        <Container>
          {/* Compressed header — tight spacing to the intro line */}
          <div data-reveal className="reveal">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Chapter Six · Trade-offs
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
              Protecting the Event.
            </h2>
            <div className="mt-6 h-px w-16 bg-[var(--gold)]" />
            <p className="mt-6 font-serif text-xl leading-[1.5] text-foreground/70 md:text-2xl">
              We faced a critical product trade-off.
            </p>
          </div>

          {/* Two journeys — side by side */}
          <div
            data-reveal
            className="reveal mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-10"
          >
            <JourneyBefore />
            <JourneyAfter />
          </div>

          {/* Key insight */}
          <div
            data-reveal
            className="reveal mx-auto mt-24 max-w-[760px] text-center md:mt-32"
          >
            <p className="font-serif text-2xl leading-[1.35] text-foreground/70 md:text-[2.25rem]">
              The best networking experience shouldn't happen online.
            </p>
            <p className="mt-3 font-serif text-3xl font-semibold leading-[1.25] tracking-tight text-foreground md:text-[2.75rem]">
              It should happen at the event.
            </p>
            <p className="mx-auto mt-8 max-w-[520px] text-[14px] leading-[1.7] text-muted-foreground">
              MeetCraft encourages meaningful connections early — while
              reserving full conversations for the moment people meet.
            </p>
          </div>
        </Container>
      </section>


      {/* CHAPTER 7 — From Concept to Recognition —————————————— */}
      <ChapterSeven />


      {/* CHAPTER 8 — Reflections & Learnings ————————————————— */}
      <section className="py-32 md:py-48">
        <Container>
          <div data-reveal className="reveal mx-auto max-w-[1200px] text-center">
            {/* Chapter Label */}
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Chapter Eight · Reflection
            </p>

            {/* Heading */}
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Reflections &amp; Learnings
            </h2>

            <div className="mx-auto mt-8 h-px w-16 bg-[var(--gold)]" />

            {/* Reflection */}
            <p className="mx-auto mt-14 max-w-[700px] text-[1.15rem] leading-[1.7] text-foreground/75 md:mt-16 md:text-[1.25rem]">
              Before MeetCraft, I thought product management was primarily about building solutions. This project taught me that it's really about asking better questions, understanding the ecosystem, and making thoughtful decisions long before a feature is designed.
            </p>

            {/* Closing divider */}
            <div className="mx-auto mt-20 h-px w-12 bg-border md:mt-24" />

            {/* Closing statement */}
            <p className="mt-8 text-[13px] tracking-wide text-muted-foreground md:mt-10">
              Thank you for reading the MeetCraft case study.
            </p>
          </div>
        </Container>

        <Container className="pt-32 md:pt-48">
          <div
            data-reveal
            className="reveal relative overflow-hidden border-t-2 border-b-2 border-foreground/90 bg-background py-16 md:py-24"
          >
            <p className="text-[11px] uppercase tracking-[0.4em] text-[var(--gold)]">
              Next Project
            </p>
            <Link
              to="/projects/kalavansh"
              className="group mt-4 block"
            >
              <h3 className="font-serif text-6xl leading-[0.95] tracking-tight text-foreground transition-colors duration-300 group-hover:text-[var(--gold)] md:text-[8rem]">
                KalaVansh <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-3">→</span>
              </h3>
              <p className="mt-4 font-editorial text-xl italic text-foreground/70 md:text-2xl">
                What if the maker mattered more than the object?
              </p>
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-14">
              <Link
                to="/projects/kalavansh"
                className="inline-flex items-center gap-2 bg-foreground px-8 py-4 text-[13px] font-bold uppercase tracking-[0.24em] text-background transition-all duration-300 hover:bg-[var(--gold)] hover:text-foreground"
              >
                Read Next Case Study <span aria-hidden>→</span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 border-2 border-foreground px-8 py-4 text-[13px] font-bold uppercase tracking-[0.24em] text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </Container>
      </section>


      <Footer />
    </main>
  );
}
