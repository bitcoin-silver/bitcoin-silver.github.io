import { motion } from "framer-motion";
import { Check, CircleDashed, Loader } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { fadeUpStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Status = "completed" | "in-progress" | "planned";

interface Milestone {
  text: string;
  status: Status;
  date?: string;
}

interface Phase {
  year: string;
  title: string;
  items: Milestone[];
}

const PHASES: Phase[] = [
  {
    year: "2025",
    title: "Foundation & launch",
    items: [
      {
        text: "Core wallet for Windows and Linux released",
        status: "completed",
        date: "August 20, 2025",
      },
      {
        text: "Mobile wallet released for Android",
        status: "completed",
        date: "August 15, 2025",
      },
      {
        text: "Community building and exchange listing preparation",
        status: "completed",
        date: "September 10, 2025",
      },
      { text: "NESTEX listing completed", status: "completed" },
    ],
  },
  {
    year: "2026",
    title: "Expansion & ecosystem growth",
    items: [
      {
        text: "Mobile and web wallet enhancements",
        status: "completed",
        date: "August 10, 2026",
      },
      {
        text: "NONKYC listing completed",
        status: "completed",
        date: "August 31, 2026",
      },
      {
        text: "CoinGecko listing completed",
        status: "completed",
        date: "September 2, 2026",
      },
      {
        text: "CoinMarketCap listing",
        status: "in-progress",
        date: "September 12, 2026",
      },
    ],
  },
  {
    year: "2027",
    title: "Planning & future development",
    items: [{ text: "To be announced", status: "planned" }],
  },
  {
    year: "2028",
    title: "Long-term vision",
    items: [{ text: "To be announced", status: "planned" }],
  },
];

const STATUS_META: Record<
  Status,
  { icon: typeof Check; className: string; label: string }
> = {
  completed: {
    icon: Check,
    className: "border-success/30 bg-success/10 text-success",
    label: "Completed",
  },
  "in-progress": {
    icon: Loader,
    className: "border-warning/30 bg-warning/10 text-warning",
    label: "In progress",
  },
  planned: {
    icon: CircleDashed,
    className: "border-border bg-surface-2 text-muted-foreground",
    label: "Planned",
  },
};

export const RoadmapSection = () => {
  return (
    <section id="roadmap" className="section hairline-top">
      <div className="shell">
        <SectionHeading
          eyebrow="Roadmap"
          title="Where Bitcoin Silver is heading"
          description="What already shipped, what is in flight, and what comes next — updated as milestones land."
        />

        <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
          {PHASES.map((phase, phaseIndex) => {
            const done = phase.items.filter(
              (item) => item.status === "completed",
            ).length;

            return (
              <motion.div key={phase.year} {...fadeUpStagger(phaseIndex)}>
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card edge-light">
                  {/* Jahr steht über dem Titel, nicht daneben — bei vier
                      Spalten nebeneinander wird es sonst zu eng. */}
                  <header className="border-b border-border bg-surface-2/60 px-6 py-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-display text-2xl font-semibold tabular text-brand">
                        {phase.year}
                      </span>
                      <span className="rounded-full border border-border bg-surface-3 px-2 py-0.5 text-xs tabular text-muted-foreground">
                        {done}/{phase.items.length}
                      </span>
                    </div>
                    <h3 className="mt-1.5 font-display text-lg font-semibold text-foreground">
                      {phase.title}
                    </h3>
                  </header>

                  <ul className="flex-1 space-y-4 px-6 py-6">
                    {phase.items.map((item) => {
                      const meta = STATUS_META[item.status];
                      const Icon = meta.icon;

                      return (
                        <li key={item.text} className="flex items-start gap-3">
                          <span
                            className={cn(
                              "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
                              meta.className,
                            )}
                            title={meta.label}
                          >
                            <Icon
                              className={cn(
                                "h-3.5 w-3.5",
                                item.status === "in-progress" && "animate-spin",
                              )}
                              aria-hidden="true"
                            />
                            <span className="sr-only">{meta.label}</span>
                          </span>

                          <div className="min-w-0">
                            <p
                              className={cn(
                                "text-sm leading-relaxed",
                                item.status === "completed"
                                  ? "text-foreground"
                                  : "text-muted-foreground",
                              )}
                            >
                              {item.text}
                            </p>
                            {item.date && (
                              <p className="mt-0.5 text-xs text-muted-foreground/70">
                                {item.date}
                              </p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
