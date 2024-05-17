import { BigQuery } from '@google-cloud/bigquery';
import { Course } from '../domain/Course';

const bigquery = new BigQuery();

export const getCoursesByDepartmentId = async (departmentId: number): Promise<Course[]> => {
  const query = String.raw`
    WITH
      -- A crn may have multiple sections; just pick one
      sections_by_crn AS (
        SELECT d.course, d.crn, d.term, d.instructor, ANY_VALUE(d.title) title, ARRAY_AGG(m ORDER BY m.days LIMIT 1)[OFFSET(0)] m
          FROM isqool.departments d, UNNEST(d.meetings) m
         WHERE (d.status != "Cancelled" OR d.status IS NULL)
           AND (m.type = "Class" OR m.type = "Hybrid")
           AND m.building IS NOT NULL
           AND d.instructor IS NOT NULL
           AND d.department = @departmentId
           AND CAST(REGEXP_EXTRACT(d.course, r'[[:alpha:]]+(\d+)') as int64) < 5000
         GROUP BY d.term, d.crn, d.course, d.instructor
         ORDER BY d.course DESC, isqool.termToId(term) DESC, d.instructor
      ),
      -- Now, take the distinct result
      sections AS (
        SELECT term, course, title, instructor, m.days, m.begin_time, m.end_time, m.building
          FROM sections_by_crn
         GROUP BY term, course, title, instructor, m.days, m.begin_time, m.end_time, m.building
         ORDER BY course DESC, isqool.termToId(term) DESC, instructor
      )

    SELECT course, ARRAY_AGG(STRUCT(term, course, title, instructor, days, begin_time, end_time, building)) as sections
      FROM sections
     GROUP BY course
    HAVING MAX(isqool.termToId(term)) > 201700
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
        })),
      ),
  );
};
