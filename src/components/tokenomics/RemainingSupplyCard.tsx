import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatAbbreviated, calculateDailyEmission } from '@/utils/tokenomicsCalculations';
import { Pickaxe } from 'lucide-react';

interface RemainingSupplyCardProps {
  circulating: number;
  remainingSupply: number;
  percentageMined: number;
  currentBlockReward: number;
  currentBlockHeight: number;
  isLiveData?: boolean;
}

export default function RemainingSupplyCard({
  circulating,
  remainingSupply,
  percentageMined,
  currentBlockReward,
  currentBlockHeight,
  isLiveData = false,
}: RemainingSupplyCardProps) {
  const { dailyEmission, actualBlocksPerDay, theoreticalBlocksPerDay } =
    calculateDailyEmission(currentBlockHeight, currentBlockReward);

  return (
    <Card className="h-full transition-colors duration-200 hover:border-line-strong">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="icon-chip h-11 w-11 text-brand">
            <Pickaxe className="w-6 h-6" />
          </div>
          {isLiveData && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/25">
              Live
            </span>
          )}
        </div>
        <CardTitle>Remaining Supply</CardTitle>
        <CardDescription>BTCS left to mine until max supply</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Mined</span>
            <span>Remaining</span>
          </div>
          <div className="relative h-8 bg-surface-2 rounded-full overflow-hidden">
            <motion.div
              className="absolute h-full bg-gradient-to-r from-primary/80 to-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentageMined}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
              {percentageMined.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-surface-2 p-4 space-y-1">
            <div className="text-xs text-muted-foreground">Total Mined</div>
            <div className="text-lg font-bold text-silver">
              {formatAbbreviated(circulating)}
            </div>
            <div className="text-xs text-muted-foreground">BTCS</div>
          </div>

          <div className="rounded-lg bg-surface-2 p-4 space-y-1">
            <div className="text-xs text-muted-foreground">Left to Mine</div>
            <div className="text-lg font-bold text-yellow-500">
              {formatAbbreviated(remainingSupply)}
            </div>
            <div className="text-xs text-muted-foreground">BTCS</div>
          </div>

          <div className="rounded-lg bg-surface-2 p-4 space-y-1">
            <div className="text-xs text-muted-foreground">Current Reward</div>
            <div className="text-lg font-bold text-primary">
              {currentBlockReward}
            </div>
            <div className="text-xs text-muted-foreground">BTCS/block</div>
          </div>

          <div className="rounded-lg bg-surface-2 p-4 space-y-1">
            <div className="text-xs text-muted-foreground">Daily Emission</div>
            <div className="text-lg font-bold text-primary">
              {formatAbbreviated(dailyEmission)}
            </div>
            <div className="text-xs text-muted-foreground">
              BTCS/day ({actualBlocksPerDay.toFixed(1)} blocks)
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 rounded-lg border border-brand/25 bg-brand/10">
          <p className="text-xs text-muted-foreground">
            Based on actual chain history, approximately{' '}
            <span className="font-semibold text-foreground">
              {formatAbbreviated(dailyEmission)}
            </span>{' '}
            BTCS are mined daily ({actualBlocksPerDay.toFixed(1)} blocks/day avg).
            {Math.abs(actualBlocksPerDay - theoreticalBlocksPerDay) > 5 && (
              <span className="block mt-1 text-yellow-500">
                {actualBlocksPerDay > theoreticalBlocksPerDay ? '⚡ Faster' : '🐢 Slower'} than
                theoretical {theoreticalBlocksPerDay} blocks/day
              </span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
