// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA1fzK4eN3uWqvMBNkqFJXxvdeRRXCmodc",
//   authDomain: "rescue-her-1538e.firebaseapp.com",
//   projectId: "rescue-her-1538e",
//   storageBucket: "rescue-her-1538e.firebasestorage.app",
//   messagingSenderId: "715011507997",
//   appId: "1:715011507997:web:ad3ccd942c029f332343f4",
//   measurementId: "G-M8N83X5ZMY"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);







// // src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// // আপনার ফায়ারবেস কনফিগারেশন (স্ক্রিনশট থেকে নেওয়া)
// const firebaseConfig = {
//   apiKey: "AIzaSyA1fzK4eN3uWqvMBNkqFJXxvdeRRXCmodc",
//   authDomain: "rescue-her-1538e.firebaseapp.com",
//   projectId: "rescue-her-1538e",
//   storageBucket: "rescue-her-1538e.firebasestorage.app",
//   messagingSenderId: "715011507997",
//   appId: "1:715011507997:web:ad3ccd942c029f332343f4",
//   measurementId: "G-M8N3X5ZMY"
// };

// // ফায়ারবেস ইনিশিয়ালাইজ করা
// const app = initializeApp(firebaseConfig);

// // অথেনটিকেশন এবং গুগল প্রোভাইডার এক্সপোর্ট করা
// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();

// // প্রোভাইডারটি যাতে বারবার পপআপে অ্যাকাউন্ট সিলেক্ট করতে দেয়
// googleProvider.setCustomParameters({ prompt: 'select_account' });

// export { signInWithPopup, signOut };





// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// 🔐 ফায়ারবেস অথেনটিকেশন লাইব্রেরিগুলো ইমপোর্ট করা হলো
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration (আপনার দেওয়া অরিজিনাল কনফিগারেশন)
const firebaseConfig = {
  apiKey: "AIzaSyA1fzK4eN3uWqvMBNkqFJXxvdeRRXCmodc",
  authDomain: "rescue-her-1538e.firebaseapp.com",
  projectId: "rescue-her-1538e",
  storageBucket: "rescue-her-1538e.firebasestorage.app",
  messagingSenderId: "715011507997",
  appId: "1:715011507997:web:ad3ccd942c029f332343f4",
  measurementId: "G-M8N83X5ZMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 🛡️ অথেনটিকেশন ও গুগল প্রোভাইডার ইনিশিয়ালাইজেশন
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// লগইন করার সময় প্রতিবার যেন জিমেইল অ্যাকাউন্ট সিলেক্ট করার পপআপ আসে
googleProvider.setCustomParameters({ prompt: 'select_account' });

// এগুলো এক্সপোর্ট করা হলো যেন SignupView.jsx এবং LoginView.jsx-এ সরাসরি ব্যবহার করা যায়
export { auth, googleProvider, signInWithPopup, analytics };