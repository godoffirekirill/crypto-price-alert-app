import { scheduleNotification } from './notificationService';
import { getCryptoPrices } from './cryptoService'; // Implement this function

export const checkAndSendAlerts = async (alerts) => {
  try {
    const coinIds = alerts.map((alert) => alert.coin);
    const prices = await getCryptoPrices(coinIds); // Assumes the function returns an object like { bitcoin: { usd: 50000 } }

    alerts.forEach((alert) => {
      const currentPrice = prices[alert.coin]?.usd;

      if (!currentPrice) {
        console.warn(`Price data for ${alert.coin} not found.`);
        return;
      }

      if (
        (alert.condition === 'above' && currentPrice > alert.targetPrice) ||
        (alert.condition === 'below' && currentPrice < alert.targetPrice)
      ) {
        scheduleNotification(
          `Price Alert: ${alert.coin}`,
          `${alert.coin} is ${alert.condition} $${alert.targetPrice}. Current price: $${currentPrice}.`
        );
      }
    });
  } catch (error) {
    console.error('Error checking alerts:', error);
  }
};
