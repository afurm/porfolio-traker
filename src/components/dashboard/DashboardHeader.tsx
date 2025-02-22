import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import { Icon, type IconName } from '@/components/ui/icon';
import { formatCurrency } from '@/utils/formatCurrency';
import { fadeIn } from '@/animations/framer';

interface DashboardHeaderProps {
  totalValue: number;
  totalProfit: number;
  profitPercentage: number;
  numberOfAssets: number;
}

export function DashboardHeader({
  totalValue,
  totalProfit,
  profitPercentage,
  numberOfAssets,
}: DashboardHeaderProps) {
  const isProfitable = totalProfit >= 0;

  const stats = [
    {
      title: 'Total Portfolio Value',
      value: formatCurrency(totalValue),
      icon: 'Wallet' as IconName,
      gradient: 'from-blue-500/20 to-purple-500/5',
    },
    {
      title: 'Total Profit/Loss',
      value: formatCurrency(totalProfit),
      percentage: `${isProfitable ? '+' : ''}${profitPercentage.toFixed(2)}%`,
      icon: (isProfitable ? 'TrendingUp' : 'TrendingDown') as IconName,
      gradient: isProfitable ? 'from-green-500/20 to-green-500/5' : 'from-red-500/20 to-red-500/5',
      color: isProfitable ? 'text-green-500' : 'text-red-500',
    },
    {
      title: 'Number of Assets',
      value: numberOfAssets.toString(),
      icon: 'Coins' as IconName,
      gradient: 'from-yellow-500/20 to-yellow-500/5',
    },
    {
      title: '24h Change',
      value: `${isProfitable ? '+' : ''}${profitPercentage.toFixed(2)}%`,
      icon: 'Activity' as IconName,
      gradient: isProfitable ? 'from-green-500/20 to-green-500/5' : 'from-red-500/20 to-red-500/5',
      color: isProfitable ? 'text-green-500' : 'text-red-500',
    },
  ];

  return (
    <motion.div variants={fadeIn}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          >
            <Card
              className={`relative overflow-hidden backdrop-blur-md bg-gradient-to-br ${stat.gradient} border-white/10 shadow-2xl`}
            >
              <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,transparent)]" />
              <div className="relative p-6 space-y-2">
                <div className="flex items-center gap-2 text-white/80">
                  <Icon name={stat.icon} className="h-5 w-5" />
                  <span className="text-sm font-medium">{stat.title}</span>
                </div>
                <div className={`text-2xl font-bold ${stat.color || 'text-white'}`}>
                  {stat.value}
                </div>
                {stat.percentage && (
                  <div className={`text-sm ${stat.color}`}>{stat.percentage}</div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
