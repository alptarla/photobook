import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const { FieldValue } = firebase.firestore
const auth = firebase.auth()
const { GoogleAuthProvider } = firebase.auth
const storage = firebase.storage()

export { db, FieldValue, auth, GoogleAuthProvider, storage }
