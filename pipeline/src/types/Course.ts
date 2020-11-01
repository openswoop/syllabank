import { DocumentData, FirestoreDataConverter } from '@google-cloud/firestore';

export class CourseSection {
  term: string;
  last_name: string;
  days?: string;
  time_begin?: string;
  time_end?: string;
  online?: boolean;
  remote?: boolean;
  syllabus?: string;
}

export class Course {
  constructor(readonly name: string, readonly sections: CourseSection[]) {}
}

export const courseConverter: FirestoreDataConverter<Course> = {
  toFirestore: (course: Course) => ({
    name: course.name,
    sections: course.sections,
  }),
  fromFirestore: (data: DocumentData) => {
    return new Course(data.name, data.sections);
  },
};
