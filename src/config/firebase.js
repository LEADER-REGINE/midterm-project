import firebase from "firebase/compat/app";
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0iIJYL0-9Bm4e-7wEiNnOm090h_eR-7g",
    authDomain: "midterm-project-258bf.firebaseapp.com",
    projectId: "midterm-project-258bf",
    storageBucket: "midterm-project-258bf.appspot.com",
    messagingSenderId: "154128306936",
    appId: "1:154128306936:web:a343e5c5af79a3e3fce10d"
};

firebase.initializeApp(firebaseConfig);


export { firebase as default };