import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDwna1vrCRx1Q2NTxQUQAZLCrpWZ-C9FtQ",
  authDomain: "nwitter-b14ca.firebaseapp.com",
  projectId: "nwitter-b14ca",
  storageBucket: "nwitter-b14ca.appspot.com",
  messagingSenderId: "132744204140",
  appId: "1:132744204140:web:998c557a3180307061ad49"
};

const app = initializeApp(firebaseConfig);

export const firebaseInstance = firebaseConfig;
export const authService = getAuth(app);
export const dbService = getFirestore();
export const storageService = getStorage();
