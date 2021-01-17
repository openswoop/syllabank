import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from '@google-cloud/firestore';

type Section = CampusSection | OnlineSection;

interface BaseSection {
  term: string;
  title: string;
  last_name: string;
  syllabus?: string;
}

type CampusSection = BaseSection & {
  days: string;
  time_begin: string;
  time_end: string;
  remote?: boolean;
  online?: never;
};

type OnlineSection = BaseSection & {
  online: true;
};

export type SectionResolvable = {
  term: string;
  last_name: string;
  days?: string;
  time?: string;
};

export class Course {
  constructor(
    readonly name: string,
    readonly sections: Section[],
    readonly preferred_title?: string,
  ) {}

  /**
   * Assign a syllabus to any matching course sections.
   */
  addSyllabus(key: SectionResolvable, fileName: string): Course {
    return new Course(
      this.name,
      this.sections.map((section) => ({
        ...section,
        ...(this.sectionMatches(section, key) && { syllabus: fileName }),
      })),
      this.preferred_title,
    );
  }

  private sectionMatches(section: Section, key: SectionResolvable): boolean {
    const { term, last_name, days, time } = key;
    const match = term === section.term && last_name == section.last_name;

    return 'online' in section
      ? match
      : match && (!days || (days === section.days && time === section.time_begin));
  }
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
