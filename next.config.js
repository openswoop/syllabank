const withCSS = require('@zeit/next-css');
require('dotenv').config();

module.exports = withCSS({
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENTER_ID: process.env.FIREBASE_MESSAGING_SENTER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
});
