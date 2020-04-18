import * as React from 'react';
import classNames from 'classnames';
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

const ROW_CN = 'table-row odd:bg-gray-100 border-gray-200 border-b last:border-b-0';
const CELL_CN = 'table-cell p-4 w-1/5';

export const SearchResults: React.FC<Props> = ({ results }) => (
  <div className="table border-collapse w-full">
    <div className="table-header-group">
      <div className={ROW_CN}>
        {headings.map((title) => (
          <div
            className={classNames(
              CELL_CN,
              'bg-white sticky top-0 font-sans-round text-gray-600 shadow-b',
            )}
          >
            {title}
          </div>
        ))}
      </div>
    </div>

    <div className="table-row-group">
      {results.map((row) => (
        <div className={classNames(ROW_CN)}>
          <div className={CELL_CN}>
            {row.term} {row.year}
          </div>
          <div className={CELL_CN}>{row.course}</div>
          <div className={CELL_CN}>{row.last_name}</div>
          <div className={CELL_CN}>
            {row.online ? (
              'Online'
            ) : (
              <>
                {row.days} <span className="text-gray-400 select-none">/ </span>
                <span className="text-gray-600">{toFormattedTime(row.time_begin)}</span>
              </>
            )}
          </div>
          <div className={CELL_CN}>
            {row.syllabus ? (
              <a
                href={resolvePublicUrl(row.syllabus)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 no-underline"
              >
                <Book className="fill-current inline mr-1" style={{ width: 16, height: 16 }} />
                Open PDF
              </a>
            ) : (
              <span className="text-gray-500">Missing</span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
