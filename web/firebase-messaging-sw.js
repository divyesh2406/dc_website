importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyAyr52g6CNz0AbNBGNgHAHcv-t0yb_4XVI",
  authDomain: "dcmart-c3c9e.firebaseapp.com",
  databaseURL: "https://dcmart-c3c9e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dcmart-c3c9e",
  storageBucket: "dcmart-c3c9e.appspot.com",
  messagingSenderId: "371865097958",
  appId: "1:371865097958:web:7635ca8a7e7212cfaecd27",
  measurementId: "G-EK52D9V2FX"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});