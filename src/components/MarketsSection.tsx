import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { BrandMark } from "./BrandMark";
import { EXCHANGES, TRACKERS, type MarketEntry } from "@/lib/markets";
import { fadeUp, fadeUpStagger } from "@/lib/motion";
import { useSpotlight } from "@/lib/useSpotlight";

const ExchangeCard = ({
  entry,
  index,
}: {
  entry: MarketEntry;
  index: number;
}) => {
  const spotlight = useSpotlight<HTMLAnchorElement>();

  return (
    <motion.div {...fadeUpStagger(index)} className="min-w-0">
      <a
        {...spotlight}
        href={entry.url}
        target="_blank"
        rel="noopener noreferrer"
        className="spotlight group flex h-full items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card edge-light transition-colors duration-200 hover:border-line-strong"
      >
        <BrandMark
          mark={entry.mark}
          logo={entry.logo}
          className="h-12 w-12 transition-colors duration-200 group-hover:border-brand/40"
        />

        <div className="min-w-0 flex-1">
          <div className="font-display text-base font-semibold text-foreground">
            {entry.name}
          </div>
          <div className="mt-0.5 text-sm tabular text-muted-foreground">
            {entry.meta}
          </div>
        </div>

        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-brand"
          aria-hidden="true"
        />
      </a>
    </motion.div>
  );
};

export const MarketsSection = () => {
  return (
    <section id="markets" className="section hairline-top">
      <div className="shell">
        <SectionHeading
          eyebrow="Markets"
          title="Trade and track BTCS"
          description="Bitcoin Silver is listed on independent exchanges and indexed by the major market trackers. Nothing here is run by the project."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {EXCHANGES.map((entry, index) => (
            <ExchangeCard
              key={`${entry.name}-${entry.meta}`}
              entry={entry}
              index={index}
            />
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-10">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Tracked on
          </h3>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
            {TRACKERS.map((entry) => (
              <a
                key={entry.name}
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-border bg-surface-1/60 p-3.5 transition-colors duration-200 hover:border-brand/40"
              >
                <BrandMark
                  mark={entry.mark}
                  logo={entry.logo}
                  className="h-10 w-10"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-foreground">
                    {entry.name}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {entry.meta}
                  </div>
                </div>
                <ArrowUpRight
                  className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60 transition-colors duration-200 group-hover:text-brand"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
