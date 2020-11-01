import { BigQuery } from '@google-cloud/bigquery';
import { Course } from '../types/Course';

const bigquery = new BigQuery();

export const getCoursesByDepartmentId = async (departmentId: number): Promise<Course[]> => {
  const query = `
    SELECT course, ARRAY_AGG(STRUCT(term, course, instructor, days, begin_time, end_time, building)) as sections
    FROM (
      SELECT term, course, instructor, mm.days, mm.begin_time, mm.end_time, mm.building
      FROM (
        SELECT d.term, d.course, d.instructor, ARRAY_AGG(m LIMIT 1)[OFFSET(0)] mm
        FROM isqool.departments d, UNNEST(d.meetings) m
        WHERE (d.status != "Cancelled" OR d.status IS NULL)
          AND (m.type = "Class" OR m.type = "Hybrid")
          AND m.building IS NOT NULL
          AND d.department = @departmentId
        GROUP BY d.term, d.crn, d.course, d.instructor)
      GROUP BY term, course, instructor, days, begin_time, end_time, building
      ORDER BY isqool.termToId(term) DESC, instructor)
    GROUP BY course
  `;

  const options = {
    query: query,
    location: 'US',
    params: { departmentId },
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);

  // Wait for query to finish
  const [rows] = await job.getQueryResults();

  // Map the results
  return rows.map(
    (row) =>
      new Course(
        row.course,
        row.sections.map((section: any) => ({
          term: section.term,
          last_name: section.instructor,
          ...(section.days && { days: section.days }),
          ...(section.begin_time && { time_begin: section.begin_time.value }),
          ...(section.end_time && { time_end: section.end_time.value }),
          ...(section.building === 'ONLINE' && { online: true }),
          ...(section.building === 'REMOTE' && { remote: true }),
        })),
      ),
  );
};
