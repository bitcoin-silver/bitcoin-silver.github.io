import { motion } from "framer-motion";

const contributors = [
  { name: "CrazyFrogUK", amount: 425 },
  { name: "N0_N4m391", amount: 3 },
];

const GOAL_USDT = 3000;

export default function FundraisingBar() {
  const totalCollected = contributors.reduce((sum, c) => sum + c.amount, 0);
  const progress = Math.min(totalCollected / GOAL_USDT, 1);

  const formattedTotal = totalCollected.toLocaleString("en-US");
  const formattedGoal = GOAL_USDT.toLocaleString("en-US");

  return (
    <div className="w-full border-b border-gray-400/20 bg-black/60 backdrop-blur-md">
      {/* Main container */}
      <div className="container flex flex-col gap-2 py-2 text-sm text-gray-200 md:flex-row md:items-center md:gap-6">

        {/* LEFT / TOP – Static Info */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <span className="text-gray-400 whitespace-nowrap">
            💰 CoinEx Listing Fund
          </span>
          <span className="text-white font-semibold">
            {formattedTotal} USDT collected
          </span>
        </div>

        {/* RIGHT / BOTTOM – Scroller */}
        <div className="relative overflow-hidden md:flex-1">

          {/* Gradient masks */}
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
            whileHover={{ animationPlayState: "paused" }}
          >
            {[...contributors, ...contributors].map((c, i) => (
              <div
                key={i}
                className={`px-3 py-1 rounded-full border text-gray-300 ${
                  c.amount >= 1000
                    ? "bg-white/10 border-white/30"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <span className="font-medium text-white">{c.name}</span>
                <span className="ml-2 text-gray-400">
                  {c.amount.toLocaleString("en-US")} USDT
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA – Desktop only */}
        <a
          href="https://t.me/official_bitcoinsilver"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto hidden md:inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-white hover:bg-white/10 transition"
        >
          Contribute
        </a>
      </div>

      {/* CTA – Mobile only */}
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

      {/* Progress Bar */}
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
