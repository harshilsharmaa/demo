import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQu6GtzjORldCn_2fznYP0yxKmO1G-1ik",
  authDomain: "apni-dukan-63f1a.firebaseapp.com",
  projectId: "apni-dukan-63f1a",
  storageBucket: "apni-dukan-63f1a.appspot.com",
  messagingSenderId: "757366704147",
  appId: "1:757366704147:web:951a369b139ed83bf6d7e6",
  measurementId: "G-SZ7V4E6YYF"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();