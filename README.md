# blog_firebase_react

Please do add firebase.js file in root directory

#Structure will be like :


require('firebase/firestore')
import firebase from 'firebase'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    //your configuration details
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  var db=firebase.firestore();

  export const auth=firebase.auth();
  export const firestore=firebase.firestore

  export default db;
