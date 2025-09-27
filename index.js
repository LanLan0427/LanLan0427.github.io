const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendNotification = functions.database.ref('/notify/{pushId}').onCreate(async (snapshot, context) => {
    const payload = {
        notification: {
            title: "按鈕被按下",
            body: "您的用戶點擊了網站按鈕"
        }
    };

    // 取得所有 Token
    const tokensSnapshot = await admin.database().ref('/tokens').once('value');
    const tokens = Object.keys(tokensSnapshot.val() || {});

    if (!tokens.length) {
        console.log("沒有可用的推播Token");
        return null;
    }

    // 發送推播通知給所有 Token
    const response = await admin.messaging().sendToDevice(tokens, payload);
    console.log("推播結果:", response);

    // 可視需要清理失效 Token
    return null;
});
