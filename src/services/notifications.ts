import OneSignal from 'react-onesignal';

export const initializeOneSignal = async () => {
  await OneSignal.init({
    appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
    allowLocalhostAsSecureOrigin: true,
  });
};

export const requestNotificationPermission = async () => {
  const permission = await OneSignal.getNotificationPermission();
  if (permission !== 'granted') {
    await OneSignal.showNativePrompt();
  }
};

export const sendNotification = async (title: string, message: string, userId?: string) => {
  await OneSignal.sendSelfNotification(
    title,
    message,
    'https://your-app-url.netlify.app',
    '/favicon.ico',
    userId,
    []
  );
};