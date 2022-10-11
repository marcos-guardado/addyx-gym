import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCNbzMRS85hwpLzkS7Hiu9ho7rS5fkplk4",
  authDomain: "addix-gym.firebaseapp.com",
  projectId: "addix-gym",
  storageBucket: "addix-gym.appspot.com",
  messagingSenderId: "132568138782",
  appId: "1:132568138782:web:95ee08592b3cd12fa11a0f",
  databaseUrl: "hhttps://addix-gym-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const database = getDatabase(app);
