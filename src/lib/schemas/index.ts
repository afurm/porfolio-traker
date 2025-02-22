import { z } from 'zod';

// User Schema
export const userSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    name: z.string().optional(),
    image: z.string().url().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Asset Schema
export const assetSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    coinId: z.string(),
    coinName: z.string(),
    symbol: z.string(),
    amount: z.number().positive(),
    purchasePrice: z.number().positive(),
    currentPrice: z.number().positive(),
    priceChange24h: z.number(),
    lastUpdated: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Transaction Schema
export const transactionSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    assetId: z.string().uuid(),
    type: z.enum(['buy', 'sell']),
    amount: z.number().positive(),
    price: z.number().positive(),
    timestamp: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Portfolio Schema
export const portfolioSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    name: z.string(),
    description: z.string().optional(),
    isDefault: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Alert Schema
export const alertSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    assetId: z.string().uuid(),
    type: z.enum(['price', 'change', 'volume']),
    condition: z.enum(['above', 'below']),
    value: z.number(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Settings Schema
export const settingsSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    currency: z.string().default('USD'),
    theme: z.enum(['light', 'dark', 'system']).default('system'),
    notifications: z.object({
        email: z.boolean().default(true),
        push: z.boolean().default(true),
        priceAlerts: z.boolean().default(true),
    }),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Export types
export type User = z.infer<typeof userSchema>;
export type Asset = z.infer<typeof assetSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
export type Portfolio = z.infer<typeof portfolioSchema>;
export type Alert = z.infer<typeof alertSchema>;
export type Settings = z.infer<typeof settingsSchema>; 