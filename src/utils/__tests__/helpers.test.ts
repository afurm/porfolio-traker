import { isValidCrypto, delay } from '../helpers';

describe('isValidCrypto', () => {
  const supportedCryptos = ['bitcoin', 'ethereum', 'dogecoin'];

  it('returns true for supported cryptocurrencies', () => {
    expect(isValidCrypto('Bitcoin', supportedCryptos)).toBe(true);
    expect(isValidCrypto('ETHEREUM', supportedCryptos)).toBe(true);
    expect(isValidCrypto('dogecoin', supportedCryptos)).toBe(true);
  });

  it('returns false for unsupported cryptocurrencies', () => {
    expect(isValidCrypto('NotACrypto', supportedCryptos)).toBe(false);
    expect(isValidCrypto('', supportedCryptos)).toBe(false);
  });
});

describe('delay', () => {
  it('delays execution for the specified time', async () => {
    const start = Date.now();
    await delay(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(100);
  });

  it('resolves the promise after delay', async () => {
    const promise = delay(50);
    expect(promise).toBeInstanceOf(Promise);
    await expect(promise).resolves.toBeUndefined();
  });
});
