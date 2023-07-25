import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 


const db = getFirestore(app);
const auth = getAuth(app);

const firebaseConfig = {
  apiKey: "AIzaSyBUyuZs7C_-CCCs_09i8Df0J9IabtuIDLM",
  authDomain: "blog-559dc.firebaseapp.com",
  projectId: "blog-559dc",
  storageBucket: "blog-559dc.appspot.com",
  messagingSenderId: "620289449492",
  appId: "1:620289449492:web:d86e10e1712b88d344d101"
};

const app = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

export { db, auth, provider };
  



