// Bitcoin Silver Tokenomics Calculations

// Constants
export const GENESIS_DATE = new Date('2024-07-13T03:49:28Z');
export const BLOCK_TIME = 300; // 5 minutes in seconds
export const HALVING_INTERVAL = 210000; // blocks
export const INITIAL_REWARD = 50; // BTCS
export const MAX_SUPPLY = 21470000; // BTCS
export const BLOCKS_PER_DAY = (24 * 60 * 60) / BLOCK_TIME; // 288 blocks
export const BLOCKS_PER_YEAR = BLOCKS_PER_DAY * 365.25; // ~105,120 blocks

// Interfaces
export interface HalvingEvent {
  halvingNumber: number;
  blockHeight: number;
  blockReward: number;
  date: Date;
  totalSupplyAtHalving: number;
}

export interface EmissionDataPoint {
  year: number;
  date: Date;
  blockHeight: number;
  totalSupply: number;
  blockReward: number;
}

export interface SupplyProgress {
  circulating: number;
  maxSupply: number;
  percentageMined: number;
  remainingSupply: number;
  currentBlockReward: number;
  nextHalving: HalvingEvent | null;
  blocksUntilHalving: number;
  daysUntilHalving: number;
}

export interface ComparisonMetric {
  metric: string;
  btcs: string;
  btc: string;
  advantage?: 'btcs' | 'btc' | 'neutral';
}

/**
 * Calculate all halving events from genesis to final halving
 */
export function calculateHalvingEvents(): HalvingEvent[] {
  const halvings: HalvingEvent[] = [];
  let currentReward = INITIAL_REWARD;
  let currentBlockHeight = 0;
  let totalSupply = 0;
  let halvingNumber = 0;

  // Calculate supply before first halving
  totalSupply = HALVING_INTERVAL * INITIAL_REWARD;

  // Continue until reward becomes negligible
  while (currentReward > 0.00000001) {
    const blocksInSeconds = currentBlockHeight * BLOCK_TIME;
    const date = new Date(GENESIS_DATE.getTime() + blocksInSeconds * 1000);

    halvings.push({
      halvingNumber,
      blockHeight: currentBlockHeight,
      blockReward: currentReward,
      date,
      totalSupplyAtHalving: Math.min(totalSupply, MAX_SUPPLY),
    });

    // Move to next halving
    currentBlockHeight += HALVING_INTERVAL;
    currentReward = currentReward / 2;

    // Calculate additional supply from this halving period
    const supplyFromPeriod = HALVING_INTERVAL * currentReward;
    totalSupply += supplyFromPeriod;

    halvingNumber++;
  }

  return halvings;
}

/**
 * Generate emission schedule data points for charting
 * Creates monthly data points from genesis to specified years ahead
 */
export function generateEmissionSchedule(
  _currentBlockHeight: number = 0,
  yearsAhead: number = 120
): EmissionDataPoint[] {
  const dataPoints: EmissionDataPoint[] = [];

  // Generate data points monthly
  const monthsToGenerate = yearsAhead * 12;
  const blocksPerMonth = BLOCKS_PER_YEAR / 12;

  for (let month = 0; month <= monthsToGenerate; month++) {
    const blockHeight = Math.floor(month * blocksPerMonth);
    const blocksInSeconds = blockHeight * BLOCK_TIME;
    const date = new Date(GENESIS_DATE.getTime() + blocksInSeconds * 1000);
    const year = GENESIS_DATE.getFullYear() + (month / 12);

    // Find current reward based on block height
    let currentReward = INITIAL_REWARD;
    let totalSupply = 0;

    // Calculate total supply up to this block height
    let remainingBlocks = blockHeight;
    let blockReward = INITIAL_REWARD;
    let halvingCount = 0;

    while (remainingBlocks > 0 && blockReward > 0.00000001) {
      const blocksInThisPeriod = Math.min(remainingBlocks, HALVING_INTERVAL);
      totalSupply += blocksInThisPeriod * blockReward;

      remainingBlocks -= blocksInThisPeriod;
      if (remainingBlocks > 0) {
        blockReward = blockReward / 2;
        halvingCount++;
      } else {
        currentReward = blockReward;
      }
    }

    dataPoints.push({
      year: Math.round(year * 10) / 10, // Round to 1 decimal
      date,
      blockHeight,
      totalSupply: Math.min(totalSupply, MAX_SUPPLY),
      blockReward: currentReward,
    });
  }

  return dataPoints;
}

/**
 * Calculate current supply progress and next halving info
 */
export function calculateSupplyProgress(
  currentBlockHeight: number,
  circulatingSupply: number
): SupplyProgress {
  const halvingEvents = calculateHalvingEvents();

  // Find current block reward based on halving events
  let currentBlockReward = INITIAL_REWARD;
  let nextHalving: HalvingEvent | null = null;

  for (let i = 0; i < halvingEvents.length; i++) {
    const halving = halvingEvents[i];
    if (currentBlockHeight < halving.blockHeight) {
      nextHalving = halving;
      break;
    }
    currentBlockReward = halving.blockReward;
  }

  // If no next halving found, use the last one
  if (!nextHalving && halvingEvents.length > 0) {
    nextHalving = halvingEvents[halvingEvents.length - 1];
  }

  const blocksUntilHalving = nextHalving
    ? Math.max(0, nextHalving.blockHeight - currentBlockHeight)
    : 0;

  const daysUntilHalving = (blocksUntilHalving * BLOCK_TIME) / (24 * 60 * 60);

  const percentageMined = (circulatingSupply / MAX_SUPPLY) * 100;
  const remainingSupply = MAX_SUPPLY - circulatingSupply;

  return {
    circulating: circulatingSupply,
    maxSupply: MAX_SUPPLY,
    percentageMined,
    remainingSupply,
    currentBlockReward,
    nextHalving,
    blocksUntilHalving,
    daysUntilHalving,
  };
}

/**
 * Get Bitcoin comparison data
 */
export function getBitcoinComparison(): ComparisonMetric[] {
  return [
    {
      metric: 'Max Supply',
      btcs: '21.47M',
      btc: '21M',
      advantage: 'neutral',
    },
    {
      metric: 'Block Time',
      btcs: '5 min',
      btc: '10 min',
      advantage: 'btcs',
    },
    {
      metric: 'Algorithm',
      btcs: 'SHA-256',
      btc: 'SHA-256',
      advantage: 'neutral',
    },
    {
      metric: 'Halving Interval',
      btcs: '210,000 blocks',
      btc: '210,000 blocks',
      advantage: 'neutral',
    },
    {
      metric: 'Initial Reward',
      btcs: '50 BTCS',
      btc: '50 BTC',
      advantage: 'neutral',
    },
    {
      metric: 'Consensus',
      btcs: 'Proof-of-Work',
      btc: 'Proof-of-Work',
      advantage: 'neutral',
    },
  ];
}

/**
 * Calculate actual blocks per day based on real mining data
 * More accurate than theoretical 288 blocks/day
 */
export function calculateActualBlocksPerDay(currentBlockHeight: number): number {
  if (currentBlockHeight === 0) {
    return BLOCKS_PER_DAY; // Fallback to theoretical
  }

  const now = new Date();
  const daysSinceGenesis = (now.getTime() - GENESIS_DATE.getTime()) / (24 * 60 * 60 * 1000);

  if (daysSinceGenesis <= 0) {
    return BLOCKS_PER_DAY; // Fallback to theoretical
  }

  const actualBlocksPerDay = currentBlockHeight / daysSinceGenesis;
  return actualBlocksPerDay;
}

/**
 * Calculate actual daily emission based on real block production rate
 */
export function calculateDailyEmission(
  currentBlockHeight: number,
  currentBlockReward: number
): {
  dailyEmission: number;
  actualBlocksPerDay: number;
  theoreticalBlocksPerDay: number;
} {
  const actualBlocksPerDay = calculateActualBlocksPerDay(currentBlockHeight);
  const dailyEmission = actualBlocksPerDay * currentBlockReward;

  return {
    dailyEmission,
    actualBlocksPerDay,
    theoreticalBlocksPerDay: BLOCKS_PER_DAY,
  };
}

/**
 * Format large numbers with abbreviations (K, M, B)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toFixed(2);
}

/**
 * Format date as readable string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
