import { motion } from 'framer-motion';
import { Button } from './ui/button';
import POWAnimation from './POWAnimation';

export const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-12 md:pt-32 md:pb-16 overflow-hidden">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <span className="px-4 py-1.5 rounded-full bg-gray-200/10 border border-gray-400/30 text-gray-300 text-sm font-medium shadow-sm shadow-gray-500/10">
                  Proof-of-Work • SHA-256
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Advancing Bitcoin’s Legacy
                <br />
                <span className="bg-gradient-to-r from-[#bfbfbf] via-gray-200 to-white bg-clip-text text-transparent">
                  The Silver Standard of Decentralization
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl">
                Bitcoin Silver (BTCS) builds on Bitcoin’s proven foundation — faster blocks, fixed supply, and SHA-256 Proof-of-Work consensus. 
                Secure. Transparent. Truly decentralized.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="https://play.google.com/store/apps/details?id=top.bitcoinsilver.wallet2025" className="gap-2 flex items-center" target="_blank" rel="noopener noreferrer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Mobile Wallet (Google Play)
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#wallets" className="gap-2 flex items-center">
                  More Wallets
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://trade.nestex.one/spot/BTCS_USDT?ref=FB4BBA1A84F3CD2B0E90536167A74353" target="_blank" rel="noopener noreferrer">
                  Invest Now
                </a>
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/40">
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-[#bfbfbf] to-white bg-clip-text text-transparent">21.47M</div>
                <div className="text-sm text-muted-foreground">Max Supply</div>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-[#bfbfbf] to-white bg-clip-text text-transparent">5 min</div>
                <div className="text-sm text-muted-foreground">Block Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-[#bfbfbf] to-white bg-clip-text text-transparent">SHA-256</div>
                <div className="text-sm text-muted-foreground">Algorithm</div>
              </div>
            </div>
          </motion.div>

          {/* Right content - POW Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative rounded-2xl border border-gray-400/30 bg-card/50 backdrop-blur p-6 shadow-lg shadow-gray-500/10 overflow-hidden max-w-[375px] w-full flex flex-col items-center gap-6">

              <POWAnimation />

              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Live Proof-of-Work Mining Visualization
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
