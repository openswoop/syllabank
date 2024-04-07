import firebase from 'firebase/app';

type ChartData = {
  isq: int;
  gpa: float;
  last_name: string;
  term: string;
};

type Section = {
  term: string;
  title: string;
  last_name: string;
  syllabus?: string;
  days: string;
  time_begin: string;
  time_end: string;
  online?: boolean;
  rank: int;
};

export type Course = {
  readonly name: string;
  readonly sections: Section[];
  readonly chart_data: ChartData[];
};

export const courseConverter: firebase.firestore.FirestoreDataConverter<Course> = {
  toFirestore: (): firebase.firestore.DocumentData => {
    throw new Error('Writing courses to Firestore not implemented.');
  },
  fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot): Course => {
    const data = snapshot.data();
    return {
      name: data.name,
      sections: data.sections,
    };
  },
};

export type CourseDoc = {
  objectID: string;
  title: string;
  course: string;
};
