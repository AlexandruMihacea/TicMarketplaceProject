const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { firebase } = require("./env");

const firebaseConfig = {
  apiKey: firebase.apiKey,
  authDomain: firebase.authDomain,
  projectId: firebase.projectId,
  storageBucket: firebase.storageBucket,
  messagingSenderId: firebase.messagingSenderId,
  appId: firebase.appId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };