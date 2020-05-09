import * as React from 'react';
import classNames from 'classnames';
import { resolvePublicUrl } from '../lib/db';
import { Course } from '../types/Course';
import Book from '../svgs/book.svg';
import { toFormattedTime } from '../utils/converters';

type Props = {
  results: Course[];
};

// These styles control aesthetics only; positioning styles are applied on the individual elements
const ROW_CN = 'hover:bg-gray-100 border-gray-200 border-b last:border-b-0';
const HEADER_CN = 'bg-gray-800 p-4 font-sans-round text-white shadow-b';
const CELL_CN = 'px-4 leading-normal truncate sm:py-3';
const TEXT_SECONDARY_CN = 'font-light text-gray-600 sm:font-normal sm:text-black';

export const SearchResults: React.FC<Props> = ({ results }) => (
  <div>
    <div className={classNames(ROW_CN, 'flex items-stretch sticky top-0')}>
      <div className="flex flex-1 sm:flex-2">
        <div className={classNames(HEADER_CN, 'w-full sm:w-1/2')}>Term</div>
        <div className={classNames(HEADER_CN, 'hidden sm:block sm:w-1/2')}>Course</div>
      </div>
      <div className="flex flex-1 sm:flex-2">
        <div className={classNames(HEADER_CN, 'w-full sm:w-1/2')}>Professor</div>
        <div className={classNames(HEADER_CN, 'hidden sm:block sm:w-1/2')}>Time</div>
      </div>
      <div className="flex flex-1">
        <div className={classNames(HEADER_CN, 'w-full')}>Syllabus</div>
      </div>
    </div>

    {results.map((row) => (
      <div className={classNames(ROW_CN, 'flex items-center py-3 sm:p-0')}>
        <div className="flex-1 sm:flex sm:flex-2 truncate">
          <div className={classNames(CELL_CN, 'sm:w-1/2')}>
            {row.term} {row.year}
          </div>
          <div className={classNames(CELL_CN, TEXT_SECONDARY_CN, 'sm:w-1/2')}>{row.course}</div>
        </div>
        <div className="flex-1 sm:flex sm:flex-2 truncate">
          <div className={classNames(CELL_CN, 'font-medium sm:w-1/2')}>{row.last_name}</div>
          <div className={classNames(CELL_CN, TEXT_SECONDARY_CN, 'sm:w-1/2')}>
            {row.online ? (
              'Online'
            ) : (
              <>
                {row.days} {toFormattedTime(row.time_begin)}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-1 truncate">
          <div className={classNames(CELL_CN, 'w-full text-center')}>
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
              <span className="text-gray-500">-</span>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);
