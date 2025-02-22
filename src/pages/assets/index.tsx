import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { Loading } from '@/components/ui/loading';
import { useStore } from '@/lib/store/useStore';
import { formatCurrency } from '@/utils/formatCurrency';
import { fadeIn, staggerContainer, listItem } from '@/animations/framer';

const filters = [
  { id: 'all', label: 'All Assets' },
  { id: 'gainers', label: 'Gainers' },
  { id: 'losers', label: 'Losers' },
] as const;

export default function AssetsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<(typeof filters)[number]['id']>('all');
  const assets = useStore((state) => state.assets);
  const isLoading = useStore((state) => state.isLoading);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch =
        asset.coinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedFilter === 'gainers') {
        return matchesSearch && asset.currentPrice > asset.purchasePrice;
      } else if (selectedFilter === 'losers') {
        return matchesSearch && asset.currentPrice < asset.purchasePrice;
      }
      return matchesSearch;
    });
  }, [assets, searchQuery, selectedFilter]);

  if (isLoading) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0d1117]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="relative container mx-auto py-8 px-4"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Assets Overview
          </h1>
          <p className="text-gray-400 mt-2">Track and manage your cryptocurrency portfolio</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border-white/10 text-white placeholder-white/50 focus:border-blue-500/50 focus:ring-blue-500/25"
              />
              <Icon
                name="Search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
                size="sm"
              />
            </div>
            <div className="flex gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`backdrop-blur-sm ${
                    selectedFilter === filter.id
                      ? 'bg-blue-500/20 border-blue-500/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Assets Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredAssets.map((asset) => {
            const profitLoss = (asset.currentPrice - asset.purchasePrice) * asset.amount;
            const profitLossPercentage =
              ((asset.currentPrice - asset.purchasePrice) / asset.purchasePrice) * 100;
            const isProfit = profitLoss >= 0;

            return (
              <motion.div
                key={asset.id}
                variants={listItem}
                whileHover={{
                  transform: 'translateZ(20px) scale(1.02)',
                  transition: { type: 'spring', stiffness: 300 },
                }}
                className="group relative"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl transition-all group-hover:from-blue-500/20 group-hover:to-purple-500/20" />
                <div className="relative overflow-hidden rounded-xl backdrop-blur-md bg-white/5 border border-white/10 p-6 shadow-2xl transition-colors hover:bg-white/[0.075]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                          isProfit ? 'bg-green-500/10' : 'bg-red-500/10'
                        }`}
                      >
                        <Icon
                          name={isProfit ? 'TrendingUp' : 'TrendingDown'}
                          className={isProfit ? 'text-green-500' : 'text-red-500'}
                          size="lg"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{asset.coinName}</h3>
                        <p className="text-sm text-white/60">{asset.symbol}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => router.push(`/assets/${asset.id}`)}
                    >
                      <Icon name="ArrowRight" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Amount:</span>
                      <span className="text-white font-medium">
                        {asset.amount.toFixed(8)} {asset.symbol}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Current Price:</span>
                      <span className="text-white font-medium">
                        {formatCurrency(asset.currentPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Total Value:</span>
                      <span className="text-white font-medium">
                        {formatCurrency(asset.amount * asset.currentPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Profit/Loss:</span>
                      <span
                        className={`font-medium ${isProfit ? 'text-green-500' : 'text-red-500'}`}
                      >
                        {isProfit ? '+' : ''}
                        {formatCurrency(profitLoss)} ({profitLossPercentage.toFixed(2)}%)
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredAssets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <Icon name="Search" className="h-12 w-12 text-white/20 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No assets found</h3>
            <p className="text-white/60 mb-6">Try adjusting your search or filters</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
              className="backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/20"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
