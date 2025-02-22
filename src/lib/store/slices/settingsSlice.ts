import { StateCreator } from 'zustand'
import { StoreState } from '../useStore'

export interface Settings {
    currency: string
    language: string
    rtl: boolean
    notifications: {
        priceAlerts: boolean
        newsAlerts: boolean
        portfolioUpdates: boolean
        email: boolean
        push: boolean
    }
    display: {
        showSmallBalances: boolean
        defaultView: 'list' | 'grid'
        chartPeriod: '24h' | '7d' | '30d' | '1y'
        chartType: 'line' | 'candlestick' | 'bar'
    }
    security: {
        twoFactor: boolean
        sessionTimeout: '15' | '30' | '60'
    }
    privacy: {
        dataSharing: boolean
        analytics: boolean
    }
    accessibility: {
        highContrast: boolean
        fontSize: 'small' | 'medium' | 'large'
        reduceAnimations: boolean
    }
    mobile: {
        touchInteraction: boolean
        pushNotifications: boolean
        optimizeData: boolean
    }
}

export interface SettingsSlice {
    settings: Settings
    updateSettings: (settings: Partial<Settings>) => void
    resetSettings: () => void
}

const defaultSettings: Settings = {
    currency: 'USD',
    language: 'en',
    rtl: false,
    notifications: {
        priceAlerts: true,
        newsAlerts: true,
        portfolioUpdates: true,
        email: true,
        push: true,
    },
    display: {
        showSmallBalances: false,
        defaultView: 'grid',
        chartPeriod: '24h',
        chartType: 'line',
    },
    security: {
        twoFactor: false,
        sessionTimeout: '30',
    },
    privacy: {
        dataSharing: true,
        analytics: true,
    },
    accessibility: {
        highContrast: false,
        fontSize: 'medium',
        reduceAnimations: false,
    },
    mobile: {
        touchInteraction: true,
        pushNotifications: true,
        optimizeData: true,
    },
}

export const createSettingsSlice: StateCreator<
    StoreState,
    [],
    [],
    SettingsSlice
> = (set) => ({
    settings: defaultSettings,
    updateSettings: (newSettings) =>
        set((state) => ({
            settings: {
                ...state.settings,
                ...newSettings,
            },
        })),
    resetSettings: () => set({ settings: defaultSettings }),
}) 