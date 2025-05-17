export default {
  expo: {
    // ... other config
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectID: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppID: process.env.FIREBASE_APP_ID,
      firebaseMeasurementID: process.env.FIREBASE_MEASUREMENT_ID
    }
  }
};