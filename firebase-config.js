// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcPYZsXDCV3qaDwGzrsPgpxQMPrj5w8Eo",
    authDomain: "chinmay-7c815.firebaseapp.com",
    projectId: "chinmay-7c815",
    storageBucket: "chinmay-7c815.firebasestorage.app",
    messagingSenderId: "256933345252",
    appId: "1:256933345252:web:741dc6fb12e12577e579f1",
    measurementId: "G-KG74Q7MFXE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.functions(); // Initialize Firebase Functions

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
