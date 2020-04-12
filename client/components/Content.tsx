import * as React from 'react';
import posed, { PoseGroup } from 'react-pose';
import Link from 'next/link';
import Dropbox from '../svgs/dropbox.svg';
import { Course } from '../types/Course';
import { Container } from './Container';
import { SearchResults } from './SearchResults';

const FadeInOut = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: {
    y: 20,
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
});

const ResultsEmpty = ({ query }) => (
  <FadeInOut>
    <Container>
      <div className="flex sm:-mx-4 tracking-wide">
        <div className="sm:w-3/5 sm:mx-auto sm:px-4 pt-10 text-center">
          <div className="text-gray-800 text-xl pb-3">
            No results found for <span className="italic">{query}</span>
          </div>
          <div className="w-4/6 mx-auto text-gray-600 font-light">
            <p>
              The course you&apos;re looking for likely doesn&apos;t have any syllabi yet. Wanna
              help? Consider
              <a
                href="https://www.dropbox.com/request/pRilFsqBYiekwb9hXZYO"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#007be8' }}
              >
                <Dropbox
                  className="mx-2 inline fill-current"
                  style={{ width: 20, height: 20, color: '#007be8' }}
                />
                uploading your syllabi
              </a>{' '}
              <span className="tracking-normal">(☞ﾟ∀ﾟ)☞</span>
            </p>
          </div>
        </div>
      </div>
    </Container>
  </FadeInOut>
);

const ResultsBar = ({ numResults }) => (
  <Container>
    <div className="hidden sm:block flex -mx-4">
      <div className="w-3/5 ml-auto mr-auto px-8 py-4">
        <div className="flex items-center">
          <span className="text-gray-600 font-light">Showing {numResults} results</span>
          <div className="ml-auto hidden">
            <i className="fas fa-bars text-blue-800 mr-2" />
            <i className="fas fa-th text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  </Container>
);

const ResultsBody = ({ results }) => (
  <Container>
    <div className="flex sm:-mx-4">
      <div className="sm:w-3/5 sm:mx-auto sm:px-4">
        <div className="flex flex-col sm:rounded text-sm shadow-md p-4 mb-6">
          <SearchResults results={results} />
        </div>
      </div>
    </div>
  </Container>
);

const HomeCard = ({ course }) => (
  <div
    className="relative flex-1 p-5 rounded-lg mx-2 bg-white mb-4 sm:mb-0"
    style={{
      boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.025), 0px 0px 15px rgba(0, 0, 0, 0.05)',
    }}
  >
    <div
      className="absolute -mt-6 mx-auto h-6 rounded-lg bg-gray-200"
      style={{ left: 10, right: 10, zIndex: -1 }}
    />
    <div className="flex items-center justify-between">
      <span className="text-blue-800 font-medium">{course.name}</span>
      {/* <span className="font-light text-gray-500 text-sm">1 day ago</span> */}
    </div>
    <div className="mt-1 mb-4">
      <span className="font-light text-gray-800">{course.code}</span>
    </div>
    <Link href="/course/[id]" as={`/course/${course.code}`}>
      <div className="rounded-lg cursor-pointer px-4 py-2 shadow bg-blue-700 text-white text-sm font-medium text-center">
        {course.syllabi} Syllabi
      </div>
    </Link>
  </div>
);

type ContentProps = {
  isVisible: boolean;
  results: Course[];
  emptyMessage: string;
};

export const Content: React.FC<ContentProps> = ({ isVisible, results, emptyMessage }) => {
  let content = null;
  if (isVisible) {
    if (emptyMessage) {
      content = (
        <FadeInOut key="no-results">
          <ResultsEmpty query={emptyMessage} />
        </FadeInOut>
      );
    } else if (results.length > 0) {
      content = (
        <FadeInOut key="results">
          <ResultsBar numResults={results.length} />
          <ResultsBody results={results} />
        </FadeInOut>
      );
    } else {
      content = (
        <FadeInOut key="explore">
          <Container>
            <div className="w-4/5 sm:w-3/5 ml-auto mr-auto mt-10">
              <div className="py-6 mb-2 text-center text-gray-500">
                Don&apos;t have a specific course in mind?{' '}
                <span className="font-medium">Explore these:</span>
              </div>
              <div className="sm:flex">
                <HomeCard course={{ name: 'Programming I', code: 'COP2220', syllabi: 10 }} />
                <HomeCard course={{ name: 'Programming II', code: 'COP3503', syllabi: 2 }} />
                <HomeCard course={{ name: 'Data Structures', code: 'COP3530', syllabi: 2 }} />
              </div>
              <div className="text-right mt-8 text-gray-300 font-mono text-sm">
                made by{' '}
                <a
                  className="underline hover:text-gray-600"
                  href="https://twitter.com/howardunfduck"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  howard the duck
                </a>{' '}
                ♥
              </div>
            </div>
          </Container>
        </FadeInOut>
      );
    }
  }

  return <PoseGroup>{content}</PoseGroup>;
};
