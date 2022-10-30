import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth } from "firebase/auth";
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FCM_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// const firebaseConfig = {
//     apiKey: "AIzaSyDsazwB3IEN54Sl9UMTUUbaJhQz9rIZvuk",
//     authDomain: "kij-nwitter.firebaseapp.com",
//     projectId: "kij-nwitter",
//     storageBucket: "kij-nwitter.appspot.com",
//     messagingSenderId: "950407789804",
//     appId: "1:950407789804:web:57a749b3cd5cf83d58f9c9",
//     measurementId: "G-61ETK54RT7"
//   };

firebase.initializeApp(firebaseConfig);

export const fireBaseInstance = firebase;

export const authService = firebase.auth();

export const auth = getAuth();

// const analytics = getAnalytics(app);