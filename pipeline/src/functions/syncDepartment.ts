import { DepartmentRefreshedEvent } from '../events/DepartmentRefreshedEvent';
import { findCourse, saveCourse } from '../repositories/courseRepo';
import { getCoursesByDepartmentId } from '../repositories/departmentRepo';
import { Course } from '../types/Course';
import { Function } from '../types/Function';
import { termToId } from '../utils/termToId';

export const syncDepartment: Function<DepartmentRefreshedEvent> = async (event) => {
  const message = Buffer.from(event.data, 'base64').toString();
  const { departmentId } = JSON.parse(message);

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
};

const mergeCourses = (current: Course, latest: Course) => {
  const mergedSections = [
    ...new Map([
      ...new Map(current.sections.map((i) => [JSON.stringify(i), i])),
      ...new Map(latest.sections.map((i) => [JSON.stringify(i), i])),
    ]).values(),
  ].sort((a, b) => termToId(b.term) - termToId(a.term) || a.last_name.localeCompare(b.last_name));
  return new Course(current.name, mergedSections);
};
