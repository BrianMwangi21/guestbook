import * as firebase from 'firebase';
// import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyCqshTyV5_0qawQqlf9NpxUU_3JIGLaUvE",
    authDomain: "guestbook-7e542.firebaseapp.com",
    databaseURL: "https://guestbook-7e542.firebaseio.com",
    projectId: "guestbook-7e542",
    storageBucket: "guestbook-7e542.appspot.com",
    messagingSenderId: "164421736128",
    appId: "1:164421736128:web:7914d19887a0384f0e7f25",
    measurementId: "G-ZWQ8W242ZG"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;