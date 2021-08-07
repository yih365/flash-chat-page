/* global firebase */

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your-apiKey",
  authDomain: "your-authDomain.firebaseapp.com",
  projectId: "your-projectID",
  storageBucket: "your-storageBucket.appspot.com",
  messagingSenderId: "your-messagingSenderId",
  appId: "your-appId"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const TEXT_COLLECTION = "texts";
