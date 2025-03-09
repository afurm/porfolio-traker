import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/animations/framer';

export default function SettingsPage() {
  return (
    <div className="relative min-h-screen bg-background">
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
          <h1 className="text-4xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Settings
          </h1>
          <p className="text-muted-foreground mt-2">Customize your FolioFlux experience</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
