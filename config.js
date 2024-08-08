const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyAdtr8RTN8zLgawko8q4Ld0tbuz-dvrF5M",
  authDomain: "ecare-web-f2b2a.firebaseapp.com",
  projectId: "ecare-web-f2b2a",
  storageBucket: "ecare-web-f2b2a.appspot.com",
  messagingSenderId: "1032157854116",
  appId: "1:1032157854116:web:b984247bc6d6278949a931",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
const Caretaker = db.collection("Caretaker");
const Medics = db.collection("Medics");
const Doctors = db.collection("Doctors");

module.exports = {
  User: User,
  Caretaker: Caretaker,
  Medics: Medics,
  Doctors: Doctors,
};
