import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useBlockchainData } from "@/hooks/useBlockchainData";
import { calculateSupplyProgress } from "@/utils/tokenomicsCalculations";
import SupplyEmissionChart from "@/components/tokenomics/SupplyEmissionChart";
import SupplyGaugeCard from "@/components/tokenomics/SupplyGaugeCard";
import BlockRewardScheduleCard from "@/components/tokenomics/BlockRewardScheduleCard";
import BitcoinComparisonCard from "@/components/tokenomics/BitcoinComparisonCard";
import RemainingSupplyCard from "@/components/tokenomics/RemainingSupplyCard";
import { SectionHeading } from "./SectionHeading";
import { fadeUp, fadeUpStagger } from "@/lib/motion";

export default function TokenomicsSection() {
  const { stats, loading, isLiveData } = useBlockchainData();

  const currentBlockHeight = stats?.blockCount ?? 0;
  const circulatingSupply = stats?.moneySupply ?? 0;
  const supplyProgress = calculateSupplyProgress(
    currentBlockHeight,
    circulatingSupply,
  );

  return (
    <section id="tokenomics" className="section hairline-top">
      <div className="shell">
        <SectionHeading
          eyebrow="Tokenomics"
          title="A supply you can verify"
          description="21.47 million BTCS, halved every 210,000 blocks. The schedule is fixed in consensus — these charts just read it back."
        />

        <motion.div {...fadeUp} className="mb-4 min-w-0">
          <Card className="p-6 transition-colors duration-200 hover:border-line-strong">
            <SupplyEmissionChart currentBlockHeight={currentBlockHeight} />
          </Card>
        </motion.div>

        {/* `min-w-0` ist hier nicht kosmetisch: Grid-Items haben per Default
            `min-width: auto`, wodurch Recharts' ResponsiveContainer beim
            ersten Messen 0 bzw. -1 zurückbekam (Konsolen-Warnung). */}
        <div className="grid gap-4 lg:grid-cols-2">
          <motion.div {...fadeUpStagger(0)} className="min-w-0">
            <SupplyGaugeCard
              circulating={supplyProgress.circulating}
              maxSupply={supplyProgress.maxSupply}
              percentageMined={supplyProgress.percentageMined}
              isLiveData={isLiveData}
            />
          </motion.div>

          <motion.div {...fadeUpStagger(1)} className="min-w-0">
            <BlockRewardScheduleCard
              currentBlockHeight={currentBlockHeight}
              blocksUntilHalving={supplyProgress.blocksUntilHalving}
              daysUntilHalving={supplyProgress.daysUntilHalving}
            />
          </motion.div>

          <motion.div {...fadeUpStagger(2)} className="min-w-0">
            <BitcoinComparisonCard />
          </motion.div>

          <motion.div {...fadeUpStagger(3)} className="min-w-0">
            <RemainingSupplyCard
              circulating={supplyProgress.circulating}
              remainingSupply={supplyProgress.remainingSupply}
              percentageMined={supplyProgress.percentageMined}
              currentBlockReward={supplyProgress.currentBlockReward}
              currentBlockHeight={currentBlockHeight}
              isLiveData={isLiveData}
            />
          </motion.div>
        </div>

        {loading && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Loading live blockchain data…
          </p>
        )}

        {!loading && !isLiveData && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Live data is temporarily unavailable — the figures below come from
            the fixed emission schedule.
          </p>
        )}
      </div>
    </section>
  );
}
