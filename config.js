import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD13byaN94jc5g225T3Vtw7zXSJy0DQEyE",
  authDomain: "spectagram-ac629.firebaseapp.com",
  databaseURL: "https://spectagram-ac629-default-rtdb.firebaseio.com",
  projectId: "spectagram-ac629",
  storageBucket: "spectagram-ac629.appspot.com",
  messagingSenderId: "109042871481",
  appId: "1:109042871481:web:a06d589a1e296cdfc2bf68"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;