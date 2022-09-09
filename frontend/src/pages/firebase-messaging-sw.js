// It's a static script file, so it won't be covered by a module bundling system
// hence, it uses "importScripts" function to load the other libs
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Replace the values with yours
const firebaseConfig = {
  apiKey: "AIzaSyD3-3ASB1BaUCVF7qK6ubeXdwvuEiYOpfo",
  authDomain: "habit-tracker-cdec9.firebaseapp.com",
  projectId: "habit-tracker-cdec9",
  storageBucket: "habit-tracker-cdec9.appspot.com",
  messagingSenderId: "678913149481",
  appId: "1:678913149481:web:5ec8c374a0198f1daeaa38",
  measurementId: "G-1S724J7JYN",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Not necessary, but if you want to handle clicks on notifications
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const pathname = event.notification?.data?.FCM_MSG?.notification?.data?.link;
  if (!pathname) return;
  const url = new URL(pathname, self.location.origin).href;

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientsArr) => {
        const hadWindowToFocus = clientsArr.some((windowClient) =>
          windowClient.url === url ? (windowClient.focus(), true) : false
        );

        if (!hadWindowToFocus)
          self.clients
            .openWindow(url)
            .then((windowClient) =>
              windowClient ? windowClient.focus() : null
            );
      })
  );
});
