import { motion } from "framer-motion";
import {
  Blocks,
  Zap,
  Gauge,
  Coins,
  Network,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useBlockchainData } from "@/hooks/useBlockchainData";
import {
  formatCompactUnits,
  formatHashrate,
  formatNumber,
} from "@/lib/format";
import { SectionHeading } from "./SectionHeading";
import { fadeUpStagger } from "@/lib/motion";
import { useCountUp } from "@/lib/useCountUp";
import { useSpotlight } from "@/lib/useSpotlight";

interface StatDefinition {
  label: string;
  hint: string;
  icon: LucideIcon;
  /** Rohwert für die Zähl-Animation; `null`, solange nichts geladen ist. */
  raw: number | null;
  format: (value: number) => string;
}

const StatCard = ({
  stat,
  index,
}: {
  stat: StatDefinition;
  index: number;
}) => {
  const spotlight = useSpotlight<HTMLDivElement>();
  const counted = useCountUp(stat.raw ?? 0);
  const Icon = stat.icon;

  return (
    <motion.div {...fadeUpStagger(index)} className="min-w-0">
      <div
        {...spotlight}
        className="spotlight group h-full rounded-xl border border-border bg-card p-5 shadow-card edge-light transition-colors duration-200 hover:border-line-strong"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <span className="icon-chip h-9 w-9 shrink-0 transition-colors duration-200 group-hover:border-brand/40 group-hover:text-brand">
            <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
          </span>
        </div>

        <p className="mt-4 font-display text-[1.75rem] font-semibold leading-tight tabular text-foreground">
          {stat.raw === null ? (
            <span className="inline-block h-7 w-28 animate-pulse-soft rounded bg-surface-3 align-middle" />
          ) : (
            stat.format(counted)
          )}
        </p>

        <p className="mt-2 text-xs leading-relaxed text-muted-foreground/80">
          {stat.hint}
        </p>
      </div>
    </motion.div>
  );
};

export const StatsSection = () => {
  const { stats, error, isLiveData, updatedAt } = useBlockchainData();

  const definitions: StatDefinition[] = [
    {
      label: "Block height",
      hint: "Blocks mined since genesis",
      icon: Blocks,
      raw: stats?.blockCount ?? null,
      format: (value) => formatNumber(Math.round(value)),
    },
    {
      label: "Network hashrate",
      hint: "Total SHA-256 work securing the chain",
      icon: Zap,
      raw: stats?.networkHashrate ?? null,
      format: formatHashrate,
    },
    {
      label: "Difficulty",
      hint: "Retargets to keep 5-minute blocks",
      icon: Gauge,
      raw: stats?.difficulty ?? null,
      format: formatCompactUnits,
    },
    {
      label: "Circulating supply",
      hint: "Coins in circulation right now",
      icon: Coins,
      raw: stats?.moneySupply ?? null,
      format: (value) => `${formatNumber(Math.round(value))} BTCS`,
    },
    {
      label: "Connected nodes",
      hint: "Peers reachable from our node",
      icon: Network,
      raw: stats?.connectionCount ?? null,
      format: (value) => formatNumber(Math.round(value)),
    },
    {
      label: "Max supply",
      hint: "Hard cap — fixed in consensus",
      icon: Sparkles,
      raw: 21_470_000,
      format: (value) => `${formatNumber(Math.round(value))} BTCS`,
    },
  ];

  return (
    <section className="section-tight">
      <div className="shell">
        <SectionHeading
          eyebrow="Network"
          title="Live network statistics"
          description="Read straight from the Bitcoin Silver explorer and refreshed every 30 seconds."
          action={
            isLiveData ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/25 bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-success" />
                Live
              </span>
            ) : null
          }
        />

        {error && (
          <p className="mb-8 text-center text-sm text-muted-foreground">
            {error}
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
          {definitions.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {updatedAt && (
          <p className="mt-6 text-center text-xs text-muted-foreground/70">
            Last updated{" "}
            {updatedAt.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    </section>
  );
};
