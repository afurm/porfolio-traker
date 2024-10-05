import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getCryptoPrice = async (coinId: string): Promise<number | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/simple/price`, {
      params: {
        ids: coinId,
        vs_currencies: 'usd',
      },
    });
    return response.data[coinId].usd;
  } catch (error) {
    console.error('Error fetching crypto price:', error);
    return null;
  }
};

export const getCryptoList = async (): Promise<unknown[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto list:', error);
    return [];
  }
};


export const getMarketData = async (): Promise<unknown> => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market data:', error);
    return null;
  }
};
