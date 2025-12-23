import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const contributors = [
  { name: "CrazyFrogUK", amount: 425, type: "USDT" },
  { name: "vis_tos", amount: 5, type: "USDT" },
  { name: "N0_N4m391", amount: 3, type: "USDT" },
  { name: "SatoshiCryptoPro", amount: 492.5, type: "BTCS" },
];

const GOAL_USDT = 3000;

const formatAmount = (value: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function FundraisingBar() {
  /* ------------------ SORT & SPLIT ------------------ */
  const usdtContributors = contributors
    .filter(c => c.type === "USDT")
    .sort((a, b) => b.amount - a.amount);

  const btcsContributors = contributors
    .filter(c => c.type === "BTCS")
    .sort((a, b) => b.amount - a.amount);

  const sortedContributors = [...usdtContributors, ...btcsContributors];

  /* ------------------ TOTALS ------------------ */
  const totalUSDT = usdtContributors.reduce((sum, c) => sum + c.amount, 0);
  const totalBTCS = btcsContributors.reduce((sum, c) => sum + c.amount, 0);

  const progress = Math.min(totalUSDT / GOAL_USDT, 1);

  /* ------------------ TOGGLE DISPLAY ------------------ */
  const [showType, setShowType] = useState("USDT");

  useEffect(() => {
    const interval = setInterval(() => {
      setShowType(prev => (prev === "USDT" ? "BTCS" : "USDT"));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formattedGoal = formatAmount(GOAL_USDT);

  return (
    <div className="w-full border-b border-gray-400/20 bg-black/60 backdrop-blur-md">
      {/* Main container */}
      <div className="container flex flex-col gap-2 py-2 text-sm text-gray-200 md:flex-row md:items-center md:gap-6">

        {/* LEFT / TOP */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <span className="text-gray-400 whitespace-nowrap">
            💰 CoinEx Listing Fund
          </span>

          <motion.span
            key={showType}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-white font-semibold whitespace-nowrap"
          >
            {showType === "USDT"
              ? `${formatAmount(totalUSDT)} USDT collected`
              : `${formatAmount(totalBTCS)} BTCS collected`}
          </motion.span>
        </div>

        {/* RIGHT / SCROLLER */}
        <div className="relative overflow-hidden md:flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/60 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/60 to-transparent z-10" />

          <motion.div
            className="flex gap-3 whitespace-nowrap"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 22,
              ease: "linear",
            }}
          >
            {[...sortedContributors, ...sortedContributors].map((c, i) => (
              <div
                key={i}
                className={`px-3 py-1 rounded-full border ${
                  c.amount >= 100
                    ? "bg-white/10 border-white/30"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <span className="font-medium text-white">{c.name}</span>
                <span className="ml-2 text-gray-400">
                  {formatAmount(c.amount)} {c.type}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA – Desktop */}
        <a
          href="https://t.me/official_bitcoinsilver/20973"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto hidden md:inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-white hover:bg-white/10 transition"
        >
          Contribute
        </a>
      </div>

      {/* CTA – Mobile */}
      <div className="container md:hidden pb-2">
        <a
          href="https://t.me/official_bitcoinsilver/20973"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center rounded-full border border-white/20 py-2 text-white hover:bg-white/10 transition"
        >
          Contribute
        </a>
      </div>

      {/* PROGRESS BAR */}
      <div className="container pb-2">
        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gray-300 to-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="mt-1 text-xs text-gray-400 text-right">
          Goal: {formattedGoal} USDT
        </div>
      </div>
    </div>
  );
}
