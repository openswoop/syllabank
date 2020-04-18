// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_APP_ID,
};

async function loadFirebase() {
  const firebase = await import('firebase/app');
  await import('firebase/firestore');

  // Initialize Firebase
  return !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();
}

function resolvePublicUrl(name) {
  return `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${name}`;
}

export { loadFirebase, resolvePublicUrl };