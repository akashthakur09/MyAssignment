import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAsLtfCxgfJvyGAB-RSiE731fDa2QKs2Co",
  authDomain: "assignment-ed6f2.firebaseapp.com",
  projectId: "assignment-ed6f2",
  storageBucket: "assignment-ed6f2.appspot.com",
  messagingSenderId: "364544421788",
  appId: "1:364544421788:web:87fba314a50149919be259",
  measurementId: "G-5DD0S4QPWC",
  databaseURL:"https://assignment-ed6f2-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export { auth,db, registerUser, loginUser };
