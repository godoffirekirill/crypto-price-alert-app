import * as InAppPurchases from 'expo-in-app-purchases';

export const initPurchases = async () => {
  await InAppPurchases.connectAsync();
  // Fetch products, handle purchases, etc.
};