import * as React from 'react';
import { resolvePublicUrl } from '../lib/db';
import { Course } from '../types/Course';
import Book from '../svgs/book.svg';

const toFormattedTime = (time: string): string => {
  const [hour, minutes] = time.split(':');
  const date = new Date();
  date.setHours(+hour, +minutes, 0);
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

const headings = ['Term', 'Course', 'Professor', 'Time', 'Syllabus'];

type Props = {
  results: Course[];
};

export const SearchResults: React.FC<Props> = ({ results }) => (
  <table className="w-full">
    <thead>
      <tr>
        {headings.map((title) => (
          <th key={title} className="results-header w-1/5">
            {title}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {results.map((row) => (
        <tr key={row.id}>
          <td className="pb-5 w-1/5">
            {row.term} {row.year}
          </td>
          <td className="pb-5 w-1/5">{row.course}</td>
          <td className="pb-5 w-1/5">
            <span className="font-medium">{row.last_name}</span>
            {row.first_name}
          </td>
          <td className="pb-5 w-1/5">
            {row.online ? 'Online' : `${row.days} ${toFormattedTime(row.time_begin)}`}
          </td>
          <td className="pb-5 w-1/5">
            {row.syllabus ? (
              <a
                href={resolvePublicUrl(row.syllabus)}
                target="_blank"
                rel="noopener noreferrer"
                className="results-link"
              >
                <Book className="fill-current inline mr-1" style={{ width: 16, height: 16 }} />
                Open PDF
              </a>
            ) : (
              <span className="text-gray-600">Not in database</span>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
