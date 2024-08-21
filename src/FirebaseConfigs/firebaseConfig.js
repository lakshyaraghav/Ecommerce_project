import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKYJAvH1VrKL-cuBi_AQn_PBFTMa44XIA",
  authDomain: "ecommerce-4b616.firebaseapp.com",
  projectId: "ecommerce-4b616",
  storageBucket: "ecommerce-4b616.appspot.com",
  messagingSenderId: "673816867560",
  appId: "1:673816867560:web:df602b8cc5db21fa13cf5d"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const storage= getStorage(app)
export const db= getFirestore(app)