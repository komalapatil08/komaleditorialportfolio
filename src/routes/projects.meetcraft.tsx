import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import chapter1Room from "@/assets/meetcraft-chapter1-room.png.asset.json";


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
                  <span className="italic text-foreground/90">That's where the story began.</span>
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


      {/* CHAPTER 2 ——————————————————————————————————————————— */}
      <section className="pt-40 md:pt-56">
        <Container>
          <ChapterHeader number="Two" eyebrow="Research" title="We Stopped Guessing." />
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-x-20 md:gap-y-24">
            <div className="md:col-span-6">
              <ImagePlaceholder ratio="aspect-[4/5]" label="Interview" />
            </div>
            <div className="md:col-span-6 flex flex-col justify-center">
              <Prose>
                Placeholder — methodology written like a paragraph, not a
                bullet list. Interviews, observation, listening for patterns.
              </Prose>
              <div
                data-reveal
                className="reveal mt-10 border border-border p-6 md:p-8"
              >
                <p className="text-[10.5px] uppercase tracking-[0.3em] text-muted-foreground">
                  Interview Snippet
                </p>
                <p className="mt-4 font-editorial text-xl italic leading-[1.4] text-foreground/85 md:text-2xl">
                  "Placeholder for a verbatim quote from an interview — kept
                  raw, unedited, human."
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Attendee, 27 · Bengaluru
                </p>
              </div>
            </div>

            <div className="md:col-span-12">
              <ImagePlaceholder
                ratio="aspect-[16/9]"
                label="Affinity mapping · workshop wall"
                caption="Placeholder — sticky notes clustered into the questions that mattered."
              />
            </div>

            {/* Stats row */}
            <div className="md:col-span-12 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
              {["1 in 3", "48 hrs", "27", "6"].map((n, i) => (
                <div key={i} data-reveal className="reveal">
                  <p className="font-serif text-5xl leading-[1] tracking-tight text-foreground md:text-6xl">
                    {n}
                  </p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                    Placeholder statistic
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CHAPTER 3 — The Turn ————————————————————————————————— */}
      <section className="pt-40 md:pt-56">
        <Container>
          <ChapterHeader
            number="Three"
            eyebrow="The Turn"
            title="The Moment Everything Changed."
          />
        </Container>

        <div className="mt-10 md:mt-16">
          <div className="mx-auto max-w-[1600px] px-6 md:px-12">
            <ImagePlaceholder ratio="aspect-[21/9]" label="Full-width photograph" />
          </div>
        </div>

        <Container className="mt-16 md:mt-24">
          <PullQuote attribution="Field note, week four">
            Placeholder — the one sentence that reframed the entire project.
          </PullQuote>
          <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-12">
            <div className="md:col-span-6 md:col-start-4">
              <Prose>
                Placeholder — the paragraph that explains why this moment
                mattered. Written softly. No exclamation marks.
              </Prose>
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
