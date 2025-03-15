import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { fadeIn, staggerContainer } from '@/animations/framer';

const ComingSoonPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Enhanced parallax effects
  const y1 = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <>
      <Head>
        <title>Coming Soon - FolioFlux</title>
        <meta
          name="description"
          content="FolioFlux - Track and manage your crypto investments with AI-powered insights. Coming soon!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div
        ref={containerRef}
        className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-950 overflow-hidden"
      >
        {/* Floating Crypto Icons */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: `${Math.random() * 100}vw`,
                y: `${Math.random() * 100}vh`,
                opacity: 0.1 + Math.random() * 0.3,
              }}
              animate={{
                y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
                x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
                rotate: [0, 360],
              }}
              transition={{
                duration: 15 + Math.random() * 30,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              <div className="text-gray-500 opacity-20 text-2xl">
                {['₿', 'Ξ', '₮', '₱', 'Ł', '₳', '₴', '₭', '₲'][Math.floor(Math.random() * 9)]}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hero Section with Enhanced Parallax */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden px-4">
          <motion.div className="absolute inset-0 z-0" style={{ y: y1 }}>
            <div className="absolute inset-0 bg-[url('/images/stars.svg')] bg-repeat opacity-50"></div>
          </motion.div>

          <motion.div className="absolute inset-0 z-10" style={{ y: y2 }}>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 filter blur-3xl opacity-20 animate-pulse"></div>
            <div
              className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-purple-500 filter blur-3xl opacity-20 animate-pulse"
              style={{ animationDelay: '1s' }}
            ></div>
            <div
              className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-cyan-500 filter blur-3xl opacity-20 animate-pulse"
              style={{ animationDelay: '2s' }}
            ></div>
          </motion.div>

          <motion.div
            className="relative z-20 text-center px-4 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            style={{ scale }}
          >
            <motion.div
              className="mb-6 relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="relative text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 py-2 px-4">
                FolioFlux
              </h1>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto"
              variants={fadeIn}
            >
              The next generation crypto portfolio tracker with AI-powered insights is coming soon.
            </motion.p>

            <motion.div
              className="mt-12 flex justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            ></motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <motion.div
              className="w-10 h-16 border-2 border-white rounded-full flex justify-center items-center p-1 bg-gray-900/30 backdrop-blur-sm"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div
                className="w-2 h-4 bg-white rounded-full"
                animate={{
                  y: [0, 6, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              ></motion.div>
            </motion.div>
            <p className="text-white text-sm mt-3 font-medium tracking-wider text-center">
              Scroll Down
            </p>
          </motion.div>
        </section>

        {/* Features Section - Enhanced */}
        <section className="py-20 px-4 relative z-30">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
              <motion.div
                className="inline-block mb-2 px-5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                FEATURES
              </motion.div>
              <motion.h2
                className="text-3xl md:text-5xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                What to Expect
              </motion.h2>
              <motion.p
                className="text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                We&apos;re building the ultimate crypto portfolio tracker with features designed to
                give you the edge in the market.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(138, 75, 255, 0.3)' }}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Upcoming Design Preview Section */}
        <section className="py-20 px-4 relative z-30">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
              <motion.div
                className="inline-block mb-2 px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                SNEAK PEEK
              </motion.div>
              <motion.h2
                className="text-3xl md:text-5xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Upcoming Design
              </motion.h2>
              <motion.p
                className="text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Get a glimpse of what we&apos;re building - powerful tools to help you manage your
                crypto portfolio
              </motion.p>
            </div>

            <div className="space-y-24">
              {/* Analytics Preview */}
              <motion.div
                className="flex flex-col md:flex-row items-center gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="md:w-1/2 order-2 md:order-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Advanced Analytics
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Visualize your portfolio performance with beautiful, interactive charts and
                    comprehensive analytics. Track your gains and losses over time, analyze asset
                    allocation, and identify trends to make informed decisions.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Real-time portfolio valuation
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Historical performance tracking
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Asset allocation insights
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2 order-1 md:order-2">
                  <div className="rounded-xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-gray-700/50 transform hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/images/analytics.png"
                      alt="Analytics Dashboard"
                      width={800}
                      height={500}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Price Alerts Preview */}
              <motion.div
                className="flex flex-col md:flex-row items-center gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="md:w-1/2">
                  <div className="rounded-xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-gray-700/50 transform hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/images/price-alert.png"
                      alt="Price Alert Interface"
                      width={800}
                      height={500}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Smart Price Alerts
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Never miss a market opportunity with our customizable price alerts. Set up
                    notifications for price movements, market cap changes, or volume spikes for any
                    asset in your portfolio.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Customizable price thresholds
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Instant notifications
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      AI-powered market trend alerts
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Transactions Preview */}
              <motion.div
                className="flex flex-col md:flex-row items-center gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="md:w-1/2 order-2 md:order-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Transaction Tracking
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Keep track of all your crypto transactions in one place. Import transactions
                    automatically from exchanges and wallets, or add them manually. Generate tax
                    reports with ease.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Automatic exchange imports
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Detailed transaction history
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Tax reporting tools
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2 order-1 md:order-2">
                  <div className="rounded-xl overflow-hidden shadow-2xl shadow-cyan-500/20 border border-gray-700/50 transform hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/images/transactions.png"
                      alt="Transaction Tracking Interface"
                      width={800}
                      height={500}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Timeline Section - Enhanced */}
        <section className="py-20 px-4 relative z-30">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
              <motion.div
                className="inline-block mb-2 px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                ROADMAP
              </motion.div>
              <motion.h2
                className="text-3xl md:text-5xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Development Timeline
              </motion.h2>
              <motion.p
                className="text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Follow our journey as we build FolioFlux from concept to launch
              </motion.p>
            </div>

            <div className="relative">
              {/* Timeline line - visible on desktop, hidden on mobile */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600"></div>

              {/* Mobile timeline line - only visible on mobile */}
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600"></div>

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`relative mb-12 ${
                    isMobile
                      ? 'flex flex-col pl-6'
                      : index % 2 === 0
                        ? 'md:ml-auto md:mr-[50%] md:pr-12'
                        : 'md:mr-auto md:ml-[50%] md:pl-12'
                  }`}
                  initial={{ opacity: 0, x: isMobile ? -20 : index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 w-full">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                        item.status === 'Completed'
                          ? 'bg-green-500/20 text-green-300'
                          : item.status === 'In Progress'
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : item.status === 'Almost Done'
                              ? 'bg-cyan-500/20 text-cyan-300'
                              : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {item.status}
                    </span>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 mb-2">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Footer - Enhanced */}
        <footer className="py-16 px-4 bg-black/30 backdrop-blur-lg border-t border-gray-800 relative z-30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                  FolioFlux
                </h3>
                <p className="text-gray-400 mb-4">
                  The next generation crypto portfolio tracker with AI-powered insights.
                </p>
                <div className="mt-6">
                  <p className="text-gray-400 mb-2">
                    Created by a single passionate developer and designer:
                  </p>
                  <a
                    href="https://www.linkedin.com/in/andrii-furmanets-1a5b6452/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    Andrii Furmanets - Founder
                  </a>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                  <h4 className="text-xl font-semibold text-white mb-3">About the Project</h4>
                  <p className="text-gray-400">
                    FolioFlux is being developed by a single passionate developer who handles all
                    aspects of design and development. This project combines expertise in crypto
                    markets with modern web development to create a powerful yet intuitive portfolio
                    tracking solution.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-800 text-center">
              <p className="text-gray-500 text-sm">© 2025 FolioFlux. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

// Mock data for features
const features = [
  {
    title: 'Portfolio Tracking',
    description:
      'Track all your crypto assets across multiple wallets and exchanges in one place with real-time updates and historical data.',
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
  },
  {
    title: 'AI-Powered Insights',
    description:
      'Get personalized investment recommendations and market insights powered by advanced AI algorithms trained on historical crypto data.',
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
  },
  {
    title: 'Real-time Analytics',
    description:
      'Visualize your portfolio performance with beautiful, interactive charts and comprehensive analytics to make informed decisions.',
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    bgColor: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
  },
];

// Mock data for timeline
const timeline = [
  {
    title: 'Project Inception',
    description: 'Initial planning and design of the FolioFlux platform.',
    status: 'Completed',
  },
  {
    title: 'Core Development',
    description: 'Building the foundation of the platform with portfolio tracking capabilities.',
    status: 'Almost Done',
  },
  {
    title: 'AI Integration',
    description: 'Implementing AI-powered insights and recommendations for portfolio optimization.',
    status: 'In Progress',
  },
  {
    title: 'User Interface',
    description: 'Creating a beautiful, intuitive interface with real-time data visualization.',
    status: 'In Progress',
  },
  {
    title: 'Beta Testing',
    description: 'Limited release to beta testers for feedback and improvements.',
    status: 'Upcoming',
  },
  {
    title: 'Public Launch',
    description: 'Official launch of FolioFlux to the public with full feature set.',
    status: 'Upcoming',
  },
];

export default ComingSoonPage;
