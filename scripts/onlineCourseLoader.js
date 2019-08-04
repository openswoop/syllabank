import dotenv from 'dotenv';
import { loadFirebase } from '../lib/db';

dotenv.config();

const data = require(process.argv[2]);
const db = loadFirebase().firestore();

data.forEach((obj) => {
  db.collection('courses').add({
    course: obj.course,
    last_name: obj.last_name,
    term: obj.term,
    year: obj.year,
    online: obj.online,
  }).then((docRef) => {
    console.log(`Document written with ID: ${docRef}`);
  }).catch((error) => {
    console.log(`Error adding document: ${error}`);
  });
});
