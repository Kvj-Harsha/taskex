import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDO3KLrVhxX2GQmvPNOsLzbSZMZcvW256U",
  authDomain: "taskexx.firebaseapp.com",
  projectId: "taskexx",
  storageBucket: "taskexx.firebasestorage.app",
  messagingSenderId: "1008467803484",
  appId: "1:1008467803484:web:1e46f1efbc0477e5569599"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
