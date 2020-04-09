import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCJIlhMcuPlvKVetDBZFSMLh-VLsh811i0",
  authDomain: "virtual-diary-react.firebaseapp.com",
  databaseURL: "https://virtual-diary-react.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

const getCurrentUser = () =>
  new Promise(function (resolve, reject) {
    try {
      firebaseApp.auth().onAuthStateChanged((user) => resolve(user));
    } catch (error) {
      reject(error);
    }
  });

//this is a named export
export { firebaseApp, getCurrentUser };

//this is a default export
export default base;
