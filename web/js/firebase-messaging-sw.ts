import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

import { firebaseConfig } from "./config";

initializeApp(firebaseConfig);
//declare let registration: any
const messaging = getMessaging();

// onBackgroundMessage(messaging, (payload: any) => {
//   console.log("Received Background Notification :", payload);

//   registration.showNotification('Test background Notification', {
//     body : payload.data.message
//   })
// });
