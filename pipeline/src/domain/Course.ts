import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from '@google-cloud/firestore';
import { termToId } from '../utils/termToId';

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
   * @param key - an object specifying the fields that must match
   * @param fileName - path to the syllabus
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

  /**
   * Combine the sections of two courses, merging any fields that differ
   * and deleting any sections that don't exist in the latest course
   * @param latest - the course to merge with
   */
  mergeWith(latest: Course): Course {
    const merged = [...latest.sections];

    const isEqual = (s1: Section, s2: Section) =>
      s1.term === s2.term &&
      s1.last_name === s2.last_name &&
      (s1.online
        ? s2.online
        : !s2.online && s1.days === s2.days && s1.time_begin === s2.time_begin);

    this.sections.forEach((s1) => {
      const i = merged.findIndex((s2) => isEqual(s1, s2));

      if (i >= 0) {
        merged[i] = { ...merged[i], ...s1 };
      }
    });

    merged.sort(
      (a, b) => termToId(b.term) - termToId(a.term) || a.last_name.localeCompare(b.last_name),
    );

    return new Course(latest.name, merged, latest.preferred_title);
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
