import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV815WfBADRTGczwMgApIP198Gq_L8CjQ",
  authDomain: "taskflow-app-7add1.firebaseapp.com",
  projectId: "taskflow-app-7add1",
  storageBucket: "taskflow-app-7add1.firebasestorage.app",
  messagingSenderId: "205640468933",
  appId: "1:205640468933:web:7129a8ec50de8bf6bd63ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);