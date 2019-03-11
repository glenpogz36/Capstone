import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var config = {
	apiKey: "AIzaSyCJPgDPvXqmzz8iTQznshHUgTPRlwufJdo",
	authDomain: "capstone-portal.firebaseapp.com",
	databaseURL: "https://capstone-portal.firebaseio.com",
	projectId: "capstone-portal",
	storageBucket: "capstone-portal.appspot.com",
	messagingSenderId: "532532476448"
};
firebase.initializeApp(config);

export default firebase;