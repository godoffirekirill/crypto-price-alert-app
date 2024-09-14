import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Request notification permissions
export const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

// Schedule a local notification
export const scheduleNotification = async (title, body) => {
  const hasPermission = await requestNotificationPermission();

  if (!hasPermission) {
    console.log('Notification permission not granted');
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: { seconds: 2 }, // Trigger after 2 seconds for demonstration
  });
};