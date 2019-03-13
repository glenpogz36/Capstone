import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyDxpl9CpLZHtznsHYY2QT8Fl1TbyxKPDpc",
    authDomain: "ourproject-port.firebaseapp.com",
    databaseURL: "https://ourproject-port.firebaseio.com",
    projectId: "ourproject-port",
    storageBucket: "ourproject-port.appspot.com",
    messagingSenderId: "137856781746"
  };
  firebase.initializeApp(config);

  const storage = firebase.storage();

  export {
	  storage, firebase as default
  }