import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import tajImg from "@/assets/taj.png.asset.json";
import asIsJourneyImg from "@/assets/taj-asis-journey.png.asset.json";
import ch4Img from "@/assets/taj-ch4-data.png.asset.json";
import ch5Img from "@/assets/taj-ch5-engine.png.asset.json";

export const Route = createFileRoute("/projects/taj")({
  head: () => ({
    meta: [
      { title: "Taj — Reimagining Tajness for the Digital Era · Komal Patil" },
      {
        name: "description",
        content:
          "A premium consulting case study reimagining Taj Hotels for the digital era — from customer 360 and AI-powered personalization to smart hotel operations and a ₹500 Cr annual value business case.",
      },
      { property: "og:title", content: "Taj — Reimagining Tajness for the Digital Era" },
      {
        property: "og:description",
        content:
          "How 120 years of heritage meets Customer 360, Gen AI concierge and predictive luxury — a case study by Komal Patil.",
      },
      { property: "og:type", content: "article" },
      { property: "og:image", content: tajImg.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: tajImg.url },
    ],
  }),
  component: TajPage,
});

/* ————————————————————————————————————————————————————————
   Reveal-on-scroll (matches MeetCraft / KalaVansh)
   ———————————————————————————————————————————————————————— */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(
      "[data-reveal], [data-reveal-hero]",
    );
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ————————————————————————————————————————————————————————
   Shared editorial primitives
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
          <Link to="/projects" className="story-link text-[13px] tracking-wide text-foreground/80">
            All Projects
          </Link>
          <Link to="/" hash="connect" className="story-link text-[13px] tracking-wide text-foreground/80">
            Let's Connect
          </Link>
          <Link to="/" className="story-link text-[13px] tracking-wide text-foreground/80">
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

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1400px] px-6 md:px-12 ${className}`}>{children}</div>;
}

function ChapterHeader({
  number,
  eyebrow,
  title,
  intro,
}: {
  number: string;
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div data-reveal className="reveal mb-14 md:mb-20">
      <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        Chapter {number}
        {eyebrow ? ` · ${eyebrow}` : ""}
      </p>
      <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">{title}</h2>
      <div className="mt-8 h-px w-16 bg-[var(--gold)]" />
      {intro && (
        <p className="mt-8 max-w-[62ch] font-editorial text-[1.15rem] leading-[1.7] tracking-[-0.003em] text-foreground/75 md:text-[1.25rem]">
          {intro}
        </p>
      )}
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p
      data-reveal
      className="reveal max-w-[62ch] font-editorial text-[1.1rem] leading-[1.75] tracking-[-0.003em] text-foreground/80 md:text-[1.2rem]"
    >
      {children}
    </p>
  );
}

function PullQuote({ children, attribution }: { children: React.ReactNode; attribution?: string }) {
  return (
    <blockquote data-reveal className="reveal mx-auto max-w-[32ch] py-10 text-center md:py-16">
      <p className="font-editorial text-3xl italic leading-[1.2] tracking-tight text-foreground md:text-[2.75rem]">
        “{children}”
      </p>
      {attribution && (
        <footer className="mt-6 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          — {attribution}
        </footer>
      )}
    </blockquote>
  );
}

function StatCard({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <div
      data-reveal
      className="reveal flex flex-col border border-border/70 bg-background/60 p-7 backdrop-blur-sm md:p-9"
    >
      <span className="font-serif text-4xl leading-none tracking-tight text-foreground md:text-5xl">
        {value}
      </span>
      <span className="mt-4 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{label}</span>
      {note && <span className="mt-3 text-[13px] leading-[1.55] text-foreground/60">{note}</span>}
    </div>
  );
}

function Divider() {
  return (
    <div className="mx-auto my-24 flex max-w-[1400px] items-center justify-center px-6 md:my-32 md:px-12">
      <div className="h-px w-24 bg-[var(--gold)]" />
    </div>
  );
}

/* ————————————————————————————————————————————————————————
   Chapter 1 — Hero
   ———————————————————————————————————————————————————————— */
function ChapterHero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-[#0F0B08] text-[#F5EDE1]">
      <img
        src={tajImg.url}
        alt="The Taj Mahal Palace hotel in Mumbai at sunset"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.85]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,11,8,0.55) 0%, rgba(15,11,8,0.15) 40%, rgba(15,11,8,0.85) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-24 pt-40 md:px-12 md:pb-32 md:pt-56">
        <div data-reveal-hero className="reveal-hero">
          <h1 className="font-serif text-[3.4rem] leading-[0.98] tracking-tight md:text-[6.5rem]">
            Reimagining <span className="italic text-[#E7C787]">Tajness</span>
            <br />
            for the Digital Era.
          </h1>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————————————
   Chapter 2 — Why now? (SWOT + Porter's)
   ———————————————————————————————————————————————————————— */

function QuadCard({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "gold" | "muted" | "green" | "red";
}) {
  const toneCls =
    tone === "gold"
      ? "border-[#D4B678]/60 bg-[#FBF6EC]"
      : tone === "green"
        ? "border-[#B4CDB4]/70 bg-[#F3F7EF]"
        : tone === "red"
          ? "border-[#E4B4B4]/70 bg-[#FBEFEF]"
          : "border-border bg-background";
  return (
    <div data-reveal className={`reveal border p-7 md:p-9 ${toneCls}`}>
      <p className="text-[11px] uppercase tracking-[0.28em] text-foreground/60">{label}</p>
      <ul className="mt-6 space-y-3 font-editorial text-[1.02rem] leading-[1.55] text-foreground/85 md:text-[1.1rem]">
        {items.map((i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChapterWhyNow() {
  return (
    <section className="bg-background py-28 md:py-40">
      <Container>
        <ChapterHeader
          number="02"
          eyebrow="Why now"
          title="Taj has the brand. The window to act is now."
          intro="A 120-year-old promise of hospitality sitting on 2.4/5 digital maturity, 65–70% OTA dependency and no unified guest view — while Marriott, Hyatt and Airbnb Luxe pour billions into AI. Heritage is our foundation. Intelligence is our advantage."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <QuadCard
            label="Strengths"
            tone="green"
            items={[
              "120-yr brand trust",
              "Tata Neu ecosystem: 160M+ users",
              "565+ properties across the network",
            ]}
          />
          <QuadCard
            label="Weaknesses"
            tone="red"
            items={[
              "Digital maturity 2.4 / 5",
              "65–70% OTA dependency",
              "No Customer 360 view",
            ]}
          />
          <QuadCard
            label="Opportunities"
            tone="gold"
            items={[
              "India luxury travel +12% YoY",
              "Gen AI-driven personalization",
              "ESG credential: Green Stay Score",
            ]}
          />
          <QuadCard
            label="Threats"
            tone="muted"
            items={[
              "Marriott Bonvoy 180M+ members",
              "Airbnb Luxe rising in experientials",
              "DPDP fines ₹50–250 Cr for non-compliance",
            ]}
          />
        </div>

        {/* Porter's five */}
        <div data-reveal className="reveal mt-24">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Competitive Pressure · Porter's Five Forces
          </p>
          <h3 className="mt-4 font-serif text-3xl leading-tight tracking-tight md:text-5xl">
            The market is pricing intelligence into luxury — quietly and quickly.
          </h3>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              force: "Buyer Power",
              intensity: "HIGH",
              note: "Guests benchmark the Taj app against Bonvoy on their phones.",
            },
            {
              force: "Rivalry",
              intensity: "HIGH",
              note: "Marriott and Hyatt investing billions in AI personalization.",
            },
            {
              force: "Substitutes",
              intensity: "RISING",
              note: "Airbnb Luxe is capturing high-intent experiential travelers.",
            },
            {
              force: "Supplier Power",
              intensity: "MEDIUM",
              note: "OTAs reducible as the direct channel grows.",
            },
          ].map((f) => (
            <div
              key={f.force}
              data-reveal
              className="reveal flex flex-col border border-border/70 bg-background p-7"
            >
              <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                {f.force}
              </span>
              <span className="mt-4 font-serif text-3xl tracking-tight text-[var(--gold)]">
                {f.intensity}
              </span>
              <p className="mt-4 text-[13.5px] leading-[1.55] text-foreground/70">{f.note}</p>
            </div>
          ))}
        </div>

        <PullQuote>Heritage is our foundation. Intelligence is our advantage.</PullQuote>
      </Container>
    </section>
  );
}

/* ————————————————————————————————————————————————————————
   Chapter 3 — As-Is Customer Journey
   ———————————————————————————————————————————————————————— */

const AS_IS_STAGES = [
  { n: "01", stage: "Discover", pain: "Generic discovery", note: "Undifferentiated content across OTAs and search." },
  { n: "02", stage: "Book", pain: "OTA dependency", note: "65–70% of bookings routed through third parties." },
  { n: "03", stage: "Arrival", pain: "Disconnected recognition", note: "Repeat guests still greeted as strangers." },
  { n: "04", stage: "Stay", pain: "Reactive personalization", note: "Preferences noted, rarely acted on across visits." },
  { n: "05", stage: "Checkout", pain: "Operational friction", note: "Bills, keys and follow-ups spread across channels." },
  { n: "06", stage: "Return", pain: "Transactional loyalty", note: "Points, not moments. NuePass engagement ~18% / month." },
];

function ChapterAsIsJourney() {
  return (
    <section className="bg-[#F7F2EA] py-28 md:py-40">
      <Container>
        <ChapterHeader
          number="03"
          eyebrow="As-is Customer Journey"
          title="Luxury hospitality — fragmented intelligence."
          intro="Six stages. Six chances to feel known. Today, each is a silo — data collected, rarely connected."
        />

        <div data-reveal className="reveal mx-auto max-w-[1200px]">
          <img
            src={asIsJourneyImg.url}
            alt="As-is customer journey: Discover, Book, Arrival, Stay, Checkout, Return — each stage marked with a broken link and its pain point."
            className="w-full h-auto"
          />
        </div>

        {/* Current state at a glance */}
        <div className="mt-24 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          <StatCard value="565+" label="Hotels" />
          <StatCard value="40,000+" label="Employees" />
          <StatCard value="10M+" label="NuePass Ecosystem Members" />
          <StatCard value="~18%" label="Monthly Loyalty Engagement" />
        </div>
      </Container>
    </section>
  );
}

/* ————————————————————————————————————————————————————————
   Chapter 4 — Taj already has the data (image)
   ———————————————————————————————————————————————————————— */

function ChapterKeyInsight() {
  return (
    <section className="bg-background py-28 md:py-40">
      <Container>
        <div data-reveal className="reveal">
          <img
            src={ch4Img.url}
            alt="Taj already has the data — intelligence exists, it is just fragmented"
            className="mx-auto block w-full max-w-[1200px]"
          />
        </div>
      </Container>
    </section>
  );
}

/* ————————————————————————————————————————————————————————
   Chapter 5 — Transformation Engine (image)
   ———————————————————————————————————————————————————————— */

function ChapterTransformationEngine() {
  return (
    <section className="bg-background py-28 md:py-40">
      <Container>
        <div data-reveal className="reveal">
          <img
            src={ch5Img.url}
            alt="Transformation Engine — turning data into predictive luxury"
            className="mx-auto block w-full max-w-[1200px]"
          />
        </div>
      </Container>
    </section>
  );
}

/* ————————————————————————————————————————————————————————
   Chapter 6 — Customer 360 (animated ecosystem)
   ———————————————————————————————————————————————————————— */

function ChapterCustomer360() {
  const touchpoints = [
    "Taj App",
    "Website",
    "Tata Neu",
    "WhatsApp",
    "Voice / Alexa",
    "PMS / Opera",
    "I-LEAP Loyalty",
    "Salesforce",
  ];
  return (
    <section className="bg-background py-28 md:py-40">
      <Container>
        <ChapterHeader
          number="06"
          eyebrow="Customer 360"
          title="One guest. One profile. Every channel."
          intro="Every touchpoint — mobile, voice, front desk, in-room — feeds a single unified guest identity. Preferences persist. Recognition travels with the guest."
        />

        <div className="relative mx-auto flex min-h-[560px] max-w-[900px] items-center justify-center">
          {/* Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-[var(--gold)] bg-[#FBF6EC] text-center md:h-52 md:w-52">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Customer 360
                </p>
                <p className="mt-2 font-serif text-xl leading-tight tracking-tight text-foreground md:text-2xl">
                  One
                  <br />
                  Guest.
                </p>
              </div>
              <span className="absolute -inset-3 rounded-full border border-[var(--gold)]/30" />
              <span className="absolute -inset-8 rounded-full border border-[var(--gold)]/15" />
            </div>
          </div>

          {/* Orbit dots */}
          {touchpoints.map((t, i) => {
            const angle = (i / touchpoints.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 230;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <div
                key={t}
                data-reveal
                className="reveal absolute"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                  transitionDelay: `${i * 90}ms`,
                }}
              >
                <div className="whitespace-nowrap border border-border bg-background px-4 py-2 text-[12px] tracking-wide text-foreground/80 shadow-sm">
                  {t}
                </div>
              </div>
            );
          })}

          {/* Connecting lines */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="-450 -300 900 600"
            aria-hidden
          >
            {touchpoints.map((_, i) => {
              const angle = (i / touchpoints.length) * 2 * Math.PI - Math.PI / 2;
              const x = Math.cos(angle) * 230;
              const y = Math.sin(angle) * 230;
              return (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                  x2={x}
                  y2={y}
                  stroke="var(--gold)"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
              );
            })}
          </svg>
        </div>

        <PullQuote>Technology disappears into the experience.</PullQuote>
      </Container>
    </section>
  );
}

/* ————————————————————————————————————————————————————————
   Chapter 7 — Digital Architecture (layered)
   ———————————————————————————————————————————————————————— */

const ARCH_LAYERS = [
  {
    name: "Guest Channels",
    tech: "Taj App · Website · Tata Neu · WhatsApp · Voice / Alexa",
    note: "Every doorway the guest walks through — physical and digital.",
  },
  {
    name: "API & Orchestration",
    tech: "API Gateway · Kafka Event Bus · Real-time streaming",
    note: "Kafka replaces batch ETL. Check-in updates the profile before the elevator.",
  },
  {
    name: "Intelligence & Experience",
    tech: "Customer 360 · Gen AI Concierge · Dynamic Pricing · IoT Ops",
    note: "The digital butler layer — anticipates before it's asked.",
  },
  {
    name: "Core Systems",
    tech: "Opera Cloud (PMS) · SAP · I-LEAP Loyalty · Salesforce · Tata Neu",
    note: "API-first. One unified layer, zero silos.",
  },
  {
    name: "Cloud Infrastructure (AWS)",
    tech: "EKS · S3 Lakehouse · SageMaker · DPDP-Compliant",
    note: "Zero-trust security. DPDP-compliant from Day 1, not Day 365.",
  },
];

function ChapterArchitecture() {
  return (
    <section className="bg-[#F7F2EA] py-28 md:py-40">
      <Container>
        <ChapterHeader
          number="07"
          eyebrow="Enterprise Architecture"
          title="The invisible infrastructure of Tajness."
          intro="Five layers. One promise: the guest never sees the wiring. A Taj butler knows your preferences without being asked — the CDP + AI layer is the digital butler."
        />

        <div className="space-y-4 md:space-y-5">
          {ARCH_LAYERS.map((l, i) => (
            <div
              key={l.name}
              data-reveal
              className="reveal group grid grid-cols-1 items-center gap-4 border border-border/70 bg-background p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-[var(--gold)]/60 hover:shadow-[0_30px_60px_-40px_rgba(212,182,120,0.6)] md:grid-cols-[100px,1fr,auto] md:gap-8 md:p-9"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="font-serif text-[3rem] leading-none tracking-tight text-[var(--gold)] md:text-[3.5rem]">
                0{i + 1}
              </span>
              <div>
                <h3 className="font-serif text-2xl leading-tight tracking-tight text-foreground md:text-[1.7rem]">
                  {l.name}
                </h3>
                <p className="mt-2 text-[13px] tracking-wide text-muted-foreground">{l.tech}</p>
                <p className="mt-4 max-w-[70ch] font-editorial text-[1.05rem] leading-[1.6] text-foreground/75">
                  {l.note}
                </p>
              </div>
              <div className="hidden md:block h-16 w-px bg-[var(--gold)]/30" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ————————————————————————————————————————————————————————
   Chapter 8 — Future Customer Journey
   ———————————————————————————————————————————————————————— */

const TO_BE_STAGES = [
  { n: "01", stage: "Discover", promise: "AI-curated experiences", value: "Real-time contextual recommendations" },
  { n: "02", stage: "Book", promise: "Best rates, exclusive offers", value: "Personalized, direct-first bookings" },
  { n: "03", stage: "Arrive", promise: "Seamless arrival & recognition", value: "< 20 min service resolution" },
  { n: "04", stage: "Stay", promise: "Predictive service", value: "Preferences anticipated, not asked" },
  { n: "05", stage: "Checkout", promise: "Effortless digital billing", value: "One-click, no queue" },
  { n: "06", stage: "Return", promise: "Stay connected", value: "Higher CLV & repeat stays" },
];

function ChapterToBeJourney() {
  return (
    <section className="bg-background py-28 md:py-40">
      <Container>
        <ChapterHeader
          number="08"
          eyebrow="Future Customer Journey"
          title="One guest. One view. One seamless experience."
          intro="The same six stages — reimagined as continuous moments of recognition, powered by the Customer 360 profile and the AI concierge layer."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TO_BE_STAGES.map((s, i) => (
            <div
              key={s.stage}
              data-reveal
              className="reveal flex flex-col border border-border/70 bg-[#FBF6EC]/40 p-7 md:p-8"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="text-[10.5px] uppercase tracking-[0.28em] text-[var(--gold)]">
                {s.n} · {s.stage}
              </span>
              <h3 className="mt-5 font-serif text-2xl leading-tight tracking-tight md:text-[1.6rem]">
                {s.promise}
              </h3>
              <p className="mt-4 font-editorial text-[1.02rem] leading-[1.6] text-foreground/70">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Journey impact */}
        <div className="mt-24">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Journey Impact
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            <StatCard value="78+" label="NPS Target" />
            <StatCard value="↑↑" label="Loyalty Engagement" />
            <StatCard value="45%+" label="Direct Booking Share" />
            <StatCard value="↑" label="Guest Lifetime Value" />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ————————————————————————————————————————————————————————
   Chapter 9 — Smart Hotel Operations
   ———————————————————————————————————————————————————————— */

function ChapterSmartOps() {
  return (
    <section className="bg-[#F7F2EA] py-28 md:py-40">
      <Container>
        <ChapterHeader
          number="09"
          eyebrow="Smart Hotel Operations"
          title="Protecting the promise through invisible intelligence."
          intro="Behind every effortless moment is an operations layer that never shows itself — IoT sensors, forecasting models and workforce intelligence keeping Tajness in flow."
        />

        {/* Headline stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatCard value="₹90 Cr" label="Annual OpEx Savings" note="Maintenance + Energy + F&B" />
          <StatCard value="−18%" label="Energy Cost Reduction" note="IoT-enabled HVAC & lighting" />
          <StatCard value="−20%" label="F&B Waste Reduction" note="AI demand forecasting" />
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {[
            {
              t: "Smart Rooms",
              d: "Room auto-sets to preferences on check-in. No app needed. Just Tajness.",
            },
            {
              t: "Predictive Maintenance",
              d: "IoT flags failures 72 hrs early. Fixed before the guest arrives.",
            },
            {
              t: "F&B Forecasting",
              d: "AI predicts covers daily. Waste −20%. Powers the Green Stay Score.",
            },
            {
              t: "Workforce Intelligence",
              d: "Staffing aligned to occupancy. Less admin, more hospitality.",
            },
          ].map((f) => (
            <div
              key={f.t}
              data-reveal
              className="reveal border border-border/70 bg-background p-7 md:p-9"
            >
              <h3 className="font-serif text-2xl leading-tight tracking-tight md:text-[1.7rem]">
                {f.t}
              </h3>
              <p className="mt-4 font-editorial text-[1.05rem] leading-[1.6] text-foreground/75">
                {f.d}
              </p>
            </div>
          ))}
        </div>

        <div
          data-reveal
          className="reveal mt-16 border-l-2 border-[var(--gold)] bg-background/60 p-8"
        >
          <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--gold)]">
            ESG & Sustainability
          </p>
          <p className="mt-4 max-w-[70ch] font-editorial text-[1.1rem] leading-[1.65] text-foreground/80 md:text-[1.2rem]">
            Smart energy dashboards track carbon per guest night across 565 properties. Taj publishes
            a <em>Green Stay Score</em> — a sustainability credential no Indian competitor yet offers.
          </p>
        </div>

        <PullQuote>Smart operations. Sustainable Tajness.</PullQuote>
      </Container>
    </section>
  );
}

/* ————————————————————————————————————————————————————————
   Chapter 10 — Ecosystem Strategy (Tata Neu)
   ———————————————————————————————————————————————————————— */

function ChapterEcosystem() {
  const modes = [
    { m: "Build", verdict: "✗", note: "Taj is a hospitality brand, not a tech company." },
    { m: "Join", verdict: "◐", note: "One of 20 brands fighting for attention." },
    { m: "Orchestrate", verdict: "✓", note: "Anchor the luxury moment of the Tata lifestyle." },
  ];
  const flywheel = [
    "🏨 Guest books Taj stay",
    "✈️ Air India upgrade",
    "🛒 BigBasket hamper",
    "💊 Tata 1mg wellness",
    "📊 Profile +50 points",
    "🔄 Returns 2× likely",
  ];
  return (
    <section className="bg-background py-28 md:py-40">
      <Container>
        <ChapterHeader
          number="10"
          eyebrow="Platform Economy · Tata Neu"
          title="Don't just join the ecosystem. Own the moment."
          intro="Taj's strategic play inside Tata Neu isn't participation — it's orchestration. The luxury stay becomes the anchor around which every other Tata experience revolves."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {modes.map((m, i) => (
            <div
              key={m.m}
              data-reveal
              className={`reveal border p-8 ${
                i === 2
                  ? "border-[var(--gold)] bg-[#FBF6EC]"
                  : "border-border/70 bg-background"
              }`}
            >
              <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                Option 0{i + 1}
              </span>
              <div className="mt-4 flex items-baseline gap-4">
                <span className="font-serif text-3xl tracking-tight md:text-4xl">{m.m}</span>
                <span
                  className={`font-serif text-3xl ${
                    i === 2 ? "text-[var(--gold)]" : "text-foreground/40"
                  }`}
                >
                  {m.verdict}
                </span>
              </div>
              <p className="mt-5 font-editorial text-[1.02rem] leading-[1.6] text-foreground/75">
                {m.note}
              </p>
            </div>
          ))}
        </div>

        {/* Flywheel */}
        <div data-reveal className="reveal mt-24">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            The Tata Neu Flywheel · Taj as the orchestrator
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {flywheel.map((step, i) => (
              <div key={step} className="flex items-center gap-3 md:gap-4">
                <div className="border border-border/70 bg-[#FBF6EC]/40 px-4 py-3 text-[13.5px] tracking-wide text-foreground/80 md:px-6 md:py-4 md:text-[14px]">
                  {step}
                </div>
                {i < flywheel.length - 1 && (
                  <span className="text-[var(--gold)]" aria-hidden>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          data-reveal
          className="reveal mt-20 border border-[var(--gold)]/40 bg-[#FBF6EC]/60 p-8 md:p-12"
        >
          <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--gold)]">
            New Revenue Model
          </p>
          <p className="mt-4 max-w-[75ch] font-editorial text-[1.15rem] leading-[1.65] text-foreground/85 md:text-[1.3rem]">
            Taj charges ecosystem partners a preferred fee to be the default recommendation during
            a stay. A guest asking for a doctor gets Tata 1mg. A guest asking for a car gets Tata
            Motors. <strong>Estimated ₹30–50 Cr annually by Year 3</strong> — at near-zero marginal
            cost.
          </p>
        </div>

        <PullQuote>160M+ users. One ecosystem. One Taj.</PullQuote>
      </Container>
    </section>
  );
}

/* ————————————————————————————————————————————————————————
   Chapter 11 — Privacy, Security, Governance
   ———————————————————————————————————————————————————————— */

function ChapterTrust() {
  const pillars = [
    {
      t: "Compliance",
      k: "100%",
      d: "DPDP compliance target. Zero-trust security. Compliant from Day 1, not Day 365.",
    },
    {
      t: "Data Governance",
      k: "Role-based",
      d: "Access modelled to hospitality roles — from GM to housekeeping. Purpose-limited, auditable.",
    },
    {
      t: "Responsible AI",
      k: "Consent-led",
      d: "Personalization only where the guest has said yes. Explainable, reversible, respectful.",
    },
  ];
  return (
    <section className="bg-[#0F0B08] py-28 text-[#F5EDE1] md:py-40">
      <Container>
        <div data-reveal className="reveal mb-14 md:mb-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D4B678]">
            Chapter 11 · Trust
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Luxury requires trust.
          </h2>
          <div className="mt-8 h-px w-16 bg-[#D4B678]" />
          <p className="mt-8 max-w-[62ch] font-editorial text-[1.15rem] leading-[1.7] text-[#F5EDE1]/80 md:text-[1.25rem]">
            Personalization at this scale only works if the guest trusts the system to hold their
            data with the same care as their room key.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={p.t}
              data-reveal
              className="reveal border border-[#D4B678]/25 bg-[#1A130E]/70 p-8"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="text-[10.5px] uppercase tracking-[0.3em] text-[#D4B678]">
                Pillar 0{i + 1}
              </span>
              <p className="mt-5 font-serif text-4xl tracking-tight text-[#E7C787]">{p.k}</p>
              <h3 className="mt-4 font-serif text-2xl leading-tight tracking-tight">{p.t}</h3>
              <p className="mt-4 text-[14px] leading-[1.6] text-[#F5EDE1]/75">{p.d}</p>
            </div>
          ))}
        </div>

        <PullQuote>Trust is the foundation of luxury personalization.</PullQuote>
      </Container>
    </section>
  );
}

/* ————————————————————————————————————————————————————————
   Chapter 12 — Change Management
   ———————————————————————————————————————————————————————— */

function ChapterChange() {
  const pillars = [
    { k: "90%", t: "Digital Learning", d: "Digital foundations completion target across the workforce." },
    { k: "1,500", t: "Digital Champions", d: "One digital champion at every property by FY2028." },
    { k: "2 wk", t: "Agile Squads", d: "Two-week sprint cycles for rapid, evidence-led delivery." },
    { k: "Build · Empower · Sustain", t: "Capability & Adoption", d: "A future-ready Taj team, ready to lead — not react." },
  ];

  return (
    <section className="bg-background py-28 md:py-40">
      <Container>
        <ChapterHeader
          number="12"
          eyebrow="Change Management"
          title="The transformation is a hospitality one — not a technology one."
          intro="565 GMs, 40,000 employees. Digital only works when the people who serve the guest believe it makes them better at hospitality."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.t} data-reveal className="reveal border border-border/70 bg-background p-7">
              <span className="font-serif text-3xl tracking-tight text-[var(--gold)] md:text-4xl">
                {p.k}
              </span>
              <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                {p.t}
              </p>
              <p className="mt-4 text-[13.5px] leading-[1.6] text-foreground/70">{p.d}</p>
            </div>
          ))}
        </div>

        {/* Transformation Office */}
        <div className="mt-24 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          <div data-reveal className="reveal">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Corporate TMO · Centralized Strategy
            </p>
            <h3 className="mt-4 font-serif text-3xl leading-tight tracking-tight md:text-4xl">
              Centralize the intelligence.
              <br />
              Decentralize the hospitality.
            </h3>
            <ul className="mt-8 space-y-3 font-editorial text-[1.05rem] leading-[1.55] text-foreground/80">
              {[
                "Chief Digital Officer (CDO)",
                "PMO Lead — Roadmap & Delivery",
                "Enterprise Architect",
                "Data Lead — CDP & DPDP",
                "Change Lead — Digital Academy",
                "Finance Partner — ROI",
                "Security Lead — Zero-trust",
              ].map((role) => (
                <li key={role} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
                  <span>{role}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="reveal border border-border/70 bg-[#FBF6EC]/50 p-8 md:p-10">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              565 Digital Champions
            </p>
            <p className="mt-6 font-editorial text-[1.1rem] leading-[1.65] text-foreground/85 md:text-[1.2rem]">
              One digital champion at every property — reporting to the TMO monthly, owning local
              KPI accountability, incentivised via a promotion path.
            </p>

            <p className="mt-10 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Operating Cadence
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ["Daily", "TMO Standup"],
                ["Bi-Weekly", "Sprint Reviews"],
                ["Monthly", "Steering Committee"],
                ["Quarterly", "Board Gate"],
              ].map(([when, what]) => (
                <div key={when} className="border border-border/60 bg-background p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--gold)]">{when}</p>
                  <p className="mt-2 text-[13px] leading-tight text-foreground/80">{what}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <PullQuote attribution="CDO Brief">
          Your job is not to build technology. Your job is to make 565 GMs believe that digital
          makes them better at hospitality.
        </PullQuote>
      </Container>
    </section>
  );
}

/* ————————————————————————————————————————————————————————
   Chapter 13 — Implementation Roadmap
   ———————————————————————————————————————————————————————— */

const PHASES = [
  {
    ph: "Phase 1",
    name: "Foundation",
    years: "2025 — 2026",
    kpis: [
      ["Customer 360", "Across top 50 properties"],
      ["Digital Champions", "500 trained"],
      ["NPS", "→ 74"],
    ],
  },
  {
    ph: "Phase 2",
    name: "Scale",
    years: "2026 — 2027",
    kpis: [
      ["AI Pricing", "Across 60% portfolio"],
      ["Manager Digital Literacy", "80%"],
      ["AI Models", "2 → 15+"],
    ],
  },
  {
    ph: "Phase 3",
    name: "Leadership",
    years: "2027 — 2029",
    kpis: [
      ["Direct Booking Share", "45%+"],
      ["Guest Profile Completeness", "92%"],
      ["NPS", "82+"],
      ["App MAU", "3×"],
    ],
  },
];

function ChapterRoadmap() {
  return (
    <section className="bg-[#F7F2EA] py-28 md:py-40">
      <Container>
        <ChapterHeader
          number="13"
          eyebrow="Implementation Roadmap"
          title="Three phases. One direction."
          intro="From Foundation to Scale to Leadership — a paced, evidence-led rollout across 565 properties."
        />

        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-8 h-px bg-[var(--gold)]/40" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {PHASES.map((p, i) => (
              <div key={p.ph} data-reveal className="reveal relative" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="hidden md:flex items-center">
                  <span className="relative z-10 h-4 w-4 rounded-full border-2 border-[var(--gold)] bg-[#F7F2EA]" />
                </div>
                <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-[var(--gold)]">
                  {p.ph} · {p.years}
                </p>
                <h3 className="mt-4 font-serif text-4xl leading-tight tracking-tight md:text-5xl">
                  {p.name}
                </h3>
                <div className="mt-8 space-y-4 border-l border-[var(--gold)]/40 pl-6">
                  {p.kpis.map(([k, v]) => (
                    <div key={k}>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                        {k}
                      </p>
                      <p className="mt-1 font-serif text-2xl leading-tight tracking-tight text-foreground md:text-[1.75rem]">
                        {v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ————————————————————————————————————————————————————————
   Chapter 14 — Business Impact / Investment Case
   ———————————————————————————————————————————————————————— */

function ChapterImpact() {
  const kpis: [string, string][] = [
    ["NPS", "74 → 82+"],
    ["Direct Booking Share", "35% → 45%+"],
    ["Mobile App MAU", "500K+ by Yr 2"],
    ["OpEx Reduction", "−5% by Year 3"],
    ["Personalized Stays", "5% → 65%"],
    ["AI-Driven Revenue", "0% → 25%"],
    ["Guest Profile Completeness", "→ 92%"],
    ["DPDP Compliance", "100% Year 1"],
  ];

  return (
    <section className="bg-background py-28 md:py-40">
      <Container>
        <ChapterHeader
          number="14"
          eyebrow="Investment Case & KPIs"
          title="Same metrics you trust. Now powered by data."
          intro="A three-year investment equal to a single new flagship hotel — returning the annual revenue of three to four."
        />

        {/* Headline investment stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard value="₹650 Cr" label="3-Year Investment" note="≈ 1 new flagship hotel" />
          <StatCard value="₹500+ Cr" label="Year 3 Annual Value" note="Revenue of 3–4 hotels" />
          <StatCard value="28–32 mo" label="Payback Period" />
          <StatCard value="35–45%" label="5-Year IRR" />
        </div>

        {/* KPI table */}
        <div className="mt-16 border border-border/70 bg-background">
          {kpis.map(([k, v], i) => (
            <div
              key={k}
              data-reveal
              className={`reveal grid grid-cols-2 items-baseline gap-4 px-6 py-5 md:grid-cols-[1fr,auto] md:px-8 md:py-6 ${
                i < kpis.length - 1 ? "border-b border-border/60" : ""
              }`}
            >
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground md:text-[12px]">
                {k}
              </p>
              <p className="font-serif text-xl leading-tight tracking-tight text-foreground md:text-2xl">
                {v}
              </p>
            </div>
          ))}
        </div>

        <PullQuote>₹650 Cr in. Value of 3–4 hotels. Every year.</PullQuote>
      </Container>
    </section>
  );
}

/* ————————————————————————————————————————————————————————
   Final Chapter — Digital + Heritage
   ———————————————————————————————————————————————————————— */

function FinalChapter() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0F0B08] py-32 text-[#F5EDE1] md:py-48">
      <img
        src={tajImg.url}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,11,8,0.65) 0%, rgba(15,11,8,0.85) 60%, rgba(15,11,8,0.95) 100%)",
        }}
      />

      <Container className="relative">
        <div data-reveal className="reveal">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#D4B678]">
            Digital + Heritage
          </p>
          <h2 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">
            Modernize <em className="text-[#E7C787]">without</em> commoditizing.
          </h2>
          <div className="mt-8 h-px w-16 bg-[#D4B678]" />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <div data-reveal className="reveal">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#D4B678]">Heritage</p>
            <ul className="mt-6 space-y-4 font-editorial text-[1.1rem] leading-[1.65] text-[#F5EDE1]/85">
              <li>Human-led luxury touchpoints, preserved.</li>
              <li>Emotion in every moment.</li>
              <li>Care that anticipates. Service that delights.</li>
              <li>Genuine connections. Lasting loyalty.</li>
            </ul>
          </div>
          <div data-reveal className="reveal">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#D4B678]">Intelligence</p>
            <ul className="mt-6 space-y-4 font-editorial text-[1.1rem] leading-[1.65] text-[#F5EDE1]/85">
              <li>AI augments — never replaces.</li>
              <li>Predictive personalization.</li>
              <li>Seamless by design.</li>
              <li>Intelligent operations. Trusted always.</li>
            </ul>
          </div>
        </div>

        <blockquote
          data-reveal
          className="reveal mx-auto mt-24 max-w-[24ch] text-center"
        >
          <p className="font-editorial text-4xl italic leading-[1.15] tracking-tight text-[#E7C787] md:text-[4.5rem]">
            “True luxury is felt,
            <br />
            not seen.”
          </p>
        </blockquote>

        <div className="mt-24 flex flex-col items-center gap-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#D4B678]">
            Taj · Timeless Experiences
          </p>
          <Link
            to="/projects"
            className="story-link text-sm tracking-wide text-[#F5EDE1]"
          >
            ← Back to all projects
          </Link>
        </div>
      </Container>
    </section>
  );
}

/* ————————————————————————————————————————————————————————
   Page
   ———————————————————————————————————————————————————————— */

function TajPage() {
  useReveal();
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <ChapterHero />
      <ChapterWhyNow />
      <Divider />
      <ChapterAsIsJourney />
      <Divider />
      <ChapterKeyInsight />
      <ChapterTransformationEngine />
      <ChapterArchitecture />
      <Divider />
      <ChapterToBeJourney />
      <ChapterSmartOps />
      <ChapterEcosystem />
      <ChapterTrust />
      <ChapterChange />
      <ChapterRoadmap />
      <ChapterImpact />
      <FinalChapter />
      <Footer />
    </main>
  );
}
