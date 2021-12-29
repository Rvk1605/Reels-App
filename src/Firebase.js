// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfWvARCc0RQTCpIzbVh5ZwAOqUWrsQrdg",
  authDomain: "reels-app-955cf.firebaseapp.com",
  projectId: "reels-app-955cf",
  storageBucket: "reels-app-955cf.appspot.com",
  messagingSenderId: "118767269752",
  appId: "1:118767269752:web:59936f64ad3b6951a1fa8d",
  measurementId: "G-J36KYSYDVF",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
    users:firestore.collection('user'),
    posts:firestore.collection('post'),
    comments:firestore.collection('comment'),
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage();
