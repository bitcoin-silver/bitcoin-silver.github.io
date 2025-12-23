import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ------------------ DATA ------------------ */

type Contributor = {
  name: string;
  amount: number;
  type: "USDT" | "BTCS";
};

const CONTRIBUTORS: Contributor[] = [
  { name: "CrazyFrogUK", amount: 425, type: "USDT" },
  { name: "vis_tos", amount: 5, type: "USDT" },
  { name: "N0_N4m391", amount: 3, type: "USDT" },
  { name: "SatoshiCryptoPro", amount: 492.5, type: "BTCS" },
];


/* ------------------ HELPERS ------------------ */

const formatAmount = (v: number) =>
  v.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/* ------------------ COMPONENT ------------------ */

export default function FundraisingBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  /* SORT */
  const usdt = CONTRIBUTORS.filter(c => c.type === "USDT").sort(
    (a, b) => b.amount - a.amount
  );
  const btcs = CONTRIBUTORS.filter(c => c.type === "BTCS").sort(
    (a, b) => b.amount - a.amount
  );
  const contributors = [...usdt, ...btcs];

  /* TOTALS */
  const totalUSDT = usdt.reduce((s, c) => s + c.amount, 0);
  const totalBTCS = btcs.reduce((s, c) => s + c.amount, 0);

  /* TOGGLE */
  const [show, setShow] = useState<"USDT" | "BTCS">("USDT");

  useEffect(() => {
    const id = setInterval(
      () => setShow(v => (v === "USDT" ? "BTCS" : "USDT")),
      5000
    );
    return () => clearInterval(id);
  }, []);

  /* 👉 MESSE EXAKTE BREITE */
  useEffect(() => {
    if (!containerRef.current) return;
    setScrollWidth(containerRef.current.scrollWidth / 2);
  }, [contributors]);

  /* SPEED: px pro Sekunde (mobile wirkt automatisch schneller) */
  const SPEED = 80; // px / sec
  const duration = scrollWidth / SPEED;

  return (
    <div className="w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="container flex flex-col gap-2 py-2 text-sm text-gray-200 md:flex-row md:items-center md:gap-6">

        {/* LEFT */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-gray-400 whitespace-nowrap">
            💰 CoinEx Listing Fund
          </span>

          <motion.span
            key={show}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="font-semibold text-white whitespace-nowrap"
          >
            {show === "USDT"
              ? `${formatAmount(totalUSDT)} USDT collected`
              : `${formatAmount(totalBTCS)} BTCS collected`}
          </motion.span>
        </div>

        {/* SCROLLER */}
        <div className="relative overflow-hidden md:flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/60 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/60 to-transparent z-10" />

          <motion.div
            ref={containerRef}
            className="flex gap-3 whitespace-nowrap will-change-transform"
            animate={{ x: [0, -scrollWidth] }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...contributors, ...contributors].map((c, i) => (
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
      </div>
    </div>
  );
}
