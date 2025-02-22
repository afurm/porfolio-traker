import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { fadeIn } from '@/animations/framer';

interface InsightsData {
    topPerformers: Array<{ asset: string; return: number }>;
    riskExposure: Array<{ category: string; percentage: number }>;
    correlations: Array<{ pair: string; value: number }>;
}

interface PortfolioInsightsProps {
    data: InsightsData;
}

export function PortfolioInsights({ data }: PortfolioInsightsProps) {
    return (
        <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Top Performers */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10 shadow-2xl overflow-hidden">
                <CardHeader className="border-b border-white/10">
                    <CardTitle className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
                        Top Performers
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="space-y-4">
                        {data.topPerformers.map((performer, index) => (
                            <motion.div
                                key={performer.asset}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                    scale: 1.02,
                                    transition: { type: 'spring', stiffness: 300 }
                                }}
                                className="relative overflow-hidden rounded-xl backdrop-blur-md bg-gradient-to-r from-blue-500/10 to-green-500/10 p-4 border border-white/10"
                            >
                                <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,transparent)]" />
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold shadow-lg">
                                            {index + 1}
                                        </div>
                                        <span className="text-white font-medium">{performer.asset}</span>
                                    </div>
                                    <span className="text-green-400 font-bold">+{performer.return.toFixed(1)}%</span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 via-green-500/20 to-blue-500/20" />
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Risk Exposure */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10 shadow-2xl overflow-hidden">
                <CardHeader className="border-b border-white/10">
                    <CardTitle className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-500">
                        Risk Exposure
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="space-y-4">
                        {data.riskExposure.map((category, index) => (
                            <motion.div
                                key={category.category}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="space-y-2"
                            >
                                <div className="flex justify-between text-sm">
                                    <span className="text-white/80">{category.category}</span>
                                    <span className="text-white font-medium">{category.percentage}%</span>
                                </div>
                                <div className="relative h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${category.percentage}%` }}
                                        transition={{ duration: 1, delay: index * 0.2 }}
                                        className="h-full bg-gradient-to-r from-yellow-500 to-red-500 rounded-full"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Asset Correlations */}
            <Card className="backdrop-blur-md bg-white/5 border-white/10 shadow-2xl overflow-hidden">
                <CardHeader className="border-b border-white/10">
                    <CardTitle className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                        Asset Correlations
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="space-y-4">
                        {data.correlations.map((correlation, index) => (
                            <motion.div
                                key={correlation.pair}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                    scale: 1.02,
                                    transition: { type: 'spring', stiffness: 300 }
                                }}
                                className="relative overflow-hidden rounded-xl backdrop-blur-md bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 border border-white/10"
                            >
                                <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,transparent)]" />
                                <div className="flex items-center justify-between relative z-10">
                                    <span className="text-white/80">{correlation.pair}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="relative w-24 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${correlation.value * 100}%` }}
                                                transition={{ duration: 1, delay: index * 0.2 }}
                                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                            />
                                        </div>
                                        <span className="text-white font-medium">{correlation.value.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20" />
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
} 