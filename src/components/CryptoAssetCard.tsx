import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '@/components/ui'
import { Icon } from '@/components/ui/icon'
import { formatCurrency } from '@/utils/formatCurrency'
import { scaleIn } from '@/animations/framer'
import { animateNumber } from '@/animations/gsap'
import { useHoverAnimation } from '@/animations/spring'

interface CryptoAssetCardProps {
    coinName: string
    symbol: string
    amount: number
    currentPrice: number
    priceChange24h: number
    onTrade?: () => void
}

export function CryptoAssetCard({
    coinName,
    symbol,
    amount,
    currentPrice,
    priceChange24h,
    onTrade
}: CryptoAssetCardProps) {
    const totalValue = amount * currentPrice
    const isPriceUp = priceChange24h >= 0
    const priceRef = useRef<HTMLSpanElement>(null)
    const [isHovered, setIsHovered] = React.useState(false)

    // React Spring hover animation
    const springProps = useSpring(useHoverAnimation(isHovered))

    // Animate price with GSAP when it changes
    useEffect(() => {
        if (priceRef.current) {
            animateNumber(priceRef.current, currentPrice, 1, '$')
        }
    }, [currentPrice])

    return (
        <animated.div style={springProps}>
            <motion.div
                variants={scaleIn}
                initial="initial"
                animate="animate"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <Card className="w-full max-w-sm bg-card">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between text-xl">
                            <span className="flex items-center gap-2">
                                <Icon name="Bitcoin" className="text-accent-yellow" size="lg" />
                                {coinName}
                            </span>
                            <span className="text-sm font-medium text-muted-foreground">{symbol.toUpperCase()}</span>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                            Current Price: <span ref={priceRef} className="font-medium">{formatCurrency(currentPrice)}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Amount:</span>
                                <span className="font-medium">{amount}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Total Value:</span>
                                <span className="font-medium">{formatCurrency(totalValue)}</span>
                            </div>
                            <motion.div
                                className="flex justify-between items-center"
                                animate={{
                                    color: isPriceUp ? 'hsl(var(--accent-green))' : 'hsl(var(--accent-red))'
                                }}
                            >
                                <span className="text-sm text-muted-foreground">24h Change:</span>
                                <span className="flex items-center gap-1 font-medium">
                                    <Icon
                                        name={isPriceUp ? 'TrendingUp' : 'TrendingDown'}
                                        size="sm"
                                    />
                                    {isPriceUp ? '+' : ''}{priceChange24h.toFixed(2)}%
                                </span>
                            </motion.div>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onTrade}
                            className="gap-2"
                        >
                            <Icon name="RefreshCw" size="sm" />
                            Trade
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="gap-2"
                        >
                            <Icon name="BarChart2" size="sm" />
                            View Details
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </animated.div>
    )
} 