import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { Loading } from '@/components/ui/loading';
import { MarketStats } from '@/components/market/MarketStats';
import { MarketTrends } from '@/components/market/MarketTrends';
import { fadeIn, staggerContainer, listItem } from '@/animations/framer';
import { useSearchCrypto } from '@/lib/queries/useQueries';

export default function MarketPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: searchResults, isLoading } = useSearchCrypto(searchQuery);

    // Mock data for demonstration
    const marketStats = {
        marketCap: 2345678901234,
        volume24h: 123456789012,
        btcDominance: 42.5,
        marketCapChange: 2.34,
        volumeChange: -1.23,
        btcDominanceChange: 0.45,
    };

    const mockTrends = {
        gainers: [
            { id: '1', name: 'Bitcoin', symbol: 'BTC', price: 50000, priceChange: 15.67, image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
            { id: '2', name: 'Ethereum', symbol: 'ETH', price: 3000, priceChange: 12.45, image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
            { id: '3', name: 'Cardano', symbol: 'ADA', price: 1.5, priceChange: 10.23, image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' },
        ],
        losers: [
            { id: '4', name: 'Solana', symbol: 'SOL', price: 100, priceChange: -8.45, image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
            { id: '5', name: 'Polkadot', symbol: 'DOT', price: 20, priceChange: -7.89, image: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png' },
            { id: '6', name: 'Avalanche', symbol: 'AVAX', price: 80, priceChange: -6.32, image: 'https://assets.coingecko.com/coins/images/12559/small/avalanche.png' },
        ],
    };

    return (
        <div className="relative min-h-screen bg-[#0d1117]">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute top-1/2 left-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />
                <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
            </div>

            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="relative container mx-auto py-8 px-4"
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                        Market Data
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Real-time cryptocurrency prices and market trends
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ perspective: '1000px' }}
                >
                    <div className="space-y-6">
                        {/* Search Bar */}
                        <motion.div
                            whileHover={{ transform: 'translateZ(10px)' }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="relative overflow-hidden rounded-xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl p-4"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
                            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,transparent)]" />
                            <div className="relative flex items-center gap-2">
                                <div className="relative flex-1">
                                    <Input
                                        placeholder="Search cryptocurrencies..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-white/5 border-white/10 text-white placeholder-white/50 focus:border-blue-500/50 focus:ring-blue-500/25"
                                    />
                                    <Icon
                                        name="Search"
                                        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
                                    />
                                </div>
                                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                                    <Icon name="SlidersHorizontal" className="h-4 w-4" />
                                </button>
                            </div>
                        </motion.div>

                        {/* Market Stats */}
                        <motion.div
                            whileHover={{ transform: 'translateZ(10px)' }}
                            transition={{ type: 'spring', stiffness: 200 }}
                        >
                            <MarketStats {...marketStats} />
                        </motion.div>

                        {/* Market Trends */}
                        <motion.div
                            whileHover={{ transform: 'translateZ(10px)' }}
                            transition={{ type: 'spring', stiffness: 200 }}
                        >
                            <MarketTrends gainers={mockTrends.gainers} losers={mockTrends.losers} />
                        </motion.div>

                        {/* Search Results */}
                        {searchQuery && (
                            <motion.div
                                variants={fadeIn}
                                whileHover={{ transform: 'translateZ(10px)' }}
                                transition={{ type: 'spring', stiffness: 200 }}
                                className="relative overflow-hidden rounded-xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
                                <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,transparent)]" />

                                <div className="relative p-6">
                                    <h2 className="text-xl font-semibold text-white mb-4">Search Results</h2>
                                    {isLoading ? (
                                        <Loading />
                                    ) : (
                                        <motion.div
                                            variants={staggerContainer}
                                            initial="initial"
                                            animate="animate"
                                            className="space-y-3"
                                        >
                                            {searchResults?.map((coin: any) => (
                                                <motion.div
                                                    key={coin.id}
                                                    variants={listItem}
                                                    className="flex items-center justify-between rounded-lg bg-white/5 p-4 transition-colors hover:bg-white/10"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={coin.thumb}
                                                            alt={coin.name}
                                                            className="h-8 w-8 rounded-full bg-white/10 p-1"
                                                        />
                                                        <div>
                                                            <p className="font-medium text-white">{coin.name}</p>
                                                            <p className="text-sm text-white/60">
                                                                {coin.symbol.toUpperCase()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button className="rounded-lg bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors">
                                                        View Details
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
} 