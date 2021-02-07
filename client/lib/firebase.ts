import firebaseApp from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
if (!firebaseApp.apps.length) {
  firebaseApp.initializeApp(clientCredentials);
}

export const firebase = firebaseApp;
export const resolvePublicUrl = (name: string): string =>
  `https://storage.googleapis.com/${clientCredentials.storageBucket}/${name}`;
