import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "shared-db-fce77.firebaseapp.com",
  projectId: "shared-db-fce77",
  storageBucket: "shared-db-fce77.appspot.com",
  messagingSenderId: "741604243777",
  appId: "1:741604243777:web:8c3e5f73e15019dc6649c0",
  measurementId: "G-9RLP0TC6Y4"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore();

// collection references
const attemptsCollection = db.collection('attempts')

// export utils/refs
export {
  db,
  attemptsCollection
}
