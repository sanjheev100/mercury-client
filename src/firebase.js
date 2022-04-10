import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

// Your web app's Firebase configuration

const firebaseConfig = {
    //YOUR FIREBASE CONFIG
}
// Initialize Firebase
// const app = initializeApp(firebaseConfig)
firebase.initializeApp(firebaseConfig)

export const authen = firebase.auth()

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
