import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { fadeIn } from '@/animations/framer';

interface PerformanceData {
    totalROI: number;
    dailyROI: number;
    weeklyROI: number;
    monthlyROI: number;
    riskScore: number;
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
}

interface PerformanceMetricsProps {
    data: PerformanceData;
}

export function PerformanceMetrics({ data }: PerformanceMetricsProps) {
    const formatPercentage = (value: number) => `${value.toFixed(1)}%`;
    const formatDecimal = (value: number) => value.toFixed(2);

    const metrics = [
        {
            title: 'Total ROI',
            value: formatPercentage(data.totalROI),
            icon: 'TrendingUp',
            color: data.totalROI >= 0 ? 'text-green-500' : 'text-red-500',
            gradient: data.totalROI >= 0 ? 'from-green-500/20 to-green-500/5' : 'from-red-500/20 to-red-500/5'
        },
        {
            title: 'Daily ROI',
            value: formatPercentage(data.dailyROI),
            icon: 'Clock',
            color: data.dailyROI >= 0 ? 'text-green-500' : 'text-red-500',
            gradient: data.dailyROI >= 0 ? 'from-green-500/20 to-green-500/5' : 'from-red-500/20 to-red-500/5'
        },
        {
            title: 'Weekly ROI',
            value: formatPercentage(data.weeklyROI),
            icon: 'Calendar',
            color: data.weeklyROI >= 0 ? 'text-green-500' : 'text-red-500',
            gradient: data.weeklyROI >= 0 ? 'from-green-500/20 to-green-500/5' : 'from-red-500/20 to-red-500/5'
        },
        {
            title: 'Monthly ROI',
            value: formatPercentage(data.monthlyROI),
            icon: 'CalendarDays',
            color: data.monthlyROI >= 0 ? 'text-green-500' : 'text-red-500',
            gradient: data.monthlyROI >= 0 ? 'from-green-500/20 to-green-500/5' : 'from-red-500/20 to-red-500/5'
        },
        {
            title: 'Risk Score',
            value: data.riskScore.toString(),
            icon: 'AlertTriangle',
            color: 'text-yellow-500',
            gradient: 'from-yellow-500/20 to-yellow-500/5'
        },
        {
            title: 'Volatility',
            value: formatDecimal(data.volatility),
            icon: 'Activity',
            color: 'text-blue-500',
            gradient: 'from-blue-500/20 to-blue-500/5'
        },
        {
            title: 'Sharpe Ratio',
            value: formatDecimal(data.sharpeRatio),
            icon: 'BarChart2',
            color: 'text-purple-500',
            gradient: 'from-purple-500/20 to-purple-500/5'
        },
        {
            title: 'Max Drawdown',
            value: formatPercentage(data.maxDrawdown),
            icon: 'TrendingDown',
            color: 'text-red-500',
            gradient: 'from-red-500/20 to-red-500/5'
        },
    ];

    return (
        <motion.div variants={fadeIn}>
            <Card className="backdrop-blur-md bg-white/5 border-white/10 shadow-2xl">
                <CardHeader className="border-b border-white/10">
                    <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                        Performance Metrics
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {metrics.map((metric, index) => (
                            <motion.div
                                key={metric.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                    scale: 1.02,
                                    transition: { type: 'spring', stiffness: 300 }
                                }}
                                className={`relative overflow-hidden rounded-xl backdrop-blur-md bg-gradient-to-br ${metric.gradient} p-4 border border-white/10 shadow-lg`}
                            >
                                <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,transparent)]" />
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-white/80">{metric.title}</span>
                                    <Icon name={metric.icon} className={`h-5 w-5 ${metric.color}`} />
                                </div>
                                <div className={`text-2xl font-bold ${metric.color}`}>
                                    {metric.value}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
} 