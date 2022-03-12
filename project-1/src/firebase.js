import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, push, onValue, increment, remove } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

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
const likedCardsPath = "liked-cards/";

const pushCardToCloud = (card, value) => {
    const db = getDatabase();
    const favRef = ref(db, `${likedCardsPath}${hashCode2(card)}`);
    set(favRef, {
        card,
        likes: increment(value)
    });
};

// Hashes card name
const hashCode2 = (str) => {
    return str.split("").reduce((prevHash, currVal) => (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

export { db, likedCardsPath, ref, set, push, pushCardToCloud, onValue };