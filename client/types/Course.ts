export type Course = {
  id: string;
  course: string;
  days: string;
  first_name: string;
  last_name: string;
  term: string;
  time_begin?: string;
  time_end?: string;
  online?: boolean;
  year: number;
  syllabus: string;
};

export type CourseSnapshot = Omit<Course, 'term'> &
  firebase.firestore.DocumentData & {
    term: number;
  };
