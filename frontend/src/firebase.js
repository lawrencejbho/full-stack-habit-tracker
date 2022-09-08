import firebase from "firebase";
import { getMessaging, getToken } from "firebase/messaging";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3-3ASB1BaUCVF7qK6ubeXdwvuEiYOpfo",
  authDomain: "habit-tracker-cdec9.firebaseapp.com",
  projectId: "habit-tracker-cdec9",
  storageBucket: "habit-tracker-cdec9.appspot.com",
  messagingSenderId: "678913149481",
  appId: "1:678913149481:web:5ec8c374a0198f1daeaa38",
  measurementId: "G-1S724J7JYN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging();

export async function getFCMToken() {
  try {
    // Don't forget to paste your VAPID key here
    // (you can find it in the Console too)
    const token = await getToken(messaging, {
      vapidKey:
        "BHf6XaPHDygvuWuH29gKdT79AtpeeSbvKU6iNbSKPBLw30PuBrVCakxFomq_wK_LHJ1_7LF6AjBt7h5cEBMFO7Y",
    });
    return token;
  } catch (e) {
    console.log("getFCMToken error", e);
    return undefined;
  }
}
