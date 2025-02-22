import { StateCreator } from 'zustand'
import { StoreState } from '../useStore'

export interface CryptoAsset {
    id: string
    coinName: string
    symbol: string
    amount: number
    purchasePrice: number
    currentPrice: number
    lastUpdated: string
}

export interface Transaction {
    id: string
    coinName: string
    symbol: string
    amount: number
    price: number
    type: 'buy' | 'sell'
    timestamp: string
}

export interface PortfolioSlice {
    assets: CryptoAsset[]
    transactions: Transaction[]
    selectedAsset: string | null
    isLoading: boolean
    setAssets: (assets: CryptoAsset[]) => void
    addAsset: (asset: CryptoAsset) => void
    updateAsset: (id: string, updates: Partial<CryptoAsset>) => void
    removeAsset: (id: string) => void
    setTransactions: (transactions: Transaction[]) => void
    addTransaction: (transaction: Transaction) => void
    setSelectedAsset: (id: string | null) => void
    setLoading: (isLoading: boolean) => void
}

export const createPortfolioSlice: StateCreator<
    StoreState,
    [],
    [],
    PortfolioSlice
> = (set) => ({
    assets: [],
    transactions: [],
    selectedAsset: null,
    isLoading: false,
    setAssets: (assets) => set({ assets }),
    addAsset: (asset) =>
        set((state) => ({ assets: [...state.assets, asset] })),
    updateAsset: (id, updates) =>
        set((state) => ({
            assets: state.assets.map((asset) =>
                asset.id === id ? { ...asset, ...updates } : asset
            ),
        })),
    removeAsset: (id) =>
        set((state) => ({
            assets: state.assets.filter((asset) => asset.id !== id),
        })),
    setTransactions: (transactions) => set({ transactions }),
    addTransaction: (transaction) =>
        set((state) => ({
            transactions: [...state.transactions, transaction],
        })),
    setSelectedAsset: (id) => set({ selectedAsset: id }),
    setLoading: (isLoading) => set({ isLoading }),
}) 