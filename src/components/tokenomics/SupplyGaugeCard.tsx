import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatAbbreviated } from '@/utils/tokenomicsCalculations';
import { TrendingUp } from 'lucide-react';

interface SupplyGaugeCardProps {
  circulating: number;
  maxSupply: number;
  percentageMined: number;
  isLiveData?: boolean;
}

export default function SupplyGaugeCard({
  circulating,
  maxSupply,
  percentageMined,
  isLiveData = false,
}: SupplyGaugeCardProps) {
  const remaining = maxSupply - circulating;

  const data = [
    { name: 'Mined', value: percentageMined, color: 'hsl(var(--primary))' },
    { name: 'Remaining', value: 100 - percentageMined, color: 'hsl(var(--muted))' },
  ];

  return (
    <Card className="h-full transition-colors duration-200 hover:border-line-strong">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="icon-chip h-11 w-11 text-brand">
            <TrendingUp className="w-6 h-6" />
          </div>
          {isLiveData && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/25">
              Live
            </span>
          )}
        </div>
        <CardTitle>Circulating Supply</CardTitle>
        <CardDescription>Percentage of max supply currently mined</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-full max-w-[240px] aspect-square">
          <ResponsiveContainer
              width="100%"
              height="100%"
              initialDimension={{ width: 240, height: 240 }}
            >
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={90}
                endAngle={-270}
                innerRadius="70%"
                outerRadius="90%"
                paddingAngle={2}
                dataKey="value"
                animationDuration={1000}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-silver">
              {percentageMined.toFixed(2)}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">Mined</div>
          </div>
        </div>

        <div className="mt-6 w-full space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Circulating:</span>
            <span className="font-semibold">{formatAbbreviated(circulating)} BTCS</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Remaining:</span>
            <span className="font-semibold">{formatAbbreviated(remaining)} BTCS</span>
          </div>
          <div className="flex justify-between items-center text-sm pt-2 border-t border-border">
            <span className="text-muted-foreground">Max Supply:</span>
            <span className="font-bold">{formatAbbreviated(maxSupply)} BTCS</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
