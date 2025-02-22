import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { CryptoAsset, Transaction } from '../store/slices/portfolioSlice'
import { prisma } from '@/lib/prisma'

const COINGECKO_API = 'https://api.coingecko.com/api/v3'

// Fetch crypto price
export function useCryptoPrice(coinId: string) {
    return useQuery({
        queryKey: ['cryptoPrice', coinId],
        queryFn: async () => {
            const { data } = await axios.get(
                `${COINGECKO_API}/simple/price?ids=${coinId}&vs_currencies=usd`
            )
            return data[coinId]?.usd || 0
        },
        enabled: !!coinId,
    })
}

// Fetch multiple crypto prices
export function useCryptoPrices(coinIds: string[]) {
    return useQuery({
        queryKey: ['prices', coinIds],
        queryFn: async () => {
            if (coinIds.length === 0) return {}

            const response = await fetch(
                `${COINGECKO_API}/simple/price?ids=${coinIds.join(',')}&vs_currencies=usd`
            )

            if (!response.ok) {
                throw new Error('Failed to fetch prices')
            }

            return response.json()
        },
        enabled: coinIds.length > 0,
    })
}

// Fetch crypto market data
export function useCryptoMarketData(coinId: string) {
    return useQuery({
        queryKey: ['cryptoMarketData', coinId],
        queryFn: async () => {
            const { data } = await axios.get(
                `${COINGECKO_API}/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=daily`
            )
            return data
        },
        enabled: !!coinId,
    })
}

// Search cryptocurrencies
export function useSearchCrypto(query: string) {
    return useQuery({
        queryKey: ['searchCrypto', query],
        queryFn: async () => {
            const { data } = await axios.get(
                `${COINGECKO_API}/search?query=${query}`
            )
            return data.coins
        },
        enabled: query.length > 2,
    })
}

// Fetch portfolio data
export function usePortfolioData() {
    return useQuery({
        queryKey: ['portfolio'],
        queryFn: async () => {
            const assets = await prisma.asset.findMany({
                include: {
                    transactions: true,
                },
            })
            return assets
        },
    })
}

// Update portfolio data
export function useUpdatePortfolio() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            userId,
            data,
        }: {
            userId: string
            data: Partial<CryptoAsset>
        }) => {
            const response = await axios.put(`/api/portfolio/${userId}`, data)
            return response.data
        },
        onSuccess: (_, { userId }) => {
            queryClient.invalidateQueries({ queryKey: ['portfolio', userId] })
        },
    })
} 