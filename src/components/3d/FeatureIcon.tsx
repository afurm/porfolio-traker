import React from 'react';

interface FeatureIconProps {
  type: 'dashboard' | 'transactions' | 'market' | 'ai' | 'alerts' | 'wallet';
  className?: string;
}

export default function FeatureIcon({ type, className = '' }: FeatureIconProps) {
  const icons = {
    dashboard: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="dashboardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="dashboardGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0.1" />
          </linearGradient>
          <filter id="dashboardBlur">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="blur" operator="over" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Background glow effect */}
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="4"
          fill="url(#dashboardGlow)"
          filter="url(#dashboardBlur)"
        />

        {/* Main dashboard body with 3D effect */}
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#1E293B" fillOpacity="0.8" />
        <rect x="4" y="4" width="16" height="16" rx="2" fill="url(#dashboardGradient)" />

        {/* Header bar */}
        <path
          d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V7H4V6Z"
          fill="#4F46E5"
          fillOpacity="0.5"
        />

        {/* Dashboard widgets with glass effect */}
        <rect x="5" y="8" width="6" height="4" rx="1" fill="#818CF8" fillOpacity="0.7" />
        <rect x="5" y="8" width="6" height="1" rx="0.5" fill="#ffffff" fillOpacity="0.3" />

        <rect x="13" y="8" width="6" height="4" rx="1" fill="#818CF8" fillOpacity="0.5" />
        <rect x="13" y="8" width="6" height="1" rx="0.5" fill="#ffffff" fillOpacity="0.2" />

        <rect x="5" y="14" width="6" height="4" rx="1" fill="#818CF8" fillOpacity="0.4" />
        <rect x="5" y="14" width="6" height="1" rx="0.5" fill="#ffffff" fillOpacity="0.2" />

        <rect x="13" y="14" width="6" height="4" rx="1" fill="#818CF8" fillOpacity="0.3" />
        <rect x="13" y="14" width="6" height="1" rx="0.5" fill="#ffffff" fillOpacity="0.1" />

        {/* Chart lines */}
        <path
          d="M6 10L7 9.5L8 11L9 10L10 9"
          stroke="#ffffff"
          strokeWidth="0.5"
          strokeOpacity="0.8"
        />
        <path
          d="M14 10L15 9L16 10.5L17 9.5L18 10"
          stroke="#ffffff"
          strokeWidth="0.5"
          strokeOpacity="0.8"
        />

        {/* Glowing elements */}
        <circle cx="18.5" cy="5.5" r="0.8" fill="#ffffff" filter="url(#dashboardBlur)" />
        <circle cx="18.5" cy="5.5" r="0.4" fill="#ffffff" />
      </svg>
    ),

    transactions: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.7" />
          </linearGradient>
          <filter id="transactionGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="blur" operator="over" in2="SourceGraphic" />
          </filter>
          <filter id="coinGlow">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feComposite in="blur" operator="over" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Background glow */}
        <rect
          x="2"
          y="5"
          width="20"
          height="14"
          rx="3"
          fill="#3B82F6"
          fillOpacity="0.2"
          filter="url(#transactionGlow)"
        />

        {/* Card with 3D effect and glass morphism */}
        <rect x="3" y="6" width="18" height="12" rx="2" fill="#1E293B" fillOpacity="0.8" />
        <rect x="4" y="7" width="16" height="10" rx="1.5" fill="url(#cardGradient)" />
        <rect x="4" y="7" width="16" height="2" rx="1" fill="#3B82F6" fillOpacity="0.7" />

        {/* Card details */}
        <rect x="6" y="11" width="8" height="1" rx="0.5" fill="#ffffff" fillOpacity="0.6" />
        <rect x="6" y="13" width="5" height="1" rx="0.5" fill="#ffffff" fillOpacity="0.4" />

        {/* Chip with metallic effect */}
        <rect x="5" y="9" width="4" height="3" rx="0.5" fill="#F59E0B" fillOpacity="0.5" />
        <path d="M5 10L9 10M5 11L9 11" stroke="#F59E0B" strokeWidth="0.5" strokeOpacity="0.8" />

        {/* Floating coins with shadows and animation */}
        <g filter="url(#coinGlow)">
          <circle cx="16" cy="8" r="2" fill="url(#coinGradient)" />
          <path d="M16 7V9M15 8H17" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.9" />
        </g>

        <g filter="url(#coinGlow)" opacity="0.9">
          <circle cx="18" cy="11" r="1.5" fill="url(#coinGradient)" />
          <path
            d="M18 10.5V11.5M17.5 11H18.5"
            stroke="#ffffff"
            strokeWidth="0.5"
            strokeOpacity="0.9"
          />
        </g>

        <g filter="url(#coinGlow)" opacity="0.8">
          <circle cx="15" cy="14" r="1.2" fill="url(#coinGradient)" />
          <path
            d="M15 13.5V14.5M14.5 14H15.5"
            stroke="#ffffff"
            strokeWidth="0.5"
            strokeOpacity="0.9"
          />
        </g>

        {/* Transaction arrows */}
        <path
          d="M12 10L14 8M12 12L14 14"
          stroke="#ffffff"
          strokeWidth="0.5"
          strokeOpacity="0.7"
          strokeLinecap="round"
        />
      </svg>
    ),

    market: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="marketBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="barGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.7" />
          </linearGradient>
          <filter id="marketGlow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="blur" operator="over" in2="SourceGraphic" />
          </filter>
          <filter id="dotGlow">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feComposite in="blur" operator="over" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Background with glow */}
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="4"
          fill="url(#marketBgGradient)"
          filter="url(#marketGlow)"
        />

        {/* Base platform with reflection */}
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#1E293B" fillOpacity="0.8" />
        <rect x="4" y="4" width="16" height="16" rx="2" fill="#111827" fillOpacity="0.6" />

        {/* Grid lines */}
        <path
          d="M4 8H20M4 12H20M4 16H20"
          stroke="#60A5FA"
          strokeWidth="0.2"
          strokeOpacity="0.3"
          strokeDasharray="1 1"
        />
        <path
          d="M8 4V20M12 4V20M16 4V20"
          stroke="#60A5FA"
          strokeWidth="0.2"
          strokeOpacity="0.3"
          strokeDasharray="1 1"
        />

        {/* Bars with 3D effect and glow */}
        <g filter="url(#marketGlow)">
          <rect x="6" y="14" width="2" height="4" rx="1" fill="url(#barGradient)" />
          <rect x="10" y="11" width="2" height="7" rx="1" fill="url(#barGradient)" />
          <rect x="14" y="8" width="2" height="10" rx="1" fill="url(#barGradient)" />
          <rect x="18" y="6" width="2" height="12" rx="1" fill="url(#barGradient)" />
        </g>

        {/* Top highlights on bars */}
        <rect x="6" y="14" width="2" height="0.5" rx="0.25" fill="#ffffff" fillOpacity="0.5" />
        <rect x="10" y="11" width="2" height="0.5" rx="0.25" fill="#ffffff" fillOpacity="0.5" />
        <rect x="14" y="8" width="2" height="0.5" rx="0.25" fill="#ffffff" fillOpacity="0.5" />
        <rect x="18" y="6" width="2" height="0.5" rx="0.25" fill="#ffffff" fillOpacity="0.5" />

        {/* Glowing dots with filter */}
        <circle cx="7" cy="13" r="0.8" fill="#60A5FA" fillOpacity="0.9" filter="url(#dotGlow)" />
        <circle cx="11" cy="10" r="0.8" fill="#60A5FA" fillOpacity="0.9" filter="url(#dotGlow)" />
        <circle cx="15" cy="7" r="0.8" fill="#60A5FA" fillOpacity="0.9" filter="url(#dotGlow)" />
        <circle cx="19" cy="5" r="0.8" fill="#60A5FA" fillOpacity="0.9" filter="url(#dotGlow)" />

        {/* Trend line with glow */}
        <path
          d="M7 13L11 10L15 7L19 5"
          stroke="#60A5FA"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeOpacity="0.8"
          filter="url(#dotGlow)"
        />
      </svg>
    ),

    ai: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="aiBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.7" />
          </linearGradient>
          <filter id="aiGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="blur" operator="over" in2="SourceGraphic" />
          </filter>
          <filter id="particleGlow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="blur" operator="over" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Background with glow */}
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="4"
          fill="url(#aiBgGradient)"
          filter="url(#aiGlow)"
        />

        {/* Base platform */}
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#1E293B" fillOpacity="0.8" />
        <rect x="4" y="4" width="16" height="16" rx="2" fill="#111827" fillOpacity="0.6" />

        {/* Neural network grid */}
        <path
          d="M6 6L18 18M6 18L18 6M6 12H18M12 6V18"
          stroke="#A78BFA"
          strokeWidth="0.3"
          strokeOpacity="0.3"
          strokeDasharray="1 1"
        />

        {/* Central orb with glow */}
        <circle cx="12" cy="12" r="3.5" fill="#8B5CF6" fillOpacity="0.3" filter="url(#aiGlow)" />
        <circle cx="12" cy="12" r="2.5" fill="url(#aiGradient)" />
        <circle cx="12" cy="12" r="1.5" fill="#8B5CF6" fillOpacity="0.8" />
        <circle cx="12" cy="12" r="0.8" fill="#ffffff" fillOpacity="0.5" />

        {/* Neural network nodes with glow */}
        <g filter="url(#particleGlow)">
          <circle cx="6" cy="6" r="1.2" fill="url(#aiGradient)" />
          <circle cx="6" cy="12" r="1.2" fill="url(#aiGradient)" />
          <circle cx="6" cy="18" r="1.2" fill="url(#aiGradient)" />
          <circle cx="12" cy="6" r="1.2" fill="url(#aiGradient)" />
          <circle cx="12" cy="18" r="1.2" fill="url(#aiGradient)" />
          <circle cx="18" cy="6" r="1.2" fill="url(#aiGradient)" />
          <circle cx="18" cy="12" r="1.2" fill="url(#aiGradient)" />
          <circle cx="18" cy="18" r="1.2" fill="url(#aiGradient)" />
        </g>

        {/* Connection lines with glow */}
        <g filter="url(#particleGlow)" opacity="0.7">
          <path
            d="M6 6L12 12M12 12L18 6M6 12L12 12M12 12L18 12M6 18L12 12M12 12L18 18M12 6L12 12M12 12L12 18"
            stroke="#A78BFA"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
        </g>

        {/* Pulse animation effect */}
        <circle cx="12" cy="12" r="5" stroke="#A78BFA" strokeWidth="0.3" strokeOpacity="0.5" />
        <circle cx="12" cy="12" r="7" stroke="#A78BFA" strokeWidth="0.2" strokeOpacity="0.3" />
      </svg>
    ),

    alerts: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="alertBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F87171" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="bellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F87171" stopOpacity="0.7" />
          </linearGradient>
          <filter id="bellGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="blur" operator="over" in2="SourceGraphic" />
          </filter>
          <filter id="notificationGlow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="blur" operator="over" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Background with glow */}
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="4"
          fill="url(#alertBgGradient)"
          filter="url(#bellGlow)"
        />

        {/* Base platform */}
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#1E293B" fillOpacity="0.8" />
        <rect x="4" y="4" width="16" height="16" rx="2" fill="#111827" fillOpacity="0.6" />

        {/* Bell body with 3D effect and glow */}
        <g filter="url(#bellGlow)">
          <path
            d="M12 5C15 5 17 7 17 10V14L19 16H5L7 14V10C7 7 9 5 12 5Z"
            fill="url(#bellGradient)"
          />
          <path
            d="M12 5C15 5 17 7 17 10V11C17 8 15 6 12 6C9 6 7 8 7 11V10C7 7 9 5 12 5Z"
            fill="#EF4444"
            fillOpacity="0.6"
          />
        </g>

        {/* Bell top highlight */}
        <path
          d="M11 5.5C11 5.5 11.5 5 12 5C12.5 5 13 5.5 13 5.5"
          stroke="#ffffff"
          strokeWidth="0.5"
          strokeOpacity="0.7"
          strokeLinecap="round"
        />

        {/* Bell handle with metallic effect */}
        <path
          d="M10 16H14C14 17.1 13.1 18 12 18C10.9 18 10 17.1 10 16Z"
          fill="#F87171"
          fillOpacity="0.8"
        />
        <path d="M10 16H14" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.5" />

        {/* Glowing notification with pulse effect */}
        <g filter="url(#notificationGlow)">
          <circle cx="17" cy="7" r="2.5" fill="#EF4444" fillOpacity="0.6" />
          <circle cx="17" cy="7" r="1.5" fill="#FEE2E2" fillOpacity="0.8" />
          <circle cx="17" cy="7" r="0.8" fill="#ffffff" fillOpacity="0.9" />
        </g>

        {/* Pulse rings */}
        <circle cx="17" cy="7" r="3.5" stroke="#EF4444" strokeWidth="0.3" strokeOpacity="0.5" />
        <circle cx="17" cy="7" r="4.5" stroke="#EF4444" strokeWidth="0.2" strokeOpacity="0.3" />

        {/* Sound waves */}
        <path
          d="M8 12C7.5 11 7.5 9 8 8M16 12C16.5 11 16.5 9 16 8"
          stroke="#F87171"
          strokeWidth="0.5"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
      </svg>
    ),

    wallet: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="walletBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="walletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="walletCoinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.7" />
          </linearGradient>
          <filter id="walletGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="blur" operator="over" in2="SourceGraphic" />
          </filter>
          <filter id="coinGlow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="blur" operator="over" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Background with glow */}
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="4"
          fill="url(#walletBgGradient)"
          filter="url(#walletGlow)"
        />

        {/* Base platform */}
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#1E293B" fillOpacity="0.8" />
        <rect x="4" y="4" width="16" height="16" rx="2" fill="#111827" fillOpacity="0.6" />

        {/* Wallet body with 3D effect and glow */}
        <g filter="url(#walletGlow)">
          <rect x="5" y="7" width="14" height="10" rx="2" fill="url(#walletGradient)" />
          <path
            d="M5 9C5 7.89543 5.89543 7 7 7H17C18.1046 7 19 7.89543 19 9V10H5V9Z"
            fill="#10B981"
            fillOpacity="0.6"
          />
        </g>

        {/* Wallet top highlight */}
        <rect x="5" y="7" width="14" height="0.5" rx="0.25" fill="#ffffff" fillOpacity="0.5" />

        {/* Card slot with glass effect */}
        <rect x="15" y="9" width="3" height="6" rx="1" fill="#34D399" fillOpacity="0.4" />
        <rect x="15" y="9" width="3" height="0.5" rx="0.25" fill="#ffffff" fillOpacity="0.3" />

        {/* Card in slot */}
        <rect x="15.5" y="10" width="2" height="4" rx="0.5" fill="#111827" fillOpacity="0.6" />
        <rect x="16" y="11" width="1" height="0.5" rx="0.25" fill="#34D399" fillOpacity="0.8" />

        {/* Coins with metallic effect and glow */}
        <g filter="url(#coinGlow)">
          <circle cx="8" cy="11" r="1.8" fill="url(#walletCoinGradient)" />
          <path d="M8 10V12M7 11H9" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.9" />
        </g>

        <g filter="url(#coinGlow)" opacity="0.9">
          <circle cx="11" cy="13" r="1.5" fill="url(#walletCoinGradient)" />
          <path d="M11 12V14M10 13H12" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.9" />
        </g>

        <g filter="url(#coinGlow)" opacity="0.8">
          <circle cx="8" cy="15" r="1.2" fill="url(#walletCoinGradient)" />
          <path
            d="M8 14.5V15.5M7.5 15H8.5"
            stroke="#ffffff"
            strokeWidth="0.5"
            strokeOpacity="0.9"
          />
        </g>
      </svg>
    ),
  };

  return icons[type] || null;
}
