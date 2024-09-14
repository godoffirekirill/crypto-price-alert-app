import axios from 'axios';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export const getCryptoPrices = async (coins) => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
      params: {
        ids: coins.join(','),
        vs_currencies: 'usd',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
};