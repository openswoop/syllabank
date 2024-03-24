import * as React from 'react';
import classNames from 'classnames';
import { resolvePublicUrl } from '../lib/firebase';
import { Course } from '../types/Course';
import Book from '../svgs/book.svg';
import { toFormattedTime } from '../utils/converters';

type Props = {
  course: Course;
};

// These styles control aesthetics only; positioning styles are applied on the individual elements
const ROW_CN = 'hover:bg-gray-100 border-gray-200 border-b last:border-b-0';
const HEADER_CN = 'bg-gray-800 p-4 font-sans-round text-white shadow-b';
const CELL_CN = 'px-4 leading-normal sm:py-3';
const TEXT_SECONDARY_CN = 'font-light text-gray-600 sm:font-normal sm:text-black';

export const SectionDetails: React.FC<Props> = ({ course }) => (
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
      <div className="flex-1 flex sm:flex-3">
        <div className={classNames(HEADER_CN, 'w-full')}>Syllabus</div>
        <div className={classNames(HEADER_CN, 'hidden sm:block w-1/2')}>Rank</div>
      </div>
    </div>

    {course.sections.map((section) => (
      <div
        className={classNames(ROW_CN, 'flex items-center py-3 sm:p-0')}
        key={`${course.name} ${section.term} ${section.last_name} ${section.days} ${section.time_begin}`}
      >
        <div className="flex-1 sm:flex sm:flex-2 truncate">
          <div className={classNames(CELL_CN, 'sm:w-1/2')}>{section.term}</div>
          <div className={classNames(CELL_CN, TEXT_SECONDARY_CN, 'sm:w-1/2')}>{course.name}</div>
        </div>
        <div className="flex-1 sm:flex sm:flex-2 truncate">
          <div className={classNames(CELL_CN, 'font-medium sm:w-1/2')}>{section.last_name}</div>
          <div className={classNames(CELL_CN, TEXT_SECONDARY_CN, 'sm:w-1/2')}>
            {section.online
              ? 'Online'
              : `${section.days} ${section.time_begin && toFormattedTime(section.time_begin)}`}
          </div>
        </div>
        <div className="flex-1 sm:flex sm:flex-3 truncate">
          <div className={classNames(CELL_CN, 'sm:w-1/2 text-leading')}>
            {section.syllabus ? (
              <a
                href={resolvePublicUrl(section.syllabus)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 no-underline"
              >
                <Book className="fill-current inline mr-1" style={{ width: 16, height: 16 }} />
              </a>
            ) : (
              <span className="text-gray-500">-</span>
            )}
          </div>
          <div className={classNames(CELL_CN, 'sm:w-1/2 text-leading')}>
            <span className="text-gray-500">-</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);
