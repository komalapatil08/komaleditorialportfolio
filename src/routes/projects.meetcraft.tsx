import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import chapter1Room from "@/assets/meetcraft-chapter1-room.png.asset.json";
import interviewKomal from "@/assets/mc-interview-komal.png.asset.json";
import interviewShristy from "@/assets/mc-interview-shristy.png.asset.json";
import interviewPrashant from "@/assets/mc-interview-prashant.png.asset.json";
import surveyEvidence from "@/assets/mc-survey.png.asset.json";
import chapter3Insight from "@/assets/mc-chapter3-insight.png.asset.json";



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
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-visible");
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
   Page
   ———————————————————————————————————————————————————————— */


function MeetCraftPage() {
  useReveal();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* HERO ————————————————————————————————————————————————— */}
      <section id="top" className="relative pt-40 md:pt-48">
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
            <p className="mt-10 max-w-[46ch] text-[1.05rem] leading-[1.7] text-foreground/70 md:text-[1.15rem]">
              A quiet documentary about a loud room — and the product that
              came from paying attention to what people were actually asking
              for.
            </p>
          </div>

          {/* Hero image */}
          <div className="mt-20 md:mt-24">
            <ImagePlaceholder ratio="aspect-[16/9]" label="Hero photograph" />
          </div>

          {/* Meta strip */}
          <div
            data-reveal
            className="reveal mt-20 grid grid-cols-2 gap-y-8 border-y border-border py-8 md:mt-28 md:grid-cols-4"
          >
            {[
              ["Role", "Product Strategy · Research"],
              ["Team", "Four PMs · One Question"],
              ["Timeline", "12 Weeks · Skillathon"],
              ["Outcome", "Winning Concept"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[10.5px] uppercase tracking-[0.3em] text-muted-foreground">
                  {k}
                </p>
                <p className="mt-3 font-serif text-lg leading-[1.3] text-foreground md:text-xl">
                  {v}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CHAPTER 1 ——————————————————————————————————————————— */}
      <section className="pt-40 md:pt-56 pb-16 md:pb-28">
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

      {/* CHAPTER 4 ——————————————————————————————————————————— */}
      <section className="pt-40 md:pt-56">
        <Container>
          <ChapterHeader
            number="Four"
            eyebrow="Exploration"
            title="The Ideas We Walked Away From."
          />
          <Prose>
            Placeholder — a short paragraph about the discipline of saying no.
          </Prose>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <article
                key={i}
                data-reveal
                className="reveal flex aspect-[4/5] flex-col justify-between border border-border p-8"
              >
                <span className="text-[10.5px] uppercase tracking-[0.3em] text-muted-foreground">
                  Concept 0{i} · Rejected
                </span>
                <div>
                  <h3 className="font-serif text-2xl leading-[1.15] text-foreground md:text-3xl">
                    Placeholder concept title
                  </h3>
                  <p className="mt-4 text-[12.5px] leading-[1.6] text-muted-foreground">
                    Why we walked away — one clean sentence of reasoning.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CHAPTER 5 ——————————————————————————————————————————— */}
      <section className="pt-40 md:pt-56">
        <Container>
          <ChapterHeader
            number="Five"
            eyebrow="Strategy"
            title="The Customer Wasn't the User."
          />
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <Prose>
                Placeholder — a paragraph that quietly separates the buyer, the
                user, and the marketplace.
              </Prose>
            </div>
            <div className="md:col-span-7 space-y-6">
              {["The Event Host", "The Attendee", "The Marketplace"].map((t) => (
                <div
                  key={t}
                  data-reveal
                  className="reveal flex items-baseline justify-between border-b border-border pb-6"
                >
                  <p className="font-serif text-xl text-foreground md:text-2xl">
                    {t}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                    Placeholder motivation
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CHAPTER 6 ——————————————————————————————————————————— */}
      <section className="pt-40 md:pt-56">
        <Container>
          <ChapterHeader
            number="Six"
            eyebrow="Trade-offs"
            title="Protecting the Event."
          />
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-6">
              <Prose>
                Placeholder — the decision about what MeetCraft would refuse to
                become. The trade-offs we made to keep the event sacred.
              </Prose>
              <div data-reveal className="reveal mt-10 space-y-4">
                {[
                  ["We chose", "Placeholder decision"],
                  ["Over", "Placeholder alternative"],
                  ["Because", "Placeholder reasoning"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-8 border-b border-border pb-4">
                    <span className="w-24 shrink-0 text-[10.5px] uppercase tracking-[0.3em] text-muted-foreground">
                      {k}
                    </span>
                    <span className="font-serif text-lg text-foreground md:text-xl">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-6">
              <ImagePlaceholder
                ratio="aspect-[4/5]"
                label="Flow diagram · QR Unlock"
                caption="Placeholder — the small mechanic that protected the room."
              />
            </div>
          </div>
        </Container>
      </section>

      {/* CHAPTER 7 ——————————————————————————————————————————— */}
      <section className="pt-40 md:pt-56">
        <Container>
          <ChapterHeader
            number="Seven"
            eyebrow="The Build"
            title="The Product We Chose to Build."
          />
          <Prose>
            Placeholder — a short, quiet introduction to the MVP.
          </Prose>
        </Container>

        <div className="mx-auto mt-16 max-w-[1600px] px-6 md:mt-24 md:px-12">
          <ImagePlaceholder ratio="aspect-[16/9]" label="Product screen · Hero" />
        </div>

        <Container className="mt-24">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
            {[
              "Onboarding — intent, not identity",
              "The Match — quiet, deliberate",
              "The Room — QR unlock",
              "After — the conversation continues",
            ].map((title, i) => (
              <div key={i} className="grid grid-cols-1 gap-6">
                <ImagePlaceholder ratio="aspect-[4/3]" label={`Screen 0${i + 1}`} />
                <div>
                  <p className="text-[10.5px] uppercase tracking-[0.3em] text-muted-foreground">
                    Feature 0{i + 1}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl leading-[1.2] text-foreground md:text-3xl">
                    {title}
                  </h3>
                  <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.7] text-foreground/70">
                    Placeholder — one sentence about the intent behind this
                    screen, not the pixels on it.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CHAPTER 8 ——————————————————————————————————————————— */}
      <section className="pt-40 md:pt-56">
        <Container>
          <ChapterHeader
            number="Eight"
            eyebrow="Validation"
            title="Putting Our Thinking to the Test."
          />
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-7">
              <ImagePlaceholder ratio="aspect-[4/3]" label="Skillathon · presentation" />
            </div>
            <div className="md:col-span-5 flex flex-col justify-center">
              <Prose>
                Placeholder — a paragraph about the day we tested the thinking
                in front of people who had no reason to be kind.
              </Prose>
              <div
                data-reveal
                className="reveal mt-10 border-l border-[var(--gold)] pl-6"
              >
                <p className="font-editorial text-lg italic leading-[1.5] text-foreground/85 md:text-xl">
                  "Placeholder — a sentence from a judge or observer, kept in
                  their voice."
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Placeholder attribution
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CHAPTER 9 — Quiet ending ———————————————————————————— */}
      <section className="pt-40 md:pt-64">
        <Container>
          <div data-reveal className="reveal mx-auto max-w-[720px] text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Chapter Nine · Reflection
            </p>
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
              What This Project Changed.
            </h2>
            <div className="mx-auto mt-10 h-px w-16 bg-[var(--gold)]" />
            <p className="mx-auto mt-14 max-w-[38ch] font-editorial text-xl italic leading-[1.5] text-foreground/80 md:text-2xl">
              Placeholder — one paragraph. Written like the last page of a
              short book.
            </p>
          </div>
        </Container>

        <Container className="pt-40 md:pt-56">
          <div
            data-reveal
            className="reveal flex flex-col items-start justify-between gap-8 border-t border-border pt-12 md:flex-row md:items-end"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                Next
              </p>
              <p className="mt-4 font-serif text-3xl leading-[1.1] text-foreground md:text-5xl">
                Return to the index of questions.
              </p>
            </div>
            <div className="flex gap-8">
              <Link to="/projects" className="story-link text-sm tracking-wide">
                All Projects →
              </Link>
              <Link to="/" className="story-link text-sm tracking-wide">
                Home →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
