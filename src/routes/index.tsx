import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Komal Patil — Product, Strategy & Story" },
      {
        name: "description",
        content:
          "The personal portfolio of Komal Patil — an editorial look at the questions, products and case studies I've had the chance to explore.",
      },
      { property: "og:title", content: "Komal Patil — Portfolio" },
      {
        property: "og:description",
        content:
          "An editorial portfolio. A few questions worth building, and the work that came from them.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

type FeaturedProject = {
  question: string;
  title: string;
  status: "Live Case Study" | "Coming Soon";
};

const featured: FeaturedProject[] = [
  {
    question: "What if networking was intentional?",
    title: "MeetCraft",
    status: "Live Case Study",
  },
  {
    question: "Who made this?",
    title: "KalaVansh",
    status: "Coming Soon",
  },
  {
    question: "Can hospitality be predictive?",
    title: "Taj Hotels Digital Transformation",
    status: "Coming Soon",
  },
];

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
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
        <a href="#top" className="font-serif text-lg tracking-tight text-foreground">
          Komal Patil
        </a>
        <nav className="flex items-center gap-7 md:gap-10">
          <Link
            to="/projects"
            className="text-[13px] tracking-wide text-foreground/80 transition-colors hover:text-foreground"
          >
            All Projects
          </Link>
          <a
            href="#achievements"
            className="text-[13px] tracking-wide text-foreground/80 transition-colors hover:text-foreground"
          >
            Achievements
          </a>
          <a
            href="#connect"
            className="text-[13px] tracking-wide text-foreground/80 transition-colors hover:text-foreground"
          >
            Let’s Connect
          </a>
        </nav>
      </div>
    </header>
  );
}

/**
 * Hero: portrait sticks on the left, story paragraphs reveal one-by-one on the right.
 * The portrait fades out across the scroll of this section so it has fully
 * disappeared before Featured Projects begins.
 */
function HeroStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      const el = portraitRef.current;
      if (!section || !el) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      // Fade slowly at first, then disappear in the last 25%.
      const fade = Math.min(1, Math.pow(p, 1.4) * 1.15);
      el.style.opacity = String(1 - fade);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const paragraph =
    "reveal text-foreground/85 text-2xl md:text-3xl leading-[1.5] tracking-tight";
  const serifLine =
    "reveal font-serif text-foreground text-3xl md:text-5xl leading-[1.15] tracking-tight";

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 pt-32 md:grid-cols-[45%_1fr] md:gap-16 md:px-12 md:pt-40">
        {/* Sticky portrait */}
        <div className="md:sticky md:top-32 md:h-[calc(100vh-10rem)]">
          <div
            ref={portraitRef}
            className="relative aspect-[7/9] w-full overflow-hidden will-change-[opacity] transition-opacity duration-200"
          >
            <img
              src={portrait}
              alt="Portrait of Komal Patil"
              width={896}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Story column */}
        <div className="flex flex-col">
          <div className="flex min-h-[60vh] flex-col justify-center">
            <p data-reveal className="reveal mb-10 text-[15px] tracking-wide text-muted-foreground">
              Hi there <span aria-hidden>👋</span>
            </p>
            <h1
              data-reveal
              className="reveal font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl"
            >
              <span style={{ color: "var(--gold)" }}>I’m Komal.</span>
            </h1>
            <div data-reveal className="reveal mt-12 h-px w-16 bg-[var(--gold)]" />
            <p
              data-reveal
              className="reveal mt-12 text-xl leading-[1.55] text-foreground/85 md:text-2xl"
            >
              Before you scroll,
              <br />
              there’s something I’d like you to know about me.
            </p>
          </div>

          <div className="flex min-h-[80vh] items-center">
            <p data-reveal className={serifLine}>
              I like collecting questions.
            </p>
          </div>

          <div className="flex min-h-[80vh] items-center">
            <p data-reveal className={paragraph}>
              The kind that keep me awake,
              <br />
              send me down research rabbit holes,
              <br />
              and eventually become products.
            </p>
          </div>

          <div className="flex min-h-[80vh] flex-col justify-center gap-5">
            {["People.", "Communities.", "Culture.", "Behavior.", "Connections."].map(
              (w) => (
                <span
                  key={w}
                  data-reveal
                  className="reveal font-serif text-3xl leading-tight md:text-5xl"
                >
                  {w}
                </span>
              ),
            )}
          </div>

          <div className="flex min-h-[80vh] items-center">
            <p data-reveal className={paragraph}>
              Every once in a while,
              <br />
              <br />
              one of those questions
              <br />
              becomes something worth building.
            </p>
          </div>

          <div className="flex min-h-[70vh] items-center pb-24">
            <p data-reveal className={serifLine}>
              Here are a few
              <br />
              I’ve had the chance to explore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusLabel({ status }: { status: FeaturedProject["status"] }) {
  if (status === "Live Case Study") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
        Live Case Study
      </span>
    );
  }
  return (
    <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
      Coming Soon
    </span>
  );
}

function FeaturedCard({ p }: { p: FeaturedProject }) {
  return (
    <article
      data-reveal
      className="reveal group relative flex aspect-[4/5] flex-col justify-between border border-border bg-background p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_18px_36px_-28px_rgba(31,31,31,0.28)] md:p-9"
    >
      <p className="font-serif text-xl leading-[1.3] text-foreground/75 md:text-2xl">
        “{p.question}”
      </p>

      <div>
        <h3 className="font-serif text-3xl leading-[1.1] tracking-tight text-foreground md:text-[2.25rem]">
          {p.title}
        </h3>
        <div className="mt-6">
          <StatusLabel status={p.status} />
        </div>
      </div>
    </article>
  );
}

function FeaturedProjects() {
  return (
    <section id="work" className="relative pt-16 md:pt-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div
          data-reveal
          className="reveal mb-16 flex items-end justify-between md:mb-20"
        >
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-6xl">
            Featured Projects
          </h2>
          <Link
            to="/projects"
            className="story-link text-sm tracking-wide text-foreground md:text-base"
          >
            View All Projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featured.map((p) => (
            <FeaturedCard key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="relative pt-28 md:pt-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div data-reveal className="reveal mb-12 md:mb-16">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Achievements
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight md:text-5xl">
            Moments worth marking.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:max-w-2xl">
          <article
            data-reveal
            className="reveal border border-border bg-background p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_18px_36px_-28px_rgba(31,31,31,0.28)] md:p-10"
          >
            <p className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
              <span aria-hidden className="mr-2">🏆</span>
              Skillathon Winner
            </p>
            <p className="mt-5 text-base leading-[1.6] text-foreground/75 md:text-lg">
              Recognized for building and presenting MeetCraft, an intent-based
              networking platform.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Connect() {
  return (
    <section id="connect" className="relative pt-28 md:pt-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div data-reveal className="reveal">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Let’s Connect
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">
            If something here sparked your curiosity, let’s connect.
          </h2>
          <div className="mt-14 flex flex-col gap-4 text-lg md:text-xl">
            <a
              className="story-link w-fit"
              href="mailto:hello@komalpatil.com"
            >
              Email →
            </a>
            <a
              className="story-link w-fit"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-10 text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:px-12">
        <span>© {new Date().getFullYear()} Komal Patil</span>
        <span>Made with intention</span>
      </div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <HeroStory />
      <FeaturedProjects />
      <Achievements />
      <Connect />
      <Footer />
    </main>
  );
}
