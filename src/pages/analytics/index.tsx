import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
    { indicator: 'RSI', value: 65, signal: 'neutral' },
    { indicator: 'MACD', value: 0.025, signal: 'bullish' },
    { indicator: 'MA', value: 45000, signal: 'bearish' },
  ],
  sentiment: {
    overall: 'bullish',
    fear: 65,
    social: 78,
    news: 82,
  },
  predictions: [
    { timeframe: '1D', value: 52000, confidence: 0.85 },
    { timeframe: '1W', value: 55000, confidence: 0.75 },
    { timeframe: '1M', value: 58000, confidence: 0.65 },
  ],
};

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="container mx-auto py-8 space-y-8"
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
            <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Analytics
            </h1>
            <p className="text-sm text-gray-400 mt-2">
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
                className="gap-2 backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/20"
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
                className="gap-2 backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/20"
              >
                <Icon name="Download" className="h-4 w-4" />
                Export
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Grid Background */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Glowing orbs in the background */}
        <div className="fixed -z-10 h-[200px] w-[200px] rounded-full bg-purple-500/20 blur-[100px] top-24 left-0"></div>
        <div className="fixed -z-10 h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-[100px] bottom-0 right-0"></div>

        {/* Components with enhanced 3D effects */}
        <motion.div
          className="space-y-8"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            whileHover={{ transform: 'translateZ(10px)' }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <PerformanceMetrics data={mockPerformanceData} />
          </motion.div>

          <motion.div
            whileHover={{ transform: 'translateZ(10px)' }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <PortfolioInsights data={mockInsightsData} />
          </motion.div>

          <motion.div
            whileHover={{ transform: 'translateZ(10px)' }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <MarketAnalysis data={mockMarketData as any} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
