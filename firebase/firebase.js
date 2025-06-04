// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAxHfqcyAprHfiVe2_-heN2UsnG7Zpo2rE',
  authDomain: 'brainapp-a02b3.firebaseapp.com',
  projectId: 'brainapp-a02b3',
  storageBucket: 'brainapp-a02b3.firebasestorage.app',
  messagingSenderId: '506974421608',
  appId: '1:506974421608:web:3052a71cfb5fbac4a6b1dd',
  measurementId: 'G-LKBZQ82GB7',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Analytics only in supported environments
let analytics = null
isSupported().then(yes => yes && (analytics = getAnalytics(app)))

export const db = getFirestore(app)
export const auth = getAuth(app)
