import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { CryptoAssetCard } from '@/components/CryptoAssetCard';
import { AddAssetModal } from '@/components/dashboard/AddAssetModal';
import { PortfolioCharts } from '@/components/dashboard/PortfolioCharts';
import { Loading } from '@/components/ui/loading';
import { Button } from '@/components/ui';
import { Icon } from '@/components/ui/icon';
import { staggerContainer, listItem } from '@/animations/framer';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import TransactionList from '@/components/TransactionList';
import { useRouter } from 'next/router';

export default function PortfolioDashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { portfolio, isLoading, totalValue, totalProfit, priceHistory, isLive } =
    usePortfolioData();
  const router = useRouter();

  // Calculate portfolio metrics
  const profitPercentage = totalValue > 0 ? (totalProfit / totalValue) * 100 : 0;

  if (isLoading) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      {/* Grid Background */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Glowing orbs in the background */}
      <div className="fixed -z-10 h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-[100px] top-24 right-0"></div>
      <div className="fixed -z-10 h-[250px] w-[250px] rounded-full bg-purple-500/20 blur-[100px] bottom-0 left-0"></div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="container mx-auto py-8 space-y-8"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Header Section */}
        <motion.div
          variants={listItem}
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <motion.div
            whileHover={{ transform: 'translateZ(20px)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Portfolio Dashboard
            </h1>
            <p className="text-sm text-gray-400 mt-2">Track and manage your crypto investments</p>
          </motion.div>

          <motion.div
            whileHover={{ transform: 'translateZ(10px)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
            >
              <Icon name="Plus" className="h-4 w-4" />
              Add New Asset
            </Button>
          </motion.div>
        </motion.div>

        {/* Dashboard Header Stats */}
        <motion.div
          variants={listItem}
          whileHover={{ transform: 'translateZ(10px)' }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <DashboardHeader
            totalValue={totalValue}
            totalProfit={totalProfit}
            profitPercentage={profitPercentage}
            numberOfAssets={portfolio.length}
          />
        </motion.div>

        {/* Portfolio Charts */}
        <motion.div
          variants={listItem}
          whileHover={{ transform: 'translateZ(10px)' }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl shadow-2xl"
        >
          <PortfolioCharts assets={portfolio} priceHistory={priceHistory} />
        </motion.div>

        {/* Assets Grid */}
        <motion.div variants={listItem} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((asset, index) => (
            <motion.div
              key={asset.id}
              variants={listItem}
              whileHover={{ transform: 'translateZ(20px)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <CryptoAssetCard
                coinName={asset.coinName}
                symbol={asset.symbol}
                amount={asset.amount}
                currentPrice={asset.currentPrice}
                priceChange24h={asset.priceChange24h}
                onTrade={() => router.push('/trade')}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          variants={listItem}
          whileHover={{ transform: 'translateZ(10px)' }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Recent Transactions
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/transactions')}
              className="gap-2 backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/20"
            >
              <Icon name="ArrowRight" className="h-4 w-4" />
              View All
            </Button>
          </div>
          <TransactionList />
        </motion.div>

        <AddAssetModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      </motion.div>
    </div>
  );
}
