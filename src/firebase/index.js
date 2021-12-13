import firebase from "firebase/app";
import "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAS3nM7urVcCrqf5Bp0o94aUrInM7aYrKc",
    authDomain: "social-media-2eb0f.firebaseapp.com",
    projectId: "social-media-2eb0f",
    storageBucket: "social-media-2eb0f.appspot.com",
    messagingSenderId: "819908916769",
    appId: "1:819908916769:web:1fe58290120c90410f9560",
    measurementId: "G-2YMGXB2SX4"
  };
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };