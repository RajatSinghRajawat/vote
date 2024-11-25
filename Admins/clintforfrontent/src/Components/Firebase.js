// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjPvnWa3Blaq8qse1mUq3bEveL5AG8pq8",
  authDomain: "vvotinng-web1.firebaseapp.com",
  projectId: "vvotinng-web1",
  storageBucket: "vvotinng-web1.appspot.com",
  messagingSenderId: "469167930522",
  appId: "1:469167930522:web:b7ad292915ed7d78a2f323"
};

// Initialize Firebase
const myapp = initializeApp(firebaseConfig);

export default myapp;