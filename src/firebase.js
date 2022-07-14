import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {getFirestore}from "@firebase/firestore"

 const app = firebase.initializeApp({
  apiKey: "AIzaSyChm7oVFPYYyYra3c_NMphHSscqro3cv6o",
  authDomain: "stack-overview.firebaseapp.com",
  projectId: "stack-overview",
  storageBucket: "stack-overview.appspot.com",
  messagingSenderId: "749285781545",
  appId: "1:749285781545:web:cfb0b344344f5c2c6fac38"
});

export const auth = app.auth()

 export const db = getFirestore(app)