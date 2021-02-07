import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Course } from '../types/Course';
import { Container } from './Container';
import { SearchResults } from './SearchResults';

const variants = {
  visible: { y: 0, opacity: 1 },
  hidden: {
    y: 20,
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

type ResultsBarProps = {
  numResults: number;
};

const ResultsBar: React.FC<ResultsBarProps> = ({ numResults }) => (
  <Container>
    <div className="sm:block flex lg:-mx-4">
      <div className="px-8 py-4 lg:w-4/5 lg:mx-auto xl:w-3/5">
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

type ResultsBodyProps = {
  results: Course[];
};

const ResultsBody: React.FC<ResultsBodyProps> = ({ results }) => (
  <Container>
    <div className="flex lg:-mx-4">
      <div className="w-full sm:px-4 lg:w-4/5 lg:mx-auto xl:w-3/5">
        <div className="flex flex-col sm:rounded text-sm shadow-md sm:mb-6">
          <SearchResults results={results} />
        </div>
      </div>
    </div>
  </Container>
);

type HomeCardProps = {
  course: {
    name: string;
    code: string;
    syllabi: number;
  };
};

const HomeCard: React.FC<HomeCardProps> = ({ course }) => (
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
};

export const Content: React.FC<ContentProps> = ({ isVisible, results }) => {
  let content = null;
  if (isVisible) {
    if (results.length > 0) {
      content = (
        <motion.div initial="hidden" animate="visible" exit="hidden" variants={variants}>
          <ResultsBar numResults={results.length} />
          <ResultsBody results={results} />
        </motion.div>
      );
    } else {
      content = (
        <Container>
          {/* <div className="w-4/5 sm:w-3/5 ml-auto mr-auto mt-10">
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
            </div> */}
        </Container>
      );
    }
  }

  return <AnimatePresence initial={false}>{content}</AnimatePresence>;
};
