import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { useStore } from '@/lib/store/useStore';
import { fadeIn, staggerContainer, listItem } from '@/animations/framer';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const settings = useStore(state => state.settings);
    const updateSettings = useStore(state => state.updateSettings);

    const settingsSections = [
        {
            id: 'appearance',
            title: 'Appearance',
            icon: 'Palette',
            description: 'Customize the look and feel',
            settings: [
                {
                    id: 'theme',
                    label: 'Theme',
                    type: 'theme-selector',
                    value: theme,
                    options: [
                        { value: 'light', label: 'Light', icon: 'Sun' },
                        { value: 'dark', label: 'Dark', icon: 'Moon' },
                        { value: 'system', label: 'System', icon: 'Laptop' }
                    ]
                },
                {
                    id: 'language',
                    label: 'Language',
                    type: 'select',
                    value: settings.language,
                    options: [
                        { value: 'en', label: 'English' },
                        { value: 'es', label: 'Español' },
                        { value: 'fr', label: 'Français' }
                    ]
                },
                {
                    id: 'rtl',
                    label: 'RTL Support',
                    type: 'toggle',
                    value: settings.rtl
                }
            ]
        },
        {
            id: 'notifications',
            title: 'Notifications',
            icon: 'Bell',
            description: 'Manage your notification preferences',
            settings: [
                {
                    id: 'priceAlerts',
                    label: 'Price Alerts',
                    type: 'toggle',
                    value: settings.notifications.priceAlerts
                },
                {
                    id: 'newsAlerts',
                    label: 'News Alerts',
                    type: 'toggle',
                    value: settings.notifications.newsAlerts
                },
                {
                    id: 'portfolioUpdates',
                    label: 'Portfolio Updates',
                    type: 'toggle',
                    value: settings.notifications.portfolioUpdates
                }
            ]
        },
        {
            id: 'display',
            title: 'Display',
            icon: 'Monitor',
            description: 'Customize your viewing preferences',
            settings: [
                {
                    id: 'defaultView',
                    label: 'Default View',
                    type: 'select',
                    value: settings.display.defaultView,
                    options: [
                        { value: 'grid', label: 'Grid' },
                        { value: 'list', label: 'List' }
                    ]
                },
                {
                    id: 'showSmallBalances',
                    label: 'Show Small Balances',
                    type: 'toggle',
                    value: settings.display.showSmallBalances
                }
            ]
        },
        {
            id: 'preferences',
            title: 'Preferences',
            icon: 'Settings',
            description: 'Set your default preferences',
            settings: [
                {
                    id: 'currency',
                    label: 'Currency',
                    type: 'select',
                    value: settings.currency,
                    options: [
                        { value: 'USD', label: 'USD ($)' },
                        { value: 'EUR', label: 'EUR (€)' },
                        { value: 'GBP', label: 'GBP (£)' }
                    ]
                }
            ]
        },
        {
            id: 'charts',
            title: 'Chart Settings',
            icon: 'LineChart',
            description: 'Configure chart display preferences',
            settings: [
                {
                    id: 'chartPeriod',
                    label: 'Default Time Period',
                    type: 'select',
                    value: settings.display.chartPeriod,
                    options: [
                        { value: '24h', label: '24 Hours' },
                        { value: '7d', label: '7 Days' },
                        { value: '30d', label: '30 Days' },
                        { value: '1y', label: '1 Year' }
                    ]
                },
                {
                    id: 'chartType',
                    label: 'Default Chart Type',
                    type: 'select',
                    value: settings.display.chartType,
                    options: [
                        { value: 'line', label: 'Line Chart' },
                        { value: 'candlestick', label: 'Candlestick' },
                        { value: 'bar', label: 'Bar Chart' }
                    ]
                }
            ]
        },
        {
            id: 'security',
            title: 'Security',
            icon: 'Shield',
            description: 'Manage security settings',
            settings: [
                {
                    id: 'twoFactor',
                    label: '2FA Authentication',
                    type: 'toggle',
                    value: settings.security?.twoFactor
                },
                {
                    id: 'sessionTimeout',
                    label: 'Session Timeout',
                    type: 'select',
                    value: settings.security?.sessionTimeout,
                    options: [
                        { value: '15', label: '15 minutes' },
                        { value: '30', label: '30 minutes' },
                        { value: '60', label: '1 hour' }
                    ]
                }
            ]
        },
        {
            id: 'privacy',
            title: 'Privacy & Data',
            icon: 'Lock',
            description: 'Control your data and privacy',
            settings: [
                {
                    id: 'dataSharing',
                    label: 'Data Sharing',
                    type: 'toggle',
                    value: settings.privacy?.dataSharing
                },
                {
                    id: 'analytics',
                    label: 'Analytics',
                    type: 'toggle',
                    value: settings.privacy?.analytics
                },
                {
                    id: 'exportData',
                    label: 'Export All Data',
                    type: 'button',
                    action: 'exportUserData'
                }
            ]
        },
        {
            id: 'accessibility',
            title: 'Accessibility',
            icon: 'Accessibility',
            description: 'Customize accessibility options',
            settings: [
                {
                    id: 'highContrast',
                    label: 'High Contrast',
                    type: 'toggle',
                    value: settings.accessibility?.highContrast
                },
                {
                    id: 'fontSize',
                    label: 'Font Size',
                    type: 'select',
                    value: settings.accessibility?.fontSize,
                    options: [
                        { value: 'small', label: 'Small' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'large', label: 'Large' }
                    ]
                },
                {
                    id: 'reduceAnimations',
                    label: 'Reduce Animations',
                    type: 'toggle',
                    value: settings.accessibility?.reduceAnimations
                }
            ]
        },
        {
            id: 'integrations',
            title: 'Integrations',
            icon: 'Link',
            description: 'Manage external connections',
            settings: [
                {
                    id: 'exchanges',
                    label: 'Exchange APIs',
                    type: 'button',
                    action: 'manageExchanges'
                },
                {
                    id: 'wallets',
                    label: 'Connected Wallets',
                    type: 'button',
                    action: 'manageWallets'
                }
            ]
        },
        {
            id: 'mobile',
            title: 'Mobile Settings',
            icon: 'Smartphone',
            description: 'Configure mobile preferences',
            settings: [
                {
                    id: 'touchInteraction',
                    label: 'Enhanced Touch Controls',
                    type: 'toggle',
                    value: settings.mobile?.touchInteraction
                },
                {
                    id: 'mobileNotifications',
                    label: 'Push Notifications',
                    type: 'toggle',
                    value: settings.mobile?.pushNotifications
                },
                {
                    id: 'dataUsage',
                    label: 'Optimize Data Usage',
                    type: 'toggle',
                    value: settings.mobile?.optimizeData
                }
            ]
        }
    ];

    return (
        <div className="relative min-h-screen bg-[#0d1117]">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute top-1/2 left-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />
                <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
            </div>

            <motion.div
                variants={fadeIn}
                initial="initial"
                animate="animate"
                className="relative container mx-auto py-8 px-4"
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                        Settings
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Customize your Crypto Portfolio experience
                    </p>
                </motion.div>

                {/* Settings Sections */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="space-y-6"
                >
                    {settingsSections.map((section, sectionIndex) => (
                        <motion.div
                            key={section.id}
                            variants={listItem}
                            className="relative group"
                        >
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl transition-all group-hover:from-blue-500/20 group-hover:to-purple-500/20" />
                            <div className="relative overflow-hidden rounded-xl backdrop-blur-md bg-white/5 border border-white/10 p-6 shadow-2xl transition-colors hover:bg-white/[0.075]">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                                        <Icon name={section.icon} className="text-blue-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">
                                            {section.title}
                                        </h2>
                                        <p className="text-sm text-white/60">
                                            {section.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {section.settings.map((setting) => (
                                        <div
                                            key={setting.id}
                                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 backdrop-blur-sm"
                                        >
                                            <span className="text-white font-medium">
                                                {setting.label}
                                            </span>
                                            {setting.type === 'theme-selector' && (
                                                <div className="flex gap-2">
                                                    {setting.options.map((option) => (
                                                        <Button
                                                            key={option.value}
                                                            variant={theme === option.value ? 'default' : 'outline'}
                                                            size="sm"
                                                            onClick={() => setTheme(option.value)}
                                                            className={`gap-2 ${theme === option.value
                                                                ? 'bg-blue-500/20 border-blue-500/50'
                                                                : 'bg-white/5 border-white/10'
                                                                }`}
                                                        >
                                                            <Icon name={option.icon} className="h-4 w-4" />
                                                            {option.label}
                                                        </Button>
                                                    ))}
                                                </div>
                                            )}
                                            {setting.type === 'toggle' && (
                                                <Button
                                                    variant={setting.value ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => {
                                                        const path = section.id === 'notifications'
                                                            ? `notifications.${setting.id}`
                                                            : `display.${setting.id}`;
                                                        updateSettings({ [path]: !setting.value });
                                                    }}
                                                    className={`${setting.value
                                                        ? 'bg-blue-500/20 border-blue-500/50'
                                                        : 'bg-white/5 border-white/10'
                                                        }`}
                                                >
                                                    {setting.value ? 'Enabled' : 'Disabled'}
                                                </Button>
                                            )}
                                            {setting.type === 'select' && (
                                                <select
                                                    value={setting.value}
                                                    onChange={(e) => {
                                                        const path = section.id === 'preferences'
                                                            ? setting.id
                                                            : `display.${setting.id}`;
                                                        updateSettings({ [path]: e.target.value });
                                                    }}
                                                    className="bg-white/5 border-white/10 rounded-md text-white px-3 py-1"
                                                >
                                                    {setting.options.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
} 