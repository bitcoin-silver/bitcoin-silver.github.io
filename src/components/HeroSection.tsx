import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "./ui/button";
import { MarketDropdown } from "./MarketDropdown";
import POWAnimation from "./POWAnimation";
import { riseOnMount, transition } from "@/lib/motion";

const HIGHLIGHTS = [
  { value: "21.47M", label: "Max supply" },
  { value: "5 min", label: "Block time" },
  { value: "SHA-256", label: "Algorithm" },
  { value: "210k", label: "Blocks per halving" },
];

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20 xl:pb-28">
      {/* Dekoration: driftende Lichtfelder und ein feines Raster, beides
          randlos über die volle Breite. */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="aurora" />
        <div className="grid-field" />
      </div>

      <div className="shell relative">
        <div className="grid items-center gap-12 xl:grid-cols-12 xl:gap-16">
          <motion.div {...riseOnMount} className="xl:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-1/70 px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-brand" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              Proof-of-Work · SHA-256 · Fixed supply
            </span>

            <h1 className="mt-7 text-display-2xl">
              <span className="block text-foreground">
                Advancing Bitcoin&rsquo;s legacy
              </span>
              <span className="mt-1 block text-silver">
                The silver standard
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lead text-muted-foreground">
              Bitcoin Silver (BTCS) builds on Bitcoin&rsquo;s proven
              foundation — faster blocks, a fixed supply, and SHA-256
              Proof-of-Work consensus. Secure, transparent and genuinely
              decentralized.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <a
                  href="https://play.google.com/store/apps/details?id=top.bitcoinsilver.wallet2025"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download aria-hidden="true" />
                  Get the mobile wallet
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#wallets">
                  All wallets
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
              <MarketDropdown size="lg" variant="ghost" align="start" />
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-border pt-8 sm:grid-cols-4">
              {HIGHLIGHTS.map((item) => (
                <div key={item.label}>
                  <dt className="sr-only">{item.label}</dt>
                  <dd>
                    <span className="block font-display text-xl font-semibold tabular text-foreground sm:text-2xl">
                      {item.value}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {item.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ y: 26 }}
            animate={{ y: 0 }}
            transition={{ ...transition, delay: 0.1 }}
            className="mx-auto w-full max-w-md xl:col-span-5 xl:mx-0 xl:max-w-none"
          >
            <div className="rounded-2xl border border-border bg-surface-1/70 p-5 shadow-lift edge-light backdrop-blur-md md:p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Latest blocks
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-success" />
                  Live
                </span>
              </div>

              <POWAnimation />

              <p className="mt-5 text-center text-xs text-muted-foreground">
                Every tile is a real block — open it in the explorer
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
