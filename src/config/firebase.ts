import { initializeApp } from 'firebase/app';
// import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'todos-app-841c1.firebaseapp.com',
  databaseURL:
    'https://todos-app-841c1-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'todos-app-841c1',
  storageBucket: 'todos-app-841c1.firebasestorage.app',
  messagingSenderId: '918732197665',
  appId: '1:918732197665:web:da56c5a69be3b6e62fb860',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
