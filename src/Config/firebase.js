import  firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAFC-Z33Kgw61Ah8Pi9ZW8PHTPtpoeOL2U",
    authDomain: "coreo-49ca8.firebaseapp.com",
    projectId: "coreo-49ca8",
    storageBucket: "coreo-49ca8.appspot.com",
    messagingSenderId: "778329306562",
    appId: "1:778329306562:web:a957330eb1d159c70e125b",
    measurementId: "G-JCTNKQPM8M"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebase.firestore();
  
  export default firebase