import firebase from 'firebase/app';

type Section = {
  term: string;
  title: string;
  last_name: string;
  syllabus?: string;
  days: string;
  time_begin: string;
  time_end: string;
  remote?: boolean;
  online?: boolean;
};

export type Course = {
  readonly name: string;
  readonly sections: Section[];
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
