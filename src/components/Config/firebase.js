import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var config = {
	apiKey: "AIzaSyAoDfIuhEFPNe8xx6VJjKYJRZ4qRvPPvBY",
	authDomain: "capstone-projectport.firebaseapp.com",
	databaseURL: "https://capstone-projectport.firebaseio.com",
	projectId: "capstone-projectport",
	storageBucket: "capstone-projectport.appspot.com",
	messagingSenderId: "297913647957"
};
firebase.initializeApp(config);

export default firebase;