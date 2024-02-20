import {
  initializeApp,
  getApp,
  getApps
} from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDZENSQj6ucpzna9LouizC-n9VBbAkz9eI",
  authDomain: "navigation-18feb.firebaseapp.com",
  databaseURL: "https://navigation-18feb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "navigation-18feb",
  storageBucket: "navigation-18feb.appspot.com",
  messagingSenderId: "389703859620",
  appId: "1:389703859620:web:27c0d7bf7d964c005c1531",
  measurementId: "G-2LFZ0T19VC"
};

// Initialize Firebase
let app, auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log('Error initializing app: ' + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

export { auth, app };