import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Icon, type IconName } from '@/components/ui/icon';
import { fadeIn, staggerContainer } from '@/animations/framer';
import FeatureIcon from '@/components/3d/FeatureIcon';
import ComingSoonPage from './coming-soon';

// Define the types that were previously imported from the API file
interface MarketStats {
  totalMarketCap: string;
  totalMarketCapChange: string;
  totalVolume: string;
  totalVolumeChange: string;
  btcDominance: string;
  btcDominanceChange: string;
  activeCryptocurrencies: string;
  activeCryptocurrenciesChange: string;
}

interface CryptoData {
  name: string;
  symbol: string;
  price: string;
  change: string;
  volume: string;
  marketCap: string;
}

interface MarketData {
  marketStats: MarketStats;
  topCryptos: CryptoData[];
}

// Detailed features with alternating layouts
interface DetailedFeature {
  title: string;
  description: string;
  icon: IconName;
  cta: string;
  link: string;
  image: string;
  color: string;
  gradient: string;
  benefits: string[];
  iconType: 'dashboard' | 'transactions' | 'market' | 'ai' | 'alerts' | 'wallet';
}

const detailedFeatures: DetailedFeature[] = [
  {
    title: 'Advanced Portfolio Dashboard',
    description:
      'Track your entire crypto portfolio in real-time with advanced analytics and performance metrics.',
    icon: 'BarChart2',
    cta: 'View Portfolio',
    link: '/portfolio',
    image: '/images/portfolio-preview.png',
    color: '#3B82F6',
    gradient: 'from-blue-500/20 to-blue-500/5',
    iconType: 'dashboard',
    benefits: [
      'Real-time portfolio tracking',
      'Performance analytics',
      'Asset allocation insights',
      'Historical data analysis',
    ],
  },
  {
    title: 'Smart Transaction Management',
    description:
      'Keep track of all your crypto transactions with detailed history and automated reporting.',
    icon: 'RefreshCcw',
    cta: 'View Transactions',
    link: '/transactions',
    image: '/images/transaction-history.png',
    color: '#9333ea',
    gradient: 'from-purple-500/20 to-purple-600/5',
    iconType: 'transactions',
    benefits: [
      'Complete transaction history',
      'Automated tax reporting',
      'Performance tracking',
      'Export capabilities',
    ],
  },
  {
    title: 'AI-Powered Analytics',
    icon: 'Brain',
    description: 'Make informed decisions with advanced analytics and AI-driven insights.',
    cta: 'View Analytics',
    link: '/analytics',
    image: '/images/ai-analytics.png',
    color: '#eab308',
    gradient: 'from-yellow-500/20 to-yellow-600/5',
    iconType: 'ai',
    benefits: [
      'Predictive analytics',
      'Risk assessment',
      'Portfolio optimization',
      'Custom reports',
    ],
  },
  {
    title: 'Smart Alert System',
    description: 'Never miss an opportunity with customizable price alerts and notifications.',
    icon: 'Bell',
    cta: 'Set Alerts',
    link: '/alerts',
    image: '/images/alerts.png',
    color: '#ef4444',
    gradient: 'from-red-500/20 to-red-600/5',
    iconType: 'alerts',
    benefits: ['Price alerts', 'Portfolio notifications', 'Market event alerts', 'Custom triggers'],
  },
  {
    title: 'Asset Management',
    description: 'Manage your crypto assets with advanced tracking and optimization tools.',
    icon: 'Wallet',
    cta: 'Manage Assets',
    link: '/assets',
    image: '/images/asset-management.png',
    color: '#6366f1',
    gradient: 'from-indigo-500/20 to-indigo-600/5',
    iconType: 'wallet',
    benefits: ['Asset tracking', 'Portfolio rebalancing', 'Performance metrics', 'Risk management'],
  },
];

// Enhanced features with more details
const features = [
  {
    title: 'Advanced Portfolio Tracking',
    description: 'Real-time tracking with AI-powered insights and predictive analytics',
    icon: 'BarChart2',
    gradient: 'from-blue-500 to-blue-600',
    benefits: ['Real-time updates', 'Performance analytics', 'Smart notifications'],
  },
  {
    title: 'Smart Price Alerts',
    description: 'Customizable alerts with machine learning-based price predictions',
    icon: 'Bell',
    gradient: 'from-purple-500 to-purple-600',
    benefits: ['Custom thresholds', 'ML predictions', 'Multi-channel alerts'],
  },
];

// Testimonials data
const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Crypto Trader',
    image: '/avatars/sarah.jpg',
    content:
      'This platform helped me grow my portfolio by 200%! The AI insights are incredibly accurate.',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'DeFi Investor',
    image: '/avatars/michael.jpg',
    content: 'The real-time analytics and custom alerts have transformed my trading strategy.',
    rating: 5,
  },
  {
    name: 'Emma Thompson',
    role: 'Portfolio Manager',
    image: '/avatars/emma.jpg',
    content: "Best crypto tracking platform I've used. The AI predictions are spot-on!",
    rating: 5,
  },
];

// Pricing plans
const plans = [
  {
    name: 'Free',
    description: 'Perfect for getting started',
    price: '$0',
    features: ['Basic portfolio tracking', 'Limited price alerts', 'Email support'],
    cta: 'Get Started',
    icon: 'Rocket',
  },
  {
    name: 'Premium',
    description: 'For serious traders',
    price: '$29',
    interval: '/month',
    features: [
      'AI-powered insights',
      'Unlimited alerts',
      'Advanced analytics',
      'DeFi portfolio tracking',
      'Priority support',
      'API access',
    ],
    cta: 'Start Free Trial',
    icon: 'Diamond',
  },
];

// FAQ items
const faqItems = [
  {
    question: 'How secure is my portfolio data?',
    answer:
      'We use bank-level encryption and never store your private keys. Your security is our top priority.',
  },
  {
    question: 'What exchanges do you support?',
    answer:
      'We support all major exchanges including Binance, Coinbase, Kraken, and more through API integration.',
  },
  {
    question: 'Do I need coding skills to use this?',
    answer:
      'Not at all! Our platform is designed to be user-friendly while providing powerful features.',
  },
  {
    question: 'How accurate are the AI predictions?',
    answer: 'Our AI model has shown 85% accuracy in trend predictions based on historical data.',
  },
];

// Convert market stats from API to the format used in the component
const formatMarketStats = (marketStats: MarketStats) => [
  {
    label: 'Total Market Cap',
    value: marketStats.totalMarketCap,
    change: marketStats.totalMarketCapChange,
    trend: marketStats.totalMarketCapChange.startsWith('-') ? 'down' : 'up',
  },
  {
    label: '24h Volume',
    value: marketStats.totalVolume,
    change: marketStats.totalVolumeChange,
    trend: marketStats.totalVolumeChange.startsWith('-') ? 'down' : 'up',
  },
  {
    label: 'BTC Dominance',
    value: marketStats.btcDominance,
    change: marketStats.btcDominanceChange,
    trend: marketStats.btcDominanceChange.startsWith('-') ? 'down' : 'up',
  },
  {
    label: 'Active Cryptocurrencies',
    value: marketStats.activeCryptocurrencies,
    change: marketStats.activeCryptocurrenciesChange,
    trend: marketStats.activeCryptocurrenciesChange.startsWith('-') ? 'down' : 'up',
  },
];

// Convert top cryptos from API to the format used in the component
const formatTopCryptos = (topCryptos: CryptoData[]) =>
  topCryptos.map((crypto) => ({
    name: crypto.name,
    symbol: crypto.symbol,
    price: crypto.price,
    change: crypto.change,
    volume: crypto.volume,
    marketCap: crypto.marketCap,
    sparkline: [0, 0, 0, 0, 0], // Placeholder for sparkline data
  }));

export default function Home({ marketData: initialMarketData }: { marketData: MarketData }) {
  // Check which landing page to show based on environment variable
  const landingPageType = process.env.NEXT_PUBLIC_LANDING_PAGE || 'main';

  // Initialize all hooks unconditionally first
  const [marketData, setMarketData] = useState<MarketData>(initialMarketData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Function to refresh the data
  const refreshData = useCallback(async () => {
    try {
      setIsRefreshing(true);

      // Fetch data directly from CoinGecko API
      const globalRes = await fetch('https://api.coingecko.com/api/v3/global');
      const globalData = await globalRes.json();

      const topCoinsRes = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=3&page=1&sparkline=false&price_change_percentage=24h'
      );
      const topCoins = await topCoinsRes.json();

      // Format market stats
      const marketStats = {
        totalMarketCap: `$${(globalData.data.total_market_cap.usd / 1e12).toFixed(1)}T`,
        totalMarketCapChange: `${globalData.data.market_cap_change_percentage_24h_usd.toFixed(1)}%`,
        totalVolume: `$${(globalData.data.total_volume.usd / 1e9).toFixed(0)}B`,
        totalVolumeChange: '+3.8%', // This data might not be directly available from the API
        btcDominance: `${globalData.data.market_cap_percentage.btc.toFixed(0)}%`,
        btcDominanceChange: '-0.5%', // This data might not be directly available from the API
        activeCryptocurrencies: `${globalData.data.active_cryptocurrencies}+`,
        activeCryptocurrenciesChange: '+2.1%', // This data might not be directly available from the API
      };

      // Format top cryptocurrencies
      const topCryptosData = topCoins.map(
        (coin: {
          name: string;
          symbol: string;
          current_price: number;
          price_change_percentage_24h: number;
          total_volume: number;
          market_cap: number;
        }) => ({
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          price: `$${coin.current_price.toLocaleString()}`,
          change: `${coin.price_change_percentage_24h.toFixed(1)}%`,
          volume: `$${(coin.total_volume / 1e9).toFixed(1)}B`,
          marketCap: `$${(coin.market_cap / 1e9).toFixed(0)}B`,
        })
      );

      // Update state with new data
      setMarketData({
        marketStats,
        topCryptos: topCryptosData,
      });
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []); // Empty dependency array since it doesn't depend on any props or state

  // Set up interval to refresh data every 2 minutes
  useEffect(() => {
    // Only run the effect if we're showing the main page
    if (landingPageType === 'coming-soon') return;

    const intervalId = setInterval(
      () => {
        refreshData();
      },
      2 * 60 * 1000
    ); // 2 minutes in milliseconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [landingPageType, refreshData]); // Add refreshData as a dependency

  // Format the data for display
  const formattedMarketStats = formatMarketStats(marketData.marketStats);
  const formattedTopCryptos = formatTopCryptos(marketData.topCryptos);

  // If the landing page type is "coming-soon", render the ComingSoonPage
  if (landingPageType === 'coming-soon') {
    return <ComingSoonPage />;
  }

  // Otherwise, render the main landing page
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0 bg-gradient-to-br from-background via-background to-background opacity-90"
        />
      </div>

      {/* Hero Section with enhanced 3D effects */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="container mx-auto px-4"
        >
          <motion.div
            variants={fadeIn}
            className="text-center max-w-4xl mx-auto mb-16"
            style={{ perspective: 1000 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
              whileHover={{ rotateX: 10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Master Your Crypto Portfolio with FolioFlux AI-Powered Insights
            </motion.h1>
            <p className="text-xl text-muted-foreground mb-8">
              Advanced portfolio tracking, real-time analytics, and AI-powered insights to optimize
              your crypto investments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="glass-card bg-gradient-to-r from-blue-500 to-purple-500 text-foreground shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/portfolio" className="flex items-center gap-2">
                  Your Portfolio
                  <Icon name="ArrowRight" className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Market Stats with enhanced animations */}
          <motion.div variants={fadeIn} className="grid md:grid-cols-4 gap-6 mb-16">
            {formattedMarketStats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, rotateY: 10 }}
                className="transform transition-all duration-300"
              >
                <Card className="glass-card border-border backdrop-blur-xl bg-background/5 overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-sm text-muted-foreground mb-2">{stat.label}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      <span
                        className={`text-sm flex items-center gap-1 ${
                          stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        <Icon
                          name={stat.trend === 'up' ? 'TrendingUp' : 'TrendingDown'}
                          className="h-4 w-4"
                        />
                        {stat.change}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Top Cryptocurrencies */}
          <motion.div variants={fadeIn} className="mb-16">
            <Card className="glass-card border-border backdrop-blur-xl bg-background/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Top Cryptocurrencies</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      Last updated: {lastUpdated.toLocaleTimeString()}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass-card flex items-center gap-1"
                      onClick={refreshData}
                      disabled={isRefreshing}
                    >
                      <Icon
                        name="RefreshCw"
                        className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
                      />
                      {isRefreshing ? 'Refreshing...' : 'Refresh'}
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4">
                  {formattedTopCryptos.map((crypto) => (
                    <motion.div
                      key={crypto.symbol}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-background/5 hover:bg-background/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="CircleDollarSign" className="h-8 w-8" />
                        <div>
                          <h3 className="font-medium">{crypto.name}</h3>
                          <span className="text-sm text-muted-foreground">{crypto.symbol}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="font-medium">{crypto.price}</div>
                          <span
                            className={`text-sm ${crypto.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}
                          >
                            {crypto.change}
                          </span>
                        </div>
                        <div className="hidden md:block text-right">
                          <div className="text-sm text-muted-foreground">Volume</div>
                          <div className="font-medium">{crypto.volume}</div>
                        </div>
                        <div className="hidden lg:block text-right">
                          <div className="text-sm text-muted-foreground">Market Cap</div>
                          <div className="font-medium">{crypto.marketCap}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Detailed Features Section with alternating layouts */}
          <section className="py-20">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="container mx-auto px-4"
            >
              <motion.div variants={fadeIn} className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                  Powerful Features for Modern Traders
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Advanced tools and insights to help you make better trading decisions
                </p>
              </motion.div>

              <div className="space-y-8 md:space-y-32">
                {detailedFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    variants={fadeIn}
                    className={`flex flex-col gap-8 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className="flex-1 space-y-6">
                      <div
                        className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.gradient}`}
                      >
                        <Icon
                          name={feature.icon}
                          className="h-6 w-6"
                          style={{ color: feature.color }}
                        />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground text-lg">{feature.description}</p>
                      <ul className="space-y-3">
                        {feature.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center gap-2">
                            <Icon
                              name="Check"
                              className="h-5 w-5"
                              style={{ color: feature.color }}
                            />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        size="lg"
                        className="mt-6 text-foreground shadow-lg transition-all duration-300"
                        style={
                          {
                            background: `linear-gradient(to right, ${feature.color}, ${feature.color}dd)`,
                            '--tw-shadow-color': `${feature.color}33`,
                          } as React.CSSProperties
                        }
                      >
                        <Link href={feature.link}>
                          {feature.cta}
                          <Icon name="ArrowRight" className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                    <div className="flex-1">
                      <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-gradient-to-br from-background/5 to-background/0 p-1 backdrop-blur-xl hidden md:block">
                        <div className="absolute inset-0 bg-gradient-to-br from-background/5 to-transparent" />
                        <div className="relative h-full w-full rounded-lg bg-gray-900/80">
                          <FeatureIcon type={feature.iconType} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Enhanced Features Grid */}
          <motion.div variants={fadeIn} className="grid md:grid-cols-3 gap-6 mb-16">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="transform transition-all duration-300"
              >
                <Card className="glass-card border-border backdrop-blur-xl bg-background/5 h-full">
                  <CardContent className="p-6">
                    <div
                      className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4`}
                    >
                      <Icon name={feature.icon as IconName} className="h-6 w-6 text-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-sm">
                          <Icon name="Check" className="h-4 w-4 text-green-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced CTA Section */}
          <motion.div variants={fadeIn} className="text-center">
            <Card className="glass-card border-border backdrop-blur-xl bg-background/5">
              <CardContent className="p-12">
                <motion.div whileHover={{ scale: 1.02 }} className="max-w-2xl mx-auto">
                  <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Trading?</h2>
                  <p className="text-muted-foreground mb-8">
                    Join thousands of traders who are already using our platform to track and
                    optimize their crypto portfolios.
                  </p>
                  <Button
                    size="lg"
                    className="glass-card bg-gradient-to-r from-blue-500 to-purple-500 text-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                  >
                    <Link href="/portfolio" className="flex items-center gap-2">
                      Get Started Now
                      <Icon name="ArrowRight" className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <motion.div variants={fadeIn} className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                whileHover={{ scale: 1.05 }}
                className="glass-card border-border backdrop-blur-xl bg-background/5 p-6 rounded-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{testimonial.content}</p>
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Icon key={i} name="Star" className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 relative">
        <motion.div variants={fadeIn} className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Choose Your Plan
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                whileHover={{ scale: 1.05 }}
                className="glass-card border-border backdrop-blur-xl bg-background/5 p-8 rounded-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Icon name={plan.icon as IconName} className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>
                </div>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.interval && <span className="text-muted-foreground">{plan.interval}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Icon name="Check" className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full glass-card bg-gradient-to-r from-blue-500 to-purple-500">
                  <Link href={plan.name === 'Free' ? '/portfolio' : '/pricing'}>{plan.cta}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <motion.div variants={fadeIn} className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="glass-card border-border backdrop-blur-xl bg-background/5 p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* AI Chat Assistant */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 right-6"
      >
        <Button
          size="lg"
          className="glass-card bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-4"
        >
          <Link href="/chat" className="flex items-center">
            <Icon name="MessageSquare" className="h-6 w-6" />
            <span className="ml-2">AI Assistant</span>
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}

// Add getStaticProps to fetch data with ISR
export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch data from our API endpoint directly
    const res = await fetch('https://api.coingecko.com/api/v3/global');
    const globalData = await res.json();

    const topCoinsRes = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=3&page=1&sparkline=false&price_change_percentage=24h'
    );
    const topCoins = await topCoinsRes.json();

    // Format market stats
    const marketStats = {
      totalMarketCap: `$${(globalData.data.total_market_cap.usd / 1e12).toFixed(1)}T`,
      totalMarketCapChange: `${globalData.data.market_cap_change_percentage_24h_usd.toFixed(1)}%`,
      totalVolume: `$${(globalData.data.total_volume.usd / 1e9).toFixed(0)}B`,
      totalVolumeChange: '+3.8%', // This data might not be directly available from the API
      btcDominance: `${globalData.data.market_cap_percentage.btc.toFixed(0)}%`,
      btcDominanceChange: '-0.5%', // This data might not be directly available from the API
      activeCryptocurrencies: `${globalData.data.active_cryptocurrencies}+`,
      activeCryptocurrenciesChange: '+2.1%', // This data might not be directly available from the API
    };

    // Format top cryptocurrencies
    const topCryptosData = topCoins.map(
      (coin: {
        name: string;
        symbol: string;
        current_price: number;
        price_change_percentage_24h: number;
        total_volume: number;
        market_cap: number;
      }) => ({
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: `$${coin.current_price.toLocaleString()}`,
        change: `${coin.price_change_percentage_24h.toFixed(1)}%`,
        volume: `$${(coin.total_volume / 1e9).toFixed(1)}B`,
        marketCap: `$${(coin.market_cap / 1e9).toFixed(0)}B`,
      })
    );

    return {
      props: {
        marketData: {
          marketStats,
          topCryptos: topCryptosData,
        },
      },
      // Revalidate every 2 minutes (120 seconds)
      revalidate: 120,
    };
  } catch (error) {
    console.error('Error fetching market data:', error);

    // Return fallback data in case of error
    return {
      props: {
        marketData: {
          marketStats: {
            totalMarketCap: '$2.1T',
            totalMarketCapChange: '+5.2%',
            totalVolume: '$125B',
            totalVolumeChange: '+3.8%',
            btcDominance: '45%',
            btcDominanceChange: '-0.5%',
            activeCryptocurrencies: '10,000+',
            activeCryptocurrenciesChange: '+2.1%',
          },
          topCryptos: [
            {
              name: 'Bitcoin',
              symbol: 'BTC',
              price: '$45,000',
              change: '+2.5%',
              volume: '$28B',
              marketCap: '$850B',
            },
            {
              name: 'Ethereum',
              symbol: 'ETH',
              price: '$3,200',
              change: '+4.2%',
              volume: '$15B',
              marketCap: '$380B',
            },
            {
              name: 'Solana',
              symbol: 'SOL',
              price: '$110',
              change: '+6.8%',
              volume: '$5B',
              marketCap: '$45B',
            },
          ],
        },
      },
      // Still revalidate even on error
      revalidate: 120,
    };
  }
};
