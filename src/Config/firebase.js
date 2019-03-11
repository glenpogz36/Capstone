import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var config = {
	apiKey: "AIzaSyC2tA8cRFDqcp87SdKyMZFOusV__ywaGbM",
	authDomain: "capstone-myprojs.firebaseapp.com",
	databaseURL: "https://capstone-myprojs.firebaseio.com",
	projectId: "capstone-myprojs",
	storageBucket: "capstone-myprojs.appspot.com",
	messagingSenderId: "459301928182"
};
firebase.initializeApp(config);

export default firebase;