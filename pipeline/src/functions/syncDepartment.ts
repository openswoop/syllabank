import * as functions from 'firebase-functions';
import { findCourse, saveCourse } from '../repositories/courseRepo';
import { getCoursesByDepartmentId } from '../repositories/departmentRepo';
import { Course } from '../domain/Course';
import { termToId } from '../utils/termToId';

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
        const mergedDoc = mergeCourses(existingDoc, course);
        if (existingDoc !== mergedDoc) {
          await saveCourse(mergedDoc);
        }
      }
    }
  });

const mergeCourses = (current: Course, latest: Course) => ({
  name: current.name,
  sections: [
    ...new Map([
      ...new Map(current.sections.map((i) => [JSON.stringify(i), i])),
      ...new Map(latest.sections.map((i) => [JSON.stringify(i), i])),
    ]).values(),
  ].sort((a, b) => termToId(b.term) - termToId(a.term) || a.last_name.localeCompare(b.last_name)),
});
