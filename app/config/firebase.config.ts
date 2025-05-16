// Import the functions you need from the SDKs you need
import Constants from "expo-constants";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey ?? "",
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain ?? "",
  projectId: Constants.expoConfig?.extra?.firebaseProjectID ?? "",
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket ?? "",
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderID ?? "",
  appId: Constants.expoConfig?.extra?.firebaseAppID ?? "",
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementID ?? ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app)
const firestore = getFirestore(app);
const storage = getStorage(app);


export { analytics, app, auth, firestore, storage };

