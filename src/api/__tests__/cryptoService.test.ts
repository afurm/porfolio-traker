import axios from 'axios';
import { getCryptoPrice, getCryptoList, getMarketData } from '../cryptoService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('cryptoService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getCryptoPrice', () => {
        it('returns the price for a valid coin ID', async () => {
            const mockPrice = 50000;
            mockedAxios.get.mockResolvedValueOnce({
                data: {
                    bitcoin: {
                        usd: mockPrice
                    }
                }
            });

            const price = await getCryptoPrice('bitcoin');
            expect(price).toBe(mockPrice);
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'https://api.coingecko.com/api/v3/simple/price',
                {
                    params: {
                        ids: 'bitcoin',
                        vs_currencies: 'usd',
                    },
                }
            );
        });

        it('returns null when API call fails', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
            const price = await getCryptoPrice('bitcoin');
            expect(price).toBeNull();
        });
    });

    describe('getCryptoList', () => {
        it('returns the list of cryptocurrencies', async () => {
            const mockList = [
                { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
                { id: 'ethereum', symbol: 'eth', name: 'Ethereum' }
            ];
            mockedAxios.get.mockResolvedValueOnce({ data: mockList });

            const list = await getCryptoList();
            expect(list).toEqual(mockList);
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'https://api.coingecko.com/api/v3/coins/list'
            );
        });

        it('returns empty array when API call fails', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
            const list = await getCryptoList();
            expect(list).toEqual([]);
        });
    });

    describe('getMarketData', () => {
        it('returns market data for top cryptocurrencies', async () => {
            const mockMarketData = [
                { id: 'bitcoin', current_price: 50000, market_cap: 1000000000 },
                { id: 'ethereum', current_price: 3000, market_cap: 500000000 }
            ];
            mockedAxios.get.mockResolvedValueOnce({ data: mockMarketData });

            const data = await getMarketData();
            expect(data).toEqual(mockMarketData);
            expect(mockedAxios.get).toHaveBeenCalledWith(
                'https://api.coingecko.com/api/v3/coins/markets',
                {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 10,
                        page: 1,
                        sparkline: false,
                    },
                }
            );
        });

        it('returns null when API call fails', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
            const data = await getMarketData();
            expect(data).toBeNull();
        });
    });
}); 