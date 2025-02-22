import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { Icon } from '@/components/ui/icon';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { PortfolioCharts } from '@/components/dashboard/PortfolioCharts';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { fadeIn } from '@/animations/framer';

export default function PortfolioDashboard() {
  const { portfolio, totalValue, totalProfit, priceHistory } = usePortfolioData();

  return (
    <motion.div variants={fadeIn} initial="initial" animate="animate" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Dashboard</h1>
          <p className="text-sm text-muted-foreground">Track and analyze your investments</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Icon name="Download" className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <Icon name="Plus" className="h-4 w-4" />
            Add Asset
          </Button>
        </div>
      </div>

      <DashboardHeader
        totalValue={totalValue}
        totalProfit={totalProfit}
        profitPercentage={(totalProfit / (totalValue - totalProfit)) * 100}
        numberOfAssets={portfolio.length}
      />

      <PortfolioCharts assets={portfolio} priceHistory={priceHistory} />
    </motion.div>
  );
}
