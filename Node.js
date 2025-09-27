const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

const message = {
  token: targetDeviceToken,
  notification: {
    title: '按鈕已被按下',
    body: '手機使用者點擊了網站按鈕'
  }
};

admin.messaging().send(message)
  .then(response => console.log('成功發送:', response))
  .catch(error => console.log('發送錯誤:', error));
