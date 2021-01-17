import { BigQuery } from '@google-cloud/bigquery';
import { Course } from '../domain/Course';

const bigquery = new BigQuery();

export const getCoursesByDepartmentId = async (departmentId: number): Promise<Course[]> => {
  const query = `
    SELECT course, ARRAY_AGG(STRUCT(term, course, title, instructor, days, begin_time, end_time, building)) as sections
    FROM (
      SELECT term, course, title, instructor, mm.days, mm.begin_time, mm.end_time, mm.building
      FROM (
        SELECT d.term, d.course, d.instructor, ANY_VALUE(d.title) title, ARRAY_AGG(m LIMIT 1)[OFFSET(0)] mm
        FROM isqool.departments d, UNNEST(d.meetings) m
        WHERE (d.status != "Cancelled" OR d.status IS NULL)
          AND (m.type = "Class" OR m.type = "Hybrid")
          AND m.building IS NOT NULL
          AND d.department = @departmentId
        GROUP BY d.term, d.crn, d.course, d.instructor)
      GROUP BY term, course, title, instructor, days, begin_time, end_time, building
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
          title: section.title,
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
