importScripts('https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.x.x/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCppoyrgeZsWad4Zss93GdjjTdlCybn5Zk",
    authDomain: "so101-f8079.firebaseapp.com",
    projectId: "so101-f8079",
    storageBucket: "so101-f8079.appspot.com",
    messagingSenderId: "1035056506659",
    appId: "1:1035056506659:web:93a76861ae259218bb8e96",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("收到背景訊息", payload);
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
    });
});
