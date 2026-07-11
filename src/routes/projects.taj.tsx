import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  CalendarDays,
  UtensilsCrossed,
  Flower2,
  Smartphone,
  BedDouble,
  Plane,
  Cog,
  Heart,
  Database,
  Sparkles,
  BrainCircuit,
  Gauge,
  TrendingUp,
  Wand2,
  UserRound,
  Search,
  KeyRound,
  DoorOpen,
  LogOut,
  Repeat,
  Unlink,
  Tag,
  UserCheck,
  CreditCard,
  Gift,
  Smile,
  Users,
  Bookmark,
  Star,
  ShieldCheck,
  Handshake,
  Lock,
} from "lucide-react";
const tajImg = { url: "/images/2be8f35e-taj.png" };



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

const AS_IS_STAGES: {
  n: string;
  stage: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  pain: string;
  note: string;
}[] = [
  { n: "01", stage: "Discover", icon: Search, pain: "Generic discovery", note: "Undifferentiated content across OTAs and search." },
  { n: "02", stage: "Book", icon: CalendarDays, pain: "OTA dependency", note: "65–70% of bookings routed through third parties." },
  { n: "03", stage: "Arrival", icon: DoorOpen, pain: "Disconnected recognition", note: "Repeat guests greeted as strangers." },
  { n: "04", stage: "Stay", icon: BedDouble, pain: "Reactive personalization", note: "Preferences noted, rarely acted on across visits." },
  { n: "05", stage: "Checkout", icon: LogOut, pain: "Operational friction", note: "Bills, keys, follow-ups spread across channels." },
  { n: "06", stage: "Return", icon: Repeat, pain: "Transactional loyalty", note: "Points, not moments. NuePass engagement ~18%/mo." },
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

        {/* Horizontal broken journey */}
        <div data-reveal className="reveal mx-auto max-w-[1200px]">
          {/* Desktop */}
          <div className="hidden md:block">
            <div className="relative grid grid-cols-6 gap-4">
              {AS_IS_STAGES.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.n} className="relative flex flex-col items-center text-center">
                    {/* broken connector to the next node */}
                    {i < AS_IS_STAGES.length - 1 && (
                      <div className="pointer-events-none absolute left-[calc(50%+40px)] right-[calc(-50%+40px)] top-[40px] flex items-center justify-center">
                        <svg viewBox="0 0 120 24" className="h-6 w-full" preserveAspectRatio="none">
                          <line x1="0" y1="12" x2="46" y2="12" stroke="#3D2817" strokeWidth="1.25" strokeDasharray="2 4" opacity="0.55" />
                          <line x1="74" y1="12" x2="120" y2="12" stroke="#3D2817" strokeWidth="1.25" strokeDasharray="2 4" opacity="0.55" />
                        </svg>
                        <Unlink className="absolute h-4 w-4 text-[#B94A2E]" strokeWidth={1.5} />
                      </div>
                    )}

                    {/* Node */}
                    <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-[#3D2817]/25 bg-[#FAF6EE] shadow-[0_1px_0_rgba(61,40,23,0.06)]">
                      <Icon className="h-7 w-7 text-[#3D2817]" strokeWidth={1.25} />
                    </div>

                    <div className="mt-5 font-editorial text-[11px] tracking-[0.28em] text-[#3D2817]/50">
                      {s.n}
                    </div>
                    <div className="mt-1 font-editorial text-xl text-[#3D2817]">
                      {s.stage}
                    </div>

                    {/* Pain badge */}
                    <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[#B94A2E]/35 bg-[#B94A2E]/8 px-3 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#B94A2E]" />
                      <span className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-[#8A2E17]">
                        {s.pain}
                      </span>
                    </div>

                    <p className="mt-3 max-w-[170px] text-[12.5px] leading-relaxed text-[#3D2817]/65">
                      {s.note}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Baseline caption */}
            <div className="mt-14 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.32em] text-[#3D2817]/45">
              <span className="h-px w-16 bg-[#3D2817]/25" />
              <span>Data collected · rarely connected</span>
              <span className="h-px w-16 bg-[#3D2817]/25" />
            </div>
          </div>

          {/* Mobile — vertical list */}
          <div className="md:hidden space-y-6">
            {AS_IS_STAGES.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.n} className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#3D2817]/25 bg-[#FAF6EE]">
                    <Icon className="h-5 w-5 text-[#3D2817]" strokeWidth={1.25} />
                  </div>
                  <div className="flex-1">
                    <div className="font-editorial text-[10px] tracking-[0.28em] text-[#3D2817]/50">{s.n}</div>
                    <div className="font-editorial text-lg text-[#3D2817]">{s.stage}</div>
                    <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-[#B94A2E]/35 bg-[#B94A2E]/8 px-2.5 py-0.5">
                      <span className="h-1 w-1 rounded-full bg-[#B94A2E]" />
                      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8A2E17]">{s.pain}</span>
                    </div>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-[#3D2817]/65">{s.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
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
   Chapter 4 — Fragmented data (visual-first)
   ———————————————————————————————————————————————————————— */

const FRAG_ICONS = [
  { Icon: CalendarDays, label: "Booking" },
  { Icon: UtensilsCrossed, label: "Dining" },
  { Icon: Flower2, label: "Spa" },
  { Icon: Smartphone, label: "App" },
  { Icon: BedDouble, label: "Room" },
  { Icon: Plane, label: "Travel" },
  { Icon: Cog, label: "Ops" },
  { Icon: Heart, label: "Loyalty" },
];

function ChapterKeyInsight() {
  return (
    <section className="bg-[#F7EFE1] py-28 text-[#3D2817] md:py-40">
      <Container>
        <div data-reveal className="reveal mx-auto max-w-[820px] text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#8B6B3D]">
            Chapter 04
          </p>
          <h2 className="mt-6 font-serif text-4xl uppercase leading-[1.05] tracking-tight text-[#B8894C] md:text-6xl">
            The data exists.
            <br />
            <span className="italic text-[#3D2817]">It just doesn&apos;t talk.</span>
          </h2>
        </div>

        <div
          data-reveal
          className="reveal relative mx-auto mt-24 aspect-square w-full max-w-[720px]"
        >
          {/* Broken connectors — jagged, incomplete */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="-100 -100 200 200"
            aria-hidden
          >
            {FRAG_ICONS.map((_, i) => {
              const angle = (i / FRAG_ICONS.length) * 2 * Math.PI - Math.PI / 2;
              // Two disjoint segments — visual "broken" wire
              const x1 = Math.cos(angle) * 30;
              const y1 = Math.sin(angle) * 30;
              const xMid1 = Math.cos(angle) * 48;
              const yMid1 = Math.sin(angle) * 48;
              const xMid2 = Math.cos(angle) * 60;
              const yMid2 = Math.sin(angle) * 60;
              const x2 = Math.cos(angle) * 74;
              const y2 = Math.sin(angle) * 74;
              return (
                <g key={i} opacity="0.6">
                  <line
                    x1={x1}
                    y1={y1}
                    x2={xMid1}
                    y2={yMid1}
                    stroke="#8B6B3D"
                    strokeWidth="0.5"
                    strokeDasharray="1.4 1.6"
                  />
                  <line
                    x1={xMid2}
                    y1={yMid2}
                    x2={x2}
                    y2={y2}
                    stroke="#8B6B3D"
                    strokeWidth="0.5"
                    strokeDasharray="1.4 1.6"
                  />
                </g>
              );
            })}
          </svg>

          {/* Center — cracked / incomplete silhouette */}
          <div className="absolute left-1/2 top-1/2 flex h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#EFE2C9]">
            <div className="absolute inset-0 rounded-full border border-dashed border-[#8B6B3D]/50" />
            {/* Silhouette with a diagonal "crack" cut */}
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full">
              <UserRound
                className="h-[55%] w-[55%] text-[#3D2817]"
                strokeWidth={1.2}
                aria-label="Incomplete guest profile"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 46%, #F7EFE1 46%, #F7EFE1 54%, transparent 54%)",
                }}
              />
            </div>
          </div>

          {/* Orbit icon nodes */}
          {FRAG_ICONS.map(({ Icon, label }, i) => {
            const angle = (i / FRAG_ICONS.length) * 2 * Math.PI - Math.PI / 2;
            const x = 50 + Math.cos(angle) * 40;
            const y = 50 + Math.sin(angle) * 40;
            const dark = i % 2 === 0;
            return (
              <div
                key={label}
                data-reveal
                className="reveal absolute flex flex-col items-center gap-2"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                  transitionDelay: `${i * 70}ms`,
                }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full shadow-[0_8px_20px_-12px_rgba(61,40,23,0.5)] md:h-16 md:w-16"
                  style={{
                    background: dark ? "#3D2817" : "#EFE2C9",
                    color: dark ? "#F5EDE1" : "#3D2817",
                  }}
                  aria-label={label}
                >
                  <Icon strokeWidth={1.5} className="h-6 w-6 md:h-7 md:w-7" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Single quiet caption — the whole chart already told the story */}
        <p
          data-reveal
          className="reveal mx-auto mt-16 max-w-[36ch] text-center font-editorial text-lg italic leading-snug text-[#3D2817]/70 md:text-xl"
        >
          Eight signals. One guest. Zero conversation between them.
        </p>
      </Container>
    </section>
  );
}

/* ————————————————————————————————————————————————————————
   Chapter 5 — Transformation Engine (visual pipeline)
   ———————————————————————————————————————————————————————— */

const SOURCE_ICONS = [
  { Icon: CalendarDays, label: "Booking" },
  { Icon: Heart, label: "Loyalty" },
  { Icon: UtensilsCrossed, label: "On-Property" },
  { Icon: Smartphone, label: "Digital" },
  { Icon: Plane, label: "Travel" },
  { Icon: Cog, label: "Ops" },
];

const ACTION_ICONS = [
  { Icon: Sparkles, label: "Personalized" },
  { Icon: Wand2, label: "Predictive" },
  { Icon: TrendingUp, label: "Pricing" },
  { Icon: Gauge, label: "Smart Ops" },
  { Icon: Heart, label: "Loyalty" },
];

function ChapterTransformationEngine() {
  return (
    <section className="bg-[#0F0B08] py-28 text-[#F5EDE1] md:py-40">
      <Container>
        <div data-reveal className="reveal mx-auto max-w-[820px] text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D4A574]">
            Chapter 05
          </p>
          <h2 className="mt-6 font-serif text-4xl uppercase leading-[1.05] tracking-tight text-[#E7C787] md:text-6xl">
            Data in.
            <br />
            <span className="italic text-[#F5EDE1]">Luxury out.</span>
          </h2>
        </div>

        {/* Pipeline */}
        <div className="relative mt-24">
          {/* Flowing horizontal line */}
          <svg
            className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-16 -translate-y-1/2 md:block"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0 30 L1000 30"
              stroke="#D4A574"
              strokeOpacity="0.4"
              strokeWidth="0.5"
              strokeDasharray="6 6"
            />
          </svg>

          <div className="relative grid grid-cols-1 items-center gap-14 md:grid-cols-[minmax(0,1fr)_auto_auto_auto_minmax(0,1fr)] md:gap-6">
            {/* SOURCES — vertical stack of icon dots feeding right */}
            <div>
              <p className="mb-6 text-center text-[10px] uppercase tracking-[0.3em] text-[#D4A574] md:text-left">
                Sources
              </p>
              <div className="grid grid-cols-3 gap-3 md:grid-cols-2">
                {SOURCE_ICONS.map(({ Icon, label }, i) => (
                  <div
                    key={label}
                    data-reveal
                    className="reveal flex items-center gap-2 rounded-full border border-[#D4A574]/25 bg-[#1A130E]/60 px-3 py-2"
                    style={{ transitionDelay: `${i * 60}ms` }}
                    aria-label={label}
                  >
                    <Icon strokeWidth={1.5} className="h-4 w-4 text-[#D4A574]" />
                    <span className="text-[11px] tracking-wide text-[#F5EDE1]/70">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CUSTOMER 360 — a unified orb */}
            <div
              data-reveal
              className="reveal relative mx-auto flex aspect-square w-[180px] items-center justify-center rounded-full"
            >
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#D4A574]/10" />
              <div className="absolute inset-3 rounded-full border border-[#D4A574]/50" />
              <div className="absolute inset-6 rounded-full border border-[#D4A574]/30" />
              <div className="relative flex flex-col items-center gap-2 text-center">
                <UserRound
                  className="h-10 w-10 text-[#E7C787]"
                  strokeWidth={1.4}
                />
                <p className="font-serif text-sm italic text-[#E7C787]">
                  Customer 360
                </p>
              </div>
            </div>

            {/* Connector arrow */}
            <div
              className="hidden text-2xl text-[#D4A574] md:block"
              aria-hidden
            >
              →
            </div>

            {/* AI ENGINE — brain */}
            <div
              data-reveal
              className="reveal mx-auto flex aspect-square w-[180px] items-center justify-center rounded-2xl bg-[#1A130E] shadow-[0_20px_50px_-20px_rgba(212,165,116,0.35)]"
            >
              <div className="absolute" />
              <div className="flex flex-col items-center gap-2 text-center">
                <BrainCircuit
                  className="h-12 w-12 text-[#E7C787]"
                  strokeWidth={1.3}
                />
                <p className="font-serif text-sm italic text-[#E7C787]">
                  AI Engine
                </p>
              </div>
            </div>

            {/* ACTIONS — output icons radiating out */}
            <div>
              <p className="mb-6 text-center text-[10px] uppercase tracking-[0.3em] text-[#D4A574] md:text-right">
                In Action
              </p>
              <div className="grid grid-cols-3 gap-3 md:grid-cols-2">
                {ACTION_ICONS.map(({ Icon, label }, i) => (
                  <div
                    key={label + i}
                    data-reveal
                    className="reveal flex items-center gap-2 rounded-full bg-[#D4A574] px-3 py-2 text-[#0F0B08]"
                    style={{ transitionDelay: `${i * 60}ms` }}
                    aria-label={label}
                  >
                    <Icon strokeWidth={1.8} className="h-4 w-4" />
                    <span className="text-[11px] font-medium tracking-wide">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* IMPACT — three enormous numbers, almost no words */}
        <div className="mt-28 grid grid-cols-1 gap-10 border-t border-[#D4A574]/25 pt-14 md:grid-cols-3 md:gap-6">
          {[
            { v: "+20%", l: "direct bookings" },
            { v: "75%", l: "profile completeness" },
            { v: "8+", l: "AI models live" },
          ].map((s, i) => (
            <div
              key={s.l}
              data-reveal
              className="reveal text-center"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="font-serif text-6xl leading-none tracking-tight text-[#E7C787] md:text-7xl">
                {s.v}
              </span>
              <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-[#F5EDE1]/60">
                {s.l}
              </p>
            </div>
          ))}
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


const TO_BE_STAGES: {
  n: string;
  stage: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  promise: string;
  value: string;
}[] = [
  { n: "1", stage: "Discover", icon: Sparkles, promise: "AI-curated experiences", value: "Real-time contextual recommendations" },
  { n: "2", stage: "Book", icon: Tag, promise: "Best rates, exclusive offers", value: "Personalized offers" },
  { n: "3", stage: "Arrive", icon: UserCheck, promise: "Seamless arrival & recognition", value: "<20 min service resolution" },
  { n: "4", stage: "Stay", icon: UtensilsCrossed, promise: "Predictive service & experiences", value: "Real-time contextual recommendations" },
  { n: "5", stage: "Checkout", icon: CreditCard, promise: "Effortless checkout & digital billing", value: "One-click experience" },
  { n: "6", stage: "Return", icon: Gift, promise: "Stay connected, exclusive benefits", value: "Higher CLV & repeat stays" },
];

const JOURNEY_IMPACT = [
  { icon: Smile, label: "NPS" },
  { icon: Users, label: "Loyalty Engagement" },
  { icon: Bookmark, label: "Direct Booking" },
  { icon: TrendingUp, label: "Guest Lifetime Value" },
];

function ChapterToBeJourney() {
  return (
    <section className="bg-[#F7F2EA] py-28 md:py-40">
      <Container>
        <ChapterHeader
          number="08"
          eyebrow="To-Be Customer Journey"
          title="One guest. One view. One seamless experience."
          intro="The same six stages — reimagined as continuous moments of recognition, powered by the Customer 360 profile and the AI concierge layer."
        />

        {/* Stage cards */}
        <div data-reveal className="reveal grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
          {TO_BE_STAGES.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.stage}
                className="relative flex flex-col rounded-2xl border border-[#D4A574]/40 bg-gradient-to-b from-[#FBF6EC] to-[#F3EADA] p-6 shadow-[0_1px_0_rgba(61,40,23,0.04)]"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Number chip */}
                <div className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-[#C9A227] font-editorial text-sm text-[#0E2A24] shadow-sm">
                  {s.n}
                </div>

                <div className="mt-3 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#0E2A24]">
                  {s.stage}
                </div>

                {/* Icon medallion */}
                <div className="mt-5 flex justify-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#0E2A24] ring-1 ring-[#C9A227]/60 ring-offset-2 ring-offset-[#F3EADA]">
                    <Icon className="h-8 w-8 text-[#C9A227]" strokeWidth={1.4} />
                  </div>
                </div>

                <p className="mt-6 text-center text-[13px] font-medium leading-snug text-[#1F1F1F]">
                  {s.promise}
                </p>

                <div className="mx-auto mt-4 h-px w-10 bg-[#C9A227]/60" />

                <p className="mt-4 text-center text-[12px] leading-relaxed text-[#3D2817]/70">
                  {s.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Journey Impact bar */}
        <div data-reveal className="reveal mt-20">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-[#3D2817]/25" />
            <span className="font-editorial text-lg italic text-[#3D2817]/80">Journey Impact</span>
            <span className="h-px w-16 bg-[#3D2817]/25" />
          </div>

          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-[auto_1fr]">
            {/* NPS medallion */}
            <div className="flex items-center justify-center">
              <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[#0E2A24] ring-1 ring-[#C9A227]/70 ring-offset-4 ring-offset-[#F7F2EA]">
                <div className="font-editorial text-4xl text-[#C9A227] leading-none">78+</div>
                <div className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#C9A227]/90">
                  NPS Target
                </div>
                <Star className="mt-1.5 h-3 w-3 fill-[#C9A227] text-[#C9A227]" />
              </div>
            </div>

            {/* KPI strip */}
            <div className="rounded-2xl bg-[#0E2A24] px-6 py-6 md:px-10">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {JOURNEY_IMPACT.map((k) => {
                  const Icon = k.icon;
                  return (
                    <div key={k.label} className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C9A227]/50">
                        <Icon className="h-5 w-5 text-[#C9A227]" strokeWidth={1.4} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold uppercase leading-tight tracking-[0.14em] text-[#EFE2C9]">
                          {k.label}
                        </span>
                        <TrendingUp className="h-3.5 w-3.5 text-[#C9A227]" strokeWidth={2} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer promise */}
          <div className="mt-10 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.32em] text-[#3D2817]/55">
            <span className="h-px w-16 bg-[#3D2817]/25" />
            <span>One guest · One view · One seamless experience</span>
            <span className="h-px w-16 bg-[#3D2817]/25" />
          </div>
        </div>
      </Container>
    </section>
  );
}


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
    { k: "100%", t: "DPDP Compliance Target", sub: "Compliance" },
    { k: "Role-based", t: "Data Governance", sub: "Access" },
    { k: "Consent-led", t: "Personalization", sub: "Responsible AI" },
  ];
  const principles = [
    { icon: ShieldCheck, t: "Protect guest data", d: "always" },
    { icon: Handshake, t: "Earn trust", d: "everyday" },
    { icon: Lock, t: "Respect privacy", d: "always" },
  ];
  return (
    <section className="bg-[#0F0B08] py-28 text-[#F5EDE1] md:py-40">
      <Container>
        <div data-reveal className="reveal mb-16 text-center md:mb-24">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#D4B678]">
            Chapter 11 · Trust
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Data Privacy &amp; Trust
          </h2>
          <p className="mt-6 text-[12px] uppercase tracking-[0.4em] text-[#F5EDE1]/60">
            Luxury requires trust
          </p>
          <div className="mx-auto mt-8 h-px w-16 bg-[#D4B678]" />
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-10">
          {/* Left — Shield medallion + connectors */}
          <div data-reveal className="reveal relative flex justify-center lg:justify-end">
            <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-br from-[#3A2A1A] to-[#1A130E] shadow-[0_0_60px_-15px_rgba(212,182,120,0.5)] md:h-72 md:w-72">
              <div className="absolute inset-3 rounded-full border border-[#D4B678]/30" />
              <ShieldCheck
                className="relative h-28 w-28 text-[#E7C787] md:h-36 md:w-36"
                strokeWidth={1.1}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="h-10 w-10 text-[#0F0B08] md:h-12 md:w-12" strokeWidth={2.2} style={{ transform: "translateY(6px)" }} />
              </div>
            </div>
            {/* Dashed connectors — desktop only */}
            <svg
              className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[380px] w-[220px] -translate-y-1/2 lg:block"
              viewBox="0 0 220 380"
              fill="none"
              aria-hidden
            >
              {[70, 190, 310].map((y, i) => (
                <g key={i}>
                  <path
                    d={`M 10 190 C 90 190, 90 ${y}, 210 ${y}`}
                    stroke="#D4B678"
                    strokeWidth="1"
                    strokeDasharray="3 5"
                    opacity="0.55"
                  />
                  <circle cx="210" cy={y} r="3.5" fill="#D4B678" />
                  <circle cx="10" cy="190" r="3.5" fill="#D4B678" />
                </g>
              ))}
            </svg>
          </div>

          {/* Middle — Three pillar chips */}
          <div className="flex flex-col gap-5">
            {pillars.map((p, i) => (
              <div
                key={p.t}
                data-reveal
                className="reveal rounded-2xl border border-[#D4B678]/40 bg-[#1A130E]/60 px-8 py-6 text-center"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <p className="font-serif text-3xl leading-none tracking-tight text-[#E7C787] md:text-4xl">
                  {p.k}
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-[#F5EDE1]/75">
                  {p.t}
                </p>
              </div>
            ))}
          </div>

          {/* Right — Principles panel */}
          <div
            data-reveal
            className="reveal rounded-2xl border border-[#D4B678]/40 bg-[#1A130E]/40 p-8 md:p-10"
          >
            <ul className="space-y-8">
              {principles.map((pr) => (
                <li key={pr.t} className="flex items-center gap-5">
                  <pr.icon className="h-10 w-10 shrink-0 text-[#E7C787]" strokeWidth={1.3} />
                  <div>
                    <p className="text-[13px] uppercase tracking-[0.24em] text-[#F5EDE1]">
                      {pr.t}
                    </p>
                    <p className="mt-1 text-[13px] uppercase tracking-[0.24em] text-[#F5EDE1]/60">
                      {pr.d}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-reveal className="reveal mt-20 border-t border-[#D4B678]/30 pt-8 text-center">
          <p className="text-[12px] uppercase tracking-[0.4em] text-[#D4B678]">
            Trust is the foundation of luxury personalization
          </p>
        </div>
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

function NextProject() {
  return (
    <section className="bg-[#0F0B08] px-6 py-24 md:px-12 md:py-32">
      <Container>
        <div data-reveal className="reveal border-t-2 border-b-2 border-[#F5EDE1]/40 py-16 md:py-24">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#E7C787]">
            Next Project
          </p>
          <Link to="/projects/meetcraft" className="group mt-4 block">
            <h3 className="font-serif text-6xl leading-[0.95] tracking-tight text-[#F5EDE1] transition-colors duration-300 group-hover:text-[#E7C787] md:text-[8rem]">
              MeetCraft <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-3">→</span>
            </h3>
            <p className="mt-4 font-editorial text-xl italic text-[#F5EDE1]/70 md:text-2xl">
              What if networking was intentional?
            </p>
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-14">
            <Link
              to="/projects/meetcraft"
              className="inline-flex items-center gap-2 bg-[#E7C787] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.24em] text-[#0F0B08] transition-all duration-300 hover:bg-[#F5EDE1]"
            >
              Read Next Case Study <span aria-hidden>→</span>
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 border-2 border-[#F5EDE1] px-8 py-4 text-[13px] font-bold uppercase tracking-[0.24em] text-[#F5EDE1] transition-all duration-300 hover:bg-[#F5EDE1] hover:text-[#0F0B08]"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}


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
      <NextProject />
      <Footer />
    </main>
  );
}
