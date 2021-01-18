import * as functions from 'firebase-functions';
import { findCourse, saveCourse } from '../repositories/courseRepo';
import { getCoursesByDepartmentId } from '../repositories/departmentRepo';

export const syncDepartment = functions.pubsub
  .topic('department-refreshed')
  .onPublish(async (message) => {
    const { departmentId } = message.json;

    // Query BigQuery for the dept data
    const courses = await getCoursesByDepartmentId(departmentId);

    // Upload Firestore courses
    for (const course of courses) {
      const existingDoc = await findCourse(course.name);

      if (!existingDoc) {
        console.log('Adding new course', course.name);
        await saveCourse(course);
      } else {
        console.log('Updating course', course.name);
        const mergedDoc = existingDoc.mergeWith(course);
        if (existingDoc !== mergedDoc) {
          await saveCourse(mergedDoc);
        }
      }
    }
  });
