import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { fadeIn, staggerContainer } from '@/animations/framer';
import { PerformanceMetrics } from '@/components/analytics/PerformanceMetrics';
import { PortfolioInsights } from '@/components/analytics/PortfolioInsights';
import { MarketAnalysis } from '@/components/analytics/MarketAnalysis';

// Mock data - replace with real data from your API
const mockPerformanceData = {
  totalROI: 32.5,
  dailyROI: 2.3,
  weeklyROI: 5.8,
  monthlyROI: 12.4,
  riskScore: 65,
  volatility: 0.45,
  sharpeRatio: 1.8,
  maxDrawdown: -15.3,
};

const mockInsightsData = {
  topPerformers: [
    { asset: 'BTC', return: 45.2 },
    { asset: 'ETH', return: 38.7 },
    { asset: 'SOL', return: 28.9 },
  ],
  riskExposure: [
    { category: 'High Cap', percentage: 45 },
    { category: 'Mid Cap', percentage: 35 },
    { category: 'Low Cap', percentage: 20 },
  ],
  correlations: [
    { pair: 'BTC-ETH', value: 0.85 },
    { pair: 'BTC-SOL', value: 0.65 },
    { pair: 'ETH-SOL', value: 0.72 },
  ],
};

const mockMarketData = {
  trends: [
    { indicator: 'RSI', value: 65, signal: 'bullish' as const },
    { indicator: 'MACD', value: 0.5, signal: 'neutral' as const },
    { indicator: 'Moving Average', value: -2.1, signal: 'bearish' as const },
  ],
  sentiment: {
    overall: 'positive',
    fear: 45,
    social: 72,
    news: 65,
  },
  predictions: [
    { timeframe: '24h', value: 52000, confidence: 0.85 },
    { timeframe: '7d', value: 55000, confidence: 0.75 },
    { timeframe: '30d', value: 60000, confidence: 0.65 },
  ],
};

export default function AnalyticsPage() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative container mx-auto py-8 px-4 space-y-8"
      >
        {/* Header with 3D effect */}
        <motion.div
          variants={fadeIn}
          className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            whileHover={{ transform: 'translateZ(20px)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h1 className="text-4xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Analytics
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Advanced portfolio analysis and market insights
            </p>
          </motion.div>

          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ transform: 'translateZ(10px)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-2 backdrop-blur-sm border-border hover:bg-accent"
              >
                <Icon name="Calendar" className="h-4 w-4" />
                Last 30 Days
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ transform: 'translateZ(10px)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-2 backdrop-blur-sm border-border hover:bg-accent"
              >
                <Icon name="Download" className="h-4 w-4" />
                Export
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          whileHover={{ transform: 'translateZ(10px)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <PerformanceMetrics data={mockPerformanceData} />
        </motion.div>

        {/* Portfolio Insights */}
        <motion.div
          whileHover={{ transform: 'translateZ(10px)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <PortfolioInsights data={mockInsightsData} />
        </motion.div>

        {/* Market Analysis */}
        <motion.div
          whileHover={{ transform: 'translateZ(10px)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <MarketAnalysis data={mockMarketData} />
        </motion.div>
      </motion.div>
    </div>
  );
}
