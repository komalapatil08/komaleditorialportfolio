import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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

type Project = {
  title: string;
  status: "Live Case Study" | "Coming Soon";
  number: string;
};

const projects: Project[] = [
  { number: "01", title: "MeetCraft", status: "Live Case Study" },
  { number: "02", title: "KalaVansh", status: "Coming Soon" },
  { number: "03", title: "Taj Hotels Digital Transformation", status: "Coming Soon" },
  { number: "04", title: "Notion Growth Strategy", status: "Coming Soon" },
  { number: "05", title: "Customer Segmentation", status: "Coming Soon" },
  { number: "06", title: "Agile Project", status: "Coming Soon" },
  { number: "07", title: "Consulting Case Study", status: "Coming Soon" },
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
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Nav() {
  const [active, setActive] = useState<string>("work");
  useEffect(() => {
    const onScroll = () => {
      const work = document.getElementById("work");
      const achievements = document.getElementById("achievements");
      const connect = document.getElementById("connect");
      const y = window.scrollY + 120;
      if (connect && y >= connect.offsetTop) setActive("connect");
      else if (achievements && y >= achievements.offsetTop) setActive("achievements");
      else if (work && y >= work.offsetTop) setActive("work");
      else setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link = (id: string, label: string) => (
    <a
      href={`#${id}`}
      className="group relative text-[13px] tracking-wide text-foreground/80 transition-colors hover:text-foreground"
    >
      {label}
      <span
        className={`absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--gold)] transition-transform duration-500 ${
          active === id ? "scale-x-100" : "group-hover:scale-x-50"
        }`}
      />
    </a>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
        <a href="#top" className="font-serif text-lg tracking-tight text-foreground">
          Komal Patil
        </a>
        <nav className="flex items-center gap-7 md:gap-10">
          {link("work", "All Projects")}
          {link("achievements", "Achievements")}
          {link("connect", "Let’s Connect")}
          <a
            href="#resume"
            className="inline-flex items-center gap-1.5 border-b border-foreground pb-0.5 text-[13px] font-medium tracking-wide text-foreground transition-opacity hover:opacity-70"
          >
            Resume
            <span aria-hidden className="text-[11px]">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const portraitRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const el = portraitRef.current;
      if (!el) return;
      const y = window.scrollY;
      // Slow elegant fade across first ~80vh
      const fadeEnd = window.innerHeight * 0.8;
      const p = Math.min(1, Math.max(0, y / fadeEnd));
      const eased = p * p; // ease-in for slow start
      el.style.opacity = String(1 - eased);
      el.style.transform = `translateY(${y * 0.08}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative">
      <div className="mx-auto grid min-h-screen max-w-[1400px] grid-cols-1 items-center gap-12 px-6 pb-24 pt-32 md:grid-cols-[45%_1fr] md:gap-16 md:px-12 md:pt-40">
        {/* Portrait */}
        <div
          ref={portraitRef}
          className="relative aspect-[7/9] w-full overflow-hidden will-change-transform"
        >
          <img
            src={portrait}
            alt="Portrait of Komal Patil"
            width={896}
            height={1280}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Copy */}
        <div className="max-w-xl">
          <p className="mb-10 text-[15px] tracking-wide text-muted-foreground">
            Hi there <span aria-hidden>👋</span>
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-foreground md:text-7xl">
            I’m Komal.
          </h1>
          <div className="mt-12 h-px w-16 bg-[var(--gold)]" />
          <p className="mt-12 text-xl leading-[1.55] text-foreground/85 md:text-2xl">
            Before you scroll,
            <br />
            there’s something I’d like you to know about me.
          </p>
        </div>
      </div>

      {/* scroll hint */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        Scroll
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        {/* Block 1 */}
        <div
          data-reveal
          className="reveal py-[28vh] text-center font-serif text-4xl leading-[1.15] tracking-tight md:text-6xl"
        >
          I like collecting questions.
        </div>

        <Arrow />

        {/* Block 2 */}
        <div
          data-reveal
          className="reveal py-[22vh] text-center text-2xl leading-[1.5] text-foreground/85 md:text-3xl"
        >
          The kind that keep me awake,
          <br />
          send me down research rabbit holes,
          <br />
          and eventually become products.
        </div>

        <Arrow />

        {/* Block 3 — vertical words */}
        <div
          data-reveal
          className="reveal flex flex-col items-center gap-6 py-[24vh] text-center font-serif text-3xl leading-tight md:text-5xl"
        >
          <span>People.</span>
          <span>Communities.</span>
          <span>Culture.</span>
          <span>Behavior.</span>
          <span>Connections.</span>
        </div>

        <Arrow />

        {/* Block 4 */}
        <div
          data-reveal
          className="reveal py-[24vh] text-center text-2xl leading-[1.5] text-foreground/85 md:text-3xl"
        >
          <p>
            Every once in a while,
            <br />
            <br />
            one of those questions
            <br />
            becomes something worth building.
          </p>
          <p className="mt-16 font-serif text-3xl text-foreground md:text-4xl">
            Here are a few
            <br />
            I’ve had the chance to explore.
          </p>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <div data-reveal className="reveal flex justify-center">
      <span className="text-xl text-muted-foreground" aria-hidden>
        ↓
      </span>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const isLive = p.status === "Live Case Study";
  return (
    <article
      data-reveal
      className="reveal group relative flex aspect-[4/5] flex-col justify-between border border-border bg-background p-7 transition-all duration-500 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-[0_20px_40px_-30px_rgba(31,31,31,0.25)] md:p-9"
    >
      <div className="flex items-start justify-between">
        <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          {p.number}
        </span>
        {isLive ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            Live Case Study
          </span>
        ) : (
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Coming Soon
          </span>
        )}
      </div>

      <div>
        <h3 className="font-serif text-3xl leading-[1.1] tracking-tight text-foreground md:text-[2.25rem]">
          {p.title}
        </h3>
        <div className="mt-8 flex items-center justify-between">
          <span className="text-[12px] tracking-wide text-muted-foreground">
            {isLive ? "Read the story" : "In the works"}
          </span>
          <span
            aria-hidden
            className="text-foreground/60 transition-transform duration-500 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section id="work" className="relative pt-24 md:pt-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div data-reveal className="reveal mb-16 flex items-end justify-between md:mb-24">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Featured Work
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight md:text-6xl">
              A few questions,
              <br />
              built into something.
            </h2>
          </div>
          <span className="hidden text-sm text-muted-foreground md:block">
            {String(projects.length).padStart(2, "0")} pieces
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="connect"
      className="mt-32 border-t border-border"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28">
        <div id="achievements" className="sr-only" />
        <div data-reveal className="reveal grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Let’s Connect
            </p>
            <h3 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              Have a question
              <br />
              worth building?
            </h3>
          </div>
          <div className="flex flex-col justify-end gap-3 text-base md:items-end md:text-right">
            <a className="story-link" href="mailto:hello@komalpatil.com">
              hello@komalpatil.com
            </a>
            <a className="story-link" href="#" id="resume">
              Resume ↗
            </a>
            <a className="story-link" href="#">
              LinkedIn ↗
            </a>
          </div>
        </div>
        <div className="mt-20 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>© {new Date().getFullYear()} Komal Patil</span>
          <span>Made with intention</span>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Story />
      <Work />
      <Footer />
    </main>
  );
}
