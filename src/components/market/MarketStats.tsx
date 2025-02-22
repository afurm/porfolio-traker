import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/utils/formatCurrency';
import { fadeIn } from '@/animations/framer';

interface MarketStatsProps {
    marketCap: number;
    volume24h: number;
    btcDominance: number;
    marketCapChange: number;
    volumeChange: number;
    btcDominanceChange: number;
}

export function MarketStats({
    marketCap,
    volume24h,
    btcDominance,
    marketCapChange,
    volumeChange,
    btcDominanceChange,
}: MarketStatsProps) {
    return (
        <motion.div variants={fadeIn} initial="initial" animate="animate">
            <h2 className="mb-6 text-2xl font-semibold text-white">Market Overview</h2>
            <div className="grid gap-8 md:grid-cols-3">
                <div>
                    <p className="mb-2 text-sm font-medium text-gray-400">Total Market Cap</p>
                    <p className="text-2xl font-bold text-white">{formatCurrency(marketCap)}</p>
                    <p className={`mt-1 text-sm ${marketCapChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {marketCapChange >= 0 ? '+' : ''}{marketCapChange.toFixed(2)}%
                    </p>
                </div>

                <div>
                    <p className="mb-2 text-sm font-medium text-gray-400">24h Volume</p>
                    <p className="text-2xl font-bold text-white">{formatCurrency(volume24h)}</p>
                    <p className={`mt-1 text-sm ${volumeChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {volumeChange >= 0 ? '+' : ''}{volumeChange.toFixed(2)}%
                    </p>
                </div>

                <div>
                    <p className="mb-2 text-sm font-medium text-gray-400">BTC Dominance</p>
                    <p className="text-2xl font-bold text-white">{btcDominance.toFixed(1)}%</p>
                    <p className={`mt-1 text-sm ${btcDominanceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {btcDominanceChange >= 0 ? '+' : ''}{btcDominanceChange.toFixed(2)}%
                    </p>
                </div>
            </div>
        </motion.div>
    );
} 