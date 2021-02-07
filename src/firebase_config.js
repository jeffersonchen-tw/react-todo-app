import firebase from "firebase/app"
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyAxqmMM-I4SdZQPWdOW4HGzK32un5zfqN8",
    authDomain: "todo-web-fa43d.firebaseapp.com",
    projectId: "todo-web-fa43d",
    storageBucket: "todo-web-fa43d.appspot.com",
    messagingSenderId: "482580724536",
    appId: "1:482580724536:web:32f64d3287c6fdbd90dfcd"
  };

const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


export { db };
export default app
export const userAuth = app.auth()