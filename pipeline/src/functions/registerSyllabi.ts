import * as functions from 'firebase-functions';
import { findCourse, saveCourse } from '../repositories/courseRepo';
import { publishSyllabus } from '../repositories/syllabusRepo';
import { CourseSection } from '../types/Course';

/**
 * Background Cloud Function to be triggered by Cloud Storage. When a file is added to
 * the inbox bucket, if it is a syllabus, we will try to match it to associated course(s).
 * Successful syllabi are moved to the "syllabi/" bucket and made public, while non-matching
 * syllabi are left in the inbox for manual review.
 */
export const registerSyllabi = functions.storage
  .object()
  .onFinalize(async (object) => {
    const { bucket, name, contentType } = object;

    if (!name || !contentType) {
      return;
    }

    console.log(`Bucket: ${object.bucket}`);
    console.log(`File: ${object.name}`);
    console.log(`Metageneration: ${object.metageneration}`);
    console.log(`Created: ${object.timeCreated}`);
    console.log(`Updated: ${object.updated}`);

    // Filter out anything that's not a PDF
    if (!contentType.startsWith('application/pdf')) {
      console.log('Skipping file (not a PDF)', object);
      return;
    }

    // Filter out anything that's not in the inbox folder
    const [folder, fileName] = name.split('/');

    if (folder !== 'inbox') {
      console.log('Skipping file (not in "inbox/" folder)', object);
      return;
    }

    // Validate file name format: https://regex101.com/r/zQIuFK/1
    const syllabusPattern = /^([^\W_]+)_([^\W_]+)_([A-Za-z0-9-]+)(?:_([A-Z]+)(\d+))?\.pdf$/i;
    const [match, courseName, term, professor, days, time] = syllabusPattern.exec(fileName) || [];

    if (!match) {
      console.error(`${fileName} does not match the syllabus pattern.`);
      return;
    }

    // Grab the course document from the database
    const course = await findCourse(courseName);

    if (!course) {
      console.error(`Course ${courseName} does not exist yet.`);
      return;
    }

    // Loop through course sections and assign the syllabus to any matches
    let updateCount = 0;
    course.sections.map((section) => {
      if (matches(section, term, professor, days, time)) {
        if (section.syllabus) {
          console.error(`Section ${section} already has a syllabus assigned to it.`);
          return section;
        }

        console.log('Assigned syllabus to section', section);
        section.syllabus = `syllabi/${fileName}`;
        updateCount++;
      }
      return section;
    });

    // Save changes
    if (updateCount) {
      await publishSyllabus(bucket, name);
      await saveCourse(course);
    }

    console.log(`Finished processing file ${object}. Updated ${updateCount} sections.`);
  });

const matches = (
  section: CourseSection,
  term: string,
  professor: string,
  days: string,
  time: string,
): boolean =>
  section.term.replace(/ /g, '') === term &&
  section.last_name === professor &&
  (!days || (section.days == days && section.time_begin == time));
