import dotenv from 'dotenv';
import { loadFirebase } from '../lib/db';

dotenv.config();

const data = require(process.argv[2]);
const db = loadFirebase().firestore();

data.forEach((obj) => {
  db.collection('courses').add({
    course: obj.course,
    last_name: obj.last_name,
    time_begin: obj.time_begin,
    time_end: obj.time_end,
    days: obj.days,
    term: obj.term,
    year: obj.year,
  }).then((docRef) => {
    console.log(`Document writtenw ith ID: ${docRef}`);
  }).catch((error) => {
    console.log(`Error adding document: ${error}`);
  });
});
