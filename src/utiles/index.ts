import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDTe-WvSjtKPHaG-xvmAlL-dhLJr3TW7ro",
  authDomain: "wooden-furniture-d32f1.firebaseapp.com",
  projectId: "wooden-furniture-d32f1",
  storageBucket: "wooden-furniture-d32f1.appspot.com",
  messagingSenderId: "407328406805",
  appId: "1:407328406805:web:70f1858abde34bcc7c7d1c",
  measurementId: "G-Z21C8PESNF",
  dataBaseUrl: "https://wooden-furniture-d32f1-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
