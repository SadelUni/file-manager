// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCuQ2-ry3bdwLPGEXeer0PlpnwE77jbufg',
	authDomain: 'cloud-manager-61d2a.firebaseapp.com',
	projectId: 'cloud-manager-61d2a',
	storageBucket: 'cloud-manager-61d2a.appspot.com',
	messagingSenderId: '110139340644',
	appId: '1:110139340644:web:cadbadd2499ea67f7fac71',
	measurementId: 'G-NQMPCHPYP0'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

console.log(`Firebase storage bucket: ${storage.app.options.storageBucket}`);
