import { formatCurrency } from '../formatCurrency';

describe('formatCurrency', () => {
    it('formats USD currency correctly with default currency', () => {
        expect(formatCurrency(123.456)).toBe('$123.46');
        expect(formatCurrency(0)).toBe('$0.00');
        expect(formatCurrency(-123.456)).toBe('$-123.46');
    });

    it('formats currency correctly with specified currency', () => {
        expect(formatCurrency(123.456, 'EUR')).toBe('€123.46');
        expect(formatCurrency(123.456, 'GBP')).toBe('£123.46');
    });

    it('uses default $ symbol for unknown currency', () => {
        expect(formatCurrency(123.456, 'UNKNOWN')).toBe('$123.46');
    });
}); 