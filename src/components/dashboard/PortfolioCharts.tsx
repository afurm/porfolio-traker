import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Button } from '@/components/ui';
import { Icon } from '@/components/ui/icon';
import { formatCurrency } from '@/utils/formatCurrency';
import { fadeIn, scaleIn } from '@/animations/framer';

interface PortfolioChartsProps {
    assets: Array<{
        id: string;
        coinName: string;
        symbol: string;
        amount: number;
        currentPrice: number;
        purchasePrice: number;
        priceChange24h: number;
        value: number;
    }>;
    priceHistory: Record<string, number[]>;
}

const CHART_PERIODS = [
    { label: '24H', value: '24h' },
    { label: '7D', value: '7d' },
    { label: '30D', value: '30d' },
    { label: 'ALL', value: 'all' },
] as const;

const COLORS = [
    'hsl(var(--accent-blue))',
    'hsl(var(--accent-green))',
    'hsl(var(--accent-purple))',
    'hsl(var(--accent-yellow))',
    'hsl(var(--accent-red))',
    'hsl(var(--accent-pink))',
];

export function PortfolioCharts({ assets, priceHistory }: PortfolioChartsProps) {
    const [selectedPeriod, setSelectedPeriod] = React.useState<typeof CHART_PERIODS[number]['value']>('24h');

    // Calculate portfolio distribution data
    const distributionData = useMemo(() => {
        const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
        return assets.map((asset) => ({
            name: asset.coinName,
            symbol: asset.symbol,
            value: asset.value,
            percentage: (asset.value / totalValue) * 100,
            price: asset.currentPrice,
            change: asset.priceChange24h,
            profit: (asset.currentPrice - asset.purchasePrice) * asset.amount,
        }));
    }, [assets]);

    // Calculate total portfolio value over time
    const portfolioValueHistory = useMemo(() => {
        if (Object.keys(priceHistory).length === 0) return [];

        return Object.values(priceHistory)[0].map((_, index) => {
            const timestamp = new Date(Date.now() - (index * 30000)).toLocaleTimeString();
            const value = assets.reduce((total, asset) => {
                const price = priceHistory[asset.id]?.[index] || asset.currentPrice;
                return total + (price * asset.amount);
            }, 0);
            return { timestamp, value };
        }).reverse();
    }, [priceHistory, assets]);

    return (
        <motion.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="grid gap-4 md:grid-cols-2"
        >
            {/* Portfolio Value Chart */}
            <Card className="glass-card col-span-2 overflow-hidden border-border/50">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Portfolio Value Over Time</CardTitle>
                    <div className="flex gap-2">
                        {CHART_PERIODS.map((period) => (
                            <Button
                                key={period.value}
                                variant={selectedPeriod === period.value ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedPeriod(period.value)}
                                className="h-8 px-3 text-xs"
                            >
                                {period.label}
                            </Button>
                        ))}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={portfolioValueHistory}>
                                <defs>
                                    <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="5%"
                                            stopColor="hsl(var(--accent-blue))"
                                            stopOpacity={0.3}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="hsl(var(--accent-blue))"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="timestamp"
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => formatCurrency(value)}
                                />
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="glass-card rounded-lg border p-2 shadow-lg">
                                                    <p className="text-sm font-medium">
                                                        {formatCurrency(payload[0].value as number)}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {payload[0].payload.timestamp}
                                                    </p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="hsl(var(--accent-blue))"
                                    fillOpacity={1}
                                    fill="url(#valueGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Asset Distribution */}
            <Card className="glass-card border-border/50">
                <CardHeader>
                    <CardTitle>Asset Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={distributionData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={2}
                                >
                                    {distributionData.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            return (
                                                <motion.div
                                                    variants={scaleIn}
                                                    initial="initial"
                                                    animate="animate"
                                                    className="glass-card rounded-lg border p-3 shadow-lg"
                                                >
                                                    <p className="font-medium">{data.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {data.symbol}
                                                    </p>
                                                    <div className="mt-2 space-y-1">
                                                        <p className="text-sm">
                                                            Value: {formatCurrency(data.value)}
                                                        </p>
                                                        <p className="text-sm">
                                                            Share: {data.percentage.toFixed(2)}%
                                                        </p>
                                                        <p className={`text-sm ${data.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                            24h: {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}%
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Asset Performance */}
            <Card className="glass-card border-border/50">
                <CardHeader>
                    <CardTitle>Asset Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {distributionData.map((asset, index) => (
                            <motion.div
                                key={asset.name}
                                variants={{
                                    initial: { opacity: 0, y: 20 },
                                    animate: { opacity: 1, y: 0, transition: { delay: index * 0.1 } },
                                }}
                                className="flex items-center justify-between rounded-lg bg-accent/5 p-3"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="h-2 w-2 rounded-full"
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    />
                                    <div>
                                        <p className="font-medium">{asset.name}</p>
                                        <p className="text-sm text-muted-foreground">{asset.symbol}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">{formatCurrency(asset.value)}</p>
                                    <p className={`text-sm ${asset.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {asset.profit >= 0 ? '+' : ''}{formatCurrency(asset.profit)}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
} 