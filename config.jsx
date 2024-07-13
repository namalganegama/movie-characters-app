import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { initializeAuth, getReactNativePersistence } from '@firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBEIcQeH5fM0fbINOwG_OBDbph5HwPqjgU",
  authDomain: "movie-app-594a0.firebaseapp.com",
  projectId: "movie-app-594a0",
  storageBucket: "movie-app-594a0.appspot.com",
  messagingSenderId: "734735893972",
  appId: "1:734735893972:web:400c61b86d53a9b5454241",
  measurementId: "G-L5JPSQ3F47"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db = getFirestore(app);