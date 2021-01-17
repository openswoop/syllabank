import { Firestore } from '@google-cloud/firestore';
import { Course, courseConverter } from '../domain/Course';

const firestore = new Firestore();

export const findCourse = async (course: string): Promise<Course | undefined> => {
  const courseDoc = await firestore
    .collection('courses')
    .withConverter(courseConverter)
    .doc(course)
    .get();
  return courseDoc.data();
};

export const saveCourse = async (course: Partial<Course> & { name: string }) => {
  await firestore
    .collection('courses')
    .withConverter(courseConverter)
    .doc(course.name)
    .set(course, { merge: true });
};
