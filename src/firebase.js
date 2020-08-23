import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDQDRCG9pKeMNs6qSAy_2LPivV87vj3PgQ",
  authDomain: "instagram-clone-36634.firebaseapp.com",
  databaseURL: "https://instagram-clone-36634.firebaseio.com",
  projectId: "instagram-clone-36634",
  storageBucket: "instagram-clone-36634.appspot.com",
  messagingSenderId: "1070460321829",
  appId: "1:1070460321829:web:6e73d76ec7f48f85c63fcc",
  measurementId: "G-6TTGSC3K3D",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
