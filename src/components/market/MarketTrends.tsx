import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/icon';
import { formatCurrency } from '@/utils/formatCurrency';
import { staggerContainer, listItem } from '@/animations/framer';

interface TrendingCoin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange: number;
  image: string;
}

interface MarketTrendsProps {
  gainers: TrendingCoin[];
  losers: TrendingCoin[];
}

export function MarketTrends({ gainers, losers }: MarketTrendsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Top Gainers */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative overflow-hidden rounded-xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5" />
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,transparent)]" />

        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="TrendingUp" className="h-5 w-5 text-green-400" />
            <h2 className="text-xl font-semibold text-white">Top Gainers (24h)</h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-3"
          >
            {gainers.map((coin) => (
              <motion.div
                key={coin.id}
                variants={listItem}
                whileHover={{
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 300 },
                }}
                className="relative overflow-hidden rounded-lg bg-white/5 p-4 transition-colors hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white/10">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-white">{coin.name}</p>
                      <p className="text-sm text-white/60">{coin.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{formatCurrency(coin.price)}</p>
                    <p className="text-sm text-green-400">+{coin.priceChange.toFixed(2)}%</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </motion.div>

      {/* Top Losers */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative overflow-hidden rounded-xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-pink-500/5 to-rose-500/5" />
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,transparent)]" />

        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="TrendingDown" className="h-5 w-5 text-red-400" />
            <h2 className="text-xl font-semibold text-white">Top Losers (24h)</h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-3"
          >
            {losers.map((coin) => (
              <motion.div
                key={coin.id}
                variants={listItem}
                whileHover={{
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 300 },
                }}
                className="relative overflow-hidden rounded-lg bg-white/5 p-4 transition-colors hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white/10">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-white">{coin.name}</p>
                      <p className="text-sm text-white/60">{coin.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{formatCurrency(coin.price)}</p>
                    <p className="text-sm text-red-400">{coin.priceChange.toFixed(2)}%</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </motion.div>
    </div>
  );
}
