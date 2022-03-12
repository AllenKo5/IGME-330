// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAkf8t80QctXvkV7C2thi73bjediPdkJik",
    authDomain: "favorite-cards.firebaseapp.com",
    databaseURL: "https://favorite-cards-default-rtdb.firebaseio.com",
    projectId: "favorite-cards",
    storageBucket: "favorite-cards.appspot.com",
    messagingSenderId: "72963835846",
    appId: "1:72963835846:web:4ec6b91d0826ee682b94c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
