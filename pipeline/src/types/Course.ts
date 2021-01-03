import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from '@google-cloud/firestore';

export class CourseSection {
  term!: string;
  title!: string;
  last_name!: string;
  days?: string;
  time_begin?: string;
  time_end?: string;
  online?: boolean;
  remote?: boolean;
  syllabus?: string;
}

export class Course {
  constructor(
    readonly name: string,
    readonly sections: CourseSection[],
    readonly preferred_title?: string,
  ) {}
}

export const courseConverter: FirestoreDataConverter<Course> = {
  toFirestore: (course: Partial<Course>): DocumentData => ({
    ...(course.name && { name: course.name }),
    ...(course.preferred_title && { preferred_title: course.preferred_title }),
    ...(course.sections && { sections: course.sections }),
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot): Course => {
    const data = snapshot.data();
    return new Course(data.name, data.sections, data.preferred_title);
  },
};
