// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDgSLXWh02obBnUSfObCEgh6zGvxLaupGA",
	authDomain: "contact-app-24.firebaseapp.com",
	projectId: "contact-app-24",
	storageBucket: "contact-app-24.appspot.com",
	messagingSenderId: "1035556121195",
	appId: "1:1035556121195:web:26189793a7c9ffc6ca5f2e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);