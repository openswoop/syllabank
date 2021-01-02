import * as functions from 'firebase-functions';
import { CourseChangedEvent } from '../events/CourseChangedEvent';
import { termToId } from '../utils/termToId';
import { upsertRecord } from '../repositories/searchRepo';

type GroupBy = {
  [key: string]: { title: string; count: number; latest: number };
};

export const updateIndex = functions.firestore
  .document('courses/{course}')
  .onWrite((change: CourseChangedEvent) => {
    const course = change.after.data();

    // Skip deleted courses
    if (!course) {
      return;
    }

    const title =
      course.preferred_title ||
      Object.values(
        // Group by { title, count, latest } then then sort by { count, latest }
        course.sections.reduce<GroupBy>(
          (acc, section) => ({
            ...acc,
            [section.title]: {
              title: section.title,
              count: (acc[section.title]?.count || 0) + 1,
              latest: Math.max(acc[section.title]?.latest || 0, termToId(section.term)),
            },
          }),
          {},
        ),
      ).sort((a, b) => b.count - a.count || b.latest - a.latest)[0].title;

    // Update or create the record
    upsertRecord(course.name, title);
  });
