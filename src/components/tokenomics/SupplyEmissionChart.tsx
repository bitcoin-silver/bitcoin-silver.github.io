import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { generateEmissionSchedule, formatNumber, GENESIS_DATE } from '@/utils/tokenomicsCalculations';

interface SupplyEmissionChartProps {
  currentBlockHeight?: number;
}

export default function SupplyEmissionChart({ currentBlockHeight = 0 }: SupplyEmissionChartProps) {
  // Show emission curve up to 2055 (31 years from genesis) for better readability
  const emissionData = generateEmissionSchedule(currentBlockHeight, 31);
  const currentYear = new Date().getFullYear();

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold mb-1">
            Year: {payload[0].payload.year}
          </p>
          <p className="text-sm text-muted-foreground">
            Supply: {formatNumber(payload[0].value)} BTCS
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Block: {payload[0].payload.blockHeight.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold mb-2">Supply Emission Schedule</h3>
        <p className="text-sm text-muted-foreground">
          Total BTCS supply projected through 2055, showing early halvings and growth curve
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={emissionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSupply" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="year"
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => Math.round(value).toString()}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="totalSupply"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fill="url(#colorSupply)"
            animationDuration={1500}
          />
          <ReferenceLine
            x={currentYear}
            stroke="hsl(var(--primary))"
            strokeDasharray="5 5"
            strokeWidth={2}
            label={{
              value: 'Now',
              position: 'top',
              fill: 'hsl(var(--primary))',
              fontSize: 12,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Genesis: {GENESIS_DATE.toLocaleDateString()}</span>
        <span>Projection: 2024 - 2055 (31 years)</span>
      </div>
    </div>
  );
}
