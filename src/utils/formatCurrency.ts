// formatCurrency.ts

import { CURRENCY_SYMBOLS } from './constants';

export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  return `${symbol}${value.toFixed(2)}`;
};