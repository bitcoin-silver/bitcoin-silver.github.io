import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { useBlockchainData } from '@/hooks/useBlockchainData';
import { calculateSupplyProgress } from '@/utils/tokenomicsCalculations';
import SupplyEmissionChart from '@/components/tokenomics/SupplyEmissionChart';
import SupplyGaugeCard from '@/components/tokenomics/SupplyGaugeCard';
import BlockRewardScheduleCard from '@/components/tokenomics/BlockRewardScheduleCard';
import BitcoinComparisonCard from '@/components/tokenomics/BitcoinComparisonCard';
import RemainingSupplyCard from '@/components/tokenomics/RemainingSupplyCard';

export default function TokenomicsSection() {
  const { stats, loading, isLiveData } = useBlockchainData();

  const currentBlockHeight = stats?.blockCount || 0;
  const circulatingSupply = stats?.moneySupply || 0;

  const supplyProgress = calculateSupplyProgress(currentBlockHeight, circulatingSupply);

  return (
    <section id="tokenomics" className="py-20">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bitcoin Silver Tokenomics
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transparent, predictable supply with a fixed cap of 21.47 million BTCS.
            Secured by proof-of-work and halvings every 210,000 blocks.
          </p>
        </motion.div>

        {/* Supply Emission Chart - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <Card className="p-6 bg-[#262626] border-gray-400/30 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
            <SupplyEmissionChart currentBlockHeight={currentBlockHeight} />
          </Card>
        </motion.div>

        {/* Visualizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Supply Gauge Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <SupplyGaugeCard
              circulating={supplyProgress.circulating}
              maxSupply={supplyProgress.maxSupply}
              percentageMined={supplyProgress.percentageMined}
              isLiveData={isLiveData}
            />
          </motion.div>

          {/* Block Reward Schedule Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <BlockRewardScheduleCard
              currentBlockHeight={currentBlockHeight}
              blocksUntilHalving={supplyProgress.blocksUntilHalving}
              daysUntilHalving={supplyProgress.daysUntilHalving}
            />
          </motion.div>

          {/* Bitcoin Comparison Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <BitcoinComparisonCard />
          </motion.div>

          {/* Remaining Supply Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
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

        {/* Footer Note */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center text-sm text-muted-foreground"
          >
            Loading live blockchain data...
          </motion.div>
        )}

        {!loading && !isLiveData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center text-sm text-muted-foreground"
          >
            Live data temporarily unavailable. Showing calculated values.
          </motion.div>
        )}
      </div>
    </section>
  );
}
