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
  tag: string;
};

const featured: FeaturedProject[] = [
  {
    question: "What if networking was intentional?",
    title: "MeetCraft",
    tag: "Community Platform • Product Strategy",
  },
  {
    question: "Who made this?",
    title: "KalaVansh",
    tag: "Marketplace • Social Impact",
  },
  {
    question: "Can hospitality be predictive?",
    title: "Taj Hotels Digital Transformation",
    tag: "Digital Transformation • Hospitality",
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

function scrollToTop() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          className="font-serif text-[1.35rem] tracking-tight text-foreground"
          aria-label="Komal Patil — back to top"
        >
          Komal Patil
        </a>
        <nav className="flex items-center gap-7 md:gap-10">
          <Link
            to="/projects"
            className="story-link text-[13px] tracking-wide text-foreground/80"
          >
            All Projects
          </Link>
          <a
            href="#achievements"
            className="story-link text-[13px] tracking-wide text-foreground/80"
          >
            Achievements
          </a>
          <a
            href="#connect"
            className="story-link text-[13px] tracking-wide text-foreground/80"
          >
            Let’s Connect
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="resume-cta inline-flex items-center gap-1.5 border border-[var(--gold)] px-4 py-2 text-[13px] font-semibold tracking-wide text-foreground transition-colors duration-300"
          >
            Resume <span aria-hidden>↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

/**
 * Hero: portrait sticks on the left and fades as the story unfolds.
 * Story paragraphs gently gain emphasis near the focal line; previous lines
 * remain softly visible so the section reads like prose, not slides.
 */
function HeroStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paragraphs = Array.from(
      document.querySelectorAll<HTMLElement>("[data-story]"),
    );

    const onScroll = () => {
      const section = sectionRef.current;
      const el = portraitRef.current;
      if (section && el) {
        const rect = section.getBoundingClientRect();
        const total = section.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        const fade = Math.min(1, Math.pow(p, 1.2) * 1.1);
        el.style.opacity = String(1 - fade);
      }

      if (reduced) {
        paragraphs.forEach((p) => {
          p.style.opacity = "1";
          p.style.transform = "none";
        });
        return;
      }

      const focal = window.innerHeight * 0.45;
      paragraphs.forEach((para) => {
        const r = para.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = center - focal;
        const norm = Math.abs(dist) / (window.innerHeight * 0.6);
        let opacity: number;
        let translate: number;
        if (dist > 0) {
          opacity = Math.max(0.45, 1 - norm * 0.75);
          translate = Math.min(10, norm * 10);
        } else {
          opacity = Math.max(0.5, 1 - norm * 0.7);
          translate = -Math.min(12, norm * 12);
        }
        para.style.opacity = String(Math.min(1, opacity));
        para.style.transform = `translate3d(0, ${translate}px, 0)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const editorial =
    "font-editorial text-[1.6rem] md:text-[2rem] leading-[1.4] tracking-[-0.005em] text-charcoal font-medium max-w-[34ch]";

  return (
    <section id="top" ref={sectionRef} className="relative">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 pt-28 md:grid-cols-[45%_1fr] md:gap-20 md:px-12 md:pt-32">
        {/* Sticky portrait */}
        <div className="md:sticky md:top-28 md:h-[calc(100vh-8rem)]">
          <div
            ref={portraitRef}
            className="relative aspect-[7/9] w-full overflow-hidden will-change-[opacity]"
            style={{ transition: "opacity 200ms linear" }}
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
            <p
              data-story
              className="story-step mb-8 font-editorial text-2xl italic leading-tight tracking-tight text-foreground/80 md:text-[1.75rem]"
            >
              Hi there <span aria-hidden>👋</span>
            </p>
            <h1
              data-story
              className="story-step font-serif text-6xl font-medium leading-[1] tracking-[-0.02em] md:text-[7.5rem]"
            >
              <span style={{ color: "var(--gold)" }}>
                I’m<span style={{ display: "inline-block", width: "0.18em" }} />Komal.
              </span>
            </h1>
            <p
              data-story
              className={`story-step mt-12 ${editorial}`}
            >
              Before you scroll,
              <br />
              there’s something I’d like you to know about me.
            </p>
          </div>

          <div className="flex min-h-[50vh] items-center">
            <p
              data-story
              className="story-step font-editorial text-[2.5rem] md:text-[3.5rem] leading-[1.1] tracking-[-0.015em] text-charcoal font-medium italic max-w-[18ch]"
            >
              I like collecting questions.
            </p>
          </div>

          <div className="flex min-h-[50vh] items-center">
            <p data-story className={`story-step ${editorial}`}>
              The kind that keep me awake,
              <br />
              send me down research rabbit holes,
              <br />
              and eventually become products.
            </p>
          </div>

          {/* Vertical list — one editorial block */}
          <div className="flex min-h-[60vh] flex-col justify-center">
            <ul data-story className="story-step space-y-2 md:space-y-3">
              {["People.", "Communities.", "Culture.", "Behavior.", "Connections."].map(
                (w) => (
                  <li
                    key={w}
                    className="font-serif text-4xl leading-[1.1] tracking-tight text-charcoal md:text-6xl"
                  >
                    {w}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="flex min-h-[55vh] items-center">
            <p data-story className={`story-step ${editorial}`}>
              Every once in a while,
              <br />
              one of those questions
              <br />
              becomes something worth building.
            </p>
          </div>

          <div className="flex min-h-[30vh] items-center pb-4">
            <div
              data-reveal
              className="reveal h-px w-24 bg-[var(--gold)]"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ p }: { p: FeaturedProject }) {
  return (
    <article
      data-reveal
      className="project-card reveal group relative flex aspect-[4/5] flex-col justify-between border border-border bg-background p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-foreground/40 hover:shadow-[0_30px_60px_-30px_rgba(31,31,31,0.35)] md:p-9"
    >
      <p className="card-question font-serif italic text-[1.75rem] leading-[1.25] tracking-tight text-foreground/85 md:text-[2rem]">
        “{p.question}”
      </p>

      <div>
        <h3 className="font-serif text-2xl leading-[1.15] tracking-tight text-foreground md:text-[1.75rem]">
          {p.title}
        </h3>
        <p className="card-tag mt-4 text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground">
          {p.tag}
        </p>
        <p className="reveal-hover mt-5 text-[12px] tracking-wide text-foreground/70">
          Read the Story →
        </p>
      </div>
    </article>
  );
}

function FeaturedProjects() {
  return (
    <section id="work" className="relative pt-16 md:pt-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div
          data-reveal
          className="reveal mb-12 flex items-end justify-between gap-6 md:mb-16"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Featured Projects
            </p>
            <h2 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
              Questions I’ve Explored
            </h2>
          </div>
          <Link
            to="/projects"
            className="story-link shrink-0 text-sm tracking-wide text-foreground md:text-base"
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
            <a className="story-link w-fit" href="mailto:hello@komalpatil.com">
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
