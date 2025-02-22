// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCc0Osxk5DFLtgSNBInPqUefhyi21HNwS8',
  authDomain: 'crypto-traker-8c226.firebaseapp.com',
  databaseURL: 'https://crypto-traker-8c226-default-rtdb.firebaseio.com',
  projectId: 'crypto-traker-8c226',
  storageBucket: 'crypto-traker-8c226.appspot.com',
  messagingSenderId: '502652434810',
  appId: '1:502652434810:web:c4ebb4f6779c49b90fbec3',
  measurementId: 'G-Q3CQ2SNZK5',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
