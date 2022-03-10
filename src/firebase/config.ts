import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAAfamVmAn8f0QDyJvEkd0Qgym5_5w6dsA',
  authDomain: 'cpdplatform-2035e.firebaseapp.com',
  databaseURL: 'https://cpdplatform-2035e-default-rtdb.firebaseio.com',
  projectId: 'cpdplatform-2035e',
  storageBucket: 'cpdplatform-2035e.appspot.com',
  messagingSenderId: '1014432540718',
  appId: '1:1014432540718:web:cca04e47c943f972f197bf',
};

// init firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// init services
const projectDb = db;
const projectAuth = getAuth();

export { projectDb, projectAuth };