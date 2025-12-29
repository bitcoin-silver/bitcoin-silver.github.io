import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getBitcoinComparison } from '@/utils/tokenomicsCalculations';
import { GitCompare, Zap, Coins, Clock, Award, Shield } from 'lucide-react';

export default function BitcoinComparisonCard() {
  const comparisonData = getBitcoinComparison();

  const getIcon = (metric: string) => {
    switch (metric) {
      case 'Max Supply':
        return <Coins className="w-4 h-4" />;
      case 'Block Time':
        return <Clock className="w-4 h-4" />;
      case 'Algorithm':
        return <Shield className="w-4 h-4" />;
      case 'Halving Interval':
        return <Award className="w-4 h-4" />;
      case 'Initial Reward':
        return <Zap className="w-4 h-4" />;
      case 'Consensus':
        return <GitCompare className="w-4 h-4" />;
      default:
        return <GitCompare className="w-4 h-4" />;
    }
  };

  return (
    <Card className="h-full hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="p-3 rounded-lg bg-[#222222] text-white">
            <GitCompare className="w-6 h-6" />
          </div>
        </div>
        <CardTitle className="text-xl">Bitcoin Comparison</CardTitle>
        <CardDescription>How BTCS compares to BTC</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {comparisonData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 p-3 rounded-lg bg-[#222222] hover:bg-[#2a2a2a] transition-colors"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="text-muted-foreground flex-shrink-0">{getIcon(item.metric)}</div>
                <span className="text-xs sm:text-sm text-muted-foreground truncate">{item.metric}</span>
              </div>
              <div className="flex gap-3 sm:gap-6 items-center justify-end sm:justify-start">
                <div
                  className={`font-semibold text-xs sm:text-sm w-[70px] sm:min-w-[80px] text-right ${
                    item.advantage === 'btcs' ? 'text-green-500' : ''
                  }`}
                >
                  {item.btcs}
                  {item.advantage === 'btcs' && (
                    <span className="ml-1 text-xs">✓</span>
                  )}
                </div>
                <div className="text-muted-foreground text-xs sm:text-sm w-[70px] sm:min-w-[80px] text-right">
                  {item.btc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500 font-semibold">✓</span> Bitcoin Silver offers faster
            block times (5min vs 10min) while maintaining the same proven security model as Bitcoin.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
