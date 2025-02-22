import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { fadeIn } from '@/animations/framer';

interface FilterOptions {
  startDate?: string;
  endDate?: string;
  type?: 'buy' | 'sell';
  asset?: string;
  minAmount?: number;
  maxAmount?: number;
}

interface TransactionFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export function TransactionFilters({ onFilterChange }: TransactionFiltersProps) {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="relative overflow-hidden rounded-xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,transparent)]" />

      <div className="relative p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Date Range</label>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              className="bg-white/5 border-white/10 text-white placeholder-white/50 focus:border-blue-500/50 focus:ring-blue-500/25"
              onChange={(e) => onFilterChange({ startDate: e.target.value })}
            />
            <span className="text-white/60">to</span>
            <Input
              type="date"
              className="bg-white/5 border-white/10 text-white placeholder-white/50 focus:border-blue-500/50 focus:ring-blue-500/25"
              onChange={(e) => onFilterChange({ endDate: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Type</label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-white/5 border-white/10 text-white hover:bg-green-500/20 hover:text-green-400 transition-colors"
              onClick={() => onFilterChange({ type: 'buy' })}
            >
              <Icon name="ArrowDownRight" className="mr-1 h-4 w-4" />
              Buy
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-white/5 border-white/10 text-white hover:bg-red-500/20 hover:text-red-400 transition-colors"
              onClick={() => onFilterChange({ type: 'sell' })}
            >
              <Icon name="ArrowUpRight" className="mr-1 h-4 w-4" />
              Sell
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Asset</label>
          <Input
            type="text"
            placeholder="Search assets..."
            className="bg-white/5 border-white/10 text-white placeholder-white/50 focus:border-blue-500/50 focus:ring-blue-500/25"
            onChange={(e) => onFilterChange({ asset: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Amount Range</label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              className="bg-white/5 border-white/10 text-white placeholder-white/50 focus:border-blue-500/50 focus:ring-blue-500/25"
              onChange={(e) => onFilterChange({ minAmount: parseFloat(e.target.value) })}
            />
            <span className="text-white/60">to</span>
            <Input
              type="number"
              placeholder="Max"
              className="bg-white/5 border-white/10 text-white placeholder-white/50 focus:border-blue-500/50 focus:ring-blue-500/25"
              onChange={(e) => onFilterChange({ maxAmount: parseFloat(e.target.value) })}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </motion.div>
  );
}
