import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import * as firestore from "firebase/firestore";
import * as storage from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FCM_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = firebase.initializeApp(firebaseConfig);

export const fireBaseInstance = firebase;

export const authService = firebase.auth();

export const db = firestore.getFirestore(app);
export const dbService = firestore;
export const storageService = {
    ...storage,
    getStorage : storage.getStorage(app)
}
