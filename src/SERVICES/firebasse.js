import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAosx0z5Agz85zQjkOIpJMwjd3rpYgvAxY",
    authDomain: "chatlify-a475a.firebaseapp.com",
    projectId: "chatlify-a475a",
    storageBucket: "chatlify-a475a.appspot.com",
    messagingSenderId: "766839319490",
    appId: "1:766839319490:web:13228c172ae9a636a7445b",
    measurementId: "G-XBDM7WL7C7"
  };

 firebase.initializeApp(firebaseConfig);
 export const auth = firebase.auth();
 export const provider = new firebase.auth.GoogleAuthProvider();
 export const db = firebase.firestore();
 export const storage = firebase.storage();



