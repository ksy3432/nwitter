import { initializeApp } from "firebase/app";
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import Auth from "routes/Auth";
/*import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";*/


const firebaseConfig = {
  apiKey: "AIzaSyDwna1vrCRx1Q2NTxQUQAZLCrpWZ-C9FtQ",
  authDomain: "nwitter-b14ca.firebaseapp.com",
  projectId: "nwitter-b14ca",
  storageBucket: "nwitter-b14ca.appspot.com",
  messagingSenderId: "132744204140",
  appId: "1:132744204140:web:998c557a3180307061ad49"
};

const app = initializeApp(firebaseConfig);
//const app = initializeApp(firebaseConfig);
//export const authService = firebase.auth();
export const firebaseInstance = firebaseConfig;
export const authService = getAuth(app);