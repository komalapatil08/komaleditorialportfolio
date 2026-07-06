import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import certPM from "@/assets/cert-product-management.pdf.asset.json";
import certPMkt from "@/assets/cert-product-marketing.pdf.asset.json";
import certVPD from "@/assets/cert-value-proposition.pdf.asset.json";
import certInnov from "@/assets/cert-innovation-frameworks.pdf.asset.json";
import certCC from "@/assets/cert-creative-confidence.pdf.asset.json";
import certStory from "@/assets/cert-storytelling.pdf.asset.json";

type Certification = {
  title: string;
  organization: string;
  year: string;
  category: string;
  file: string;
  type: "pdf" | "image";
};

const certifications: Certification[] = [
  {
    title: "Product Management Fundamentals",
    organization: "Institute of Product Leadership",
    year: "2025",
    category: "Product Management",
    file: certPM.url,
    type: "pdf",
  },
  {
    title: "Product Marketing Fundamentals",
    organization: "Institute of Product Leadership",
    year: "2025",
    category: "Product Marketing",
    file: certPMkt.url,
    type: "pdf",
  },
  {
    title: "Value Proposition Design",
    organization: "Institute of Product Leadership",
    year: "2025",
    category: "Strategy",
    file: certVPD.url,
    type: "pdf",
  },
  {
    title: "Innovation Frameworks",
    organization: "Institute of Product Leadership",
    year: "2025",
    category: "Innovation",
    file: certInnov.url,
    type: "pdf",
  },
  {
    title: "Building Creative Confidence",
    organization: "Institute of Product Leadership",
    year: "2025",
    category: "Design Thinking",
    file: certCC.url,
    type: "pdf",
  },
  {
    title: "The Art of Storytelling",
    organization: "Institute of Product Leadership",
    year: "2025",
    category: "Presentation",
    file: certStory.url,
    type: "pdf",
  },
];

function CertificationCard({ c, onOpen }: { c: Certification; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-reveal
      className="reveal group relative flex h-full flex-col border border-border bg-[#FBF8F1] p-7 text-left transition-all duration-[400ms] ease-in-out hover:-translate-y-1.5 hover:border-[color:var(--gold,#C9A227)] hover:shadow-[0_28px_50px_-30px_rgba(31,31,31,0.28)] md:p-8"
      aria-label={`Open ${c.title} certificate`}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-border/70 bg-background/60 font-serif text-[13px] tracking-tight text-foreground/70">
          IPL
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-[color:var(--gold,#C9A227)]">
          <BadgeCheck size={12} aria-hidden />
          Verified
        </span>
      </div>

      <h3 className="mt-8 font-serif text-[1.35rem] leading-[1.2] tracking-tight text-foreground md:text-[1.5rem]">
        {c.title}
      </h3>

      <p className="mt-3 text-[12.5px] leading-[1.5] text-foreground/70">{c.organization}</p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{c.year}</p>

      <div className="mt-auto pt-8">
        <span className="inline-block border border-border/80 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-foreground/70 transition-colors duration-300 group-hover:border-[color:var(--gold,#C9A227)] group-hover:text-[color:var(--gold,#C9A227)]">
          {c.category}
        </span>
      </div>
    </button>
  );
}

function CertificateModal({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const c = certifications[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${c.title} certificate viewer`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md animate-fade-in md:p-10"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Previous certificate"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20 md:left-8"
      >
        <ChevronLeft size={20} aria-hidden />
      </button>

      <button
        type="button"
        aria-label="Next certificate"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20 md:right-8"
      >
        <ChevronRight size={20} aria-hidden />
      </button>

      <button
        type="button"
        aria-label="Close certificate viewer"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20 md:right-6 md:top-6"
      >
        <X size={20} aria-hidden />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[4px] bg-[#FBF8F1] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] animate-scale-in"
      >
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              {c.category} · {c.year}
            </p>
            <h3 className="mt-1 font-serif text-lg leading-tight text-foreground md:text-xl">
              {c.title}
            </h3>
          </div>
          <p className="hidden text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:block">
            {index + 1} / {certifications.length}
          </p>
        </div>

        <div className="relative flex-1 bg-neutral-200">
          {c.type === "pdf" ? (
            <iframe
              key={c.file}
              src={`${c.file}#view=FitH`}
              title={c.title}
              className="h-full w-full"
            />
          ) : (
            <div className="h-full w-full overflow-auto">
              <img src={c.file} alt={c.title} className="mx-auto" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Certifications() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? i : (i - 1 + certifications.length) % certifications.length,
      ),
    [],
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % certifications.length)),
    [],
  );

  return (
    <section id="certifications" className="relative pt-24 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div data-reveal className="reveal mb-10 md:mb-14">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Certifications
          </p>
          <h2 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
            Knowledge That Compounds
          </h2>
          <p className="mt-6 max-w-2xl font-editorial text-lg leading-[1.6] text-foreground/75 md:text-xl">
            Every certification represents another layer of product thinking, business strategy,
            technology, and continuous learning.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {certifications.map((c, i) => (
            <CertificationCard key={c.title} c={c} onOpen={() => setActiveIndex(i)} />
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <CertificateModal index={activeIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </section>
  );
}
