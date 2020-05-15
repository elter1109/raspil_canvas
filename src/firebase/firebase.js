import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC2Avyo7sVwu8bseJ7P5SzBHag2V9K8ylo",
    authDomain: "raspil.firebaseapp.com",
    databaseURL: "https://raspil.firebaseio.com",
    projectId: "raspil",
    storageBucket: "raspil.appspot.com",
    messagingSenderId: "916846325658",
    appId: "1:916846325658:web:540663ca67c411139f5423"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const storage = firebase.storage();
  export const database = firebase.database();
 