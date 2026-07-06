import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import meetcraftImg from "@/assets/meetcraft.png.asset.json";
import kalavanshImg from "@/assets/kalavansh.jpg";

import tajImg from "@/assets/taj.png.asset.json";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "All Projects — Komal Patil" },
      {
        name: "description",
        content:
          "A collection of questions explored through products, strategy and research.",
      },
      { property: "og:title", content: "All Projects — Komal Patil" },
      {
        property: "og:description",
        content:
          "A collection of questions explored through products, strategy and research.",
      },
    ],
  }),
  component: AllProjects,
});

type Project = {
  title: string;
  status: "Live Case Study" | "Coming Soon";
  href?: "/projects/meetcraft";
  image?: string;
  alt?: string;
  tag?: string;
  description?: string;
  prototypeUrl?: string;
};

const projects: Project[] = [
  {
    title: "MeetCraft",
    status: "Live Case Study",
    href: "/projects/meetcraft",
    image: meetcraftImg.url,
    alt: "Two women in conversation at a MeetCraft event",
    tag: "Intent-based Networking • Product Strategy",
    description: "What if networking was intentional?",
    prototypeUrl: "https://meet-craft.vercel.app/",
  },
  {
    title: "Taj Hotels Digital Transformation",
    status: "Coming Soon",
    image: tajImg.url,
    alt: "A Taj host serving tea overlooking the lake at golden hour",
    tag: "Digital Transformation • Guest Experience",
    description: "What does personalized luxury actually look like?",
  },
  {
    title: "KalaVansh",
    status: "Coming Soon",
    image: kalavanshImg,
    alt: "Hands of an Indian artisan painting intricate Meenakari work on a brass vessel",
    tag: "Craft • Storytelling • Product Thinking",
    description: "What if the maker mattered more than the object?",
  },
  { title: "Rebuilding Notion's Growth Strategy", status: "Coming Soon" },
  {
    title: "Customer Segmentation using K-Means Clustering",
    status: "Coming Soon",
  },
  { title: "Agile Project", status: "Coming Soon" },
  { title: "Consulting Case Study", status: "Coming Soon" },
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Card({ p }: { p: Project }) {
  const isLive = p.status === "Live Case Study";
  const clickable = Boolean(p.href);
  const hasImage = Boolean(p.image);

  if (hasImage) {
    const hasPrototype = Boolean(p.prototypeUrl);

    if (clickable && hasPrototype) {
      return (
        <article
          data-reveal
          className="project-card reveal group relative flex h-full flex-col border border-border/70 bg-background p-7 transition-all duration-[400ms] ease-in-out hover:-translate-y-1.5 hover:border-foreground/40 hover:shadow-[0_50px_90px_-40px_rgba(31,31,31,0.45)] md:p-9"
        >
          <div className="overflow-hidden rounded-[2px] bg-muted">
            <Link to={p.href} className="block">
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src={p.image}
                  alt={p.alt || p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[500ms] ease-in-out group-hover:scale-[1.025]"
                />
              </div>
            </Link>
          </div>

          <div className="mt-7 md:mt-8">
            <div className="flex items-center gap-1.5">
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

            <h3 className="mt-4 font-serif text-[1.1rem] leading-[1.25] tracking-tight text-foreground/90 md:text-[1.2rem]">
              <Link to={p.href}>{p.title}</Link>
            </h3>

            {p.description && (
              <p className="mt-2 font-serif text-[1rem] leading-[1.3] tracking-tight text-foreground/60 italic">
                {p.description}
              </p>
            )}

            {p.tag && (
              <p className="card-tag mt-3 text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground transition-colors duration-[400ms] group-hover:text-[color:var(--gold,#C9A227)]">
                {p.tag}
              </p>
            )}

            {isLive && (
              <div className="mt-5 flex flex-col gap-1.5">
                <Link
                  to={p.href}
                  className="reveal-hover inline-block text-[11.5px] uppercase tracking-[0.22em] text-foreground/80"
                >
                  Read Case Study →
                </Link>
                <a
                  href={p.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11.5px] font-medium text-[var(--gold)] transition-all duration-200 hover:underline hover:-translate-y-0.5"
                >
                  🔗 Try the Live Prototype <span aria-hidden className="text-[10px]">↗</span>
                </a>
              </div>
            )}
          </div>
        </article>
      );
    }

    const card = (
      <article
        data-reveal
        className="project-card reveal group relative flex h-full flex-col border border-border/70 bg-background p-7 transition-all duration-[400ms] ease-in-out hover:-translate-y-1.5 hover:border-foreground/40 hover:shadow-[0_50px_90px_-40px_rgba(31,31,31,0.45)] md:p-9"
      >
        <div className="overflow-hidden rounded-[2px] bg-muted">
          <div className="aspect-[4/5] w-full overflow-hidden">
            <img
              src={p.image}
              alt={p.alt || p.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[500ms] ease-in-out group-hover:scale-[1.025]"
            />
          </div>
        </div>

        <div className="mt-7 md:mt-8">
          <div className="flex items-center gap-1.5">
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

          <h3 className="mt-4 font-serif text-[1.1rem] leading-[1.25] tracking-tight text-foreground/90 md:text-[1.2rem]">
            {p.title}
          </h3>

          {p.description && (
            <p className="mt-2 font-serif text-[1rem] leading-[1.3] tracking-tight text-foreground/60 italic">
              {p.description}
            </p>
          )}

          {p.tag && (
            <p className="card-tag mt-3 text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground transition-colors duration-[400ms] group-hover:text-[color:var(--gold,#C9A227)]">
              {p.tag}
            </p>
          )}

          {isLive && (
            <p className="reveal-hover mt-5 text-[11.5px] uppercase tracking-[0.22em] text-foreground/80">
              Read Case Study →
            </p>
          )}
        </div>
      </article>
    );

    if (clickable) {
      return (
        <Link to={p.href} className="block h-full">
          {card}
        </Link>
      );
    }
    return card;
  }

  const inner = (
    <article
      data-reveal
      className={`reveal group relative flex aspect-[4/5] flex-col justify-between border border-border bg-background p-7 transition-all duration-500 ease-out md:p-9 ${
        clickable
          ? "cursor-pointer hover:-translate-y-1 hover:shadow-[0_18px_36px_-28px_rgba(31,31,31,0.28)]"
          : "opacity-90"
      }`}
    >
      <div className="flex items-start justify-between">
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
        <h3 className="font-serif text-3xl leading-[1.1] tracking-tight text-foreground md:text-[2rem]">
          {p.title}
        </h3>
        {clickable && (
          <div className="mt-6 flex items-center justify-between text-[12px] tracking-wide text-muted-foreground">
            <span>Read the story</span>
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        )}
      </div>
    </article>
  );

  if (p.href) {
    return (
      <Link to={p.href} className="block">
        {inner}
      </Link>
    );
  }
  return inner;
}

function AllProjects() {
  useReveal();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
          <Link
            to="/"
            className="font-serif text-lg tracking-tight text-foreground"
          >
            Komal Patil
          </Link>
          <Link
            to="/"
            className="text-[13px] tracking-wide text-foreground/80 transition-colors hover:text-foreground"
          >
            ← Back home
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-40 md:px-12 md:pb-24 md:pt-48">
        <div data-reveal className="reveal max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Index
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
            All Projects
          </h1>
          <p className="mt-8 text-lg leading-[1.6] text-foreground/75 md:text-xl">
            A collection of questions explored through products, strategy and
            research.
          </p>
          <div className="mt-10 h-px w-16 bg-[var(--gold)]" />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-32 md:px-12 md:pb-40">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((p) => (
            <Card key={p.title} p={p} />
          ))}
        </div>
      </section>

      <footer className="mt-12 border-t border-border">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-10 text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:px-12">
          <span>© {new Date().getFullYear()} Komal Patil</span>
          <Link to="/" className="story-link normal-case tracking-wide">
            Back to home
          </Link>
        </div>
      </footer>
    </main>
  );
}
