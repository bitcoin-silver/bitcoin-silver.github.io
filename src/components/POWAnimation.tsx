import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBlockchainData } from "../hooks/useBlockchainData"; // Pfad ggf. anpassen

interface BlockData {
  index: number;
  hash: string;
}

export default function POWAnimation() {
  const { stats, loading, isLiveData } = useBlockchainData();
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [latestIndex, setLatestIndex] = useState<number | null>(null);
  const [highlight, setHighlight] = useState(false);

  // Hilfsfunktion: simuliert Hashes
  const generateFakeHash = (index: number) =>
    Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");

  useEffect(() => {
    if (!stats) return;

    const count = stats.blockCount;

    setLatestIndex((prev) => {
      if (prev && count > prev) {
        setHighlight(true);
        setTimeout(() => setHighlight(false), 1500);
      }
      return count;
    });

    // Simuliere die letzten 16 Blöcke
    const simulatedBlocks: BlockData[] = Array.from({ length: 16 }, (_, i) => {
      const index = count - i;
      return { index, hash: generateFakeHash(index) };
    });

    setBlocks(simulatedBlocks);
  }, [stats]);

  if (loading) {
    return <div className="text-white">Loading blockchain data...</div>;
  }

  return (
    <div className="w-full relative">
      {/* Highlight für neuen Block */}
      {latestIndex && (
        <motion.div
          key={latestIndex}
          className="absolute inset-0 bg-white/10 blur-2xl pointer-events-none rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: highlight ? [0, 0.5, 0] : 0 }}
          transition={{ duration: 1.2 }}
        />
      )}

      {/* Grid: 4x4 Blöcke */}
      <div className="grid grid-cols-4 gap-3 w-full">
        <AnimatePresence>
          {blocks.map((block) => (
            <motion.div
              key={block.index}
              layout
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="relative w-full aspect-square rounded-xl overflow-hidden cursor-pointer"
              onClick={() =>
                window.open(
                  `https://explorer.bitcoinsilver.top/block/${block.index}`,
                  "_blank"
                )
              }
            >
              {/* Pulsierender Glow */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-white/10 blur-lg"
                animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Block Inhalt */}
              <div
                className="relative w-full h-full rounded-xl border border-white/20 bg-[#2f3030] flex flex-col items-center justify-center text-center text-white shadow-md overflow-hidden transition-colors duration-300 hover:bg-[#3a3b3b]"
                style={{
                  boxShadow:
                    "inset 0 0 8px rgba(255,255,255,0.1), 0 0 10px rgba(255,255,255,0.15)",
                }}
              >
                <span className="text-[10px] text-white/60">Block</span>
                <span className="text-sm font-semibold">{block.index}</span>
                <span className="text-[8px] text-white/50 mt-1 break-all">
                  {block.hash.slice(0, 8)}...
                </span>
              </div>

              {/* Hover-Glow */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-white/20 blur-lg pointer-events-none opacity-0 hover:opacity-20 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
