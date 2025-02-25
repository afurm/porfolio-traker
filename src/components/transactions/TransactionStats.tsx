import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/icon';
import { formatCurrency } from '@/utils/formatCurrency';
import { fadeIn } from '@/animations/framer';

interface TransactionStatsProps {
  totalTransactions: number;
  totalVolume: number;
  buyVolume: number;
  sellVolume: number;
  averageTransactionSize: number;
}

export function TransactionStats({
  totalTransactions,
  totalVolume,
  buyVolume,
  sellVolume,
  averageTransactionSize,
}: TransactionStatsProps) {
  const stats = [
    {
      title: 'Total Transactions',
      value: totalTransactions.toString(),
      icon: 'ListOrdered',
      gradient: 'from-blue-500/20 to-blue-500/5',
      color: 'text-blue-500',
    },
    {
      title: 'Total Volume',
      value: formatCurrency(totalVolume),
      icon: 'LineChart',
      gradient: 'from-purple-500/20 to-purple-500/5',
      color: 'text-purple-500',
    },
    {
      title: 'Buy Volume',
      value: formatCurrency(buyVolume),
      icon: 'ArrowDownRight',
      gradient: 'from-green-500/20 to-green-500/5',
      color: 'text-green-500',
    },
    {
      title: 'Sell Volume',
      value: formatCurrency(sellVolume),
      icon: 'ArrowUpRight',
      gradient: 'from-red-500/20 to-red-500/5',
      color: 'text-red-500',
    },
    {
      title: 'Avg. Transaction',
      value: formatCurrency(averageTransactionSize),
      icon: 'Calculator',
      gradient: 'from-yellow-500/20 to-yellow-500/5',
      color: 'text-yellow-500',
    },
  ];

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="grid gap-4 md:grid-cols-3 lg:grid-cols-5"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{
            scale: 1.02,
            transition: { type: 'spring', stiffness: 300 },
          }}
          className={`relative overflow-hidden rounded-xl backdrop-blur-md bg-gradient-to-br ${stat.gradient} border border-border shadow-lg`}
        >
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,transparent)]" />
          <div className="relative p-4 space-y-2">
            <div className="flex items-center gap-2 text-foreground/80">
              <Icon
                name={stat.icon as 'LineChart' | 'ArrowDownRight' | 'ArrowUpRight' | 'Calculator'}
                className={`h-5 w-5 ${stat.color}`}
              />
              <span className="text-sm font-medium">{stat.title}</span>
            </div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
