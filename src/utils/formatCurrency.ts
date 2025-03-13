// formatCurrency.ts

import { CURRENCY_SYMBOLS } from './constants';

export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  return `${symbol}${value.toFixed(2)}`;
};

// Format cryptocurrency amounts with appropriate decimal places
export const formatCryptoAmount = (value: number): string => {
  // For zero values, just return "0"
  if (value === 0) return '0';

  // For very small values (less than 0.00001), use scientific notation
  if (value < 0.00001) return value.toExponential(4);

  // For small values (less than 0.1), show up to 8 decimal places but trim trailing zeros
  if (value < 0.1) {
    const formatted = value.toFixed(8);
    return formatted.replace(/\.?0+$/, '');
  }

  // For medium values (less than 1000), show up to 4 decimal places but trim trailing zeros
  if (value < 1000) {
    const formatted = value.toFixed(4);
    return formatted.replace(/\.?0+$/, '');
  }

  // For large values, show up to 2 decimal places but trim trailing zeros
  const formatted = value.toFixed(2);
  return formatted.replace(/\.?0+$/, '');
};
