import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDgQqTT4-bDZe0eCoANMGJL0EMAGqfMaMA",
  authDomain: "cryptodash-9ca2e.firebaseapp.com",
  projectId: "cryptodash-9ca2e",
  storageBucket: "cryptodash-9ca2e.appspot.com",
  messagingSenderId: "656400418486",
  appId: "1:656400418486:web:8def45d73f7907234b4817",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signUpButton = document.getElementById("submit");
signUpButton.addEventListener("click", async (event) => {
  event.preventDefault();

  
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    
    await setDoc(doc(db, "users", user.uid), {
      email,
      createdAt: new Date().toISOString()
    });

    
    alert("User registered successfully!");
    window.location.href = "userauth.html";
  } catch (error) {
    console.error("Error signing up:", error);
    alert("Error signing up: " + error.message);
  }
});