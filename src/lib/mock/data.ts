export const mockAssets = [
  {
    id: '1',
    coinId: 'bitcoin',
    coinName: 'Bitcoin',
    symbol: 'BTC',
    amount: 1.5,
    purchasePrice: 45000,
    currentPrice: 50000,
    priceChange24h: 2.5,
    value: 75000,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '2',
    coinId: 'ethereum',
    coinName: 'Ethereum',
    symbol: 'ETH',
    amount: 10,
    purchasePrice: 2800,
    currentPrice: 3000,
    priceChange24h: -1.2,
    value: 30000,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '3',
    coinId: 'cardano',
    coinName: 'Cardano',
    symbol: 'ADA',
    amount: 5000,
    purchasePrice: 1.2,
    currentPrice: 1.5,
    priceChange24h: 5.8,
    value: 7500,
    lastUpdated: new Date().toISOString(),
  },
];

export const mockTransactions = [
  {
    id: '1',
    coinId: 'bitcoin',
    coinName: 'Bitcoin',
    type: 'buy',
    amount: 0.5,
    price: 45000,
    timestamp: '2024-02-20T10:00:00Z',
  },
  {
    id: '2',
    coinId: 'ethereum',
    coinName: 'Ethereum',
    type: 'buy',
    amount: 5,
    price: 2800,
    timestamp: '2024-02-19T15:30:00Z',
  },
  {
    id: '3',
    coinId: 'cardano',
    coinName: 'Cardano',
    type: 'sell',
    amount: 1000,
    price: 1.4,
    timestamp: '2024-02-18T09:15:00Z',
  },
];

export const mockPortfolioHistory = {
  bitcoin: Array.from({ length: 24 }, () => 50000 + Math.random() * 2000 - 1000),
  ethereum: Array.from({ length: 24 }, () => 3000 + Math.random() * 100 - 50),
  cardano: Array.from({ length: 24 }, () => 1.5 + Math.random() * 0.1 - 0.05),
};

export const mockPortfolioMetrics = {
  totalValue: 112500, // Sum of all asset values
  totalProfit: 7700, // Current value - purchase value
  profitPercentage: 7.34, // (profit / initial investment) * 100
  numberOfAssets: 3,
};
