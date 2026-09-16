import { useBlockchainData } from "@/hooks/useBlockchainData";
import {
  formatCompactUnits,
  formatHashrate,
  formatNumber,
} from "@/lib/format";

interface TickerItem {
  label: string;
  value: string;
}

/**
 * Durchlaufendes Band mit den aktuellen Netzwerkzahlen.
 *
 * Der Inhalt steht zweimal hintereinander; die Animation schiebt um genau
 * 50 %, wodurch der Umlauf nahtlos wirkt. Die zweite Kopie ist für
 * Screenreader ausgeblendet, sonst liest sie jede Zahl doppelt vor.
 */
export const NetworkTicker = () => {
  const { stats, isLiveData } = useBlockchainData();

  if (!stats || !isLiveData) return null;

  const items: TickerItem[] = [
    { label: "Block height", value: formatNumber(stats.blockCount) },
    { label: "Hashrate", value: formatHashrate(stats.networkHashrate) },
    { label: "Difficulty", value: formatCompactUnits(stats.difficulty) },
    { label: "Peers", value: formatNumber(stats.connectionCount) },
    { label: "Circulating", value: `${formatNumber(stats.moneySupply)} BTCS` },
    { label: "Max supply", value: "21,470,000 BTCS" },
    { label: "Block time", value: "5 min" },
    { label: "Algorithm", value: "SHA-256" },
  ];

  const row = (ariaHidden: boolean) => (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((item) => (
        <li
          key={`${item.label}-${ariaHidden}`}
          className="flex items-center gap-2.5 whitespace-nowrap px-7"
        >
          <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground/70">
            {item.label}
          </span>
          <span className="font-display text-sm font-semibold tabular text-foreground">
            {item.value}
          </span>
          <span
            aria-hidden="true"
            className="ml-4 h-1 w-1 rounded-full bg-brand/50"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="border-y border-border bg-surface-1/50">
      <div className="fade-edges overflow-hidden py-3.5">
        {/* `w-max` ist nötig, damit beide Kopien nebeneinander liegen statt
            sich auf die Containerbreite zu quetschen. */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
};
