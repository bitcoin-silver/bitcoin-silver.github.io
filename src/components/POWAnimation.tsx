import { useMemo } from "react";
import { motion } from "framer-motion";
import { useBlockchainData } from "@/hooks/useBlockchainData";
import { cn } from "@/lib/utils";

const TILE_COUNT = 16;
const EXPLORER_BLOCK_URL = "https://explorer.bitcoinsilver.top/block";

/**
 * Raster der zuletzt geminten Blöcke.
 *
 * Früher stand unter jeder Kachel ein per `Math.random()` erzeugter Hash —
 * auf einer Blockchain-Seite sind erfundene Hashes ein Glaubwürdigkeits-
 * problem. Jetzt zeigt die Kachel nur, was wirklich bekannt ist: die Höhe.
 *
 * Außerdem lief vorher auf allen 16 Kacheln eine Endlos-Animation, auch
 * außerhalb des Sichtbereichs. Es pulsiert nur noch der neueste Block.
 */
export default function POWAnimation() {
  const { stats, loading } = useBlockchainData();
  const height = stats?.blockCount ?? 0;

  const blocks = useMemo(
    () =>
      height > 0
        ? Array.from({ length: TILE_COUNT }, (_, index) => height - index)
        : [],
    [height],
  );

  if (loading || blocks.length === 0) {
    return (
      <div className="grid grid-cols-4 gap-2.5" aria-busy="true">
        {Array.from({ length: TILE_COUNT }).map((_, index) => (
          <div
            key={index}
            className="aspect-square animate-pulse-soft rounded-lg border border-border bg-surface-2"
          />
        ))}
        <span className="sr-only">Loading latest blocks…</span>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-4 gap-2.5">
      {blocks.map((blockHeight, index) => (
        <motion.li
          key={blockHeight}
          layout
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href={`${EXPLORER_BLOCK_URL}/${blockHeight}`}
            target="_blank"
            rel="noopener noreferrer"
            title={`Block ${blockHeight} on the explorer`}
            className={cn(
              "flex aspect-square flex-col items-center justify-center rounded-lg border text-center transition-colors duration-200",
              index === 0
                ? "animate-pulse-soft border-brand/45 bg-brand/10 text-foreground"
                : "border-border bg-surface-2 text-muted-foreground hover:border-line-strong hover:text-foreground",
            )}
          >
            <span className="text-[0.5625rem] uppercase tracking-wider opacity-70">
              Block
            </span>
            <span className="text-[0.8125rem] font-semibold tabular">
              {blockHeight}
            </span>
          </a>
        </motion.li>
      ))}
    </ul>
  );
}
