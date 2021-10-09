import { initializeApp } from 'firebase/app';
import {getFirestore} from "firebase/firestore";

const fireApp = initializeApp({
    apiKey: "AIzaSyC9OqNhfH6k6d_2mTAfBnhKVC9-HEIHF-w",
    authDomain: "vi-blog-8c7fd.firebaseapp.com",
    projectId: "vi-blog-8c7fd",
    storageBucket: "vi-blog-8c7fd.appspot.com",
    messagingSenderId: "962128581928",
    appId: "1:962128581928:web:7120e944c4d21774c9ac1d",
});

export default getFirestore();