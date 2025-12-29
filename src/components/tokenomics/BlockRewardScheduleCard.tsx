import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Dot } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateHalvingEvents, formatDate } from '@/utils/tokenomicsCalculations';
import { Calendar } from 'lucide-react';

interface BlockRewardScheduleCardProps {
  currentBlockHeight: number;
  blocksUntilHalving: number;
  daysUntilHalving: number;
}

export default function BlockRewardScheduleCard({
  currentBlockHeight,
  blocksUntilHalving,
  daysUntilHalving,
}: BlockRewardScheduleCardProps) {
  const halvingEvents = calculateHalvingEvents();

  // Get first 10 halvings for chart (keep it readable)
  const chartData = halvingEvents.slice(0, 10).map((event) => ({
    halving: event.halvingNumber === 0 ? 'Genesis' : `#${event.halvingNumber}`,
    reward: event.blockReward,
    blockHeight: event.blockHeight,
    date: formatDate(event.date),
    isPast: currentBlockHeight >= event.blockHeight,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold mb-1">Halving {payload[0].payload.halving}</p>
          <p className="text-sm text-muted-foreground">
            Reward: {payload[0].value} BTCS
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Block: {payload[0].payload.blockHeight.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">{payload[0].payload.date}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="p-3 rounded-lg bg-[#222222] text-white">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
        <CardTitle className="text-xl">Block Reward Schedule</CardTitle>
        <CardDescription>Halvings occur every 210,000 blocks</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis
              dataKey="halving"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '11px' }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '11px' }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="stepAfter"
              dataKey="reward"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={(props: any) => {
                const { cx, cy, payload } = props;
                return (
                  <Dot
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill={payload.isPast ? 'hsl(var(--primary))' : 'hsl(var(--muted))'}
                    stroke="hsl(var(--card))"
                    strokeWidth={2}
                  />
                );
              }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-6 p-4 rounded-lg bg-[#222222] space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Next Halving:</span>
            <span className="font-semibold text-yellow-500">
              {blocksUntilHalving.toLocaleString()} blocks
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Estimated Time:</span>
            <span className="font-semibold">
              {daysUntilHalving > 365
                ? `${(daysUntilHalving / 365).toFixed(1)} years`
                : `${Math.round(daysUntilHalving)} days`}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
