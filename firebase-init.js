/* global firebase */

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your-apiKey",
  authDomain: "your-authDomain.firebaseapp.com",
  projectId: "your-projectId",
  storageBucket: "your-storage-bucket.appspot.com",
  messagingSenderId: "your-messagingSenderId",
  appId: "your-appID"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const TEXT_COLLECTION = "texts"; // name of the firestore collection
