import { useState, useEffect } from 'react';
import { mockAssets, mockPortfolioHistory } from '@/lib/mock/data';

export function usePortfolioData() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLive(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const totalValue = mockAssets.reduce((sum, asset) => sum + asset.value, 0);
  const totalProfit = mockAssets.reduce(
    (sum, asset) => sum + (asset.currentPrice - asset.purchasePrice) * asset.amount,
    0
  );

  return {
    portfolio: mockAssets,
    isLoading: false,
    totalValue,
    totalProfit,
    priceHistory: mockPortfolioHistory,
    isLive,
  };
}
