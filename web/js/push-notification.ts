console.log("hello world");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { firebaseConfig } from "./config";


const vapidKey =
  process.env.VAPID_KEY;

Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    console.log("Permission granted");
    initFirebase();
  } else {
    console.log("Permission denied");
  }
});

const initFirebase = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const messaging = getMessaging(app);

  // onMessage(messaging, (payload) => {
  //   console.log("Foreground message received", payload);

  //   const n = new Notification('Test Notification', {
  //     title: 'Test Notification'
  //   } as any)
  // });
  console.log("inside init");
  getToken(messaging, { vapidKey }).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        console.log("inside token fn")
        console.log(currentToken)
        // ...
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });
};
