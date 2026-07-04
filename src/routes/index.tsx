import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Mail, Linkedin } from "lucide-react";
import portrait from "@/assets/komal-portrait.png.asset.json";
import meetcraftImg from "@/assets/meetcraft.png.asset.json";
import kalavanshImg from "@/assets/kalavansh.png.asset.json";
import tajImg from "@/assets/taj.png.asset.json";

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
  image: string;
  alt: string;
};

const featured: FeaturedProject[] = [
  {
    question: "What if networking was intentional?",
    title: "MeetCraft",
    tag: "Intent-based Networking • Product Strategy",
    image: meetcraftImg.url,
    alt: "Two women in conversation at a MeetCraft event",
  },
  {
    question: "What if every handmade product told a story?",
    title: "KalaVansh",
    tag: "Marketplace Design • Artisan Ecosystem",
    image: kalavanshImg.url,
    alt: "An artisan embroidering a floral motif by hand",
  },
  {
    question: "What does personalized luxury actually look like?",
    title: "Taj Digital Transformation",
    tag: "Digital Transformation • Guest Experience",
    image: tajImg.url,
    alt: "A Taj host serving tea overlooking the lake at golden hour",
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
            className="resume-cta inline-flex items-center gap-1.5 border border-[var(--gold)] px-4 py-2 text-[13px] font-bold uppercase tracking-[0.14em] text-foreground transition-colors duration-300"
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
 * Story paragraphs gently gain emphasis near the focal line.
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
          translate = Math.min(8, norm * 8);
        } else {
          opacity = Math.max(0.5, 1 - norm * 0.7);
          translate = -Math.min(10, norm * 10);
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
    "font-editorial text-[1.45rem] md:text-[1.75rem] leading-[1.5] tracking-[-0.005em] text-charcoal/90 font-normal max-w-[32ch]";

  return (
    <section id="top" ref={sectionRef} className="relative">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 pt-24 md:grid-cols-[45%_1fr] md:gap-20 md:px-12 md:pt-28">
        {/* Sticky portrait */}
        <div className="md:sticky md:top-24 md:h-[calc(100vh-7rem)]">
          <div ref={portraitRef} className="will-change-[opacity]" style={{ transition: "opacity 200ms linear" }}>
            <img
              src={portrait.url}
              alt="Portrait of Komal Patil"
              width={896}
              height={1280}
              className="w-full"
              style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.07))" }}
            />
          </div>
        </div>

        {/* Story column */}
        <div className="flex flex-col">
          <div className="flex min-h-[calc(100vh-8rem)] flex-col justify-center">
            <p
              data-story
              className="story-step mb-6 font-editorial text-4xl italic leading-[1.15] tracking-tight text-foreground/85 md:text-[3rem]"
            >
              Hi there <span aria-hidden>👋</span>
            </p>
            <h1
              data-story
              className="story-step font-serif text-6xl font-medium leading-[1] tracking-[-0.02em] md:text-[7.5rem]"
            >
              <span style={{ color: "var(--gold)" }}>
                I’m<span style={{ display: "inline-block", width: "0.1em" }} />Komal.
              </span>
            </h1>
            <p data-story className={`story-step mt-8 ${editorial}`}>
              Before you scroll,
              <br />
              there’s something I’d like you to know about me.
            </p>
          </div>

          <div className="mt-[8vh] flex min-h-[36vh] items-center">
            <p
              data-story
              className="story-step font-editorial text-[2.25rem] md:text-[3rem] leading-[1.1] tracking-[-0.015em] text-charcoal font-medium italic max-w-[18ch]"
            >
              I like collecting questions.
            </p>
          </div>

          <div className="flex min-h-[34vh] items-center">
            <p data-story className={`story-step ${editorial}`}>
              The kind that keep me awake,
              <br />
              send me down research rabbit holes,
              <br />
              and eventually become products.
            </p>
          </div>

          {/* Five words — stacked vertically */}
          <div className="flex min-h-[42vh] flex-col justify-center">
            <div data-story className="story-step font-editorial text-[2rem] md:text-[2.75rem] leading-[1.3] tracking-tight text-charcoal font-medium italic">
              <span className="block">People.</span>
              <span className="block">Communities.</span>
              <span className="block">Culture.</span>
              <span className="block">Behavior.</span>
              <span className="block">Connections.</span>
            </div>
          </div>

          <div className="flex min-h-[38vh] items-center">
            <p data-story className={`story-step ${editorial}`}>
              Every once in a while,
              <br />
              one of those questions
              <br />
              becomes something worth building.
            </p>
          </div>

          <div className="flex min-h-[18vh] items-center pb-2">
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
      className="project-card reveal group relative flex h-full flex-col border border-border/70 bg-background p-7 transition-all duration-[400ms] ease-in-out hover:-translate-y-1.5 hover:border-foreground/40 hover:shadow-[0_50px_90px_-40px_rgba(31,31,31,0.45)] md:p-9"
    >
      {/* 1. Question */}
      <p className="card-question font-serif text-[1.7rem] leading-[1.15] tracking-tight text-foreground transition-colors duration-[400ms] group-hover:text-foreground md:text-[2rem]">
        {p.question}
      </p>

      {/* 2. Editorial photograph */}
      <div className="mt-7 overflow-hidden rounded-[2px] bg-muted md:mt-9">
        <div className="aspect-[4/5] w-full overflow-hidden">
          <img
            src={p.image}
            alt={p.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[500ms] ease-in-out group-hover:scale-[1.025]"
          />
        </div>
      </div>

      {/* 3. Project name + 4. Editorial tag */}
      <div className="mt-7 md:mt-8">
        <h3 className="font-serif text-[1.1rem] leading-[1.25] tracking-tight text-foreground/90 md:text-[1.2rem]">
          {p.title}
        </h3>
        <p className="card-tag mt-3 text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground transition-colors duration-[400ms] group-hover:text-[color:var(--gold,#C9A227)]">
          {p.tag}
        </p>
        <p className="reveal-hover mt-5 text-[11.5px] uppercase tracking-[0.22em] text-foreground/80">
          Read Case Study →
        </p>
      </div>
    </article>
  );
}

function FeaturedProjects() {
  return (
    <section id="work" className="relative pt-12 md:pt-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div
          data-reveal
          className="reveal mb-10 flex items-end justify-between gap-6 md:mb-14"
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
          {featured.map((p) =>
            p.title === "MeetCraft" ? (
              <Link key={p.title} to="/projects/meetcraft" className="block h-full">
                <FeaturedCard p={p} />
              </Link>
            ) : (
              <FeaturedCard key={p.title} p={p} />
            ),
          )}
        </div>

      </div>
    </section>
  );
}

type EditorialCard = {
  icon?: string;
  title: string;
  meta?: string;
  body?: string;
  tag?: string;
};

function SectionHeader({ label, heading }: { label: string; heading: string }) {
  return (
    <div data-reveal className="reveal mb-10 md:mb-14">
      <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </p>
      <h2 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
        {heading}
      </h2>
    </div>
  );
}

function EditorialEntry({ c }: { c: EditorialCard }) {
  return (
    <article
      data-reveal
      className="reveal border border-border bg-background p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_18px_36px_-28px_rgba(31,31,31,0.28)] md:p-10"
    >
      <p className="font-serif text-3xl leading-[1.2] text-foreground md:text-[2rem]">
        {c.icon && <span aria-hidden className="mr-2">{c.icon}</span>}
        {c.title}
      </p>
      {c.meta && (
        <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {c.meta}
        </p>
      )}
      {c.body && (
        <p className="mt-4 text-base leading-[1.6] text-foreground/75 md:text-[1.05rem]">
          {c.body}
        </p>
      )}
      {c.tag && (
        <p className="mt-4 text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground">
          {c.tag}
        </p>
      )}
    </article>
  );
}

function Achievements() {
  const items: EditorialCard[] = [
    {
      icon: "🏆",
      title: "Skillathon Winner",
      body: "For MeetCraft — an intent-based networking platform.",
    },
    {
      icon: "🌏",
      title: "Shortlisted — CAUSE 2026",
      body: "For KalaVansh — an artisan marketplace platform.",
    },
  ];
  return (
    <section id="achievements" className="relative pt-24 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeader label="Achievements" heading="Moments Worth Marking" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((c) => (
            <EditorialEntry key={c.title} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  const items: EditorialCard[] = [
    {
      title: "Institute of Product Leadership",
      body: "Technology Management MBA",
      meta: "2025 – Present",
    },
    {
      title: "D. Y. Patil Institute of Technology",
      body: "B.Tech in Bioengineering",
      meta: "2021 – 2025",
    },
  ];
  return (
    <section id="education" className="relative pt-24 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeader label="Education" heading="Building the Foundation" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((c) => (
            <EditorialEntry key={c.title} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items: EditorialCard[] = [
    {
      title: "Food Monk Consultants",
      body: "Product Development Intern",
      meta: "Feb 2025 – Jun 2025",
      tag: "Product Innovation • Beverage R&D",
    },
    {
      title: "Rebel Foods",
      body: "Quality Assurance Intern",
      meta: "Dates to be updated",
      tag: "Cloud Kitchens • Food Safety • Operations Excellence",
    },
  ];
  return (
    <section id="experience" className="relative pt-24 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <SectionHeader label="Experience" heading="Where Theory Met Practice" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((c) => (
            <EditorialEntry key={c.title} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Connect() {
  return (
    <section id="connect" className="relative pt-24 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div data-reveal className="reveal">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Let’s Connect
          </p>
          <h2 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
            Let’s Connect
          </h2>
          <p className="mt-6 max-w-2xl font-editorial text-xl leading-[1.5] text-foreground/80 md:text-2xl">
            If something here sparked your curiosity, let’s connect.
          </p>
          <div className="mt-10 flex flex-col gap-4 text-lg md:text-xl">
            <a
              className="story-link inline-flex w-fit items-center gap-3"
              href="mailto:komalapatil08@gmail.com"
            >
              <Mail size={20} aria-hidden className="text-[var(--gold)]" />
              komalapatil08@gmail.com
            </a>
            <a
              className="story-link inline-flex w-fit items-center gap-3"
              href="https://www.linkedin.com/in/komalpatil"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={20} aria-hidden className="text-[var(--gold)]" />
              Komal Patil | LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-28 border-t border-border">
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
      <Education />
      <Experience />
      <Connect />
      <Footer />
    </main>
  );
}
