import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { fadeIn } from '@/animations/framer';

interface FilterOptions {
  startDate?: string;
  endDate?: string;
  transactionType?: string;
  asset?: string;
}

interface TransactionFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export function TransactionFilters({ onFilterChange }: TransactionFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="relative overflow-hidden rounded-xl backdrop-blur-md bg-card/50 border border-border shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,transparent)]" />

      <div className="relative p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">Date Range</label>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={filters.startDate || ''}
              className="bg-background/50 border-border text-foreground placeholder-muted-foreground focus:border-blue-500/50 focus:ring-blue-500/25"
              onChange={(e) => handleFilterChange({ startDate: e.target.value || undefined })}
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="date"
              value={filters.endDate || ''}
              className="bg-background/50 border-border text-foreground placeholder-muted-foreground focus:border-blue-500/50 focus:ring-blue-500/25"
              onChange={(e) => handleFilterChange({ endDate: e.target.value || undefined })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">Type</label>
          <div className="flex gap-2">
            <Button
              variant={filters.transactionType === 'buy' ? 'default' : 'outline'}
              size="sm"
              className={`flex-1 ${
                filters.transactionType === 'buy'
                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  : 'bg-background/50 border-border text-foreground hover:bg-green-500/20 hover:text-green-400'
              } transition-colors`}
              onClick={() =>
                handleFilterChange({
                  transactionType: filters.transactionType === 'buy' ? undefined : 'buy',
                })
              }
            >
              <Icon name="ArrowDownRight" className="mr-1 h-4 w-4" />
              Buy
            </Button>
            <Button
              variant={filters.transactionType === 'sell' ? 'default' : 'outline'}
              size="sm"
              className={`flex-1 ${
                filters.transactionType === 'sell'
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  : 'bg-background/50 border-border text-foreground hover:bg-red-500/20 hover:text-red-400'
              } transition-colors`}
              onClick={() =>
                handleFilterChange({
                  transactionType: filters.transactionType === 'sell' ? undefined : 'sell',
                })
              }
            >
              <Icon name="ArrowUpRight" className="mr-1 h-4 w-4" />
              Sell
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">Asset</label>
          <Input
            type="text"
            value={filters.asset || ''}
            placeholder="Search assets..."
            className="bg-background/50 border-border text-foreground placeholder-muted-foreground focus:border-blue-500/50 focus:ring-blue-500/25"
            onChange={(e) => handleFilterChange({ asset: e.target.value || undefined })}
          />
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            className="w-full bg-background/50 border-border text-foreground"
            onClick={clearFilters}
          >
            <Icon name="X" className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </motion.div>
  );
}
