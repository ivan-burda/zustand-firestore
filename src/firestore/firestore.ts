import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyACWzG6skCv58h8UJSCvChOUEetUb120zI",
    authDomain: "zustand-experiments.firebaseapp.com",
    projectId: "zustand-experiments",
    storageBucket: "zustand-experiments.appspot.com",
    messagingSenderId: "749405521635",
    appId: "1:749405521635:web:babf0130b74349ce4e67d6",
    measurementId: "G-W13F0JRR3C"
};

//Init the firebase app
initializeApp(firebaseConfig);

//Init services
export const db = getFirestore()





