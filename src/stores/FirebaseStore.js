import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCnQBYIA5oAMSap3XR-243DpqYzEN3A9TI",
    authDomain: "goodbyecar-6a71a.firebaseapp.com",
    projectId: "goodbyecar-6a71a",
    storageBucket: "goodbyecar-6a71a.firebasestorage.app",
    messagingSenderId: "362336897603",
    appId: "1:362336897603:web:98b2ea9a530738aea2e2f6",
    measurementId: "G-9K0Y36XK8K"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

