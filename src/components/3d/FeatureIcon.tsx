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
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0.4" />
          </linearGradient>
          <filter id="dashboardGlow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="blur" operator="over" in2="SourceGraphic" />
          </filter>
        </defs>
        {/* Base platform with shadow */}
        <rect x="2" y="19" width="20" height="1" rx="0.5" fill="#1e293b" fillOpacity="0.2" />
        <rect x="3" y="18" width="18" height="1" rx="0.5" fill="#4F46E5" fillOpacity="0.1" />

        {/* Main dashboard body */}
        <rect x="4" y="4" width="16" height="14" rx="2" fill="url(#dashboardGradient)" />
        <path
          d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V8H4V6Z"
          fill="#4F46E5"
          fillOpacity="0.3"
        />

        {/* Screen content */}
        <rect x="6" y="9" width="5" height="3" rx="1" fill="#818CF8" fillOpacity="0.6" />
        <rect x="13" y="9" width="5" height="3" rx="1" fill="#818CF8" fillOpacity="0.4" />
        <rect x="6" y="13" width="12" height="2" rx="1" fill="#818CF8" fillOpacity="0.3" />

        {/* Glowing elements */}
        <circle cx="18" cy="6" r="1" fill="#ffffff" filter="url(#dashboardGlow)" />
        <circle cx="18" cy="6" r="0.5" fill="#ffffff" />
      </svg>
    ),

    transactions: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Card with 3D effect */}
        <rect x="2" y="7" width="20" height="12" rx="2" fill="url(#cardGradient)" />
        <path
          d="M2 9C2 7.89543 2.89543 7 4 7H20C21.1046 7 22 7.89543 22 9V11L2 13V9Z"
          fill="#3B82F6"
          fillOpacity="0.3"
        />

        {/* Chip with metallic effect */}
        <rect x="4" y="10" width="6" height="4" rx="1" fill="#F59E0B" fillOpacity="0.3" />
        <path
          d="M4 11.5L10 11.5M4 12.5L10 12.5"
          stroke="#F59E0B"
          strokeWidth="0.5"
          strokeOpacity="0.5"
        />

        {/* Floating coins with shadows */}
        <g transform="translate(14 6)">
          <circle cx="2" cy="2" r="2" fill="url(#coinGradient)" />
          <path d="M2 1.5V2.5M1.5 2H2.5" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.8" />
        </g>
        <g transform="translate(16 9)">
          <circle cx="2" cy="2" r="1.5" fill="url(#coinGradient)" />
          <path d="M2 1.5V2.5M1.5 2H2.5" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.8" />
        </g>
      </svg>
    ),

    market: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="barGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.4" />
          </linearGradient>
          <filter id="marketGlow">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feComposite in="blur" operator="over" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Base platform with reflection */}
        <rect x="2" y="19" width="20" height="1" rx="0.5" fill="#1e293b" fillOpacity="0.3" />
        <rect x="3" y="20" width="18" height="0.5" rx="0.25" fill="#3B82F6" fillOpacity="0.1" />

        {/* Bars with 3D effect */}
        <g filter="url(#marketGlow)">
          <rect x="4" y="14" width="3" height="5" rx="1" fill="url(#barGradient)" />
          <rect x="9" y="11" width="3" height="8" rx="1" fill="url(#barGradient)" />
          <rect x="14" y="8" width="3" height="11" rx="1" fill="url(#barGradient)" />
          <rect x="19" y="5" width="3" height="14" rx="1" fill="url(#barGradient)" />
        </g>

        {/* Glowing dots */}
        <circle cx="5.5" cy="13" r="1" fill="#60A5FA" fillOpacity="0.8" filter="url(#marketGlow)" />
        <circle
          cx="10.5"
          cy="10"
          r="1"
          fill="#60A5FA"
          fillOpacity="0.8"
          filter="url(#marketGlow)"
        />
        <circle cx="15.5" cy="7" r="1" fill="#60A5FA" fillOpacity="0.8" filter="url(#marketGlow)" />
        <circle cx="20.5" cy="4" r="1" fill="#60A5FA" fillOpacity="0.8" filter="url(#marketGlow)" />

        {/* Trend line */}
        <path
          d="M4.5 13.5L10.5 10.5L15.5 7.5L20.5 4.5"
          stroke="#60A5FA"
          strokeWidth="0.5"
          strokeDasharray="1 1"
          strokeOpacity="0.5"
        />
      </svg>
    ),

    ai: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.4" />
          </linearGradient>
          <filter id="aiGlow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="blur" operator="over" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Central orb with glow */}
        <circle cx="12" cy="12" r="4" fill="url(#aiGradient)" filter="url(#aiGlow)" />
        <circle cx="12" cy="12" r="3" fill="#8B5CF6" fillOpacity="0.4" />

        {/* Orbiting particles */}
        <g transform="rotate(45 12 12)">
          <circle cx="12" cy="6" r="1.5" fill="#A78BFA" fillOpacity="0.6" />
          <circle cx="18" cy="12" r="1.5" fill="#A78BFA" fillOpacity="0.6" />
          <circle cx="12" cy="18" r="1.5" fill="#A78BFA" fillOpacity="0.6" />
          <circle cx="6" cy="12" r="1.5" fill="#A78BFA" fillOpacity="0.6" />
        </g>

        {/* Connection lines with glow */}
        <g filter="url(#aiGlow)" opacity="0.5">
          <path
            d="M12 8L12 16M8 12L16 12"
            stroke="#8B5CF6"
            strokeWidth="0.5"
            strokeDasharray="1 1"
          />
          <path
            d="M8.5 8.5L15.5 15.5M15.5 8.5L8.5 15.5"
            stroke="#8B5CF6"
            strokeWidth="0.5"
            strokeDasharray="1 1"
          />
        </g>
      </svg>
    ),

    alerts: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="bellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F87171" stopOpacity="0.4" />
          </linearGradient>
          <filter id="bellGlow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="blur" operator="over" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Bell body with 3D effect */}
        <path
          d="M12 4C15.3137 4 18 6.68629 18 10V15L20 17H4L6 15V10C6 6.68629 8.68629 4 12 4Z"
          fill="url(#bellGradient)"
        />
        <path
          d="M12 4C15.3137 4 18 6.68629 18 10V12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12V10C6 6.68629 8.68629 4 12 4Z"
          fill="#EF4444"
          fillOpacity="0.4"
        />

        {/* Bell handle with metallic effect */}
        <path
          d="M10 18H14C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18Z"
          fill="#F87171"
          fillOpacity="0.6"
        />

        {/* Glowing notification */}
        <circle cx="17" cy="7" r="3" fill="#EF4444" filter="url(#bellGlow)" />
        <circle cx="17" cy="7" r="2" fill="#FEE2E2" fillOpacity="0.6" />
      </svg>
    ),

    wallet: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="walletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="walletCoinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.6" />
          </linearGradient>
          <filter id="walletGlow">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feComposite in="blur" operator="over" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Wallet body with 3D effect */}
        <rect x="2" y="6" width="20" height="12" rx="2" fill="url(#walletGradient)" />
        <path
          d="M2 8C2 6.89543 2.89543 6 4 6H20C21.1046 6 22 6.89543 22 8V10H2V8Z"
          fill="#10B981"
          fillOpacity="0.4"
        />

        {/* Card slot */}
        <rect x="16" y="9" width="4" height="6" rx="1" fill="#34D399" fillOpacity="0.3" />

        {/* Coins with metallic effect */}
        <g filter="url(#walletGlow)">
          <circle cx="7" cy="12" r="2" fill="url(#walletCoinGradient)" />
          <path d="M7 11V13M6 12H8" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.8" />
        </g>
        <g filter="url(#walletGlow)" transform="translate(3 -2)">
          <circle cx="7" cy="12" r="1.5" fill="url(#walletCoinGradient)" />
          <path d="M7 11V13M6 12H8" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.8" />
        </g>
      </svg>
    ),
  };

  return icons[type] || null;
}
