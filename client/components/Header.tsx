import * as React from 'react';
import Dropbox from '../svgs/dropbox.svg';
import { Container } from './Container';
import { Search } from './Search';

const Nav: React.FC = () => (
  <div className="flex justify-between lg:w-4/5 lg:mx-auto">
    <div className="logo-container">
      <span className="logo">
        <a href="/">UNF</a>
      </span>
      <span className="app-title">
        <a className="not-italic" href="/">
          Syllabus Bank
        </a>{' '}
        <span>(Beta)</span>
      </span>
    </div>
    <div className="action-container">
      <a
        href="https://www.dropbox.com/request/pRilFsqBYiekwb9hXZYO"
        className="action-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Dropbox
          className="inline fill-current mr-1"
          style={{ width: 16, height: 16, color: '#007be8' }}
          alt=""
        />{' '}
        <span className="hidden sm:inline">Send syllabus</span>
      </a>
    </div>
  </div>
);

const Title: React.FC = () => (
  <div className="mt-3 mb-4 px-4 lg:w-4/5 lg:mx-auto sm:mt-5 xl:w-3/5">
    <span className="tagline-title">Search Syllabi</span>
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
