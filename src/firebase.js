import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {getFirestore}from "@firebase/firestore"



 const app = firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));

export const auth = app.auth()

 export const db = getFirestore(app)

