import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDgQqTT4-bDZe0eCoANMGJL0EMAGqfMaMA",
  authDomain: "cryptodash-9ca2e.firebaseapp.com",
  projectId: "cryptodash-9ca2e",
  storageBucket: "cryptodash-9ca2e.appspot.com",
  messagingSenderId: "656400418486",
  appId: "1:656400418486:web:8def45d73f7907234b4817",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginButton = document.getElementById('submit');

loginButton.addEventListener('click', async (event) => {
  event.preventDefault();

  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in:', userCredential.user);
    window.location.href = 'homepage.html';
  } catch (error) {
    console.error('Error logging in:', error);
    alert('Error logging in: ' + error.message);
  }
});

 