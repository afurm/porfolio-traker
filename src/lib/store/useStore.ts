import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createUserSlice, type UserSlice } from './slices/userSlice'
import { createPortfolioSlice, type PortfolioSlice } from './slices/portfolioSlice'
import { createSettingsSlice, type SettingsSlice } from './slices/settingsSlice'

export type StoreState = UserSlice & PortfolioSlice & SettingsSlice

export const useStore = create<StoreState>()(
    persist(
        (...a) => ({
            ...createUserSlice(...a),
            ...createPortfolioSlice(...a),
            ...createSettingsSlice(...a),
        }),
        {
            name: 'crypto-portfolio-store',
            partialize: (state) => ({
                settings: state.settings,
                user: state.user,
            }),
        }
    )
) 