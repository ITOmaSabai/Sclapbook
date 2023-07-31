import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
// import { doc, getDoc } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBUyuZs7C_-CCCs_09i8Df0J9IabtuIDLM",
  authDomain: "blog-559dc.firebaseapp.com",
  projectId: "blog-559dc",
  storageBucket: "blog-559dc.appspot.com",
  messagingSenderId: "620289449492",
  appId: "1:620289449492:web:d86e10e1712b88d344d101"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };