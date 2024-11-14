import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyAvuvDsuZ7ZcJlt8ZlxHjJnj7L-UwfWS3s',
  authDomain: 'notebook-8179f.firebaseapp.com',
  projectId: 'notebook-8179f',
  storageBucket: 'notebook-8179f.firebasestorage.app',
  messagingSenderId: '908960314893',
  appId: '1:908960314893:web:9e794ffce8867d75000744'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };