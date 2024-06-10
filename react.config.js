require('dotenv').config();
/* Có lỗi liên quan tới webpack, nên do đó tạo một file react.config.js này để cấu hình lại file chứa biến môi trường này. */

/* Cách làm tham khảo tại: https://stackoverflow.com/questions/59911706/module-not-found-error-cant-resolve-fs-in-node-modules-dotenv-lib */

module.exports = {
  env: {
    REACT_APP_FIREBASE_API_KEY= REACT_APP_FIREBASE_API_KEY="AIzaSyAAAPHOi-nqwXmh4csLbW9yUGkyngdV99A"
    REACT_APP_FIREBASE_AUTH_DOMAIN=REACT_APP_FIREBASE_AUTH_DOMAIN="netflix-130720.firebaseapp.com"
    REACT_APP_FIREBASE_PROJECT_ID=REACT_APP_FIREBASE_PROJECT_ID="netflix-130720"
    REACT_APP_FIREBASE_STORAGE_BUCKET=REACT_APP_FIREBASE_STORAGE_BUCKET="netflix-130720.appspot.com"
    REACT_APP_FIREBASE_MESSENGING_SENDER_ID=REACT_APP_FIREBASE_MESSENGING_SENDER_ID="307533642567"
    REACT_APP_FIREBASE_APP_ID=REACT_APP_FIREBASE_APP_ID="1:307533642567:web:6228963f2f4edd54c72a62"
  }
}