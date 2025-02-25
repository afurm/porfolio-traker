import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { fadeIn } from '@/animations/framer';

interface MarketData {
  trends: Array<{
    indicator: string;
    value: number;
    signal: 'bullish' | 'bearish' | 'neutral';
  }>;
  sentiment: {
    overall: string;
    fear: number;
    social: number;
    news: number;
  };
  predictions: Array<{
    timeframe: string;
    value: number;
    confidence: number;
  }>;
}

interface MarketAnalysisProps {
  data: MarketData;
}

export function MarketAnalysis({ data }: MarketAnalysisProps) {
  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'bullish':
        return 'text-green-500';
      case 'bearish':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Market Trends */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Market Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.trends.map((trend) => (
              <div
                key={trend.indicator}
                className="flex items-center justify-between p-2 bg-accent rounded-lg"
              >
                <span className="text-muted-foreground">{trend.indicator}</span>
                <div className="flex items-center gap-2">
                  <span className="text-foreground">{trend.value}</span>
                  <Icon
                    name={
                      trend.signal === 'bullish'
                        ? 'TrendingUp'
                        : trend.signal === 'bearish'
                          ? 'TrendingDown'
                          : 'Minus'
                    }
                    className={`h-5 w-5 ${getSignalColor(trend.signal)}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Sentiment */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Market Sentiment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-2xl font-bold capitalize text-blue-500">
                {data.sentiment.overall}
              </div>
              <div className="text-sm text-muted-foreground">Overall Sentiment</div>
            </div>
            <div className="space-y-4">
              {Object.entries(data.sentiment)
                .filter(([key]) => key !== 'overall')
                .map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground capitalize">{key}</span>
                      <span className="text-foreground">{value}/100</span>
                    </div>
                    <div className="h-2 bg-accent rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Predictions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Price Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.predictions.map((prediction) => (
              <div key={prediction.timeframe} className="p-3 bg-accent rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{prediction.timeframe}</span>
                  <span className="text-foreground">{formatCurrency(prediction.value)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${prediction.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {(prediction.confidence * 100).toFixed(0)}% confidence
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
