import { useState, useEffect } from 'react';
import { mockPortfolioHistory } from '@/lib/mock/data';

export function useRealTimePrice() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Simulate connection delay
    const timer = setTimeout(() => {
      setIsLive(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return {
    priceData: null,
    priceHistory: mockPortfolioHistory,
    isLive,
  };
}
