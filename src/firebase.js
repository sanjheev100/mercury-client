import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyDMKw9JRK43viFsCIJT65tt3hSo9-DKByo',
  authDomain: 'mercury-6b1ca.firebaseapp.com',
  projectId: 'mercury-6b1ca',
  storageBucket: 'mercury-6b1ca.appspot.com',
  messagingSenderId: '893658495344',
  appId: '1:893658495344:web:2c45e51c72600a7f6e37b5',
}
// Initialize Firebase
// const app = initializeApp(firebaseConfig)
firebase.initializeApp(firebaseConfig)

export const authen = firebase.auth()

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
