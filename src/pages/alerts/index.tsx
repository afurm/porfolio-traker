import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { fadeIn, staggerContainer, listItem } from '@/animations/framer';

// Mock data for demonstration
const mockAlerts = [
  {
    id: '1',
    userId: 'user1',
    assetId: 'btc',
    type: 'price',
    condition: 'above',
    value: 50000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    userId: 'user1',
    assetId: 'eth',
    type: 'change',
    condition: 'below',
    value: -10,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'inactive'>('all');

  const tabs = [
    { id: 'all', label: 'All Alerts' },
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ];

  return (
    <div className="relative min-h-screen bg-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <motion.div
        variants={staggerContainer}
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
          <h1 className="text-4xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500">
            Price Alerts
          </h1>
          <p className="text-muted-foreground mt-2">
            Set and manage your cryptocurrency price alerts
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ perspective: '1000px' }}
        >
          <div className="space-y-6">
            {/* Actions Bar */}
            <motion.div
              whileHover={{ transform: 'translateZ(10px)' }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="relative overflow-hidden rounded-xl backdrop-blur-md bg-background/30 border border-border shadow-lg p-4"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-purple-500/10 to-blue-500/10" />
              <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,transparent)]" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {tabs.map((tab) => (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className="gap-2"
                    >
                      {tab.label}
                    </Button>
                  ))}
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Button className="gap-2 bg-gradient-to-r from-red-500 to-purple-500 text-primary-foreground border-none hover:from-red-600 hover:to-purple-600">
                    <Icon name="Plus" className="h-4 w-4" />
                    New Alert
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Alerts List */}
            <motion.div
              variants={fadeIn}
              className="relative overflow-hidden rounded-xl backdrop-blur-md bg-background/30 border border-border shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-purple-500/5 to-blue-500/5" />
              <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,transparent)]" />

              <div className="relative p-6">
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="space-y-4"
                >
                  {mockAlerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      variants={listItem}
                      whileHover={{
                        scale: 1.02,
                        transition: { type: 'spring', stiffness: 300 },
                      }}
                      className="relative overflow-hidden rounded-lg bg-background/50 p-6 transition-colors hover:bg-background/70"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              alert.type === 'price' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                            }`}
                          >
                            <Icon
                              name={alert.type === 'price' ? 'DollarSign' : 'TrendingUp'}
                              className={`h-5 w-5 ${
                                alert.type === 'price' ? 'text-blue-400' : 'text-purple-400'
                              }`}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">
                              {alert.type === 'price' ? 'Price Alert' : 'Change Alert'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {alert.condition === 'above' ? 'Above' : 'Below'} {alert.value}
                              {alert.type === 'change' ? '%' : ' USD'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Icon name="Edit" className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Icon name="Trash2" className="h-4 w-4" />
                          </Button>
                          <div className="h-8 w-px bg-border" />
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`gap-2 ${
                              alert.isActive
                                ? 'text-green-400 hover:text-green-300'
                                : 'text-red-400 hover:text-red-300'
                            }`}
                          >
                            <Icon
                              name={alert.isActive ? 'CheckCircle' : 'XCircle'}
                              className="h-4 w-4"
                            />
                            {alert.isActive ? 'Active' : 'Inactive'}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
