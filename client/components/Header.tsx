import * as React from 'react';
import Dropbox from '../svgs/dropbox.svg';
import { Container } from './Container';
import { Search } from './Search';

const Nav: React.FC = () => (
  <div className="flex justify-between lg:w-4/5 lg:mx-auto">
    <div className="flex items-center px-4 py-5 text-white font-sans-round">
      <span className="mr-3 text-3xl">
        <a href="/">UNF</a>
      </span>
      <span className="text-lg italic font-thin">
        <a className="not-italic" href="/">
          Syllabus Bank
        </a>{' '}
        <span>(Beta)</span>
      </span>
    </div>
    <div className="px-4 py-5">
      <a
        href="https://www.dropbox.com/request/pRilFsqBYiekwb9hXZYO"
        className="float-right bg-black text-white rounded-full px-4 py-2 font-sans-round text-xs no-underline shadow-xl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Dropbox
          className="inline fill-current sm:mr-1"
          style={{ width: 16, height: 16, color: '#007be8' }}
        />{' '}
        <span className="hidden sm:inline">Send syllabus</span>
      </a>
    </div>
  </div>
);

const Title: React.FC = () => (
  <div className="mt-3 mb-4 px-4 lg:w-4/5 lg:mx-auto sm:mt-5 xl:w-3/5">
    <span className="font-thin text-3xl text-blue-500 italic lowercase leading-tight sm:text-5xl sm:leading-tight">
      Search Syllabi
    </span>
  </div>
);

export const Header: React.FC = () => (
  <nav className="header">
    <Container>
      <Nav />
      <Title />
      <Search />
    </Container>
  </nav>
);
